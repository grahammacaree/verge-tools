# Verge Filter

Maps an uploaded image through an SVG filter that remaps luminance into Verge-adjacent colors.

## Flow

1. Upload image (File | URL toggle; also paste / drop)
2. Choose aspect ratio (**Auto** default = image’s natural ratio) and adjust zoom / brightness / contrast
3. Finalize → `verge-filter.jpg`

## Notes

- Aspect options match AI Label (`auto`, `r1x1`, `r2x3`, `r3x2`, `r5x4`, `r16x9`)
- SVG uses `preserveAspectRatio="meet"` (contain). Zoom-1 cover-crop pan is **opted out** (`coverPan: false`); pan only works when zoomed.
- Color remap lives in the SVG filter tables below — do not change casually.

After grayscale `feColorMatrix`:

| Channel | `tableValues` |
|---------|----------------|
| R | `0.4 0.24` |
| G | `0 1` |
| B | `0.88 0.82` |
| A | `0 1` |
