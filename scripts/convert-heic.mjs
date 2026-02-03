#!/usr/bin/env node
import { readFile, writeFile, mkdir } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const siteDir = join(__dirname, '..');

const inputPaths = [
  join(siteDir, '..', 'Asset', 'Egg.HEIC'),
  join(siteDir, '..', 'asset', 'egg.HEIC'),
];
const outputDir = join(siteDir, 'assets');
const outputPath = join(outputDir, 'egg.jpg');

async function main() {
  let inputBuffer;
  let usedPath;
  for (const p of inputPaths) {
    try {
      inputBuffer = await readFile(p);
      usedPath = p;
      break;
    } catch (_) {
      continue;
    }
  }
  if (!inputBuffer) {
    console.error('Could not find egg.HEIC. Tried:');
    inputPaths.forEach((p) => console.error('  -', p));
    process.exit(1);
  }

  let convert;
  try {
    const mod = await import('heic-convert');
    convert = mod.default;
  } catch (e) {
    console.error('Conversion failed: heic-convert is not installed.');
    console.error('Run: npm install');
    console.error('Then run: npm run convert');
    process.exit(1);
  }

  const outputBuffer = await convert({
    buffer: inputBuffer,
    format: 'JPEG',
    quality: 0.92,
  });

  await mkdir(outputDir, { recursive: true });
  await writeFile(outputPath, outputBuffer);
  console.log('Converted successfully.');
  console.log('Output:', outputPath);
}

main().catch((err) => {
  console.error('Conversion failed:', err.message);
  if (err.code === 'MODULE_NOT_FOUND') {
    console.error('Run: npm install');
    console.error('Then run: npm run convert');
  }
  process.exit(1);
});
