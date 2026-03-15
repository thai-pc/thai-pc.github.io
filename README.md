# FluxFiles Landing Page

Static landing page for [FluxFiles](https://github.com/thai-pc/fluxfiles) — an open-source PHP file manager with S3, R2, and local storage support.

Built with **Astro 4**, **Tailwind CSS 3**, supports **16 languages** and **dark mode**.

## Prerequisites

- **Node.js** ≥ 20 (recommended 22.12+)
- **npm** ≥ 10

## Quick Start

```bash
npm install
npm run dev
# Open http://localhost:4321/
```

## Available Commands

| Command           | Action                                      |
| :---------------- | :------------------------------------------ |
| `npm run dev`     | Start dev server at `localhost:4321`         |
| `npm run build`   | Build production site to `./dist/`           |
| `npm run preview` | Preview production build locally             |

## Project Structure

```
fluxfiles-landing/
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   └── fonts/
│       └── inter-var.woff2
├── src/
│   ├── components/
│   │   ├── Navbar.astro         # Sticky nav + lang switcher + dark toggle
│   │   ├── Hero.astro           # Headline, CTAs, stats row
│   │   ├── DemoPreview.astro    # Static file manager UI mockup
│   │   ├── Features.astro       # 18 feature cards grid
│   │   ├── Install.astro        # Composer/Laravel/JS SDK/Manual tabs
│   │   ├── Comparison.astro     # FluxFiles vs 4 competitors
│   │   └── Footer.astro         # Links + copyright
│   ├── layouts/
│   │   └── BaseLayout.astro     # HTML shell, SEO meta, hreflang, anti-FOUC
│   ├── pages/
│   │   ├── index.astro          # English (default language)
│   │   └── [lang]/index.astro   # Dynamic route for all 16 languages
│   ├── i18n/
│   │   ├── utils.ts             # getLangFromUrl(), useTranslations()
│   │   ├── en.json              # English
│   │   ├── vi.json              # Vietnamese
│   │   ├── zh.json              # Chinese
│   │   ├── ja.json              # Japanese
│   │   ├── ko.json              # Korean
│   │   ├── fr.json              # French
│   │   ├── de.json              # German
│   │   ├── es.json              # Spanish
│   │   ├── hi.json              # Hindi
│   │   ├── pt.json              # Portuguese
│   │   ├── ru.json              # Russian
│   │   ├── ar.json              # Arabic
│   │   ├── th.json              # Thai
│   │   ├── tr.json              # Turkish
│   │   ├── it.json              # Italian
│   │   └── nl.json              # Dutch
│   └── styles/
│       └── global.css           # Tailwind directives + Inter font-face
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Pages CI/CD
├── astro.config.mjs
├── tailwind.config.mjs
└── tsconfig.json
```

## URL Routing

| URL      | Content            |
| :------- | :----------------- |
| `/`      | English (default)  |
| `/en/`   | English            |
| `/vi/`   | Vietnamese         |
| `/zh/`   | Chinese            |
| `/ja/`   | Japanese           |
| `/ko/`   | Korean             |
| `/fr/`   | French             |
| `/de/`   | German             |
| `/es/`   | Spanish            |
| `/hi/`   | Hindi              |
| `/pt/`   | Portuguese         |
| `/ru/`   | Russian            |
| `/ar/`   | Arabic             |
| `/th/`   | Thai               |
| `/tr/`   | Turkish            |
| `/it/`   | Italian            |
| `/nl/`   | Dutch              |

## i18n — Adding a New Language

1. Create `src/i18n/xx.json` (copy `en.json` as template, translate all values)
2. Add entry in `src/i18n/utils.ts`:
   ```ts
   export const languages = {
     // ...existing
     xx: 'Language Name',
   };
   ```
3. The dynamic route `[lang]/index.astro` picks it up automatically.

## Dark Mode

- Uses Tailwind `class` strategy (`dark:` prefix)
- Persists user preference in `localStorage`
- Falls back to `prefers-color-scheme` on first visit
- Anti-FOUC inline script in `<head>` prevents flash on reload

## Fork / Customize

If you fork this project for your own product, update the following:

| File               | What to change                                |
| :----------------- | :-------------------------------------------- |
| `astro.config.mjs` | `site` — your GitHub Pages or custom domain   |
| `Navbar.astro`     | GitHub repo link + stars badge URL            |
| `Hero.astro`       | GitHub repo link                              |
| `Footer.astro`     | Author name / link                            |
| `Install.astro`    | Install commands (composer, curl, etc.)        |
| `robots.txt`       | Sitemap URL                                   |
| `src/i18n/*.json`  | All translatable text                         |

> **Attribution:** This landing page was originally created by [thai-pc](https://github.com/thai-pc). A link back is appreciated but not required under the MIT license.

## Deploy to GitHub Pages

1. Push to `main` branch
2. Go to repo **Settings → Pages → Source** → select **GitHub Actions**
3. The workflow at `.github/workflows/deploy.yml` builds and deploys automatically

## Tech Stack

| Technology      | Purpose                             |
| :-------------- | :---------------------------------- |
| Astro 4.x       | Static site generator (zero JS)    |
| Tailwind CSS 3   | Utility-first styling + dark mode  |
| Alpine.js (CDN)  | Navbar toggle + install tabs only  |
| Inter font       | Self-hosted variable font          |
| GitHub Actions   | CI/CD to GitHub Pages              |

## License

MIT
