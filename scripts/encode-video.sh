#!/usr/bin/env bash
# Komprimiert ein Rohvideo für die Website.
#
#   ./scripts/encode-video.sh ~/Desktop/rohaufnahme.mov knife-detection-demo
#
# Ergebnis: public/media/<name>.mp4 (H.264, web-optimiert, max. 1280 px breit)
# Danach in der jeweiligen Fallstudie showDemoVideo bzw. showFlightVideo auf true setzen.
set -euo pipefail

IN="${1:?Pfad zum Eingangsvideo fehlt}"
NAME="${2:?Zielname ohne Endung fehlt}"
OUT="public/media/${NAME}.mp4"
mkdir -p public/media

ffmpeg -y -i "$IN" \
  -vf "scale='min(1280,iw)':-2,fps=30" \
  -c:v libx264 -profile:v high -crf 25 -preset slow -pix_fmt yuv420p \
  -c:a aac -b:a 96k -ac 1 \
  -movflags +faststart \
  "$OUT"

echo
echo "Fertig: $OUT ($(du -h "$OUT" | cut -f1))"
echo "Ziel: unter 10 MB. Falls größer, -crf auf 28 erhöhen und erneut laufen lassen."
