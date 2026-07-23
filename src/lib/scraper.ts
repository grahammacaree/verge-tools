const STRIP_TAGS = /(<([^>]+)>)/gi;

export function stripHtml(html: string): string {
  return html.replace(STRIP_TAGS, '');
}

export type VergeArticle = {
  headline: string;
  credit: string;
  date: string;
  bylines: string[];
  eyebrows: string[];
  imageUrl: string | null;
};

function metaContent(doc: Document, property: string): string | null {
  const el =
    doc.querySelector(`meta[property="${property}"]`) ??
    doc.querySelector(`meta[name="${property}"]`);
  return el?.getAttribute('content')?.trim() || null;
}

/** Eyebrow-ish label from the first non-numeric path segment (`/transportation/…` → Transportation). */
export function eyebrowFromUrl(url: string): string {
  try {
    const first = new URL(url).pathname.split('/').filter(Boolean)[0];
    if (!first || /^\d+$/.test(first)) return '';
    return first
      .split('-')
      .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1) : w))
      .join(' ');
  } catch {
    return '';
  }
}

export function formatArticleDate(isoOrDisplay: string): string {
  const parsed = new Date(isoOrDisplay);
  if (Number.isNaN(parsed.getTime())) return isoOrDisplay;
  return parsed.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function parseVergeArticle(html: string, pageUrl?: string): VergeArticle {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  const hedEl = doc.querySelector('article .duet--article--lede h1') ?? doc.querySelector('h1');
  const headline = hedEl ? stripHtml(hedEl.innerHTML).trim() : metaContent(doc, 'og:title') ?? '';

  let credit = '';
  const creditEl = doc.querySelector('article .duet--media--caption cite');
  if (creditEl) {
    credit = stripHtml(creditEl.innerHTML).replace(/\|\s*/g, '').trim();
  }

  let date = '';
  const timeEl = doc.querySelector('article .duet--article--timestamp time');
  if (timeEl) {
    date = stripHtml(timeEl.innerHTML).split(',').slice(0, 2).join(',').trim();
  } else {
    const published = metaContent(doc, 'article:published_time');
    if (published) date = formatArticleDate(published);
  }

  // Authors are no longer plain `<a>` tags — prefer follow-author chips, then links.
  const bylineRoot = doc.querySelector('article .duet--article--article-byline');
  let bylines: string[] = [];
  if (bylineRoot) {
    bylines = Array.from(bylineRoot.querySelectorAll('[id^="follow-author"]'))
      .map((el) => {
        const clone = el.cloneNode(true) as HTMLElement;
        clone.querySelectorAll('svg, aside, button').forEach((n) => n.remove());
        return stripHtml(clone.innerHTML).replace(/^by\s+/i, '').trim();
      })
      .filter(Boolean);
    if (bylines.length === 0) {
      bylines = Array.from(bylineRoot.querySelectorAll('a'))
        .map((el) => stripHtml(el.innerHTML).trim())
        .filter(Boolean);
    }
  }

  // Category breadcrumbs only — not every button in the lede (those include “Follow” CTAs).
  let eyebrows = Array.from(
    doc.querySelectorAll('article .duet--article--lede [id^="follow-category-breadcrumb-"] > button'),
  )
    .map((el) => {
      const clone = el.cloneNode(true) as HTMLElement;
      clone.querySelectorAll('svg, aside').forEach((n) => n.remove());
      return stripHtml(clone.innerHTML)
        .replace(/\bFollow\b/gi, '')
        .replace(/\s+/g, ' ')
        .trim();
    })
    .filter((label) => label.length > 0 && !/^follow$/i.test(label));

  // Dedupe (lede can render the same chip more than once).
  const seenEyebrow = new Set<string>();
  eyebrows = eyebrows.filter((label) => {
    const key = label.toLowerCase();
    if (seenEyebrow.has(key)) return false;
    seenEyebrow.add(key);
    return true;
  });

  if (eyebrows.length === 0) {
    eyebrows = Array.from(doc.querySelectorAll('article .duet--article--lede ul li a'))
      .map((el) => stripHtml(el.innerHTML).trim())
      .filter((label) => label.length > 0 && !/^follow$/i.test(label));
  }

  if (eyebrows.length === 0 && pageUrl) {
    const fromPath = eyebrowFromUrl(pageUrl);
    if (fromPath) eyebrows = [fromPath];
  }

  // Lede image class renamed; prefer og:image over author avatars in the lede.
  const imageUrl =
    metaContent(doc, 'og:image') ??
    doc
      .querySelector('article .duet--article--lede img[src*="wp-content/uploads"]:not([src*="author_profile"])')
      ?.getAttribute('src') ??
    null;

  return { headline, credit, date, bylines, eyebrows, imageUrl };
}

async function fetchArticleHtmlDirect(url: string): Promise<string> {
  const parsed = new URL(url);
  parsed.searchParams.set('csk', '1');
  const response = await fetch(parsed.toString());
  if (!response.ok) {
    throw new Error(`Failed to fetch article (${response.status})`);
  }
  return response.text();
}

type MicrolinkPayload = {
  status?: string;
  data?: {
    title?: string;
    author?: string;
    date?: string;
    description?: string;
    image?: { url?: string } | string;
  };
};

/** CORS-friendly metadata fallback (direct theverge.com fetches are blocked in the browser). */
async function fetchArticleViaMicrolink(url: string): Promise<VergeArticle> {
  const endpoint = new URL('https://api.microlink.io/');
  endpoint.searchParams.set('url', url);
  const response = await fetch(endpoint.toString());
  if (!response.ok) {
    throw new Error(`Preview fetch failed (${response.status})`);
  }
  const payload = (await response.json()) as MicrolinkPayload;
  if (payload.status && payload.status !== 'success') {
    throw new Error('Could not read that Verge URL');
  }
  const data = payload.data ?? {};
  const image =
    typeof data.image === 'string' ? data.image : data.image?.url ?? null;
  const author = data.author?.trim();
  const fromPath = eyebrowFromUrl(url);

  return {
    headline: data.title?.trim() ?? '',
    credit: '',
    date: data.date ? formatArticleDate(data.date) : '',
    bylines: author ? [author] : [],
    eyebrows: fromPath ? [fromPath] : [],
    imageUrl: image,
  };
}

/**
 * Load a Verge article for the scraper.
 * Tries a direct HTML fetch first (works if CORS ever opens / same-site), then Microlink metadata.
 */
export async function fetchVergeArticle(url: string): Promise<VergeArticle> {
  const parsed = new URL(url);
  if (!/(^|\.)theverge\.com$/i.test(parsed.hostname)) {
    throw new Error('Only theverge.com URLs are supported');
  }
  const canonical = parsed.toString();

  try {
    const html = await fetchArticleHtmlDirect(canonical);
    const article = parseVergeArticle(html, canonical);
    if (article.headline) return article;
  } catch {
    // Expected from GitHub Pages / localhost — Verge does not send ACAO.
  }

  const article = await fetchArticleViaMicrolink(canonical);
  if (!article.headline) {
    throw new Error('Could not read that Verge URL');
  }
  return article;
}

/** @deprecated Prefer `fetchVergeArticle` — kept for callers that only need HTML. */
export async function fetchArticleHtml(url: string): Promise<string> {
  return fetchArticleHtmlDirect(url);
}

/** Fetch a remote image and return a blob object URL (helps with some CDN CORS cases). */
export async function imageUrlToObjectUrl(imageUrl: string): Promise<string> {
  const response = await fetch(imageUrl);
  if (!response.ok) {
    throw new Error(`Image fetch failed (${response.status})`);
  }
  const blob = await response.blob();
  return URL.createObjectURL(blob);
}

export function formatBylines(bylines: string[]): string {
  if (bylines.length === 0) return '';
  if (bylines.length === 1) return bylines[0]!;
  if (bylines.length === 2) return `${bylines[0]} and ${bylines[1]}`;
  if (bylines.length === 3) return `${bylines[0]}, ${bylines[1]} and ${bylines[2]}`;
  return `${bylines[0]}, ${bylines[1]} and ${bylines.length - 2} others`;
}

export function formatEyebrows(eyebrows: string[]): string {
  return eyebrows.join(' / ');
}
