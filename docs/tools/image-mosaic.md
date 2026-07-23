# Image Mosaic

**Deprecated** — unused; not in the published nav. Source kept under `src/tools/image-mosaic/` for a possible revive.

Multi-step layout tool: split/merge cells, assign images, background textures, color filters, then export.

## On revive

`MosaicCanvas.tsx` still has a **forked** pan/zoom path (click-jump object-position, DOMRect clamp). Do not ship it as-is — migrate cells onto `useImageAdjustments` (controlled `value`/`onChange`) and the shared cover-pan / translate clamp math.

## Wizard steps

1. Layout (templates or custom split/merge/padding/gap/cutout)
2. Images
3. Background
4. Filter
5. Adjust (zoom/pan)
6. Finalize → `mosaic.jpg`

## Data model

Typed tree in `types.ts` / `treeOps.ts` (`leaf` vs `split` with horizontal/vertical ratio). Insets match legacy `updatePositioning` math in `layout.ts`.

## Templates

- Wire format remains HTML serialized as `btoa(encodeURIComponent(html))` for compatibility with the existing Google Sheet.
- Sheet ID and Apps Script save URL are public config constants in `types.ts` / `sheets.ts` — not secrets.
- Encode/decode: `templateCodec.ts`

## External deps

- Google Sheet load via gviz JSON
- Apps Script form POST to save named templates
