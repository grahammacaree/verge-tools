## Release Notes

### Known Issues

_As of July 23, 2026_

- Article Scraper falls back to Microlink metadata when the browser can’t fetch `theverge.com` directly (CORS). Eyebrow/credit may need a quick manual tweak after fetch.
- Lede image import can still fail when the Wordpress CDN blocks cross-origin blob fetches; the preview may hotlink instead. Replace the image manually if needed.

### 2.0.1

_July 23, 2026_

##### Article Scraper

- Added a **1:1** aspect option (default; tall-style lockup, wider photo crop, smaller type; no date line).

### 2.0.0

_July 23, 2026 — TypeScript / React rebuild_

##### General

- Rebuilt the app (TypeScript / React). Same tools.
- Image Mosaic and Command Line removed from the nav. Polygon Scraper dropped.

##### Article Scraper

- Fetch Story works again (falls back when the browser can’t load the story directly).
- Downloads as JPEG (much smaller than the old PNG).

##### Decoder

- Shared zoom; brightness/contrast apply to the last-selected panel (main by default).

##### Verge Filter & AI Label

- Aspect-ratio controls including **Auto** (keeps the image’s natural ratio; default for both).

### 1.2.0

_May. 2 2025_

##### General

- Removed Polygon tools from site.

### 1.1.4

_Feb. 25 2025_

##### Article Scraper (Polygon)

- Fixed bug in displaying eyebrows.

### 1.1.3

_Feb. 11 2025_

##### Article Scraper (The Verge)

- Updated article scraper to read new format after migration. Wordpress images still pending per “known issues.”

### 1.1.2

_Nov. 25 2024_

##### Article Scraper (Polygon)

- Fixed bug where articles with very short headlines caused image fields to shrink with them.

### 1.1.1

_Nov. 4 2024_

##### General

- Added webp to supported upload image types.

##### Image Mosaic (Polygon)

- The ‘selected image’ indicator was not being removed when the mosaic was being prepped for download. This has now been fixed.

### 1.1.0

_Oct. 29 2024_

##### General

- Refactored Javascript to allow for better codebase maintainence and efficiency.
- Added a re-centering option for images with panning when unzoomed.
- Added a paste option screenshot for most Verge tools (not the article scraper).

##### Article Scraper (Polygon)

- Added tool.

### 1.0.3

_Aug. 28 2024_

##### General

- Tweaked image panning to better follow user cursor when zoomed in.
- Added ‘known issues’ section to release notes.

### 1.0.2.2

_Aug. 27, 2024_

##### General

- Updated panning to snap to container edges rather than allow gaps.
- Prevent interaction with browser defaults on pan.
- Addressed some interference between Polygon and Verge tool scripts.

##### Image Mosaic (Polygon)

- Fixed persistent zoom-in bug.

### 1.0.2.1

_Aug. 27, 2024_

##### Article Scraper

- Added missing polysans-mono fonts.
- Updated description to remove reference to deks.

##### Verge Filter (Verge)

- Fixed bug preventing image upload. (This bug was caused by merging Polygon and Verge’s tooling checks in release 1.0.0. At a future release I will streamline these in more happy fashion.)
- Changed description to reflect what the tool actually does.

### 1.0.2

_Aug. 27, 2024_

##### AI Label (Verge)

- Added more options for aspect ratio for AI image labelling, including ‘auto’, which completely disables cropping on the tooling end and allows the user to download in the original aspect ratio.
- Added the option to use ‘AI-modified’ instead of ‘AI-generated’ language in the AI label.

##### General

- Moved Verge/Polygon navigation toggle to the left bar for more convenient access.
- Made the brand links go to the tooling page rather than to brnad homepages.
- Added a ‘release notes’ section. (You are here).
- Minor cosmetic tweaks to button backgrounds and interior borders.
- Removed footer.
- Removed Verge hat from metadata.

### 1.0.1

_Aug. 22, 2024_

##### Image Mosaic (Polygon)

- Bugfix: removed the ‘image selected’ signifier from downloaded image.

### 1.0.0

_Aug. 13, 2024_

##### General

- Added Polygon’s tooling system to the site.
- Added site toggles.
- Released to Polygon and The Verge.
