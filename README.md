# Raphael Erwig – Engineering Portfolio

Bilingual Astro portfolio for [raphaelerwig.com](https://raphaelerwig.com). The site presents engineering projects, professional experience and practical skills in German and English.

## Local development

```sh
npm install
npm run dev
```

The production build is created with:

```sh
npm run build
```

## Important files

- `src/pages/index.astro` – English home page content
- `src/pages/de/index.astro` – German home page content
- `src/pages/projects/` – English project case studies
- `src/pages/de/projekte/` – German project case studies
- `src/components/` – shared header, home-page and project components
- `src/styles/global.css` – complete visual system and responsive layout
- `public/robots.txt` and `src/pages/sitemap.xml.ts` – search-engine configuration
- `PROJECT_MEDIA_GUIDE.md` – filenames and preparation guidance for future project photos and video

## Deployment

The repository is connected to Cloudflare Pages. A push to the configured production branch triggers the deployment automatically.

Before publishing, run `npm run build` and verify that every project route is generated successfully.

## Evidence still to add

- Professional portrait and a working photo
- Drone cover, CAD, internal layout, revision comparison and controlled-flight video
- AI workstation photo, live-detection screenshot, false-positive comparison and uncut demo video
- Knife-detection metrics only after grouping frames by source scene/video, retraining where needed and benchmarking every device with the same model and input size
- Drone mass, flight time and top speed only after controlled measurement
- Final German and English CVs before enabling a public download

## Content guardrails

- “High speed” remains the drone’s design target, not a measured result.
- The knife detector is a research prototype, not a certified or market-ready safety product.
- Renesas content stays at process level and excludes product names, internal form fields and confidential implementation details.
- C++, Renesas FSP and e² studio are not presented as standalone development strengths.
