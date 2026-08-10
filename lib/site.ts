/**
 * AEVOURA — platform configuration.
 *
 * Brand, contact and commercial promises live here. Rename the business or
 * change the email once and it updates everywhere.
 *
 * Collection size is derived from lib/templates.ts, never written down twice.
 */

import { templates, templateCount, templateCountWord } from "./templates";

export const site = {
  name: "Aevoura",
  domain: "aevoura.com",
  url: "https://aevoura.com",

  tagline: "Premium website templates, built to launch",
  description: `${templateCountWord.charAt(0).toUpperCase()}${templateCountWord.slice(1)} premium website templates, engineered end to end, each with a live demo you can try. Buy the source, have us launch it, or commission a custom build around your brand. Built in India, working worldwide.`,

  /** Derived from the collection, so it can never drift out of date. */
  templateCount,
  templateCountWord,

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

  /**
   * The opening sequence. Plays on every full page load — deliberately no
   * "once per session" behaviour.
   *
   *   enabled   master switch
   *   totalMs   the whole sequence. Every phase is a fraction of this in
   *             globals.css, and the head script publishes it as
   *             `--intro-total`, so this is the only place timing lives.
   *
   *   Phases:  canvas 6% · dot settles 16% · falls to centre 50%
   *            · held beat 57% · takeover 87% · reveal 88-114%
   */
  intro: {
    enabled: true,
    totalMs: 1900,
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
    // Derived, so removing or adding a template can never leave a dead link.
    items: [
      { label: `All ${templateCount} templates`, href: "/templates" },
      ...templates.map((template) => ({
        label: `${template.name} — ${template.industry}`,
        href: `/templates/${template.slug}`,
      })),
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
