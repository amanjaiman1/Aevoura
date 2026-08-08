/**
 * AEVOURA — platform configuration.
 *
 * Brand, contact and commercial promises live here. Rename the business or
 * change the email once and it updates everywhere.
 */

export const site = {
  name: "Aevoura",
  domain: "aevoura.com",
  url: "https://aevoura.com",

  tagline: "Premium website templates, built to launch",
  description:
    "Five premium website templates, engineered end to end. Buy the source, have us launch it, or commission a custom build around your brand. Delivered from India, working worldwide.",

  /** The collection is finite on purpose. Used as a curation signal. */
  templateCount: 5,
  templateCountWord: "five",

  contact: {
    /** Every order and enquiry lands here. */
    email: "editionaman089@gmail.com",
    /** Optional. Leave empty to hide from the interface. */
    phone: "",
    whatsapp: "",
    location: "India",
    timezone: "IST (UTC+5:30)",
    responseTime: "within 1 working day",
  },

  market: {
    primary: "India",
    currency: "INR",
    locale: "en-IN",
    internationalNote:
      "Based in India, working with brands worldwide. Invoiced in INR, or USD for international clients.",
  },

  /**
   * Commercial promises. These are the trust signals — all of them are
   * things we control and can honour, rather than invented statistics.
   */
  promises: [
    "Full source code, yours to keep",
    "One-time price, no subscription",
    "Free installation support for 14 days",
    "Source price credited if you upgrade to a custom build",
  ],

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
};

export const primaryNav: NavItem[] = [
  { label: "Templates", href: "/templates" },
  { label: "Pricing", href: "/pricing" },
  { label: "Custom Build", href: "/custom-build" },
  { label: "Process", href: "/process" },
  { label: "About", href: "/about" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Templates",
    items: [
      { label: "All five templates", href: "/templates" },
      { label: "Aurvi — Fine jewellery", href: "/templates/aurvi" },
      { label: "Kinetic — Automotive", href: "/templates/kinetic" },
      { label: "Monolith — Architecture", href: "/templates/monolith" },
      { label: "Velora — Skincare", href: "/templates/velora" },
      { label: "Orbital — Technology", href: "/templates/orbital" },
    ],
  },
  {
    title: "Buy",
    items: [
      { label: "Pricing", href: "/pricing" },
      { label: "Place an order", href: "/buy" },
      { label: "Custom build", href: "/custom-build" },
      { label: "Licence terms", href: "/license" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "How it works", href: "/process" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
];
