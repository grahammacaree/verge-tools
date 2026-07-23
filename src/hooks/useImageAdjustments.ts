import { startTransition, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  DEFAULT_ADJUSTMENTS,
  type ImageAdjustments,
  clampPanTranslate,
  coverPanMetrics,
  filterStyle,
  formatObjectPosition,
  parseObjectPosition,
  transformStyle,
} from '../lib/imageAdjust';

type PanMode = 'translate' | 'object';

type PanSession = {
  active: boolean;
  mode: PanMode;
  x: number;
  y: number;
  /** Cover-fitted image size (for overflow math). */
  fitW: number;
  fitH: number;
  /** Overflow along each axis (fit - holder); drag sensitivity. */
  overflowX: number;
  overflowY: number;
  canPanX: boolean;
  canPanY: boolean;
};

export type UseImageAdjustmentsOptions = {
  initial?: Partial<ImageAdjustments>;
  /** Controlled adjustments (e.g. Installer selected slot). */
  value?: ImageAdjustments;
  /** Called whenever adjustments commit (and after pan gestures). */
  onChange?: (next: ImageAdjustments) => void;
  /**
   * Allow zoom-1 cover-crop pan via object-position (needs an `<img>`).
   * Default true. Set false for tools like Verge Filter (SVG meet / no cover pan).
   */
  coverPan?: boolean;
};

function paintMedia(root: HTMLElement | null, next: ImageAdjustments) {
  if (!root) return;
  const transform = transformStyle(next);
  const userFilter = filterStyle(next);

  // Paint only this holder — Decoder main/invert each own a hook and must not lockstep.
  // User B/C on the holder so tool CSS filters on <img> (Decoder) can stack.
  root.style.filter = userFilter;

  const nodes = root.querySelectorAll<HTMLElement>('img, .verge-filter-svg');
  nodes.forEach((el) => {
    el.style.transform = transform;
    // Do not set filter on media — CSS owns the look; holders own user B/C.
    el.style.removeProperty('filter');
    if (el.tagName === 'IMG') {
      el.style.objectPosition = next.objectPosition;
    }
  });
}

function holderSize(el: HTMLElement | null): { width: number; height: number } {
  if (!el) return { width: 0, height: 0 };
  return { width: el.clientWidth, height: el.clientHeight };
}

function syncCoverPanAttr(holder: HTMLElement | null, enabled: boolean) {
  if (!holder) return;
  if (!enabled) {
    holder.dataset.coverPan = '0';
    return;
  }
  const img = holder.querySelector('img');
  if (!img?.naturalWidth) {
    holder.dataset.coverPan = '0';
    return;
  }
  const { canPanX, canPanY } = coverPanMetrics(
    img.naturalWidth,
    img.naturalHeight,
    holder.clientWidth,
    holder.clientHeight,
  );
  holder.dataset.coverPan = canPanX || canPanY ? '1' : '0';
}

function sameAdj(a: ImageAdjustments, b: ImageAdjustments): boolean {
  return (
    a.zoom === b.zoom &&
    a.brightness === b.brightness &&
    a.contrast === b.contrast &&
    a.translateX === b.translateX &&
    a.translateY === b.translateY &&
    a.objectPosition === b.objectPosition
  );
}

