import { TOOLS, type ToolId } from './tools';

/** All addressable segments — do not depend on content catalog parse alone. */
const ROUTE_IDS = new Set<string>([
  'release-notes',
  'article-scraper',
  'decoder-image-generator',
  'command-line-image-generator',
  'installer-image-generator',
  'verge-filter',
  'ai-label',
  'image-mosaic',
  ...TOOLS.map((t) => t.id),
]);

function normalizePath(path: string): string {
  if (!path || path === '/') return '/';
  return path.replace(/\/+$/, '') || '/';
}

/** Pathname relative to `import.meta.env.BASE_URL`, no leading/trailing slash. */
export function pathSegment(pathname = window.location.pathname): string {
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
  let path = pathname;
  if (base && (path === base || path.startsWith(`${base}/`))) {
    path = path.slice(base.length);
  }
  return path.replace(/^\/+|\/+$/g, '');
}

export function pathToToolId(pathname = window.location.pathname): ToolId {
  const segment = pathSegment(pathname);
  if (!segment) return 'title';
  if (ROUTE_IDS.has(segment)) return segment as ToolId;
  return 'title';
}

export function toolIdToPath(id: ToolId): string {
  const base = import.meta.env.BASE_URL || '/';
  if (id === 'title') return base;
  return `${base}${id}`;
}

export function navigateToTool(id: ToolId, mode: 'push' | 'replace' = 'push'): void {
  const next = toolIdToPath(id);
  const nextPath = new URL(next, window.location.origin).pathname;
  // Skip only when URL already names this tool (trailing-slash tolerant).
  if (pathToToolId() === id && normalizePath(window.location.pathname) === normalizePath(nextPath)) {
    return;
  }
  if (mode === 'replace') {
    window.history.replaceState({ tool: id }, '', next);
  } else {
    window.history.pushState({ tool: id }, '', next);
  }
}
