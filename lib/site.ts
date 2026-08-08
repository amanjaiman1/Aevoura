/**
 * AEVOURA — platform configuration.
 *
 * Everything brand-, contact- and edition-related lives here.
 * Rename the platform, change the email, or ship Edition 002
 * without touching a single component.
 */

export const site = {
  name: "Aevoura",
  /** Used in the wordmark, where letter-spacing is applied per character. */
  wordmark: "AEVOURA",
  domain: "aevoura.com",
  url: "https://aevoura.com",

  /** The collection is deliberately finite. These two numbers are the motif. */
  edition: "001",
  workCount: 5,
  /** Spelled out, for use in prose where a numeral reads badly. */
  workCountWord: "five",

  tagline: "A finite collection of website experiences.",
  description:
    "Five website experiences, built to be owned or rebuilt around your brand. Buy the source, or commission the custom build.",

  contact: {
    email: "editionaman089@gmail.com",
    /** Optional. Leave empty to hide from the interface. */
    phone: "",
    location: "India",
    /** Working timezone, shown in the footer as a small honesty signal. */
    timezone: "IST (UTC+5:30)",
  },

  /** Primary market first. Currency is used for all price formatting. */
  market: {
    primary: "India",
    currency: "INR",
    locale: "en-IN",
    internationalNote:
      "Based in India. Working with brands internationally — invoicing in INR or USD.",
  },

  /** Configurable placeholders. Empty `href` renders as inactive text. */
  social: [
    { label: "Instagram", href: "" },
    { label: "Behance", href: "" },
    { label: "GitHub", href: "" },
    { label: "LinkedIn", href: "" },
  ] as const,
} as const;

export type NavItem = {
  label: string;
  href: string;
  /** Marks the primary commercial route for emphasis in the header. */
  emphasis?: boolean;
};

export const primaryNav: NavItem[] = [
  { label: "Collection", href: "/collection" },
  { label: "Custom Build", href: "/custom-build", emphasis: true },
  { label: "Process", href: "/process" },
  { label: "About", href: "/about" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Collection",
    items: [
      { label: "All five works", href: "/collection" },
      { label: "Aurvi — Fine jewellery", href: "/collection/aurvi" },
      { label: "Kinetic — Mobility", href: "/collection/kinetic" },
      { label: "Monolith — Architecture", href: "/collection/monolith" },
      { label: "Velora — Skincare", href: "/collection/velora" },
      { label: "Orbital — Technology", href: "/collection/orbital" },
    ],
  },
  {
    title: "Studio",
    items: [
      { label: "Custom build", href: "/custom-build" },
      { label: "Process", href: "/process" },
      { label: "About", href: "/about" },
      { label: "Enquire", href: "/contact" },
    ],
  },
  {
    title: "Terms",
    items: [
      { label: "Licensing", href: "/license" },
      { label: "Exclusive licence", href: "/license#exclusive" },
      { label: "What we hand over", href: "/license#handover" },
    ],
  },
];

export const legalName = `${site.name} — Edition ${site.edition}`;
