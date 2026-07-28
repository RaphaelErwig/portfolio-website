#!/usr/bin/env python3
"""
Erzeugt public/raphael-erwig-cv.pdf im Design der Website.

Aufruf aus dem Projektwurzelverzeichnis:
    pip install reportlab
    python3 scripts/build-cv.py

Inhalte stehen unten als Python-Listen — anpassen und neu ausfuehren.
Das Skript bricht mit Fehler ab, wenn der Inhalt ueber die Seite laeuft.
"""
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.utils import simpleSplit

pdfmetrics.registerFont(TTFont('L',  '/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf'))
pdfmetrics.registerFont(TTFont('LB', '/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf'))

W, H = A4
M   = 44          # Seitenrand
COL = 162         # linke Spalte (Datum)
GAP = 14
INK   = (0.07, 0.09, 0.12)
MUTED = (0.42, 0.46, 0.52)
ACC   = (0.13, 0.55, 0.35)
RULE  = (0.85, 0.87, 0.90)

c = canvas.Canvas('public/raphael-erwig-cv.pdf', pagesize=A4)
c.setTitle('Raphael Erwig – CV')
c.setAuthor('Raphael Erwig')
c.setSubject('Curriculum Vitae')
c.setKeywords('Industrial Engineering, Electrical Engineering, Computer Vision, Product Development')

y = H - M

def rgb(t): return t
def text(x, yy, s, font='L', size=9.2, color=INK):
    c.setFont(font, size); c.setFillColorRGB(*color); c.drawString(x, yy, s)
def right(x, yy, s, font='L', size=9.2, color=MUTED):
    c.setFont(font, size); c.setFillColorRGB(*color); c.drawRightString(x, yy, s)
def wrap(x, yy, s, width, font='L', size=9.2, leading=12.4, color=INK):
    c.setFont(font, size); c.setFillColorRGB(*color)
    for line in simpleSplit(s, font, size, width):
        c.drawString(x, yy, line); yy -= leading
    return yy

# ---------- Kopf ----------
c.setFont('LB', 25); c.setFillColorRGB(*INK)
c.drawString(M, y, 'Raphael Erwig'); y -= 17
c.setFont('LB', 9.6); c.setFillColorRGB(*ACC)
c.drawString(M, y, 'INDUSTRIAL ENGINEERING · ELECTRICAL ENGINEERING · PRODUCT DEVELOPMENT'); y -= 15
c.setFont('L', 9); c.setFillColorRGB(*MUTED)
c.drawString(M, y, 'raphael.erwig@icloud.com   ·   raphaelerwig.com   ·   linkedin.com/in/raphael-erwig-4557b8263   ·   Düsseldorf, Germany')
y -= 8
c.setStrokeColorRGB(*RULE); c.setLineWidth(0.8); c.line(M, y, W - M, y); y -= 20

# ---------- Profil ----------
y = wrap(M, y,
    'Industrial Engineering student focused on Electrical Engineering. I build hardware and computer-vision '
    'prototypes end to end — CAD, additive manufacturing, dataset work and model training — and judge every '
    'decision by performance, effort, cost and practical value. Currently supporting the HPC MCU team at '
    'Renesas Electronics Europe with process automation and functional testing.',
    W - 2*M, size=9.4, leading=12.2)
y -= 10

def section(title):
    global y
    c.setFont('LB', 10.2); c.setFillColorRGB(*ACC)
    c.drawString(M, y, title.upper()); y -= 4.5
    c.setStrokeColorRGB(*RULE); c.setLineWidth(0.6); c.line(M, y, W - M, y); y -= 13

def entry(period, role, org, bullets, tools=None):
    global y
    c.setFont('L', 8.6); c.setFillColorRGB(*MUTED)
    for i, line in enumerate(simpleSplit(period, 'L', 8.6, COL - GAP - M)):
        c.drawString(M, y - i*10.5, line)
    x = COL
    c.setFont('LB', 10.4); c.setFillColorRGB(*INK)
    c.drawString(x, y, role); y -= 12
    c.setFont('L', 9.2); c.setFillColorRGB(*MUTED)
    c.drawString(x, y, org); y -= 12.5
    for b in bullets:
        c.setFillColorRGB(*ACC); c.setFont('L', 9.2); c.drawString(x, y, '·')
        y = wrap(x + 9, y, b, W - M - x - 9, size=9.1, leading=11.6)
        y -= 1
    if tools:
        y -= 1
        c.setFont('L', 8.4); c.setFillColorRGB(*MUTED)
        c.drawString(x, y, '   '.join(tools)); y -= 10
    y -= 7

