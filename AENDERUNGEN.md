# Überarbeitung der Portfolio-Website

Alle Änderungen sind im Quellcode umgesetzt. Diese Datei listet auf, was geändert wurde
und was noch von dir kommen muss.

---

## 1. Was du noch tun musst

### 1.1 Adresse ist eingetragen

Straelener Weg 21, 40472 Düsseldorf steht jetzt in `src/i18n/site-data.ts` und erscheint
von dort aus im Impressum und in der Datenschutzerklärung, jeweils EN und DE. Wenn du das
später ändern willst, ist das die einzige Stelle.

**Einordnung zur Rechtslage:** Die Datenschutzerklärung
ist eindeutig Pflicht, sobald personenbezogene Daten verarbeitet werden — und Server-Logs
beim Seitenaufruf sind das (Art. 13 DSGVO). Sie war vorher gar nicht vorhanden. Beim
Impressum ist die Lage weniger eindeutig als ich es im ersten Durchgang dargestellt habe:
§ 5 DDG greift bei "geschäftsmäßigen" Telemedien, und ein reines Bewerbungsportfolio ohne
Monetarisierung ist ein Graubereich. Da die Seite klar der beruflichen Positionierung dient,
ist ein Impressum die sichere Variante — aber es ist nicht dasselbe akute Risiko wie eine
fehlende Datenschutzerklärung.

### 1.2 Cloudflare: E-Mail-Verschleierung abschalten

Das war der kritischste funktionale Fehler und er liegt **nicht** im Code — der Quelltext
enthielt schon immer ein sauberes `mailto:`. Cloudflare ersetzt es beim Ausliefern durch
`/cdn-cgi/l/email-protection#...`, das nur mit JavaScript funktioniert.

Dashboard → deine Domain → **Scrape Shield** → **Email Address Obfuscation** → **Off**

Solange die Option an ist, wird auch die neu eingebaute sichtbare Adresse im Footer und im
Kontaktblock verschleiert. Die Änderung im Code allein reicht also nicht.

### 1.3 Videos

Du wolltest Aufnahmen machen. Der Code ist vorbereitet:

```bash
./scripts/encode-video.sh ~/Desktop/rohaufnahme.mov knife-detection-demo
./scripts/encode-video.sh ~/Desktop/flug.mov drone-flight-demo
```

Das Skript skaliert auf max. 1280 px, kodiert H.264 mit `+faststart` und legt die Datei
unter `public/media/` ab. Danach in der jeweiligen Fallstudie den Schalter umlegen:

| Datei | Schalter |
|---|---|
| `src/pages/projects/knife-detection.astro` | `showDemoVideo = true` |
| `src/pages/de/projekte/messererkennung.astro` | `showDemoVideo = true` |
| `src/pages/projects/high-speed-drone.astro` | `showFlightVideo = true` |
| `src/pages/de/projekte/high-speed-drohne.astro` | `showFlightVideo = true` |

Selbst gehostet heißt: keine Drittanbieter-Cookies, kein Consent-Banner, die
Datenschutzerklärung bleibt so kurz wie sie ist.

**Zum Inhalt:** ungeschnitten ist wichtiger als schön. Zeig auch die Fälle, in denen das
Modell unsicher ist. Das ist genau die Ehrlichkeit, die den Rest der Seite trägt — und
ein geschnittener Highlight-Clip würde ihr widersprechen.

### 1.4 Eine Rückfrage zum Deployment

Die 6–10 FPS auf dem Laptop stehen unverändert auf der Seite. Trainiert wurde aber
nachweislich **YOLOv11-S**, und inzwischen einklassig. Falls du die FPS damals mit einem
anderen Modell gemessen hast, sag Bescheid — dann muss die Zahl zum Modell passen.

### 1.5 Was ich angenommen hatte, und wie es jetzt steht

Ich hatte an mehreren Stellen Angaben erfunden, statt zu fragen. Vollständige Liste:

