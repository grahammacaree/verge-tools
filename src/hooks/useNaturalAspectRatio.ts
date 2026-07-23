import { useEffect, useState } from 'react';

/** CSS `aspect-ratio` value from an image URL’s natural size, or null while loading / empty. */
export function useNaturalAspectRatio(url: string | null | undefined): string | null {
  const [aspect, setAspect] = useState<string | null>(null);

  useEffect(() => {
    if (!url) {
      setAspect(null);
      return;
    }
    let cancelled = false;
    const img = new Image();
    img.onload = () => {
      if (cancelled || !img.naturalWidth || !img.naturalHeight) return;
      setAspect(`${img.naturalWidth} / ${img.naturalHeight}`);
    };
    img.onerror = () => {
      if (!cancelled) setAspect(null);
    };
    img.src = url;
    return () => {
      cancelled = true;
    };
  }, [url]);

  return aspect;
}

export const ASPECT_RATIO_OPTIONS = [
  { className: 'auto', label: 'Auto' },
  { className: 'r1x1', label: '1:1' },
  { className: 'r2x3', label: '2:3' },
  { className: 'r3x2', label: '3:2' },
  { className: 'r5x4', label: '5:4' },
  { className: 'r16x9', label: '16:9' },
] as const;

/** SVG viewBox for forced ratios (Verge Filter). Auto uses natural size separately. */
export const ASPECT_RATIO_VIEWBOX: Record<string, string> = {
  auto: '0 0 750 500',
  r1x1: '0 0 500 500',
  r2x3: '0 0 500 750',
  r3x2: '0 0 750 500',
  r5x4: '0 0 750 600',
  r16x9: '0 0 800 450',
};
