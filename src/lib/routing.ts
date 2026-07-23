import { TOOLS, type ToolId } from './tools';

const ROUTE_IDS = new Set<string>([
  'release-notes',
  ...TOOLS.map((t) => t.id),
  // Deprecated tools still deep-linkable if revived in the URL bar.
  'command-line-image-generator',
  'image-mosaic',
]);

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
  const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  const nextFull = new URL(next, window.location.origin);
  const nextStr = `${nextFull.pathname}${nextFull.search}${nextFull.hash}`;
  if (current === nextStr) return;
  if (mode === 'replace') {
    window.history.replaceState({ tool: id }, '', next);
  } else {
    window.history.pushState({ tool: id }, '', next);
  }
}
