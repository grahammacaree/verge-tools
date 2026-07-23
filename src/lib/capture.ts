import { toJpeg, toPng } from 'html-to-image';

export type CaptureFormat = 'jpeg' | 'png';

export type CaptureOptions = {
  /** Default `jpeg` — smaller downloads for photo tools. Use `png` for sharp type / alpha. */
  format?: CaptureFormat;
  /** JPEG only; default `0.9`. */
  quality?: number;
  /** Default `2`. */
  pixelRatio?: number;
  /** JPEG matte behind transparent pixels; default `#ffffff`. */
  backgroundColor?: string;
  /**
   * Ancestor class names re-applied around the off-screen clone so tool-scoped CSS still matches.
   * Order is outermost → innermost (e.g. `['decoder-image-generator', 'input']`).
   */
  cssScope?: string[];
};

export async function waitForFonts(): Promise<void> {
  if (document.fonts?.ready) {
    await document.fonts.ready;
  }
  try {
    await document.fonts.load('400 16px "Poly Sans"');
  } catch {
    // Font may already be available or blocked; continue.
  }
}

export async function captureNode(
  node: HTMLElement,
  {
    format = 'jpeg',
    quality = 0.9,
    pixelRatio = 2,
    backgroundColor = '#ffffff',
  }: CaptureOptions = {},
): Promise<string> {
  await waitForFonts();
  const shared = { pixelRatio, cacheBust: false as const };
  if (format === 'png') {
    return toPng(node, shared);
  }
  // Matte — JPEG has no alpha; avoids holes from layered CSS.
  return toJpeg(node, { ...shared, quality, backgroundColor });
}

export function downloadDataUrl(dataUrl: string, fileName: string): void {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = fileName;
  link.click();
}
