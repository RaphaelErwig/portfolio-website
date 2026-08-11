import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = new URL('..', import.meta.url).pathname;
const publicDir = path.join(root, 'public');

const palette = {
  bg: '#000000',
  panel: '#101012',
  line: 'rgba(255,255,255,0.14)',
  white: '#f5f5f7',
  muted: '#a1a1a6',
  subtle: '#86868b',
  blue: '#2997ff',
  blueBright: '#64a9ff',
};

const cards = [
  {
    output: 'social-preview.png',
    kind: 'home',
    label: 'RAPHAEL ERWIG · ENGINEERING PORTFOLIO',
    title: ['From technical idea', 'to tested prototype.'],
    accent: 'Built with commercial judgment.',
    chips: ['Hardware', 'Computer Vision', 'Business'],
    footer: 'Hardware · Computer Vision · Commercial Engineering',
  },
  {
    output: 'social-preview-de.png',
    kind: 'home',
    label: 'RAPHAEL ERWIG · ENGINEERING-PORTFOLIO',
    title: ['Von der technischen Idee', 'zum getesteten Prototyp.'],
    accent: 'Mit wirtschaftlichem Blick.',
    chips: ['Hardware', 'Computer Vision', 'Wirtschaft'],
    footer: 'Hardware · Computer Vision · Wirtschaftliches Engineering',
  },
  {
    output: 'social-preview-drone.png',
    kind: 'project',
    image: 'images/drone-hero-dark.webp',
    label: 'CASE STUDY 01 · HARDWARE',
    title: ['Performance-Oriented', 'Drone Prototype'],
    description: 'Custom CAD, flight testing and a cost-aware revision.',
    metrics: ['3 flight tests → 4 changes', '≈ 200 h'],
    footer: 'Engineering decisions in practice',
  },
  {
    output: 'social-preview-drone-de.png',
    kind: 'project',
    image: 'images/drone-hero-dark.webp',
    label: 'FALLSTUDIE 01 · HARDWARE',
    title: ['Leistungsorientierter', 'Drohnenprototyp'],
    description: 'Eigene CAD-Konstruktion, Flugtests und kostenbewusste Revision.',
    metrics: ['3 Flugtests → 4 Änderungen', '≈ 200 h'],
    footer: 'Engineering-Entscheidungen in der Praxis',
  },
  {
    output: 'social-preview-knife.png',
    kind: 'project',
    image: 'images/knife-detection-card.webp',
    label: 'CASE STUDY 02 · COMPUTER VISION',
    title: ['Live Knife Detection', 'Prototype'],
    description: 'Self-recorded data, measured validation and live deployment.',
    metrics: ['4,742 images', 'mAP@0.5 0.844', '6–10 FPS'],
    footer: 'Engineering decisions in practice',
  },
  {
    output: 'social-preview-knife-de.png',
    kind: 'project',
    image: 'images/knife-detection-card.webp',
    label: 'FALLSTUDIE 02 · COMPUTER VISION',
    title: ['Live-Messererkennung', 'als Prototyp'],
    description: 'Eigene Daten, gemessene Validierung und Live-Einsatz.',
    metrics: ['4.742 Bilder', 'mAP@0,5 0,844', '6–10 FPS'],
    footer: 'Engineering-Entscheidungen in der Praxis',
  },
];

function escapeXml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function titleMarkup(lines, { x = 72, y = 230, size = 58, gap = 67 } = {}) {
  return lines
    .map(
      (line, index) =>
        `<text x="${x}" y="${y + index * gap}" fill="${palette.white}" font-size="${size}" font-weight="600" letter-spacing="-2.1" font-family="-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif">${escapeXml(line)}</text>`,
    )
    .join('');
}

function pillMarkup(labels, startX, y) {
  let x = startX;
  return labels
    .map((label) => {
      const width = Math.round(label.length * 9.2 + 32);
      const markup = `<rect x="${x}" y="${y}" width="${width}" height="38" rx="19" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.10)"/>
        <text x="${x + 16}" y="${y + 25}" fill="${palette.white}" font-size="15" font-weight="500" font-family="-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif">${escapeXml(label)}</text>`;
      x += width + 10;
      return markup;
    })
    .join('');
}

async function imageDataUri(relativePath) {
  const absolutePath = path.join(publicDir, relativePath);
  const source = await fs.readFile(absolutePath);
  const buffer = await sharp(source).png().toBuffer();
  return `data:image/png;base64,${buffer.toString('base64')}`;
}

