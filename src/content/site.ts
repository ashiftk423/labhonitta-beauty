/**
 * Business facts shown on the landing page.
 * Edit here — the hero, service strip and about section all read from this.
 */

import { ABOUT_PHOTO, HERO_PHOTO } from "./works.generated";

export const BUSINESS = {
  name: "Labhonitta by Soumya",
  tagline: "Makeup Studio & Academy",
  city: "Thrissur",
  region: "Central Kerala",
  phone: "+91 90202 40426",
  phoneHref: "tel:+919020240426",
  whatsapp:
    "https://wa.me/919020240426?text=Hi%20Labhonitta%20by%20Soumya%2C%20I%27d%20like%20to%20book%20an%20appointment.",
  founder: "Soumya",
  founderRole: "Founder & Chief Makeup Artist",
  address:
    "First floor, Kesaveeyam Building, Sreepadam Avenue, Cheroor Rd, Chembukkav, Thrissur, Kerala 680020",
  hours: "Open daily · Closes 7:00 PM",
  mapsUrl: "https://maps.app.goo.gl/GJ1rgt9qTV5YeHFa9",
  mapsEmbed:
    "https://maps.google.com/maps?q=10.5350157,76.2194474&z=17&output=embed",
  instagramUrl: "https://www.instagram.com/labhonitta.by.soumya/",
  instagramHandle: "@labhonitta.by.soumya",
};

/** Hero + about statistics (confirmed by the client). */
export const STATS = {
  rating: "4.9★",
  ratingLabel: "Google Rating",
  clients: "1K+",
  clientsLabel: "Happy Brides",
  experience: "20+",
  experienceLabel: "Years of Expertise",
};

/** The circular seals that overlap the hero photo. */
export const HERO_SEALS = [
  { top: STATS.experience, bottom: "Years of\nExpertise" },
  { top: STATS.clients, bottom: "Happy\nBrides" },
  { top: "★", bottom: "Celebrity\nMakeup Artist" },
];

/** Icon strip directly under the hero. */
export const SERVICE_STRIP = [
  {
    title: "Bridal Makeup",
    desc: "Look your best on your big day",
    glyph: "💍",
    href: "#services",
  },
  {
    title: "Reception Makeup",
    desc: "Glamorous looks for your special moments",
    glyph: "✨",
    href: "#services",
  },
  {
    title: "Engagement Makeup",
    desc: "Elegant & picture perfect makeup",
    glyph: "👑",
    href: "#services",
  },
  {
    title: "Party Makeup",
    desc: "Stunning looks for every occasion",
    glyph: "💄",
    href: "#services",
  },
  {
    title: "Hair Styling",
    desc: "Trendy & classic hairstyles for all events",
    glyph: "✂",
    href: "#hair",
  },
  {
    title: "Hair Treatment",
    desc: "Keratin, spa and repair therapies",
    glyph: "🌿",
    href: "#hair",
  },
];

/** Landing-page photos. The AI placeholders only show if a file fails to load. */
export const HERO_IMAGE = {
  ...HERO_PHOTO,
  fallback: "/images/bride-after.webp",
  alt: "Bride in a red Kanjeevaram saree and temple gold jewellery, makeup by Soumya at Labhonitta",
};

export const ABOUT_IMAGE = {
  ...ABOUT_PHOTO,
  fallback: "/images/look-4.webp",
  alt: `${BUSINESS.founder} applying bridal makeup at ${BUSINESS.name}`,
};
