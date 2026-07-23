#!/usr/bin/env node
/**
 * Recompress public/images (SVGO + sharp PNG palette).
 * Usage: node scripts/compress-images.mjs
 */
import sharp from 'sharp';
import { readFile, writeFile, readdir, stat } from 'fs/promises';
import path from 'path';
import { execFileSync } from 'child_process';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const imagesRoot = path.join(root, 'public/images');

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...(await walk(p)));
    else files.push(p);
  }
  return files;
}

function fmt(n) {
  return `${(n / 1024).toFixed(1)}KB`;
}

const pngs = (await walk(imagesRoot)).filter((f) => f.endsWith('.png') && !f.endsWith('placeholder.png'));
for (const file of pngs) {
  const before = (await stat(file)).size;
  const isLogo = file.includes('decoder/logo.png');
  const buf = await sharp(file)
    .png({
      compressionLevel: 9,
      palette: true,
      quality: isLogo ? 90 : 80,
      effort: 10,
    })
    .toBuffer();
  if (buf.length < before) {
    await writeFile(file, buf);
    console.log(`${path.relative(root, file)}: ${fmt(before)} → ${fmt(buf.length)}`);
  }
}

execFileSync('npx', ['svgo', '-rf', 'public/images', '--multipass'], {
  cwd: root,
  stdio: 'inherit',
});

console.log('done');
