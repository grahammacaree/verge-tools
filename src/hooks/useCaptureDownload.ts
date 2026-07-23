import { useCallback, useState } from 'react';
import { captureNode, downloadDataUrl, resolveJpegMatte, type CaptureOptions } from '../lib/capture';

export type CaptureState = 'ready' | 'capturing' | 'done';

/**
 * Wrap the clone in ancestor class shells so selectors like
 * `.decoder-image-generator .input .image-container` still match off-screen.
 */
function wrapWithCssScope(node: HTMLElement, scope: string[]): HTMLElement {
  let current: HTMLElement = node;
  for (let i = scope.length - 1; i >= 0; i--) {
    const wrap = document.createElement('div');
    wrap.className = scope[i]!;
    // Shared `.input { margin-bottom: 4rem }` would pad the download.
    if (/(?:^|\s)input(?:\s|$)/.test(wrap.className)) {
      wrap.style.marginBottom = '0';
    }
    wrap.appendChild(current);
    current = wrap;
  }
  return current;
}

/**
 * `html-to-image` often drops stylesheet `fill` on SVG paths (e.g. Verge wordmark
 * color variants). Copy computed fills from the live tree onto the clone.
 */
function bakeSvgFillsFromLive(liveRoot: HTMLElement, cloneRoot: HTMLElement): void {
  const selector =
    'svg path, svg polygon, svg circle, svg rect, svg ellipse, svg line, svg polyline';
  const liveShapes = liveRoot.querySelectorAll(selector);
  const cloneShapes = cloneRoot.querySelectorAll(selector);
  const n = Math.min(liveShapes.length, cloneShapes.length);
  for (let i = 0; i < n; i++) {
    const fill = getComputedStyle(liveShapes[i]!).fill;
    if (fill && fill !== 'none') {
      cloneShapes[i]!.setAttribute('fill', fill);
    }
  }
}

export function useCaptureDownload(fileName: string, options: CaptureOptions = {}) {
  const [state, setState] = useState<CaptureState>('ready');
  const format = options.format ?? 'jpeg';
  const quality = options.quality;
  const pixelRatio = options.pixelRatio;
  const cssScope = options.cssScope;
  const backgroundColor = options.backgroundColor;

  const reset = useCallback(() => {
    setState('ready');
  }, []);

  const capture = useCallback(
    async (
      node: HTMLElement | null,
      runtime?: Pick<CaptureOptions, 'cssScope' | 'backgroundColor'>,
    ) => {
      if (!node) return;
      setState('capturing');
      try {
        // Clone so we can strip selection chrome without mutating live React DOM.
        const clone = node.cloneNode(true) as HTMLElement;
        clone.querySelectorAll('.image-selected, .selected').forEach((el) => {
          el.classList.remove('image-selected', 'selected');
        });
        // Off-screen host required for layout/fonts during capture.
        // Lock the live pixel width — many tools use width:100%, which collapses in an empty host.
        const width = node.offsetWidth;
        const height = node.offsetHeight;
        const host = document.createElement('div');
        host.style.cssText =
          'position:fixed;left:-10000px;top:0;pointer-events:none;opacity:0;z-index:-1;';
        if (width > 0) {
          clone.style.width = `${width}px`;
          clone.style.maxWidth = `${width}px`;
          host.style.width = `${width}px`;
        }
        if (height > 0) {
          clone.style.height = `${height}px`;
        }
        const scope = runtime?.cssScope ?? cssScope;
        const framed = scope?.length ? wrapWithCssScope(clone, scope) : clone;
        host.appendChild(framed);
        document.body.appendChild(host);
        try {
          bakeSvgFillsFromLive(node, clone);
          // Matte from the *live* node — clone may not get root background-color from html-to-image.
          const matte =
            runtime?.backgroundColor ??
            backgroundColor ??
            (format === 'jpeg' ? resolveJpegMatte(node) : undefined);
          // Capture the frame node (not the scope shells) so ancestors only affect CSS matching.
          const dataUrl = await captureNode(clone, {
            format,
            quality,
            pixelRatio,
            backgroundColor: matte,
          });
          downloadDataUrl(dataUrl, fileName);
        } finally {
          host.remove();
        }
        setState('ready');
      } catch (error) {
        console.error('Capture failed', error);
        setState('ready');
      }
    },
    [fileName, format, quality, pixelRatio, cssScope, backgroundColor],
  );

  return { state, capture, reset };
}
