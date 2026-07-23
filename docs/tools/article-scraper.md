# Article Scraper

Fetches a The Verge story and builds an editable social lockup (eyebrow, headline, byline, date, credit, lede image).

## Flow

1. Paste article URL → **Fetch Story**
2. Edit fields / color (black, blurple, white) / aspect (9:16, 16:9)
3. Optionally replace image or hide background
4. Finalize → `article.jpg`

## Implementation

- Fetch: try direct `url + ?csk=1` HTML parse, then fall back to [Microlink](https://microlink.io) metadata (Verge blocks browser CORS from GitHub Pages / localhost).
- HTML parse uses Duet lede / byline / timestamp / caption where present, plus `og:image` / `og:title` fallbacks (lede image class names changed).
- Image import tries blob round-trip for CDN CORS; may still fall back to a hotlinked `src`.

## Known issues

- Eyebrow / credit are thinner on the Microlink path (path segment + blank credit) — edit fields after fetch.
- Wordpress CDN may still block lede image import for capture in some browsers.
