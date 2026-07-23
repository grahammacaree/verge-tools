# Installer Image Generator

Mosaic-style frame with 1–4 image slots and Installer pattern backgrounds.

## Flow

1. Choose number of images (One–Four) and a background pattern (optional color swap)
2. Drop/select an image per slot (click a slot to target it)
3. Adjust selected slot → Download → `installer.jpg`

## Implementation notes

- Does **not** use Image Mosaic / `image_mosaic.js`. Behavior is self-contained; legacy reference is `_installer.scss` only.
- Always mount four slots — CSS (`.image-group.one` / `.two` / …) hides unused cells, matching live.
- Pattern decorations are **inline SVGs** (fetched like Command Line frames) so background CSS can show/hide and recolor fills on swap.
- Capture uses `cssScope: ['installer-image-generator']` so the off-screen `html-to-image` clone still matches tool-scoped CSS (the live form ancestor is not cloned).

## Assets

Pattern SVGs live under `public/images/installer/background-1.svg` … `background-3.svg`.