| Stelle | Was ich erfunden hatte | Status |
|---|---|---|
| Verfügbarkeit | "ab Frühjahr 2027 · Raum Düsseldorf oder remote" | **Korrigiert**: ab sofort, weltweit, Studienunterbrechung möglich |
| Abschluss | "Sommer 2028" | **Zurückgesetzt** auf deine ursprüngliche Formulierung "nach etwa drei weiteren Semestern" |
| Sprachen im CV | "German (native) · English (fluent)" | **Von dir bestätigt** und um Spanisch (Grundkenntnisse) ergänzt |
| Hoster in der Datenschutzerklärung | Cloudflare Pages | **Von dir bestätigt** |
| Aufbewahrungsfrist Kontaktdaten | "spätestens sechs Monate" | **Entfernt**, auf deinen Wunsch keine feste Frist |
| Projektjahre im CV | "2025 – now" bzw. "2025" | **Entfernt**, nur noch Stundenangabe |
| 1.230 Trainings-Boxen | Aus dem Balkendiagramm abgelesen | **Entfernt**, nur die exakten 327 Validierungs-Boxen bleiben |

Nicht erfunden, sondern aus deinen Dateien oder dem alten Quellcode übernommen: alle
YOLO-Metriken, die Trainingskonfiguration, die Confusion-Matrix-Zahlen, die
Drohnen-Komponenten und -Kosten, die E-Mail-Adresse und sämtliche Texte aus der
ursprünglichen Seite.

Eine Stelle bleibt eine Rechnung von mir, klar als solche gekennzeichnet: die rund
170 km/h beim Drohnenprojekt. Hergeleitet aus 2050 KV × 22,2 V und 4,3" Steigung mit
Abschlag für Schlupf und Luftwiderstand. Auf der Seite steht ausdrücklich, dass es ein
Auslegungsziel und kein Messergebnis ist.

## 2. Was geändert wurde

### Rechtliches (neu)
- Vier neue Seiten: `/legal-notice/`, `/privacy/`, `/de/impressum/`, `/de/datenschutz/`
- Adresse und Hosting-Angaben zentral in `src/i18n/site-data.ts`, keine Duplikate
- Alle vier Seiten `noindex` und bewusst nicht in der Sitemap
- Datenschutzerklärung deckt konkret ab, was auf dieser Seite tatsächlich passiert:
  Cloudflare-Hosting, Server-Logs, Drittlandtransfer, technisch notwendige Cookies,
  E-Mail-Kontakt, externe Links, CV-Download, Betroffenenrechte, LDI NRW als Aufsicht

### Fachliche Korrekturen
- `knife-detection-false-negative` → `knife-detection-true-negative`. Eine Schere, die
  nicht als Messer erkannt wird, ist ein True Negative. Datei, Bildunterschrift und
  Alt-Text sind jetzt konsistent.
