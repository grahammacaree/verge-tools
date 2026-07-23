import type { CSSProperties } from 'react';
import type { MosaicCell, MosaicLayoutState, MosaicNode } from './types';

export function cellInsetStyle(
  state: MosaicLayoutState,
  _node: MosaicNode,
  index: number,
  _siblingCount: number,
  parent?: { direction: 'horizontal' | 'vertical'; ratio: number },
): CSSProperties {
  const gapRem = state.gap / 10;
  const paddingRem = state.padding / 10;

  if (!parent) {
    return { inset: `${paddingRem}rem` };
  }

  const ratio = parent.ratio;
  if (parent.direction === 'horizontal') {
    if (index === 0) {
      return { inset: `0 calc(100% - ${ratio * 100}% + ${gapRem}rem) 0 0` };
    }
    return { inset: `0 0 0 calc(100% - ${(1 - ratio) * 100}% + ${gapRem}rem)` };
  }

  if (index === 0) {
    return { inset: `0 0 calc(100% - ${ratio * 100}% + ${gapRem}rem) 0` };
  }
  return { inset: `calc(100% - ${(1 - ratio) * 100}% + ${gapRem}rem) 0 0 0` };
}

export function cornerRadiusStyle(cell: MosaicCell, width: number, height: number): CSSProperties {
  const min = Math.min(width, height) / 2;
  return {
    borderTopLeftRadius: cell.corners.topLeft ? min : 0,
    borderTopRightRadius: cell.corners.topRight ? min : 0,
    borderBottomLeftRadius: cell.corners.bottomLeft ? min : 0,
    borderBottomRightRadius: cell.corners.bottomRight ? min : 0,
  };
}

export function cellClassName(cell: MosaicCell, selectedId: string | null, layoutLocked: boolean): string {
  const classes = ['upload-image', 'element'];
  if (!layoutLocked) classes.push('selectable');
  if (cell.uploaded) classes.push('uploaded');
  if (cell.id === selectedId) classes.push('selected');
  if (layoutLocked && !cell.uploaded) classes.push('draggable');
  if (cell.corners.topLeft) classes.push('top-left');
  if (cell.corners.topRight) classes.push('top-right');
  if (cell.corners.bottomLeft) classes.push('bottom-left');
  if (cell.corners.bottomRight) classes.push('bottom-right');
  return classes.join(' ');
}

export function containerClassName(state: MosaicLayoutState): string {
  const classes = ['image-container', 'r3x2'];
  if (state.cutout) classes.push('cutout');
  if (state.gap === 0) classes.push('borders');
  if (state.filterClass) classes.push(state.filterClass);
  return classes.join(' ');
}
