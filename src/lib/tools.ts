import { CONTENT_TOOLS } from './content';

export type ToolId =
  | 'title'
  | 'article-scraper'
  | 'decoder-image-generator'
  /** @deprecated Not in published nav; source kept under `src/tools/command-line`. */
  | 'command-line-image-generator'
  | 'installer-image-generator'
  | 'verge-filter'
  | 'ai-label'
  /** @deprecated Not in published nav; source kept under `src/tools/image-mosaic`. */
  | 'image-mosaic'
  | 'release-notes';

export type ToolMeta = {
  id: ToolId;
  label: string;
  description: string;
};

/** Catalog from `content/tools.md` (order = nav / home grid order). */
export const TOOLS: ToolMeta[] = CONTENT_TOOLS;

export const VALID_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const;

export function isValidImageFile(file: File): boolean {
  return (VALID_IMAGE_TYPES as readonly string[]).includes(file.type);
}
