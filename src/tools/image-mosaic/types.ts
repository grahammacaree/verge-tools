export type MosaicStep = 'step-1' | 'step-2' | 'step-3' | 'step-4' | 'step-5' | 'step-6';

export type CornerFlags = {
  topLeft: boolean;
  topRight: boolean;
  bottomLeft: boolean;
  bottomRight: boolean;
};

export type MosaicCell = {
  kind: 'cell';
  id: string;
  imageUrl: string | null;
  uploaded: boolean;
  zoom: number;
  objectPosition: string;
  translateX: number;
  translateY: number;
  corners: CornerFlags;
};

export type MosaicSplit = {
  kind: 'split';
  id: string;
  direction: 'horizontal' | 'vertical';
  ratio: number;
  children: [MosaicNode, MosaicNode];
};

export type MosaicNode = MosaicCell | MosaicSplit;

export type MosaicLayoutState = {
  cutout: boolean;
  padding: number;
  gap: number;
  backgroundUrl: string | null;
  filterClass: string | null;
  layoutLocked: boolean;
  selectedId: string | null;
  root: MosaicNode;
};

export type MosaicTemplate = {
  name: string;
  string: string;
};

export const MOSAIC_SAVE_URL =
  'https://script.google.com/macros/s/AKfycbxpH-m7Epyc_v5IRc4XhttImqMTbtysCbR4nGyDJ8zI08-LQWhX7FHy7ivdD7Tg7SYa/exec';

export const MOSAIC_SHEET_ID = '18rx-_14Tkls0zbzCrxC7csF-VDlnQfy2Sxl-9ZGGTAI';

export const MOSAIC_FILTERS = [
  { className: 'cC305A4', label: '#C305A4', color: '#C305A4' },
  { className: 'c66FF75', label: '#66FF75', color: '#66FF75' },
  { className: 'cE90C59', label: '#E90C59', color: '#E90C59' },
  { className: 'gradient', label: 'Gradient', color: 'gradient' },
] as const;

export const MOSAIC_BACKGROUNDS = Array.from({ length: 11 }, (_, i) => {
  const num = String(i + 1).padStart(2, '0');
  return `images/image_background/backgrounds/Background${num}.png`;
});

let idCounter = 0;
export function nextMosaicId(prefix = 'cell'): string {
  idCounter += 1;
  return `${prefix}-${idCounter}`;
}

export function createDefaultCell(): MosaicCell {
  return {
    kind: 'cell',
    id: nextMosaicId(),
    imageUrl: null,
    uploaded: false,
    zoom: 1,
    objectPosition: '50% 50%',
    translateX: 0,
    translateY: 0,
    corners: { topLeft: false, topRight: false, bottomLeft: false, bottomRight: false },
  };
}

export function createInitialLayout(): MosaicLayoutState {
  return {
    cutout: false,
    padding: 15,
    gap: 5,
    backgroundUrl: null,
    filterClass: null,
    layoutLocked: false,
    selectedId: null,
    root: createDefaultCell(),
  };
}
