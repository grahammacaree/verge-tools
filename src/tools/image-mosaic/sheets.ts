import { MOSAIC_SHEET_ID, type MosaicTemplate } from './types';

type GvizRow = { c?: Array<{ v?: string | null } | null> | null };

type GvizResponse = {
  table?: { rows?: GvizRow[] };
};

/** Fetch mosaic templates from the published Google Sheet (legacy sheet id). */
export async function fetchMosaicTemplates(
  sheetId: string = MOSAIC_SHEET_ID,
): Promise<MosaicTemplate[]> {
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to load templates (${response.status})`);
  }
  const text = await response.text();
  const jsonStart = text.indexOf('{');
  const jsonEnd = text.lastIndexOf('}');
  if (jsonStart < 0 || jsonEnd < 0) return [];
  const data = JSON.parse(text.slice(jsonStart, jsonEnd + 1)) as GvizResponse;
  const rows = data.table?.rows ?? [];
  return rows
    .map((row) => {
      const name = row.c?.[0]?.v ?? '';
      const string = row.c?.[1]?.v ?? '';
      if (!name || !string) return null;
      return { name: String(name), string: String(string) };
    })
    .filter((item): item is MosaicTemplate => item !== null);
}

export async function saveMosaicTemplate(
  saveUrl: string,
  name: string,
  encoded: string,
): Promise<void> {
  const body = new FormData();
  body.append('name', name);
  body.append('string', encoded);
  await fetch(saveUrl, { method: 'POST', body, mode: 'no-cors' });
}
