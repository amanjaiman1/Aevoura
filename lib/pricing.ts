/**
 * Commercial structure.
 *
 * Prices are plain numbers in INR so they can be reformatted or
 * converted centrally. Change a number here and it updates everywhere:
 * homepage, work detail pages, engagement models, and the enquiry form.
 */

import { site } from "./site";

export type EngagementId = "source" | "launch" | "custom" | "exclusive" | "care";

export type Engagement = {
  id: EngagementId;
  index: string;
  name: string;
  /** Short label used in compact contexts. */
  short: string;
  /** null = quotation rather than a starting price. */
  priceFrom: number | null;
  priceNote: string;
  /** Who this is genuinely for. Written plainly. */
  who: string;
  includes: string[];
  delivery: string;
  cta: { label: string; href: string };
  /** The custom path carries the most commercial weight. */
  emphasis?: boolean;
};

export const engagements: Engagement[] = [
  {
    id: "source",
    index: "01",
    name: "Source",
    short: "Source code",
    priceFrom: 9999,
    priceNote: "one-time, per work",
    who: "Developers and in-house teams who want the build and will take it from there themselves.",
    includes: [
      "Full source repository",
      "Component and animation code, commented",
      "Design tokens and asset files",
      "Setup documentation",
      "Standard licence — one production site",
      "14 days of installation support over email",
    ],
    delivery: "Repository access within 24 hours of payment.",
    cta: { label: "Buy the source", href: "/contact?intent=source" },
  },
  {
    id: "launch",
    index: "02",
    name: "Launch",
    short: "Setup & deployment",
    priceFrom: 25000,
    priceNote: "one-time, per work",
    who: "Brands who like a work as it stands and want it live, correctly, without hiring a developer.",
    includes: [
      "Everything in Source",
      "Your content, copy and images placed",
      "Logo, typography and colour swapped to your brand",
      "Domain, hosting and deployment configured",
      "Analytics, forms and metadata connected",
      "Performance and cross-browser pass before handover",
    ],
    delivery: "Typically live in 5 to 8 working days.",
    cta: { label: "Get it launched", href: "/contact?intent=launch" },
  },
  {
    id: "custom",
    index: "03",
    name: "Custom",
    short: "Custom build",
    priceFrom: 75000,
    priceNote: "starting, scoped per project",
    who: "Brands who want the craft of one of the five, shaped entirely around their own product, story and commerce.",
    includes: [
      "A work chosen as the structural starting point",
      "New identity, typography, colour and art direction",
      "Rewritten information architecture and page set",
      "Custom motion and interaction language",
      "3D or WebGL product experiences where they earn their place",
      "CMS, e-commerce or bespoke back-end integration",
      "Performance budgets held through to launch",
      "Deployment, handover and clean source code",
    ],
    delivery: "Scoped in a call. Most projects run 3 to 6 weeks.",
    cta: { label: "Start a custom project", href: "/custom-build" },
    emphasis: true,
  },
  {
    id: "exclusive",
    index: "04",
    name: "Exclusive",
    short: "Exclusive licence",
    priceFrom: null,
    priceNote: "by quotation",
    who: "Brands who need certainty that no competitor can ever run the same design.",
    includes: [
      "Sole ownership of the design",
      "The work is permanently withdrawn from the collection",
      "Removed from this site and never sold again",
      "Full source code and design files transferred",
      "Written exclusivity agreement",
      "Custom build and launch included in scope",
    ],
    delivery: "Quoted per work. Availability is not guaranteed.",
    cta: { label: "Request exclusivity", href: "/contact?intent=exclusive" },
  },
];

export const carePlan = {
  id: "care" as const,
  name: "Care Plan",
  priceFrom: 15000,
  priceNote: "per month, cancel anytime",
  who: "Brands who want the site to keep improving after launch instead of quietly ageing.",
  includes: [
    "Content and section updates",
    "Dependency, security and framework upkeep",
    "Performance monitoring and regression fixes",
    "Small feature and animation additions each month",
    "Priority response within one working day",
  ],
  cta: { label: "Add a care plan", href: "/contact?intent=care" },
};

/**
 * The credit offer. This is the bridge from the secondary conversion
 * path (buy source) to the primary one (commission a build), so it is
 * surfaced wherever a source price is shown.
 */
export const upgradeCredit = {
  windowDays: 30,
  headline: "Source code credited toward a custom build",
  body: `Buy the source code and upgrade to a custom build within ${30} days, and we credit the full source-code price against your project. Nothing is wasted by starting small.`,
} as const;

/** Budget bands offered in the enquiry form, aligned to the tiers above. */
export const budgetBands = [
  "Under ₹25,000",
  "₹25,000 — ₹75,000",
  "₹75,000 — ₹1,50,000",
  "₹1,50,000 — ₹3,00,000",
  "₹3,00,000+",
  "Not sure yet",
] as const;

export const serviceOptions = [
  "Source code only",
  "Setup & deployment",
  "Full customisation",
  "Exclusive licence",
  "New pages or sections",
  "E-commerce integration",
  "CMS integration",
  "3D / WebGL product experience",
  "Copywriting",
  "Ongoing care plan",
] as const;

const inr = new Intl.NumberFormat(site.market.locale, {
  style: "currency",
  currency: site.market.currency,
  maximumFractionDigits: 0,
});

/** ₹9,999 — used for all price display so formatting stays consistent. */
export function formatPrice(value: number | null): string {
  if (value === null) return "On request";
  return inr.format(value);
}

/** "From ₹75,000" */
export function formatFrom(value: number | null): string {
  if (value === null) return "By quotation";
  return `From ${inr.format(value)}`;
}

export function getEngagement(id: EngagementId): Engagement | undefined {
  return engagements.find((e) => e.id === id);
}
