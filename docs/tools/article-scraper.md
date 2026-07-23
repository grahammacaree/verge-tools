# Article Scraper

Fetches a The Verge story and builds an editable social lockup (eyebrow, headline, byline, date, credit, lede image).

## Flow

1. Paste article URL → **Fetch Story**
2. Edit fields / color (black, blurple, white) / aspect (**1:1** default, also 9:16 and 16:9)
3. Optionally replace image (File | URL), pan/zoom the crop, or hide background (16:9 only for hide-background)
4. Finalize → `article.jpg`

## Aspect ratios

| Ratio | Layout notes |
|-------|----------------|
| **1:1** (default) | Tall-style lockup in a square frame; wider (16:9) photo crop; smaller type; no eyebrow or date on the card |
| **9:16** | Portrait lockup; square photo crop; no eyebrow on the card |
| **16:9** | Landscape full-bleed photo behind type; eyebrow + date shown |

## Implementation

- Fetch: try direct `url + ?csk=1` HTML parse, then fall back to [Microlink](https://microlink.io) metadata (Verge blocks browser CORS from GitHub Pages / localhost).
- HTML parse prefers `__NEXT_DATA__` categories for eyebrows, then lede chips; strips “See All” / Follow junk.
- Image import tries blob round-trip for CDN CORS; may still fall back to a hotlinked `src`.
- Lede photo uses shared `useImageAdjustments` (drag to pan; zoom slider under Change image). Cover-pan works at zoom 1 when the image aspect overflows the crop.

## Known issues

- Eyebrow / credit are thinner on the Microlink path (path segment + blank credit) — edit fields after fetch.
- Wordpress CDN may still block lede image import for capture in some browsers.