# ---------- Erfahrung ----------
section('Experience')
entry('Since Jan 2026', 'Working Student – HPC MCU Engineering Support', 'Renesas Electronics Europe · Düsseldorf', [
    'Designed and implemented a SharePoint and Power Automate workflow that replaced incomplete email requests with structured mandatory fields, automated responses and reminders — reducing avoidable follow-up questions and improving traceability.',
    'Test products, internal projects and demos using defined procedures; prepare configuration, accessories, documentation, packaging and shipment to partners and other offices.',
], ['SharePoint', 'Power Automate', 'e² studio', 'Functional Testing'])

entry('Sep 2024 · one week', 'Intern – Finance & Group Controlling', 'Immobilien Management Essen GmbH (IME) · Essen', [
    'Self-initiated insight between school and university: built an Excel analysis of the residential property portfolio that was subsequently used, and worked through an annuity model to understand financing logic.',
])

# ---------- Projekte ----------
section('Independent projects')
entry('≈ 200 h', 'Performance-Oriented Drone Prototype', 'Self-directed · Onshape, PA-CF, Betaflight', [
    'Designed a flight-capable 6S drone without an off-the-shelf frame across 4–5 major CAD iterations; built, tuned and flight-tested revision 1.',
    'Three flight tests produced measured evidence — frame resonance, ESC heat build-up from infrared measurements, unfavourable weight distribution — translated into four specific changes for revision 2.',
    'Delivered against a €700 budget with €424 documented spend; revision 1 electronics reused in revision 2.',
])

entry('≈ 250 h', 'Live Knife Detection Prototype', 'Self-directed · Python, YOLOv11-S, NVIDIA Jetson', [
    'Recorded and labeled a dataset of 731 knife images and 4,011 without; trained YOLOv11-S at 640 × 640 over 150 epochs to mAP@0.5 = 0.844 and mAP@0.5:0.95 = 0.554.',
    'Tested a two-class label split against a single class on the same data and rejected it on the measured result; expanding the negative set removed the bulk of early false positives. Data composition mattered more than model size or label sophistication.',
    'Deployed to live webcam inference on laptop (6–10 FPS observed) and NVIDIA Jetson Orin Nano Super; built a second-hand local AI workstation for ≈ €910 instead of paying recurring cloud GPU cost.',
])

# ---------- Ausbildung ----------
section('Education')
entry('Since WS 2024', 'B.Eng. Industrial Engineering – Electrical Engineering', 'Düsseldorf University of Applied Sciences · 4th semester', [
    'Interdisciplinary degree combining electrical engineering and information technology with business fundamentals.',
])

# ---------- Skills ----------
section('Skills')
rows = [
    ('Hardware & product', 'Onshape · CAD design · 3D printing (PA-CF, ABS-CF, PLA) · soldering · hardware integration'),
    ('Computer vision',    'Python · YOLOv11 · dataset collection · Label Studio · model evaluation · NVIDIA Jetson'),
    ('Workflow & testing',  'SharePoint · Power Automate · process design · functional testing · technical documentation'),
    ('Commercial',          'Excel · cost–benefit analysis · project budgeting · component sourcing · residual-value thinking'),
    ('Languages',           'German (native) · English (fluent, C1) · Spanish (basic)'),
]
for label, val in rows:
    c.setFont('LB', 9); c.setFillColorRGB(*INK); c.drawString(M, y, label)
    y = wrap(COL, y, val, W - M - COL, size=8.9, leading=11.2, color=(0.25,0.28,0.33))
    y -= 3.5

# ---------- Fußzeile ----------
c.setFont('L', 7.6); c.setFillColorRGB(*MUTED)
c.drawString(M, 30, 'Full case studies with methodology, measurements and open limitations: raphaelerwig.com')
c.drawRightString(W - M, 30, 'Updated July 2026')

FOOTER_TOP = 42
if y < FOOTER_TOP:
    raise SystemExit(f'UEBERLAUF: Inhalt endet bei y={y:.1f}, Fusszeile beginnt bei {FOOTER_TOP}. Differenz {FOOTER_TOP-y:.1f} pt.')
print(f'Freiraum ueber der Fusszeile: {y - FOOTER_TOP:.1f} pt')
c.showPage(); c.save()
print('CV written')
