import homeMd from '../../content/home.md?raw';
import releaseNotesMd from '../../content/release-notes.md?raw';
import toolsMd from '../../content/tools.md?raw';
import articleScraperTips from '../../content/tips/article-scraper.md?raw';
import decoderTips from '../../content/tips/decoder-image-generator.md?raw';
import installerTips from '../../content/tips/installer-image-generator.md?raw';
import vergeFilterTips from '../../content/tips/verge-filter.md?raw';
import aiLabelTips from '../../content/tips/ai-label.md?raw';
import type { ToolId, ToolMeta } from './tools';

/** Published nav catalog only. Mosaic + Command Line are deprecated (source kept under `src/tools/`). */
const TOOL_IDS: ToolId[] = [
  'article-scraper',
  'decoder-image-generator',
  'installer-image-generator',
  'verge-filter',
  'ai-label',
];

const TIP_SOURCES: Partial<Record<ToolId, string>> = {
  'article-scraper': articleScraperTips,
  'decoder-image-generator': decoderTips,
  'installer-image-generator': installerTips,
  'verge-filter': vergeFilterTips,
  'ai-label': aiLabelTips,
};

export type HomeCopy = {
  title: string;
  paragraphs: string[];
};

/** Keyed strings from `content/tips/<id>.md` (`## key` sections). */
export type TipBag = Record<string, string>;

/** Parse `content/home.md`. */
export function loadHomeCopy(source: string = homeMd): HomeCopy {
  const lines = source.replace(/\r\n/g, '\n').trim().split('\n');
  const titleLine = lines.find((l) => l.startsWith('# '));
  const title = titleLine ? titleLine.replace(/^#\s+/, '').trim() : 'Verge Tools';
  const body = lines
    .filter((l) => !l.startsWith('# '))
    .join('\n')
    .trim()
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
  return { title, paragraphs: body };
}

/** Parse `content/tools.md` into nav catalog entries. */
export function loadTools(source: string = toolsMd): ToolMeta[] {
  const sections = source.replace(/\r\n/g, '\n').split(/^## /m).slice(1);
  const tools: ToolMeta[] = [];

  for (const section of sections) {
    const lines = section.trim().split('\n');
    const label = lines[0]?.trim();
    if (!label) continue;

    const idLine = lines.find((l) => /^id:\s+/.test(l));
    const id = idLine?.replace(/^id:\s+/, '').trim() as ToolId | undefined;
    if (!id || !TOOL_IDS.includes(id)) {
      console.warn(`[content] Skipping tool "${label}" — missing or unknown id`);
      continue;
    }

    const description = lines
      .slice(1)
      .filter((l) => !/^id:\s+/.test(l))
      .join('\n')
      .trim()
      .replace(/\n+/g, ' ');

    tools.push({ id, label, description });
  }

  return tools;
}

/** Parse `content/tips/<tool>.md` — each `## key` becomes `map[key]`. */
export function loadTipBag(source: string): TipBag {
  const map: TipBag = {};
  const sections = source.replace(/\r\n/g, '\n').split(/^## /m).slice(1);
  for (const section of sections) {
    const lines = section.trim().split('\n');
    const key = lines[0]?.trim();
    if (!key) continue;
    map[key] = lines.slice(1).join('\n').trim();
  }
  return map;
}

export function loadReleaseNotesMarkdown(source: string = releaseNotesMd): string {
  return source.trim();
}

export const HOME = loadHomeCopy();
export const CONTENT_TOOLS = loadTools();
export const RELEASE_NOTES_MD = loadReleaseNotesMarkdown();

export const TIPS: Partial<Record<ToolId, TipBag>> = Object.fromEntries(
  Object.entries(TIP_SOURCES).map(([id, src]) => [id, loadTipBag(src)]),
) as Partial<Record<ToolId, TipBag>>;

export function tip(toolId: ToolId, key: string, fallback = ''): string {
  return TIPS[toolId]?.[key] ?? fallback;
}
