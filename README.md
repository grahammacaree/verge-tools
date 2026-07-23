# Verge Tools

Editorial image and layout tools for The Verge Art Team — social lockups, Decoder/Installer frames, filters, AI labels, and related helpers. Staff use the live Pages app in the browser; this repo is the source for that app.

**Live:** [grahammacaree.github.io/verge-tools](https://grahammacaree.github.io/verge-tools/)

Deep links use the tool id, e.g. [`…/installer-image-generator`](https://grahammacaree.github.io/verge-tools/installer-image-generator), [`…/article-scraper`](https://grahammacaree.github.io/verge-tools/article-scraper), [`…/release-notes`](https://grahammacaree.github.io/verge-tools/release-notes).

**Maintainer:** [Graham MacAree](https://github.com/grahammacaree)

## Why this lives outside Duet

These tools started life as a workaround when editorial engineers couldn’t ship inside Duet (see [history](docs/history.md)). They stay in a separate static app on purpose: Art tooling needs **fast iteration** — copy tweaks, capture fixes, new ratios — without waiting on Duet release cycles or coupling editorial helpers to the site platform.

Duet remains the CMS/front-end for The Verge. This repo is only the Art Team’s tooling surface (and may later sit on a Verge host such as `tools.theverge.com`).

## Development

```bash
pnpm install
pnpm run dev
```

Vite serves the app at `http://localhost:5173/` (production builds still use `/verge-tools/` for GitHub Pages).

## Build & preview

```bash
pnpm run build
pnpm run preview
```

## Deploy

Pushing to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds and publishes `dist/` to GitHub Pages.

In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions** (not “Deploy from a branch”). Branch deploys publish the unbuilt `index.html` and the site goes blank.

## Tools

| Tool | Purpose |
|------|---------|
| Article Scraper | Fetch a Verge story and compose a social lockup (1:1 / 9:16 / 16:9) |
| Decoder Image Generator | Decoder-styled image with glyph columns |
| Command Line Image Generator | Command Line frame + accent boxes |
| Installer Image Generator | 1–4 image mosaic with pattern backgrounds |
| Verge Filter | SVG duotone remapping onto an image |
| AI Label | Overlay AI-generated / AI-modified label |
| Image Mosaic | Split/merge grid layouts with templates |

Command Line and Image Mosaic are deprecated in the nav (source kept if Art wants them back).

## Password gate

Access uses the same soft client-side gate as the legacy site (`src/lib/gate.ts`). It is friction, not security — do not put secrets in this public repo.

## Documentation

- [Architecture](docs/architecture.md)
- [History](docs/history.md) — why pre-2.0 commits look like minified build dumps
- [Roadmap](docs/roadmap.md) — parity → auth → S3 → new tools → publish
- [Per-tool notes](docs/tools/)
- [UI copy (`content/`)](content/README.md) — home intro, tool blurbs, release notes

## Stack

Vite · React 19 · TypeScript · Vanilla Extract · `html-to-image` for export · CSS ported from the legacy stylesheet
