import { useLayoutEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from 'react';
import { assetUrl } from '../../lib/assetUrl';
import { filterStyle, transformStyle } from '../../lib/imageAdjust';
import { cellClassName, cellInsetStyle, containerClassName, cornerRadiusStyle } from './layout';
import { containsId, findAncestorSplits } from './treeOps';
import type { MosaicCell, MosaicLayoutState, MosaicNode, MosaicSplit } from './types';

type Props = {
  state: MosaicLayoutState;
  onSelectCell: (id: string) => void;
  onDropFile: (cellId: string, file: File) => void;
  onSplitRatioChange?: (splitId: string, ratio: number) => void;
  onUpdateCell?: (id: string, patch: Partial<MosaicCell>) => void;
};

function CellView({
  cell,
  state,
  inset,
  onSelect,
  onDropFile,
  onUpdateCell,
}: {
  cell: MosaicCell;
  state: MosaicLayoutState;
  inset: CSSProperties;
  onSelect: () => void;
  onDropFile: (file: File) => void;
  onUpdateCell?: (id: string, patch: Partial<MosaicCell>) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [coverOrient, setCoverOrient] = useState<'horizontal' | 'vertical' | null>(null);
  const panRef = useRef<{ active: boolean; x: number; y: number }>({ active: false, x: 0, y: 0 });
  const live = useRef(cell);
  live.current = cell;

  const imgSrc = cell.imageUrl ?? assetUrl('images/placeholder.png');
  const adj = {
    zoom: cell.zoom,
    brightness: 100,
    contrast: 100,
    translateX: cell.translateX,
    translateY: cell.translateY,
    objectPosition: cell.objectPosition,
  };

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setSize({ w: el.offsetWidth, h: el.offsetHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useLayoutEffect(() => {
    if (!size.w || !size.h) return;
    const img = innerRef.current?.querySelector('img');
    if (!img?.naturalWidth) return;
    const imageAspect = img.naturalWidth / img.naturalHeight;
    const cellAspect = size.w / size.h;
    setCoverOrient(imageAspect <= cellAspect ? 'vertical' : 'horizontal');
  }, [size.w, size.h, imgSrc, cell.uploaded]);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!cell.uploaded || !onUpdateCell) return;
    event.preventDefault();
    event.stopPropagation();
    onSelect();

    if (cell.zoom > 1) {
      panRef.current = { active: true, x: event.clientX, y: event.clientY };
      event.currentTarget.setPointerCapture(event.pointerId);
      return;
    }

    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const img = target.querySelector('img');
    if (!img || !img.naturalWidth) return;

    const parts = cell.objectPosition.split(' ');
    let xPos = parts.length > 1 ? parseFloat(parts[0]) / 100 : 0.5;
    let yPos = parts.length > 1 ? parseFloat(parts[1]) / 100 : 0.5;

    if (img.naturalWidth / img.naturalHeight > target.offsetWidth / target.offsetHeight) {
      const width = (img.naturalWidth * target.offsetHeight) / img.naturalHeight;
      xPos = Math.min(1, Math.max(0, xPos + (x - target.offsetWidth / 2) / width));
    } else {
      const height = (img.naturalHeight * target.offsetWidth) / img.naturalWidth;
      yPos = Math.min(1, Math.max(0, yPos + (y - target.offsetHeight / 2) / height));
    }
    onUpdateCell(cell.id, { objectPosition: `${xPos * 100}% ${yPos * 100}%` });
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!panRef.current.active || !onUpdateCell) return;
    event.preventDefault();
    const c = live.current;
    const dx = (event.clientX - panRef.current.x) / ((c.zoom + 1) / 2);
    const dy = (event.clientY - panRef.current.y) / ((c.zoom + 1) / 2);
    panRef.current.x = event.clientX;
    panRef.current.y = event.clientY;
    onUpdateCell(c.id, {
      translateX: c.translateX + dx,
      translateY: c.translateY + dy,
    });
  };

  const endPan = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!panRef.current.active || !onUpdateCell) return;
    panRef.current.active = false;
    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      // ignore
    }
    const el = innerRef.current?.querySelector('img');
    const container = innerRef.current;
    if (!el || !container) return;
    const c = live.current;
    const rect = el.getBoundingClientRect();
    const cont = container.getBoundingClientRect();
    let x = c.translateX;
    let y = c.translateY;
    if (rect.top > cont.top) y += cont.top - rect.top;
    if (rect.left > cont.left) x += cont.left - rect.left;
    if (rect.right < cont.right) x += cont.right - rect.right;
    if (rect.bottom < cont.bottom) y += cont.bottom - rect.bottom;
    onUpdateCell(c.id, { translateX: x, translateY: y });
  };

  return (
    <div
      className={cellClassName(cell, state.selectedId, state.layoutLocked)}
      style={{
        ...inset,
        position: 'absolute',
        ...(size.w > 0 ? cornerRadiusStyle(cell, size.w, size.h) : {}),
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onDragOver={(e) => {
        if (state.layoutLocked && !cell.uploaded) e.preventDefault();
      }}
      onDrop={(e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) onDropFile(file);
      }}
      ref={ref}
    >
      <div
        ref={innerRef}
        className={`inner-container${cell.uploaded ? ' uploaded' : ''}${cell.uploaded ? ' pannable zooming' : ''}${coverOrient ? ` ${coverOrient}` : ''}`}
        data-zoom={cell.zoom}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endPan}
        onPointerCancel={endPan}
      >
        <img
          id={`mosaic-${cell.id}`}
          src={imgSrc}
          alt=""
          onLoad={() => {
            if (!size.w || !size.h) return;
            const img = innerRef.current?.querySelector('img');
            if (!img?.naturalWidth) return;
            const imageAspect = img.naturalWidth / img.naturalHeight;
            const cellAspect = size.w / size.h;
            setCoverOrient(imageAspect <= cellAspect ? 'vertical' : 'horizontal');
          }}
          style={{
            objectPosition: cell.objectPosition,
            transform: transformStyle(adj),
            filter: filterStyle(adj),
          }}
          draggable={false}
        />
      </div>
    </div>
  );
}

