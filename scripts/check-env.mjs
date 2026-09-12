#!/usr/bin/env node
// Runs automatically before `npm run build` (npm's `prebuild` lifecycle hook).
// Purpose: catch a sandbox Polar checkout link riding along into a real build —
// the pricing page shows no visual difference between a sandbox and a
// production checkout button, so this is the only safety net.
//
// Default behavior is a WARNING, not a failure: this repo has never confirmed
// its GitHub Actions `vars.PUBLIC_POLAR_*` are production values yet (the site
// isn't known to have launched real payments), so hard-failing by default
// could break an already-working pre-launch deploy without warning. Once the
// real Polar production links are wired up in CI, set POLAR_REQUIRE_PRODUCTION=1
// (as a repo/environment variable in the deploy workflow) to make this check
// fail the build instead of just warning.
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

function loadDotEnv(path) {
  if (!existsSync(path)) return {};
  const out = {};
  for (const line of readFileSync(path, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (m) out[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
  return out;
}

const envPath = fileURLToPath(new URL('../.env', import.meta.url));
const fileEnv = loadDotEnv(envPath);
// process.env wins — matches how CI supplies these (workflow `env:` block, no .env file).
const env = { ...fileEnv, ...process.env };

// PUBLIC_POLAR_SANDBOX_* and the PUBLIC_POLAR_ENV selector are SUPPOSED to say
// "sandbox" (see .env.example) — they're only used when PUBLIC_POLAR_ENV=sandbox
// is deliberately set for local/dev testing, never as the live production link.
// Only the plain PUBLIC_POLAR_* vars (what a real visitor gets by default) are
// the ones this guard cares about.
const polarKeys = Object.keys(env).filter(
  (k) => k.startsWith('PUBLIC_POLAR_') && k !== 'PUBLIC_POLAR_ENV' && !k.startsWith('PUBLIC_POLAR_SANDBOX_')
);
const offenders = polarKeys.filter((k) => /sandbox/i.test(env[k] ?? ''));

if (offenders.length === 0) {
  console.log('[check-env] No sandbox Polar checkout links detected.');
  process.exit(0);
}

const lines = [
  '',
  '⚠  Sandbox Polar checkout link(s) detected in this build:',
  ...offenders.map((k) => `   ${k}=${env[k]}`),
  '',
  '   These are TEST checkout links (see .env.example). Deploying them means',
  '   a real visitor could land on a sandbox checkout instead of a real purchase.',
  '   Swap for production links before a real launch.',
  '',
];

if (env.POLAR_REQUIRE_PRODUCTION === '1') {
  console.error(lines.join('\n'));
  console.error('   POLAR_REQUIRE_PRODUCTION=1 is set — failing the build.\n');
  process.exit(1);
}

console.warn(lines.join('\n'));
console.warn('   Continuing (set POLAR_REQUIRE_PRODUCTION=1 once ready to enforce this).\n');
process.exit(0);
