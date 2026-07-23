import { VALID_IMAGE_TYPES } from './tools';

function fileNameFromUrl(imageUrl: string, mime: string): string {
  try {
    const base = new URL(imageUrl).pathname.split('/').filter(Boolean).pop();
    if (base && /\.(jpe?g|png|webp)$/i.test(base)) return base;
  } catch {
    /* ignore */
  }
  const ext =
    mime === 'image/png' ? 'png' : mime === 'image/webp' ? 'webp' : 'jpg';
  return `image.${ext}`;
}

function guessMimeFromUrl(href: string): string {
  const path = href.toLowerCase();
  if (path.includes('.png')) return 'image/png';
  if (path.includes('.webp')) return 'image/webp';
  if (path.includes('.jpg') || path.includes('.jpeg')) return 'image/jpeg';
  return '';
}

/** Fetch a remote image as a `File` (jpeg/png/webp) for the shared ingest path. */
export async function fileFromImageUrl(imageUrl: string): Promise<File> {
  const trimmed = imageUrl.trim();
  if (!trimmed) throw new Error('Enter an image URL');

  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    throw new Error('That does not look like a URL');
  }
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    throw new Error('Only http(s) image URLs are supported');
  }

  let response: Response;
  try {
    response = await fetch(parsed.href);
  } catch {
    throw new Error('Could not load that URL (blocked or offline)');
  }
  if (!response.ok) {
    throw new Error(`Image fetch failed (${response.status})`);
  }

  const blob = await response.blob();
  if (blob.size === 0) {
    throw new Error('That URL returned an empty file');
  }

  let mime = blob.type;
  if (!(VALID_IMAGE_TYPES as readonly string[]).includes(mime)) {
    mime = guessMimeFromUrl(parsed.href);
  }
  if (!(VALID_IMAGE_TYPES as readonly string[]).includes(mime)) {
    throw new Error('URL must be a JPEG, PNG, or WebP image');
  }

  return new File([blob], fileNameFromUrl(parsed.href, mime), { type: mime });
}

/** Fetch a remote image and return a blob object URL (CORS permitting). */
export async function imageUrlToObjectUrl(imageUrl: string): Promise<string> {
  const file = await fileFromImageUrl(imageUrl);
  return URL.createObjectURL(file);
}
