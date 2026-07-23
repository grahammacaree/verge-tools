import {
  createDefaultCell,
  createInitialLayout,
  nextMosaicId,
  type CornerFlags,
  type MosaicCell,
  type MosaicLayoutState,
  type MosaicNode,
  type MosaicSplit,
} from './types';

function cloneCell(cell: MosaicCell): MosaicCell {
  return {
    ...cell,
    id: nextMosaicId(),
    corners: { ...cell.corners },
  };
}

function mapNode(node: MosaicNode, id: string, fn: (n: MosaicNode) => MosaicNode): MosaicNode {
  if (node.id === id) return fn(node);
  if (node.kind === 'split') {
    return {
      ...node,
      children: [mapNode(node.children[0], id, fn), mapNode(node.children[1], id, fn)],
    };
  }
  return node;
}

export function findNode(root: MosaicNode, id: string): MosaicNode | null {
  if (root.id === id) return root;
  if (root.kind === 'split') {
    return findNode(root.children[0], id) ?? findNode(root.children[1], id);
  }
  return null;
}

export function findParent(root: MosaicNode, id: string): MosaicSplit | null {
  if (root.kind !== 'split') return null;
  if (root.children[0].id === id || root.children[1].id === id) return root;
  return findParent(root.children[0], id) ?? findParent(root.children[1], id);
}

/** All ancestor splits from root down to the parent of `id` (outer → inner). */
export function findAncestorSplits(root: MosaicNode, id: string): MosaicSplit[] {
  const path: MosaicSplit[] = [];
  const walk = (node: MosaicNode): boolean => {
    if (node.id === id) return true;
    if (node.kind !== 'split') return false;
    if (walk(node.children[0]) || walk(node.children[1])) {
      path.unshift(node);
      return true;
    }
    return false;
  };
  walk(root);
  return path;
}

export function containsId(node: MosaicNode, id: string): boolean {
  if (node.id === id) return true;
  if (node.kind === 'split') {
    return containsId(node.children[0], id) || containsId(node.children[1], id);
  }
  return false;
}

export function allCells(node: MosaicNode): MosaicCell[] {
  if (node.kind === 'cell') return [node];
  return [...allCells(node.children[0]), ...allCells(node.children[1])];
}

export function splitCell(state: MosaicLayoutState, direction: 'horizontal' | 'vertical'): MosaicLayoutState {
  const selectedId = state.selectedId ?? (state.root.kind === 'cell' ? state.root.id : null);
  if (!selectedId) return state;
  const target = findNode(state.root, selectedId);
  if (!target || target.kind !== 'cell') return state;

  const left = cloneCell(target);
  left.imageUrl = target.imageUrl;
  left.uploaded = target.uploaded;
  left.zoom = target.zoom;
  left.objectPosition = target.objectPosition;
  left.translateX = target.translateX;
  left.translateY = target.translateY;
  left.corners = { ...target.corners };
  const right = createDefaultCell();

  const split: MosaicSplit = {
    kind: 'split',
    id: nextMosaicId('split'),
    direction,
    ratio: 0.5,
    children: [left, right],
  };

  return {
    ...state,
    root: mapNode(state.root, selectedId, () => split),
    selectedId: left.id,
  };
}

export function mergeCell(state: MosaicLayoutState): MosaicLayoutState {
  let selectedId = state.selectedId;
  let parent = selectedId ? findParent(state.root, selectedId) : null;

  // Legacy: if nothing selected but root is a single split, merge that.
  if (!parent && state.root.kind === 'split') {
    parent = state.root;
    selectedId = parent.children[0].kind === 'cell' ? parent.children[0].id : allCells(parent)[0]?.id ?? null;
  }
  if (!parent || !selectedId) return state;

  // Prefer the selected leaf (or first leaf under selected side); legacy always kept an upload-image leaf.
  const preferred =
    parent.children[0].id === selectedId || containsId(parent.children[0], selectedId)
      ? parent.children[0]
      : parent.children[1];

  const survivingLeaf =
    preferred.kind === 'cell' ? preferred : (allCells(preferred)[0] ?? createDefaultCell());

  return {
    ...state,
    root: mapNode(state.root, parent.id, () => survivingLeaf),
    selectedId: survivingLeaf.id,
  };
}

export function updateCell(
  state: MosaicLayoutState,
  id: string,
  patch: Partial<MosaicCell>,
): MosaicLayoutState {
  return {
    ...state,
    root: mapNode(state.root, id, (node) => {
      if (node.kind !== 'cell') return node;
      return { ...node, ...patch, corners: patch.corners ?? node.corners };
    }),
  };
}

export function updateSplitRatio(state: MosaicLayoutState, splitId: string, ratio: number): MosaicLayoutState {
  const clamped = Math.min(0.95, Math.max(0.05, ratio));
  return {
    ...state,
    root: mapNode(state.root, splitId, (node) => {
      if (node.kind !== 'split') return node;
      return { ...node, ratio: clamped };
    }),
  };
}

export function toggleCorner(
  state: MosaicLayoutState,
  corner: keyof CornerFlags,
): MosaicLayoutState {
  const id = state.selectedId ?? (state.root.kind === 'cell' ? state.root.id : null);
  if (!id) return state;
  const cell = findNode(state.root, id);
  if (!cell || cell.kind !== 'cell') return state;
  return updateCell(state, id, {
    corners: { ...cell.corners, [corner]: !cell.corners[corner] },
  });
}

export function canMerge(state: MosaicLayoutState): boolean {
  if (state.selectedId && findParent(state.root, state.selectedId)) return true;
  return state.root.kind === 'split';
}

export function replaceRootFromHtml(state: MosaicLayoutState, html: string): MosaicLayoutState {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const display = doc.querySelector('.template-display, .image-container');
  if (!display) return state;

  const parseElement = (el: Element): MosaicNode | null => {
    if (el.classList.contains('split-wrapper')) {
      const direction = el.classList.contains('horizontal') ? 'horizontal' : 'vertical';
      const ratioAttr = el.getAttribute('data-x') ?? el.getAttribute('data-y');
      const ratio = ratioAttr ? parseFloat(ratioAttr) : 0.5;
      const children = Array.from(el.querySelectorAll(':scope > .element'))
        .map(parseElement)
        .filter((n): n is MosaicNode => n !== null);
      if (children.length < 2) {
        return children[0] ?? createDefaultCell();
      }
      return {
        kind: 'split',
        id: nextMosaicId('split'),
        direction,
        ratio: Number.isFinite(ratio) ? ratio : 0.5,
        children: [children[0], children[1]],
      };
    }

    const cell = createDefaultCell();
    const img = el.querySelector('img');
    if (img?.getAttribute('src')) {
      cell.imageUrl = img.getAttribute('src');
      cell.uploaded = !img.getAttribute('src')?.includes('placeholder');
    }
    cell.corners = {
      topLeft: el.classList.contains('top-left'),
      topRight: el.classList.contains('top-right'),
      bottomLeft: el.classList.contains('bottom-left'),
      bottomRight: el.classList.contains('bottom-right'),
    };
    return cell;
  };

  const elements = Array.from(display.querySelectorAll(':scope > .element'));
  let root: MosaicNode = state.root;
  if (elements.length === 1) {
    root = parseElement(elements[0]) ?? createDefaultCell();
  }

  const cutout = display.classList.contains('cutout');
  return {
    ...createInitialLayout(),
    cutout,
    layoutLocked: true,
    root,
    selectedId: root.kind === 'cell' ? root.id : (allCells(root)[0]?.id ?? null),
  };
}
