const pages = [
  '/',
  '/de/',
  '/projects/high-speed-drone/',
  '/projects/knife-detection/',
  '/de/projekte/high-speed-drohne/',
  '/de/projekte/messererkennung/',
];

export const prerender = true;

export function GET({ site }: { site: URL }) {
  const urls = pages
    .map((path) => `  <url><loc>${new URL(path, site).toString()}</loc></url>`)
    .join('\n');
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
