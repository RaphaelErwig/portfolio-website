# Project media guide

The project cards already support optional images. Add the final edited photos under `public/projects/` and then set `image` and `imageAlt` in both language versions of the home page.

## Recommended files

- `public/projects/drone/cover.webp` - finished drone or strongest three-quarter view
- `public/projects/drone/cad.webp` - clean Onshape rendering or screenshot
- `public/projects/drone/prototype.webp` - first flight-capable PA-CF prototype
- `public/projects/drone/internal-layout.webp` - open build showing FC, ESC, battery position and cooling path
- `public/projects/drone/revisions.webp` - revision 1 and revision 2 side by side
- `public/projects/drone/flight.mp4` - short, controlled and uncut flight sequence
- `public/projects/knife-detection/cover.webp` - detection result in a representative scene
- `public/projects/knife-detection/workstation.webp` - clean photo of the local AI workstation
- `public/projects/knife-detection/false-positive.webp` - representative false-positive example
- `public/projects/knife-detection/pipeline.webp` - data, training and inference workflow
- `public/projects/knife-detection/demo.mp4` - short uncut demonstration video
- `public/about/portrait.webp` - professional portrait
- `public/about/working.webp` - authentic photo while building or testing a project

## Image preparation

- Use WebP for photographs and screenshots.
- Export cover images at approximately 1600 × 900 px.
- Keep each image below roughly 350 KB where possible.
- Keep videos short, muted by default and compressed for web delivery.
- Avoid including private information, confidential Renesas material or faces without consent.
- Write descriptive alternative text in German and English.

Do not publish unverified benchmark values. Add precision, recall, mAP and device-specific FPS only after:

1. frames are grouped by source scene or video before splitting;
2. the final model is evaluated on an independent holdout set; and
3. all devices are benchmarked with the same model, input size and measurement method.

Publish drone mass, flight time and top speed only after controlled measurement.
