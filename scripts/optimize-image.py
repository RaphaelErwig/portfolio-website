#!/usr/bin/env python3
"""
Konvertiert ein Bild nach WebP und legt es in public/images/ ab.

    pip install pillow
    python3 scripts/optimize-image.py ~/Desktop/portrait.jpg raphael-erwig

Gibt am Ende die width/height aus, die du in site-data.ts eintragen musst.
"""
import sys, os
from PIL import Image

if len(sys.argv) < 3:
    sys.exit("Aufruf: python3 scripts/optimize-image.py <eingangsbild> <zielname-ohne-endung>")

src, name = sys.argv[1], sys.argv[2]
MAX_W = 1400

im = Image.open(src).convert("RGB")
w, h = im.size
if w > MAX_W:
    h = round(h * MAX_W / w)
    w = MAX_W
    im = im.resize((w, h), Image.LANCZOS)

os.makedirs("public/images", exist_ok=True)
out = f"public/images/{name}.webp"
im.save(out, "webp", quality=85, method=6)

print(f"Geschrieben: {out}  ({w}x{h}, {os.path.getsize(out)/1024:.0f} KB)")
print(f"In site-data.ts eintragen:  width: {w}, height: {h}")