function ResizeHandle({
  split,
  onSplitRatioChange,
}: {
  split: MosaicSplit;
  onSplitRatioChange?: (splitId: string, ratio: number) => void;
}) {
  const [draft, setDraft] = useState(String(Math.round(split.ratio * 100)));
  const dragging = useRef(false);

  useLayoutEffect(() => {
    if (!dragging.current) setDraft(String(Math.round(split.ratio * 100)));
  }, [split.ratio]);

  const commit = (raw: string) => {
    const n = Number(raw);
    if (!Number.isFinite(n)) {
      setDraft(String(Math.round(split.ratio * 100)));
      return;
    }
    onSplitRatioChange?.(split.id, n / 100);
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!onSplitRatioChange) return;
    event.preventDefault();
    event.stopPropagation();
    dragging.current = true;
    const parent = event.currentTarget.parentElement;
    if (!parent) return;

    const move = (ev: PointerEvent) => {
      const rect = parent.getBoundingClientRect();
      let ratio =
        split.direction === 'horizontal'
          ? (ev.clientX - rect.left) / rect.width
          : (ev.clientY - rect.top) / rect.height;
      ratio = Math.min(0.95, Math.max(0.05, ratio));
      setDraft(String(Math.round(ratio * 100)));
      onSplitRatioChange(split.id, ratio);
    };
    const up = () => {
      dragging.current = false;
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  return (
    <div
      className="resize"
      style={
        split.direction === 'horizontal'
          ? { left: `calc(${split.ratio * 100}%)` }
          : { top: `calc(${split.ratio * 100}%)` }
      }
      onPointerDown={onPointerDown}
    >
      <input
        type="text"
        value={draft}
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={() => commit(draft)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') commit(draft);
        }}
      />
    </div>
  );
}

export function MosaicCanvas({ state, onSelectCell, onDropFile, onSplitRatioChange, onUpdateCell }: Props) {
  const ancestors =
    state.selectedId && !state.layoutLocked ? findAncestorSplits(state.root, state.selectedId) : [];
  const ancestorIds = new Set(ancestors.map((s) => s.id));

  const renderNode = (
    node: MosaicNode,
    parent: { direction: 'horizontal' | 'vertical'; ratio: number; id: string } | undefined,
    index: number,
    siblingCount: number,
  ): React.ReactNode => {
    if (node.kind === 'cell') {
      return (
        <CellView
          key={node.id}
          cell={node}
          state={state}
          inset={cellInsetStyle(state, node, index, siblingCount, parent)}
          onSelect={() => onSelectCell(node.id)}
          onDropFile={(file) => onDropFile(node.id, file)}
          onUpdateCell={onUpdateCell}
        />
      );
    }

    const highlighted = Boolean(state.selectedId && containsId(node, state.selectedId));
    return (
      <div
        key={node.id}
        className={`split-wrapper element ${node.direction}${highlighted ? ' highlight' : ''}`}
        data-x={node.direction === 'horizontal' ? node.ratio : undefined}
        data-y={node.direction === 'vertical' ? node.ratio : undefined}
        style={cellInsetStyle(state, node, index, siblingCount, parent)}
      >
        {node.children.map((child, i) =>
          renderNode(child, { direction: node.direction, ratio: node.ratio, id: node.id }, i, node.children.length),
        )}
        {ancestorIds.has(node.id) ? (
          <ResizeHandle split={node} onSplitRatioChange={onSplitRatioChange} />
        ) : null}
      </div>
    );
  };

  return (
    <div className="capture background" id="image-background-capture">
      <div className={containerClassName(state)} id="background-field">
        {state.backgroundUrl ? (
          <div className="background-container" style={{ backgroundImage: `url(${state.backgroundUrl})` }} />
        ) : (
          <div className="background-container" />
        )}
        {renderNode(state.root, undefined, 0, 1)}
      </div>
    </div>
  );
}
