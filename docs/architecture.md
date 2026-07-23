# Architecture

## Overview

Verge Tools is a static SPA for The Verge Art Team’s editorial helpers. There is no app server. Article scraping talks to public third-party endpoints from the browser. (Deprecated Image Mosaic still has Sheet/Apps Script helpers in source if revived.)

It is intentionally **not** part of Duet — fast iteration for Art tooling, maintained by Graham MacAree. For origin story and why pre-2.0 git history looks like a minified publish dump (Duet story → build artefact → Pages), see [history.md](history.md).

```
src/
  app/           Shell: password gate, left nav, tool header, active tool switch
  components/    Shared UI (toggles, finalize, image input, logos)
  hooks/         Image ingest, pan/zoom/adjust, capture download
  lib/           Gate hash, scraper parsers, capture helpers, asset URLs
  tools/         One folder per editorial tool
  styles/        site.css (legacy port) + app.css overrides
```

## Shell

1. `PasswordGate` unlocks via the legacy hash and sets `localStorage.vergetools`.
2. `useToolRoute` keeps the active `ToolId` in sync with the path (`/verge-tools/<tool-id>`; home is `/verge-tools/`).
3. `LeftNav` / home grid use real `href`s (cmd-click works); click uses `history.pushState`.
4. `App` renders the matching tool under `.flex-container.verge`.
5. Production build copies `index.html` → `404.html` so GitHub Pages serves the SPA for deep links / refresh.

## Shared media pipeline

Most image tools follow the same path:

1. **Ingest** — `useImageIngest` (file input, paste, drag-drop) plus **File | URL** mode on `ImageFileInput` / `ImageSourceControls` (`fileFromImageUrl` in `lib/imageUrl.ts`); jpeg/png/webp only. Remote loads need CORS-friendly hosts.
2. **Adjust** — `useImageAdjustments` (zoom, pan when zoomed, object-position when not, brightness/contrast).
3. **Download** — `useCaptureDownload` waits for fonts, strips selection chrome, runs `html-to-image` at `pixelRatio: 2`, then downloads. Default format is **JPEG** (`quality: 0.9`). JPEG matte defaults to the capture node’s computed `background-color` (fallback `#ffffff`) because `html-to-image` often omits the root element’s CSS background — Installer’s dark pattern fill depends on this.

   **CSS scope:** Tool layout CSS is usually nested under a generator class (e.g. `.decoder-image-generator .input .image-container`). The off-screen clone drops live form ancestors, so pass `cssScope: ['decoder-image-generator', 'input']` (outermost → innermost) — or pass `cssScope` at `capture()` time when classes are dynamic (Article Scraper ratio/color). Without this, absolute layers stack and downloads look broken.

   **SVG fills:** Before capture, computed `fill` values are copied from the live node onto clone shapes. Stylesheet-only fills (e.g. scraper wordmark on blurple/black) are otherwise often dropped by `html-to-image`.

Pan/zoom (`useImageAdjustments`) is the **sole writer** of media `transform` / `object-position`, and of user brightness/contrast `filter` on the **holders** (`.image-holder-inner`, etc.) so tool CSS filters on `<img>` (Decoder) can stack. Tools should not also bind those properties on the same nodes. Gestures paint via `rAF`; React state commits on pointer-up / slider transitions.

Prefer these hooks over reimplementing capture or pan logic inside a tool.

## UI copy

Editorial strings live in [`content/`](../content/) (`home.md`, `tools.md`, `release-notes.md`, `tips/`). See [`content/README.md`](../content/README.md) for conventions and the ship checklist.

## Adding a tool

1. Add a section to [`content/tools.md`](../content/tools.md) (`## Label` + `id: …` + description).
2. Extend `ToolId` in [`src/lib/tools.ts`](../src/lib/tools.ts) if the id is new.
3. Create `src/tools/<name>/<Name>.tsx` using legacy CSS class names where possible (`tool`, `capture`, `image-container`, …).
4. Wire it in `src/app/App.tsx`.
5. Add `docs/tools/<name>.md`.

## Styling (Vanilla Extract)

Styles are co-located TypeScript modules (`.css.ts`) imported via [`src/styles/index.ts`](../src/styles/index.ts):

| Module | Owns |
|--------|------|
| `styles/theme.css.ts` | Design tokens + legacy CSS variable aliases |
| `styles/fonts.css.ts` | Poly Sans / FK Roman `@font-face` |
| `styles/shared.css.ts` | Download button, sliders, `.input` / `.tool` chrome |
| `app/shell.css.ts` | Gate, left nav, header, layout |
| `tools/<name>/*.css.ts` | Per-tool rules (Decoder, Mosaic, etc.) |

AI Label and Article Scraper reuse shared `.input` styles (no dedicated sheets).

Prefer `style()` / `vars` from `@vanilla-extract/css` for new UI. Existing tool markup still uses legacy class names wired through `globalStyle`.

## Assets

Static files live under `public/images/`. Resolve them with `assetUrl()` from `src/lib/assetUrl.ts` so the Vite `base` (`/verge-tools/`) is applied.

## Image Mosaic

Mosaic is the only tool with a non-trivial domain model:

- Typed cell tree (`leaf` / `split`) in `tools/image-mosaic/types.ts` + `treeOps.ts`
- Layout insets in `layout.ts`
- Template wire format still HTML + `btoa(encodeURIComponent(...))` for Google Sheets compatibility (`templateCodec.ts`)
- Sheet load / Apps Script save isolated in `sheets.ts`

## What we deliberately do not ship

- Duet components or internal packages
- Secrets / real auth backends
- Polygon Scraper (dropped in product; Mosaic retained)
- Dead vendors from the legacy site (`html2canvas`, `smartcrop`)
