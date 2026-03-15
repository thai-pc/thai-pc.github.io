# FluxFiles Landing Page

Static landing page for [FluxFiles](https://github.com/YOUR_GITHUB_USERNAME/fluxfiles) — an open-source PHP file manager with S3, R2, and local storage support.

Built with **Astro 4**, **Tailwind CSS 3**, supports **8 languages** and **dark mode**.

## Prerequisites

- **Node.js** ≥ 20 (recommended 22.12+)
- **npm** ≥ 10

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open in browser
open http://localhost:4321/fluxfiles/en/
```

## Available Commands

| Command           | Action                                      |
| :---------------- | :------------------------------------------ |
| `npm run dev`     | Start dev server at `localhost:4321/fluxfiles` |
| `npm run build`   | Build production site to `./dist/`           |
| `npm run preview` | Preview production build locally             |

## Project Structure

```
fluxfiles-landing/
├── public/
│   ├── favicon.svg              # FluxFiles logo (SVG)
│   ├── robots.txt               # Crawl rules + sitemap URL
│   └── fonts/
│       └── inter-var.woff2      # Self-hosted Inter variable font
├── src/
│   ├── components/
│   │   ├── Navbar.astro         # Sticky nav + lang switcher + dark toggle
│   │   ├── Hero.astro           # Headline, CTAs, stats row
│   │   ├── DemoPreview.astro    # Static file manager UI mockup
│   │   ├── Features.astro       # 6 feature cards grid
│   │   ├── Install.astro        # Composer/npm/Manual code tabs
│   │   ├── Comparison.astro     # FluxFiles vs elFinder vs RichFilemanager
│   │   └── Footer.astro         # Links + copyright
│   ├── layouts/
│   │   └── BaseLayout.astro     # HTML shell, SEO meta, hreflang, anti-FOUC
│   ├── pages/
│   │   ├── index.astro          # Redirects / → /en/
│   │   └── [lang]/index.astro   # Dynamic route for all 8 languages
│   ├── i18n/
│   │   ├── utils.ts             # getLangFromUrl(), useTranslations()
│   │   ├── en.json              # English
│   │   ├── vi.json              # Vietnamese
│   │   ├── zh.json              # Chinese
│   │   ├── ja.json              # Japanese
│   │   ├── ko.json              # Korean
│   │   ├── fr.json              # French
│   │   ├── de.json              # German
│   │   └── es.json              # Spanish
│   └── styles/
│       └── global.css           # Tailwind directives + Inter font-face
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Pages CI/CD
├── astro.config.mjs             # Astro + Tailwind + Sitemap config
├── tailwind.config.mjs          # Dark mode: class, custom colors
└── tsconfig.json
```

## Configuration

### Before Deploying

Replace all placeholder values:

| File                | Placeholder              | Replace With                        |
| :------------------ | :----------------------- | :---------------------------------- |
| `astro.config.mjs`  | `YOUR_GITHUB_USERNAME`   | Your GitHub username                |
| `astro.config.mjs`  | `base: '/fluxfiles'`     | Remove if using custom domain       |
| `Navbar.astro`      | `YOUR_GITHUB_USERNAME`   | Your GitHub username                |
| `Footer.astro`      | `YOUR_GITHUB_USERNAME`   | Your GitHub username                |
| `robots.txt`        | `YOUR_GITHUB_USERNAME`   | Your GitHub username                |

Search and replace across the project:

```bash
# Find all occurrences
grep -r "YOUR_GITHUB_USERNAME" --include="*.astro" --include="*.mjs" --include="*.txt" .

# Replace (macOS)
find . -type f \( -name "*.astro" -o -name "*.mjs" -o -name "*.txt" \) \
  -exec sed -i '' 's/YOUR_GITHUB_USERNAME/actual-username/g' {} +
```

### Custom Domain

If using a custom domain instead of GitHub Pages:

1. Update `astro.config.mjs`:
   ```js
   site: 'https://your-domain.com',
   base: '/',  // remove '/fluxfiles'
   ```
2. Update font path in `src/styles/global.css` — change `/fluxfiles/fonts/` to `/fonts/`
3. Update favicon path in `BaseLayout.astro` — change `/fluxfiles/favicon.svg` to `/favicon.svg`
4. Update all internal links referencing `/fluxfiles/`

## i18n — Adding a New Language

1. Create `src/i18n/xx.json` (copy `en.json` as template, translate all values)
2. Add entry in `src/i18n/utils.ts`:
   ```ts
   export const languages = {
     // ...existing
     xx: 'Language Name',
   };
   ```
3. That's it — the dynamic route `[lang]/index.astro` picks it up automatically.

## Dark Mode

- Uses Tailwind `class` strategy (`dark:` prefix)
- Persists user preference in `localStorage`
- Falls back to `prefers-color-scheme` on first visit
- Anti-FOUC inline script in `<head>` prevents flash on reload

## Deploy to GitHub Pages

1. Push to `main` branch
2. Go to repo **Settings → Pages → Source** → select **GitHub Actions**
3. The workflow at `.github/workflows/deploy.yml` builds and deploys automatically

## Tech Stack

| Technology     | Purpose                              |
| :------------- | :----------------------------------- |
| Astro 4.x      | Static site generator (zero JS)     |
| Tailwind CSS 3  | Utility-first styling + dark mode   |
| Alpine.js (CDN) | Navbar toggle + install tabs only   |
| Inter font      | Self-hosted variable font           |
| GitHub Actions  | CI/CD to GitHub Pages               |

## Performance Targets

- Lighthouse Performance: **100**
- Zero runtime JavaScript (only ~200B theme toggle + Alpine.js for interactivity)
- Total page weight: **< 50KB** (HTML + CSS purged by Tailwind)
- Font: self-hosted with `font-display: swap`

## License

MIT
