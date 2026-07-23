# Decoder Image Generator

Composes an uploaded image into Decoder’s dual-panel look with decorative glyph columns and logo.

## Flow

1. Upload / paste / drop image
2. Glyph columns generate randomly; **Regenerate glyphs** to reshuffle
3. Zoom / brightness / contrast
4. Finalize → `decoder.jpg`

## Brand notes

- Glyph classes: `x`, `square`, `filled`, `slash` (CSS background SVGs under `public/images/decoder/`)
- Column alignments: `even`, `between`, `around`
- Inverted strip uses CSS invert/desaturate on a second image copy
- Large logo: `public/images/decoder/logo.png`
