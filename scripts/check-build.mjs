#!/usr/bin/env node
/**
 * Prueft den fertigen Build, bevor du ihn hochlaedst.
 *
 *   npm run build
 *   node scripts/check-build.mjs
 *
 * Sucht in allen HTML-Dateien unter dist/ nach Verweisen auf eigene Dateien
 * (Bilder, Videos, PDFs, CSS, JS) und prueft, ob jede davon wirklich in dist/
 * liegt. Genau das faengt den Fall ab, dass lokal alles geht, online aber ein
 * Bild fehlt, weil es nicht mit deployt wurde.
 *
 * Exit-Code 1 bei Problemen, damit es sich in CI einhaengen laesst.
 */
import fs from 'node:fs';
import path from 'node:path';

const DIST = 'dist';
if (!fs.existsSync(DIST)) {
  console.error('dist/ fehlt. Erst "npm run build" ausfuehren.');
  process.exit(1);
}

const walk = (dir, out = []) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    e.isDirectory() ? walk(p, out) : out.push(p);
  }
  return out;
};

const all = walk(DIST);
const present = new Set(all.map((f) => '/' + path.relative(DIST, f).split(path.sep).join('/')));
const htmlFiles = all.filter((f) => f.endsWith('.html'));

const ASSET = /(?:src|href|poster|content)\s*=\s*["'](\/[^"'#?\s]+\.(?:webp|png|jpe?g|svg|gif|mp4|webm|pdf|css|js|ico|xml|txt))["']/gi;

let missing = 0;
let checked = 0;
const seen = new Map();

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  for (const m of html.matchAll(ASSET)) {
    const url = m[1];
    if (!seen.has(url)) seen.set(url, new Set());
    seen.get(url).add('/' + path.relative(DIST, file).split(path.sep).join('/'));
  }
}

for (const [url, pages] of [...seen].sort()) {
  checked++;
  if (!present.has(url)) {
    missing++;
    console.error(`FEHLT  ${url}`);
    console.error(`       referenziert von: ${[...pages].slice(0, 4).join(', ')}`);
  }
}

// Grosse Dateien melden, bevor sie die Ladezeit ruinieren
const heavy = all
  .filter((f) => /\.(webp|png|jpe?g|gif|mp4|pdf)$/i.test(f))
  .map((f) => [f, fs.statSync(f).size])
  .filter(([, s]) => s > 600 * 1024)
  .sort((a, b) => b[1] - a[1]);

console.log(`\n${checked} verlinkte Dateien geprueft, ${htmlFiles.length} HTML-Seiten durchsucht.`);
if (heavy.length) {
  console.log('\nGroesser als 600 KB (Ladezeit pruefen):');
  for (const [f, s] of heavy) console.log(`  ${(s / 1024 / 1024).toFixed(2)} MB  ${f}`);
}

if (missing) {
  console.error(`\n${missing} Datei(en) fehlen im Build. NICHT hochladen.`);
  process.exit(1);
}
console.log('\nAlle referenzierten Dateien sind im Build vorhanden.');