function baseSvg(content) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <defs>
      <radialGradient id="blueGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1040 90) rotate(132) scale(570 520)">
        <stop stop-color="#0a84ff" stop-opacity="0.25"/>
        <stop offset="0.5" stop-color="#0a84ff" stop-opacity="0.055"/>
        <stop offset="1" stop-color="#0a84ff" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="accentGradient" x1="72" y1="0" x2="650" y2="0" gradientUnits="userSpaceOnUse">
        <stop stop-color="#2997ff"/>
        <stop offset="1" stop-color="#8a7dff"/>
      </linearGradient>
      <linearGradient id="imageShade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0.42" stop-color="#000000" stop-opacity="0"/>
        <stop offset="1" stop-color="#000000" stop-opacity="0.82"/>
      </linearGradient>
      <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="24" stdDeviation="28" flood-color="#000000" flood-opacity="0.55"/>
      </filter>
    </defs>
    <rect width="1200" height="630" fill="${palette.bg}"/>
    <rect width="1200" height="630" fill="url(#blueGlow)"/>
    <rect x="0.5" y="0.5" width="1199" height="629" rx="34" fill="none" stroke="rgba(255,255,255,0.10)"/>
    ${content}
  </svg>`;
}

async function homeSvg(card) {
  const drone = await imageDataUri('images/drone-hero-dark.webp');
  const knife = await imageDataUri('images/knife-detection-card.webp');
  return baseSvg(`
    <text x="72" y="82" fill="${palette.muted}" font-size="17" font-weight="600" letter-spacing="1.8" font-family="-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif">${escapeXml(card.label)}</text>
    ${titleMarkup(card.title, { x: 72, y: 204, size: 55, gap: 64 })}
    <text x="72" y="370" fill="url(#accentGradient)" font-size="35" font-weight="600" letter-spacing="-1.1" font-family="-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif">${escapeXml(card.accent)}</text>
    ${pillMarkup(card.chips, 72, 424)}
    <g filter="url(#shadow)">
      <clipPath id="homeDroneClip"><rect x="748" y="78" width="380" height="292" rx="28"/></clipPath>
      <image href="${drone}" x="748" y="78" width="380" height="292" preserveAspectRatio="xMidYMid slice" clip-path="url(#homeDroneClip)"/>
      <rect x="748.5" y="78.5" width="379" height="291" rx="27.5" fill="none" stroke="rgba(255,255,255,0.16)"/>
    </g>
    <g filter="url(#shadow)">
      <clipPath id="homeKnifeClip"><rect x="858" y="330" width="270" height="194" rx="24"/></clipPath>
      <image href="${knife}" x="858" y="330" width="270" height="194" preserveAspectRatio="xMidYMid slice" clip-path="url(#homeKnifeClip)"/>
      <rect x="858.5" y="330.5" width="269" height="193" rx="23.5" fill="none" stroke="rgba(255,255,255,0.16)"/>
    </g>
    <line x1="72" y1="548" x2="1128" y2="548" stroke="rgba(255,255,255,0.12)"/>
    <text x="72" y="584" fill="${palette.subtle}" font-size="17" font-family="-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif">${escapeXml(card.footer)}</text>
    <text x="1128" y="584" text-anchor="end" fill="${palette.subtle}" font-size="17" font-family="-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif">raphaelerwig.com</text>
  `);
}

async function projectSvg(card) {
  const image = await imageDataUri(card.image);
  const descriptionSize = card.description.length > 62 ? 21 : 23;
  return baseSvg(`
    <text x="72" y="82" fill="${palette.blueBright}" font-size="17" font-weight="600" letter-spacing="2" font-family="-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif">${escapeXml(card.label)}</text>
    ${titleMarkup(card.title, { x: 72, y: 207, size: 55, gap: 64 })}
    <text x="72" y="374" fill="${palette.muted}" font-size="${descriptionSize}" font-weight="400" letter-spacing="-0.35" font-family="-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif">${escapeXml(card.description)}</text>
    ${pillMarkup(card.metrics, 72, 421)}
    <g filter="url(#shadow)">
      <clipPath id="projectImageClip"><rect x="728" y="78" width="400" height="446" rx="30"/></clipPath>
      <image href="${image}" x="728" y="78" width="400" height="446" preserveAspectRatio="xMidYMid slice" clip-path="url(#projectImageClip)"/>
      <rect x="728" y="78" width="400" height="446" rx="30" fill="url(#imageShade)" clip-path="url(#projectImageClip)"/>
      <rect x="728.5" y="78.5" width="399" height="445" rx="29.5" fill="none" stroke="rgba(255,255,255,0.16)"/>
      <text x="760" y="486" fill="#ffffff" font-size="16" font-weight="600" letter-spacing="0.2" font-family="-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif">RAPHAEL ERWIG</text>
    </g>
    <line x1="72" y1="548" x2="1128" y2="548" stroke="rgba(255,255,255,0.12)"/>
    <text x="72" y="584" fill="${palette.subtle}" font-size="17" font-family="-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif">${escapeXml(card.footer)}</text>
    <text x="1128" y="584" text-anchor="end" fill="${palette.subtle}" font-size="17" font-family="-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif">raphaelerwig.com</text>
  `);
}

for (const card of cards) {
  const svg = card.kind === 'home' ? await homeSvg(card) : await projectSvg(card);
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(path.join(publicDir, card.output));
  console.log(`Created public/${card.output}`);
}