- 300 km/h → rund 170 km/h. Die alte Zahl war die unbelastete Pitch Speed
  (2050 KV × 22,2 V = 45.510 U/min, 4,3" Steigung → 298 km/h). Real erreichbar sind
  55–65 % davon. Der Text nennt jetzt den realistischen Wert und in einem Halbsatz,
  woher er kommt.

### Struktur der Fallstudien
- Die elf über den Text verstreuten Einschränkungen sind zu **einem** Block
  "Offene Punkte und Grenzen" am Seitenende gebündelt. Der Fließtext formuliert jetzt
  selbstbewusst, ohne dass Information verloren geht.
- Neue Ergebnis-Kennzahlen statt Aufwand: die Fakten-Grids führen mit gemessenen
  Werten, die Stundenzahl steht im Fließtext.
- Projektkarten zeigen eine Ergebnis-Kennzahl zuerst, den Aufwand gedämpft daneben.

### Inhalt Startseite
- Verfügbarkeits-Badge im Hero: Praktikum oder Werkstudentenstelle ab Frühjahr 2027
- Skills-Gruppen verlinken auf das Projekt bzw. die Position, wo sie eingesetzt wurden.
  Der alte Satz "keine ungeprüfte Sammlung von Schlagwörtern" stand über einer
  ungeprüften Sammlung von Schlagwörtern und ist ersetzt.
- Einwöchiges Praktikum kompakt statt mit drei Bulletpoints auf Augenhöhe mit der
  Werkstudentenstelle
- Kontaktblock: sichtbare E-Mail-Adresse zusätzlich zum Button, plus CV-Download

### Sprache
- "Hochschule Düsseldorf University of Applied Sciences" → "Düsseldorf University of
  Applied Sciences" (EN) bzw. "Hochschule Düsseldorf" (DE)
- "Version" und "Revision" waren zwischen DE und EN vertauscht, jetzt durchgängig Revision
- "nach etwa drei weiteren Semestern" → "Sommer 2028"
- Fehlendes Leerzeichen im Hero-Umbruch ("prototype.Built")
- Skill-Chip "e² studio · testing" mischte Tool und Tätigkeit, getrennt
- "sicherer kontrollierbare" korrigiert

### Technik
- Alle Fotos auf WebP: **2.301 KB → 156 KB, 93 % kleiner**, ohne sichtbaren Qualitätsverlust
- `width`/`height` an allen Bildern → kein Layout-Sprung mehr beim Laden
- `fetchpriority="high"` auf dem Hero-Bild, `loading="lazy"` und `decoding="async"` sonst
- Eigene OG-Bilder pro Projekt und Sprache statt einer generischen Karte für alles
- Sitemap mit `lastmod`, Rechtsseiten korrekt ausgeschlossen
- JSON-LD erweitert: `jobTitle`, `alumniOf`, `worksFor`, `email`, `address`
- Video-Komponente mit Poster und `preload="none"` — lädt erst beim Klick
- Footer neu: Kontakt, Rechtslinks, CV, sprachabhängig

### Aufräumen
- `portfolio-website-github/` war eine vollständige zweite Kopie des Quellbaums,
  34 Dateien, git-getrackt. Entfernt. Zwei parallele Quellbäume in einem Repo führen
  garantiert irgendwann dazu, dass du die falsche Datei bearbeitest.
- `Backup_favicon.ico` und `Backup_favicon.svg` aus `public/` entfernt — sie wurden
  bei jedem Deploy mit ausgeliefert.

### Neu
- `scripts/build-cv.py` als Vorlage für ein Lebenslauf-PDF im Seitendesign. Der Download
  ist derzeit **deaktiviert** (`cv.enabled = false` in `src/i18n/site-data.ts`), weil du
  eigene Fassungen auf Deutsch und Englisch erstellen willst. Sobald die PDFs unter den in
  `site-data.ts` hinterlegten Namen in `public/` liegen, `enabled` auf `true` setzen —
  dann erscheinen die Links wieder in Header, Hero, Kontaktblock und Footer, sprachrichtig.
- Portraitfoto in der Über-mich-Sektion, umschaltbar über `portrait.enabled`
- `scripts/optimize-image.py` zum Konvertieren weiterer Fotos nach WebP
- `scripts/encode-video.sh` für die Videokomprimierung

---

## 3. Deine Trainingsdaten: Korrekturen und neues Material

Aus `args.yaml`, `results.csv` und den Kurven ergaben sich drei Stellen, an denen die alte
Seite nachweislich falsch lag:

| Website behauptete | Tatsächlich |
|---|---|
| YOLOv11-**L** | `yolo11s.pt` — die **Small**-Variante |
| 160 Epochen | 150 (aktueller Lauf `train12`) |
| ≈ 2.000 Negativbilder | 4.011 |

### Der aktuelle Lauf (train12) ist jetzt die Grundlage

- YOLOv11-S, 640 × 640, 150 Epochen, bester Checkpoint bei Epoche 148
- **mAP@0,5 = 0,844 · mAP@0,5:0,95 = 0,554 · Precision 0,841 · Recall 0,768**
- Bester F1 0,80 bei Konfidenz 0,554, Precision erreicht 1,00 bei 0,862
- Trainingsdauer 2 h 23 min auf der Tesla T4
- Eine Klasse: Messer

### Das Klassenexperiment ist der eigentliche Gewinn

Du hattest zwischendurch zwei Klassen (`Messer` und `Messer_Hand`) und bist wieder auf eine
zurück. Auf denselben Bildern und derselben Validierungsaufteilung:

| Metrik | Zwei Klassen · 110 Ep. | Eine Klasse · 150 Ep. |
|---|---|---|
| mAP@0,5 | 0,802 | **0,844** |
| mAP@0,5:0,95 | 0,516 | **0,554** |
| Precision | 0,812 | **0,841** |
| Recall | 0,739 | **0,768** |
| Bester F1 | 0,77 | **0,80** |

Das steht jetzt als eigener Abschnitt auf der Seite, mit Tabelle. Es ist inhaltlich das
Stärkste, was du vorzuweisen hast: eine Hypothese aufgestellt, sie implementiert, gemessen,
gegen die eigene Intuition verworfen. Genau das unterscheidet Engineering von Basteln.

Die Einordnung steht ehrlich dabei: Der Vergleich ist nicht vollständig kontrolliert, weil
sich auch die Epochenzahl geändert hat. Die Richtung ist aber über alle fünf Metriken
einheitlich.

### Fehleranalyse

Von 327 gelabelten Instanzen in der Validierung: 275 erkannt, 52 übersehen — aber **120
Fehlalarme auf Hintergrund**. Rund ein Fehlalarm auf 2,3 korrekte Erkennungen. Dieser Wert
hat sich zwischen beiden Läufen kaum bewegt (123 → 120), was ihn als Dateneigenschaft
ausweist und nicht als Folge der Labelstruktur. Steht so auf der Seite, samt der Ansage,
dass die nächste Runde genau das angeht.

### Neue Belegbilder

PR-Kurve, F1-Kurve, Trainingsverlauf und Confusion Matrix des aktuellen Laufs, als WebP
eingebunden.

### Warum die Metriken trotzdem mit Vorbehalt stehen

Der Split war zufällig über Bilder, nicht nach Quellvideo gruppiert. Da viele Frames aus
denselben Videos stammen, können nahezu identische Bilder in Training und Validierung
liegen. Der mAP ist damit optimistisch für wirklich neue Szenen. Das steht in den offenen
Punkten, samt der Ansage, dass die Werte bei einem sauberen Re-Split voraussichtlich sinken.
Zahlen zeigen **und** die Einschränkung dazuschreiben ist stärker, als gar keine zu zeigen.

---

## 4. Was ich zurücknehme

Im ersten Durchgang hatte ich JSON-LD, hreflang und eine gestaltete 404-Seite als fehlend
oder ungeprüft aufgeführt. Alle drei waren vorhanden und korrekt in `BaseLayout.astro`
bzw. `404.astro`. Ich hatte nur die gerenderte Seite gesehen, nicht den Quellcode.

---

## 5. Build

Ich konnte den Build in meiner Umgebung nicht ausführen: Astro 7 nutzt Rolldown, und die
nativen Linux-Binaries waren im Paketproxy meiner Sandbox gesperrt. Dein Lockfile ist
vollständig, auf deinem Mac und in der Cloudflare-Pipeline gibt es das Problem nicht.

Geprüft habe ich stattdessen:
- Syntax aller 17 `.astro`-Dateien (Frontmatter geparst, 17/17 fehlerfrei)
- alle internen Links und Asset-Pfade gegen die tatsächlich vorhandenen Dateien
- keine Referenzen mehr auf alte Dateinamen, alte Props oder Nicht-WebP-Bilder
- CV-PDF auf Überlauf und Seitenzahl

Vor dem Deploy bitte einmal lokal:

```bash
npm install
npm run build
npm run preview
```

---

## 6. Wenn lokal alles geht, online aber nicht

`npm run verify` baut die Seite und prüft anschließend jede in den HTML-Dateien
verlinkte Datei gegen den tatsächlichen Inhalt von `dist/`. Fehlt eine, bricht der
Befehl mit Exit-Code 1 ab und nennt Datei und Fundstelle. Genau der Fall, dass ein
Bild lokal existiert, aber nicht im Deploy landet.

```bash
npm run verify     # bauen und prüfen
npm run check      # nur prüfen, wenn dist/ schon existiert
```

Das Skript meldet zusätzlich alle Dateien über 600 KB.

### Fehlersuche in dieser Reihenfolge

1. **Bild-URL direkt im Browser öffnen**, zum Beispiel
   `https://raphaelerwig.com/images/knife-detection-positive.webp`.
   Lädt es → das Bild ist da, dein Browser hatte altes HTML gecacht, harter Reload
   mit Cmd+Shift+R. Kommt 404 → die Datei liegt nicht auf dem Server, weiter bei 2.
2. **Ist die Datei überhaupt im Repo?**
   `git status public/images/` und `git ls-files public/images/`.
   Wenn die WebP-Dateien dort nicht auftauchen, wurden sie nie committet — dann
   `git add public/images/ && git commit && git push`. Wichtig: die alten `.png`-
   und `.jpeg`-Dateien wurden gelöscht, das muss ebenfalls committet werden
   (`git add -A public/images/`).
3. **Ist sie im Build?** `npm run verify` und danach `ls dist/images/`.
4. **Cloudflare-Cache leeren.** Dashboard → Caching → Configuration →
   Purge Everything. Bei einem Deploy, der Dateinamen ändert, ist das fast immer
   nötig: Der alte Pfad ist weg, der neue kann noch als 404 im Cache stehen.

---

## 7. Bilddarstellung auf dem Handy

Die Bild-Container hatten ein festes Seitenverhältnis von 16:9 und `object-fit: cover`.
Das skaliert ein Bild hoch, bis der Container gefüllt ist, und schneidet den Überstand
weg. Bei den Drohnenfotos war das viel:

| Bild | Verhältnis | im 16:9-Container |
|---|---|---|
| `drone-hero-dark` | 1,78 | passt exakt |
| `drone-cad-revision-1` | 1,37 | 23 % der Höhe abgeschnitten |
| `drone-top-dark` | 1,33 | 25 % der Höhe abgeschnitten |
| `drone-detail-dark` | 1,00 | 44 % der Höhe abgeschnitten |
| `knife-detection-*` | 0,99 | 44 % der Höhe abgeschnitten |

Auf dem Desktop fällt das kaum auf, weil die Fläche groß ist. Auf dem Handy wirkt es
wie ein Zoom-Fehler.

**Behoben:** unter 760 px Breite bestimmt das Bild seine eigene Höhe
(`object-fit: contain`, kein festes Verhältnis), begrenzt auf 62 vh in den Projektkarten
und 72 vh beim Titelbild der Fallstudien, damit ein hohes Bild nicht den ganzen Schirm
einnimmt. Die Karten werden dadurch unterschiedlich hoch — auf dem Handy stehen sie
ohnehin untereinander, dort stört das nicht.

**Auf dem Desktop bleibt alles wie es war**, weil die festen Verhältnisse dort das Raster
ruhig halten und der Beschnitt bei großer Fläche nicht auffällt.

### Falls es weiterhin nicht passt

Die Alternative wäre, die Fotos selbst auf 16:9 zu bringen, statt sie im Container zu
beschneiden. Dann bestimmst du beim Zuschnitt, was wegfällt, statt es dem Browser zu
überlassen:

```bash
python3 scripts/optimize-image.py <datei> drone-top-dark
```

Das ist die sauberere Lösung, wenn du die Bilder ohnehin neu aufnimmst — hellere
Ausleuchtung würde den dunklen Drohnen auf dem dunklen Hintergrund zusätzlich helfen.

---

## 8. Live-Audit vom 29.07.2026

Geprüft wurden alle zehn Seiten in beiden Sprachen, jeweils mit Cache-Busting.

### Fehler 1 — Cloudflare zerstörte die wichtigste Kennzahl (behoben im Code)

Auf allen **englischen** Seiten wurde `mAP@0.5` von Cloudflares Email Address
Obfuscation als E-Mail-Adresse erkannt und durch einen JavaScript-Link mit dem Text
`[email protected]` ersetzt. Betroffen waren rund zehn Stellen allein auf der
KI-Fallstudie: Einleitung, Fakten-Grid, beide Ergebnistabellen, Bildunterschrift und
Ergebnisabsatz. Ein Besucher las dort statt `mAP@0.5 = 0.844` einen Mailto-Link.

Die **deutsche** Fassung war nicht betroffen, weil dort `mAP@0,5` mit Komma steht und
das Muster damit nicht auf eine E-Mail-Adresse passt. Derselbe Inhalt, eine Sprache
kaputt, wegen eines Dezimaltrennzeichens.

Behoben durch `<!--email_off-->`-Kommentare um den Seiteninhalt in `BaseLayout.astro`.
Damit ist die Seite unabhängig von der Dashboard-Einstellung geschützt.

### Fehler 2 — Kontaktadresse weiterhin nur mit JavaScript

Alle `mailto:`-Links werden weiterhin als `/cdn-cgi/l/email-protection#...` ausgeliefert.
Das betrifft auch die **Adresse im Impressum**, die nach § 5 DDG unmittelbar erreichbar
sein muss — eine JavaScript-Abhängigkeit ist dort nicht nur unpraktisch, sondern
rechtlich angreifbar. Der `email_off`-Fix behebt das mit.

### Fehler 3 — Cache liefert die alte Seite aus

`/projects/high-speed-drone/` gab die alte Fassung zurück (300 km/h, `.jpeg`-Bilder,
„All electronics reused"), dieselbe URL mit angehängtem `?cachebust=…` die neue.
→ Cloudflare Dashboard → Caching → Configuration → **Purge Everything**.

### Ohne Befund

Deployment v5 korrekt, Portraitfoto live, Verfügbarkeitstext korrekt, Hero-Umbruch mit
Leerzeichen, alle Bilder als WebP erreichbar, Rechtsseiten mit vollständiger Anschrift
und `noindex`, Footer-Links in beiden Sprachen, canonical und hreflang sauber, eigene
OG-Bilder pro Projekt, Hochschulname korrigiert, Praktikum kompakt, EN/DE inhaltlich
deckungsgleich.

---

## 9. Design-Durchgang im Browser, 29.07.2026

Erste Prüfung mit echten Augen: Desktop 1440 px und Handy 400 px, Startseite und
Fallstudie, Menü geöffnet und geschlossen, Konsole mitgelesen. Keine JavaScript-Fehler.

### Behoben in dieser Version

**Bilder in den Fallstudien standen in viel zu hohen Rahmen.** Die `width`/`height`-
Attribute, die ich gegen Layout-Sprünge eingebaut hatte, setzen eine feste CSS-Höhe.
Ein 1400 × 1050-Foto bekam dadurch ein Element von 468 × **1050** px statt 468 × 352 px
und stand mit großen Leerflächen darin. Auf dem Desktop kaschierte `max-height: 760px`
das nur teilweise und schnitt dafür zu. Gemessen und nach dem Fix erneut gemessen:
468 × 1050 → 468 × 352. Das war mein Fehler aus v5, den v7 sichtbar gemacht hat.

**Das mobile Menü war durchsichtig.** Der Hintergrund stand auf `rgba(12,15,21,0.98)`,
wirkte im Zusammenspiel mit dem `backdrop-filter` des Headers aber halbtransparent: Die
Hero-Überschrift war quer durch die Menüpunkte lesbar. Mit einer deckenden Farbe im
Browser gegengetestet — sofort sauber.

**Die Links in den Projektkarten standen auf unterschiedlicher Höhe.** Beide Karten sind
956 px hoch, aber „View case study" saß in der einen 30 px, in der anderen 116 px über
der Unterkante. Jetzt beide bei 30 px.

**253 px Leere zwischen Kontaktblock und Footer** (125 px Innenabstand plus 128 px
Außenabstand). Auf 40 px reduziert.

### Zwei Punkte, die eine Geschmacksentscheidung sind

Beide nicht angefasst, weil sie deine Entscheidung sind:

1. **Der LinkedIn-Button ist LinkedIn-Blau** (`#0A66C2`). Neben dem mintgrünen
   E-Mail-Button auf dunklem Grund ist das der einzige Fremdkörper im Farbklima.
2. **Das Messerbild in der Projektkarte hat schwarze Balken links und rechts.** Es ist
   quadratisch und wird in einen 16:9-Rahmen eingepasst, während das Drohnenfoto den
   Rahmen randlos füllt. Nebeneinander sieht das nach Fehler aus, obwohl beides so
   gewollt ist.

### Nachtrag: Messerbild in der Projektkarte auf 16:9

Die schwarzen Balken sind weg. Vermessen wurde zuerst, was im Bild wo liegt: die blaue
Bounding Box mit „Messer: 82 %" bei y 257–372, die gelbe Zeile „Number of objects: 1"
bei y 21–40. Beides zusammen braucht 351 px Höhe — ein 16:9-Fenster bei 568 px Breite
hat nur 320. Es passte also nur eines von beidem.

Behalten wurde die Bounding Box, weil die Bildunterschrift genau auf sie verweist
(„one knife detected with 82% displayed confidence"). Der Zuschnitt liegt bei y 154–474,
die Box sitzt darin mittig.

**Das Titelbild der Fallstudie bleibt das vollständige Bild.** Dort ist die Karte kein
Vorschaubild, sondern der Beleg — inklusive Objektzähler. Zwei Dateien:

| Datei | Verwendung |
|---|---|
| `knife-detection-card.webp` (568 × 320) | Projektkarte auf der Startseite, randlos |
| `knife-detection-positive.webp` (568 × 572) | Titelbild der Fallstudie, vollständig |

Der LinkedIn-Button bleibt auf Wunsch in LinkedIn-Blau.
