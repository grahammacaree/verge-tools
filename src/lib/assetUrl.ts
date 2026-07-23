/** Resolve a path under `public/` with the Vite base URL (`/verge-tools/`). */
export function assetUrl(path: string): string {
  const base = import.meta.env.BASE_URL;
  const normalized = path.replace(/^\//, '');
  return `${base}${normalized}`;
}