export function useImageAdjustments({
  initial,
  value,
  onChange,
  coverPan = true,
}: UseImageAdjustmentsOptions = {}) {
  const controlled = value !== undefined;
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  const coverPanRef = useRef(coverPan);
  coverPanRef.current = coverPan;

  const [uncontrolledAdj, setUncontrolledAdj] = useState<ImageAdjustments>(() => ({
    ...DEFAULT_ADJUSTMENTS,
    ...initial,
  }));
  const adj = controlled ? value : uncontrolledAdj;
  const adjRef = useRef(adj);
  adjRef.current = adj;

  const panRef = useRef<PanSession>({
    active: false,
    mode: 'translate',
    x: 0,
    y: 0,
    fitW: 0,
    fitH: 0,
    overflowX: 0,
    overflowY: 0,
    canPanX: false,
    canPanY: false,
  });
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);
  const rafPaint = useRef(0);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  const paint = useCallback((next: ImageAdjustments = adjRef.current) => {
    paintMedia(nodeRef.current, next);
  }, []);

  const schedulePaint = useCallback(() => {
    if (rafPaint.current) return;
    rafPaint.current = requestAnimationFrame(() => {
      rafPaint.current = 0;
      paint(adjRef.current);
    });
  }, [paint]);

  const withPanClamped = useCallback((next: ImageAdjustments): ImageAdjustments => {
    const { width, height } = holderSize(nodeRef.current);
    const clamped = clampPanTranslate(next.translateX, next.translateY, next.zoom, width, height);
    if (clamped.x === next.translateX && clamped.y === next.translateY) return next;
    return { ...next, translateX: clamped.x, translateY: clamped.y };
  }, []);

  const publish = useCallback(
    (next: ImageAdjustments, { defer = false }: { defer?: boolean } = {}) => {
      adjRef.current = next;
      paint(next);
      onChangeRef.current?.(next);
      if (controlled) return;
      if (defer) {
        startTransition(() => setUncontrolledAdj(next));
      } else {
        setUncontrolledAdj(next);
      }
    },
    [controlled, paint],
  );

  const reclampToHolder = useCallback(() => {
    if (panRef.current.active) return;
    syncCoverPanAttr(nodeRef.current, coverPanRef.current);
    const next = withPanClamped({ ...adjRef.current });
    if (sameAdj(next, adjRef.current)) return;
    publish(next);
  }, [paint, publish, withPanClamped]);

  /** Callback ref — observes holder size so pan clamps when the box resizes (ratio, mosaic count, …). */
  const elementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (nodeRef.current === node) return;

      resizeObserverRef.current?.disconnect();
      resizeObserverRef.current = null;
      nodeRef.current = node;

      if (!node) return;

      const ro = new ResizeObserver(() => {
        reclampToHolder();
      });
      resizeObserverRef.current = ro;
      ro.observe(node);
      const onImgLoad = () => {
        syncCoverPanAttr(node, coverPanRef.current);
        paint(adjRef.current);
      };
      node.querySelectorAll('img').forEach((img) => {
        img.addEventListener('load', onImgLoad);
        if (img.complete) onImgLoad();
      });
      requestAnimationFrame(() => {
        paint(adjRef.current);
        reclampToHolder();
      });
    },
    [paint, reclampToHolder],
  );

  useLayoutEffect(() => {
    if (panRef.current.active) return;
    paint(adj);
    syncCoverPanAttr(nodeRef.current, coverPanRef.current);
  }, [adj, paint]);

  useEffect(
    () => () => {
      if (rafPaint.current) cancelAnimationFrame(rafPaint.current);
      resizeObserverRef.current?.disconnect();
    },
    [],
  );

  const commitVisual = useCallback(
    (patch: Partial<ImageAdjustments>) => {
      const next = withPanClamped({ ...adjRef.current, ...patch });
      publish(next, { defer: true });
    },
    [publish, withPanClamped],
  );

  const setZoom = useCallback((zoom: number) => commitVisual({ zoom }), [commitVisual]);
  const setBrightness = useCallback(
    (brightness: number) => commitVisual({ brightness }),
    [commitVisual],
  );
  const setContrast = useCallback((contrast: number) => commitVisual({ contrast }), [commitVisual]);

  const setObjectPosition = useCallback(
    (objectPosition: string) => {
      publish({ ...adjRef.current, objectPosition });
    },
    [publish],
  );

  const reset = useCallback(() => {
    publish({ ...DEFAULT_ADJUSTMENTS, ...initial });
  }, [initial, publish]);

  const beginPan = useCallback(
    (
      event: React.PointerEvent<HTMLElement>,
      mode: PanMode,
      metrics?: {
        fitW: number;
        fitH: number;
        overflowX: number;
        overflowY: number;
        canPanX: boolean;
        canPanY: boolean;
      },
    ) => {
      const el = nodeRef.current;
      if (!el) return;
      panRef.current = {
        active: true,
        mode,
        x: event.clientX,
        y: event.clientY,
        fitW: metrics?.fitW ?? 0,
        fitH: metrics?.fitH ?? 0,
        overflowX: metrics?.overflowX ?? 0,
        overflowY: metrics?.overflowY ?? 0,
        canPanX: metrics?.canPanX ?? false,
        canPanY: metrics?.canPanY ?? false,
      };
      el.classList.add('is-panning');
      el.setPointerCapture(event.pointerId);
    },
    [],
  );

  const onPointerDown = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      event.preventDefault();
      const el = nodeRef.current;
      if (!el) return;

      if (adjRef.current.zoom > 1) {
        beginPan(event, 'translate');
        return;
      }

      // Zoom-1 cover pan (object-position) — opt out via coverPan: false (e.g. Verge Filter SVG).
      if (!coverPanRef.current) return;

      const img = el.querySelector('img');
      if (!img?.naturalWidth) return;
      const metrics = coverPanMetrics(
        img.naturalWidth,
        img.naturalHeight,
        el.clientWidth,
        el.clientHeight,
      );
      syncCoverPanAttr(el, true);
      if (!metrics.canPanX && !metrics.canPanY) return;
      beginPan(event, 'object', {
        fitW: metrics.fitW,
        fitH: metrics.fitH,
        overflowX: Math.max(0, metrics.fitW - el.clientWidth),
        overflowY: Math.max(0, metrics.fitH - el.clientHeight),
        canPanX: metrics.canPanX,
        canPanY: metrics.canPanY,
      });
    },
    [beginPan],
  );

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (!panRef.current.active) return;
      event.preventDefault();
      const session = panRef.current;
      const dx = event.clientX - session.x;
      const dy = event.clientY - session.y;
      session.x = event.clientX;
      session.y = event.clientY;

      if (session.mode === 'translate') {
        const zoom = adjRef.current.zoom;
        adjRef.current = {
          ...adjRef.current,
          translateX: adjRef.current.translateX + dx / ((zoom + 1) / 2),
          translateY: adjRef.current.translateY + dy / ((zoom + 1) / 2),
        };
        schedulePaint();
        return;
      }

      // object-position: full 0–1 range maps to the overflow distance, not the fitted size.
      const pos = parseObjectPosition(adjRef.current.objectPosition);
      if (session.canPanX && session.overflowX > 0) {
        pos.x -= dx / session.overflowX;
      }
      if (session.canPanY && session.overflowY > 0) {
        pos.y -= dy / session.overflowY;
      }
      adjRef.current = {
        ...adjRef.current,
        objectPosition: formatObjectPosition(pos.x, pos.y),
      };
      schedulePaint();
    },
    [schedulePaint],
  );

  const endPan = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (!panRef.current.active) return;
      const mode = panRef.current.mode;
      panRef.current.active = false;
      nodeRef.current?.classList.remove('is-panning');
      try {
        event.currentTarget.releasePointerCapture(event.pointerId);
      } catch {
        // ignore
      }
      const next =
        mode === 'translate' ? withPanClamped({ ...adjRef.current }) : { ...adjRef.current };
      publish(next);
    },
    [publish, withPanClamped],
  );

  const commitAdj = useCallback(
    (update: ImageAdjustments | ((prev: ImageAdjustments) => ImageAdjustments)) => {
      const next = typeof update === 'function' ? update(adjRef.current) : update;
      publish(next);
    },
    [publish],
  );

  return {
    adj,
    setAdj: commitAdj,
    setZoom,
    setBrightness,
    setContrast,
    setObjectPosition,
    reset,
    reclampToHolder,
    elementRef,
    containerRef,
    transform: transformStyle(adj),
    filter: filterStyle(adj),
    pointerHandlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp: endPan,
      onPointerCancel: endPan,
    },
  };
}
