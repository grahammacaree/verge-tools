# AI Label

Overlays an “AI-generated image” or “AI-modified image” label on an uploaded photo.

## Flow

1. Upload image
2. Choose language (generated / modified) and aspect ratio (including **Auto**)
3. Adjust → Finalize → `ai-label.jpg`

## Notes

- Aspect classes: `r1x1`, `r2x3`, `r3x2`, `r5x4`, `r16x9`, `auto` (default)
- `auto` sets the frame’s `aspect-ratio` from the image’s natural size
