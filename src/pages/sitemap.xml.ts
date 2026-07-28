/**
 * Hand-maintained sitemap. Only indexable pages belong here —
 * the legal pages are noindex on purpose and are therefore excluded.
 * When you add a page, add it here too.
 */
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
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = pages
    .map(
      (path) =>
        `  <url><loc>${new URL(path, site).toString()}</loc><lastmod>${lastmod}</lastmod></url>`,
    )
    .join('\n');
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
