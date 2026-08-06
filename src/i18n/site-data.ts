/** Single source of truth for the legally required contact details. */
export const owner = {
  name: 'Raphael Erwig',
  street: 'Straelener Weg 21',
  postalCode: '40472',
  city: 'Düsseldorf',
  country: { en: 'Germany', de: 'Deutschland' },
  email: 'raphael.erwig@icloud.com',
  /** Optional. Leave empty to hide the phone row. */
  phone: '',
};

/** Von Raphael bestätigt: Cloudflare Pages. */
export const hosting = {
  provider: 'Cloudflare Pages',
  company: 'Cloudflare, Inc., 101 Townsend St., San Francisco, CA 94107, USA',
  dpaUrl: 'https://www.cloudflare.com/cloudflare-customer-dpa/',
  privacyUrl: 'https://www.cloudflare.com/privacypolicy/',
};

export const lastUpdated = '2026-07-29';

/**
 * Lebenslauf-Download.
 *
 * Auf `false` gestellt, solange keine fertigen PDFs vorliegen. Wenn du deine
 * eigenen Versionen hast: Dateien nach public/ legen, hier auf true stellen —
 * dann erscheinen die Links wieder in Header, Hero, Kontaktblock und Footer,
 * jeweils sprachrichtig.
 */
export const cv = {
  enabled: false,
  en: '/raphael-erwig-cv-en.pdf',
  de: '/raphael-erwig-lebenslauf-de.pdf',
};

/**
 * Portraitfoto.
 *
 * Zum Austauschen: python3 scripts/optimize-image.py <datei> raphael-erwig-portrait-2
 * und src hier auf den NEUEN Namen setzen. Immer einen neuen Dateinamen verwenden —
 * bei gleichem Namen liefert der Cloudflare-Cache noch tagelang das alte Bild aus.
 * und die width/height aus der Skriptausgabe hier eintragen.
 */
export const portrait = {
  enabled: true,
  src: '/images/raphael-erwig-portrait.webp',
  width: 900,
  height: 1125,
  alt: { en: 'Portrait of Raphael Erwig', de: 'Portraitfoto von Raphael Erwig' },
};

/**
 * Bild im Hero, rechts neben dem Text. Nur ab 900 px Breite sichtbar —
 * auf dem Handy wuerde es den Text nach unten druecken, und dort sorgt
 * schon der niedrigere Hero dafuer, dass die Projekte hineinlugen.
 *
 * Auf `true` stellen, sobald das gewuenschte Bild unter src liegt.
 * Empfehlung: ein Projektbild, kein Portrait — das Portrait steht bereits
 * im Ueber-mich-Abschnitt und wirkt doppelt.
 */
export const heroImage = {
  enabled: false,
  src: '/images/drone-hero-dark.webp',
  width: 1400,
  height: 787,
  alt: {
    en: 'Self-developed flight-capable drone prototype',
    de: 'Selbst entwickelter flugfähiger Drohnenprototyp',
  },
};
