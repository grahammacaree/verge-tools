export type ImageAdjustments = {
  zoom: number;
  brightness: number;
  contrast: number;
  translateX: number;
  translateY: number;
  objectPosition: string;
};

export const DEFAULT_ADJUSTMENTS: ImageAdjustments = {
  zoom: 1,
  brightness: 100,
  contrast: 100,
  translateX: 0,
  translateY: 0,
  objectPosition: '50% 50%',
};

export function transformStyle(adj: Pick<ImageAdjustments, 'zoom' | 'translateX' | 'translateY'>): string {
  return `translate(${adj.translateX}px, ${adj.translateY}px) scale(${adj.zoom})`;
}

export function filterStyle(adj: Pick<ImageAdjustments, 'brightness' | 'contrast'>): string {
  return `brightness(${adj.brightness}%) contrast(${adj.contrast}%)`;
}

export function parseObjectPosition(value: string): { x: number; y: number } {
  const parts = value.trim().split(/\s+/);
  const x = parts[0] ? parseFloat(parts[0]) / 100 : 0.5;
  const y = parts[1] ? parseFloat(parts[1]) / 100 : 0.5;
  return {
    x: Number.isFinite(x) ? x : 0.5,
    y: Number.isFinite(y) ? y : 0.5,
  };
}

export function formatObjectPosition(x: number, y: number): string {
  return `${Math.min(1, Math.max(0, x)) * 100}% ${Math.min(1, Math.max(0, y)) * 100}%`;
}

/** Cover-fit size of an image in a holder, and which axes still have overflow to pan. */
export function coverPanMetrics(
  naturalWidth: number,
  naturalHeight: number,
  holderWidth: number,
  holderHeight: number,
): { fitW: number; fitH: number; canPanX: boolean; canPanY: boolean } {
  if (!naturalWidth || !naturalHeight || !holderWidth || !holderHeight) {
    return { fitW: holderWidth, fitH: holderHeight, canPanX: false, canPanY: false };
  }
  const imageAspect = naturalWidth / naturalHeight;
  const holderAspect = holderWidth / holderHeight;
  if (imageAspect > holderAspect) {
    const fitH = holderHeight;
    const fitW = naturalWidth * (holderHeight / naturalHeight);
    return { fitW, fitH, canPanX: fitW > holderWidth + 0.5, canPanY: false };
  }
  const fitW = holderWidth;
  const fitH = naturalHeight * (holderWidth / naturalWidth);
  return { fitW, fitH, canPanX: false, canPanY: fitH > holderHeight + 0.5 };
}

/**
 * Keep a center-origin `translate + scale` cover-clamped to the holder.
 * Live DOM rects are unreliable once nested overflow / object-fit enter the picture.
 */
export function clampPanTranslate(
  translateX: number,
  translateY: number,
  zoom: number,
  width: number,
  height: number,
): { x: number; y: number } {
  if (zoom <= 1 || width <= 0 || height <= 0) {
    return { x: 0, y: 0 };
  }
  const maxX = (width * (zoom - 1)) / 2;
  const maxY = (height * (zoom - 1)) / 2;
  return {
    x: Math.min(maxX, Math.max(-maxX, translateX)),
    y: Math.min(maxY, Math.max(-maxY, translateY)),
  };
}

/** @deprecated Prefer `clampPanTranslate`. */
export function clampPan(
  imageRect: DOMRect,
  containerRect: DOMRect,
  translateX: number,
  translateY: number,
): { x: number; y: number } {
  let x = translateX;
  let y = translateY;
  if (imageRect.top > containerRect.top) y += containerRect.top - imageRect.top;
  if (imageRect.left > containerRect.left) x += containerRect.left - imageRect.left;
  if (imageRect.right < containerRect.right) x += containerRect.right - imageRect.right;
  if (imageRect.bottom < containerRect.bottom) y += containerRect.bottom - imageRect.bottom;
  return { x, y };
}
