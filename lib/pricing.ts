/**
 * Commercial structure.
 *
 * Prices are plain numbers in INR so they can be reformatted or converted
 * centrally. Change a number here and it updates on the homepage, the
 * pricing page, every template page, and the order form.
 */

import { site } from "./site";
import type { IconName } from "@/components/primitives/Marks";

export type PlanId = "source" | "launch" | "custom" | "exclusive" | "care";

export type Plan = {
  id: PlanId;
  /** Shown in lists and on the order form. */
  name: string;
  /** One line, for the order summary. */
  summary: string;
  icon: IconName;
  /** null = quoted rather than fixed. */
  price: number | null;
  /** true when `price` is a starting point rather than the final figure. */
  from: boolean;
  /** e.g. "one-time", "per month" */
  unit: string;
  who: string;
  includes: string[];
  delivery: string;
  /** Highlighted as the most common choice. */
  popular?: boolean;
  /** Given the most visual weight — the primary commercial route. */
  emphasis?: boolean;
};

export const plans: Plan[] = [
  {
    id: "source",
    name: "Source Code",
    summary: "The full build, yours to install and run",
    icon: "cart",
    price: 9999,
    from: false,
    unit: "one-time",
    who: "Developers and in-house teams who want the build and will take it from there.",
    includes: [
      "Complete source repository",
      "Every page, component and animation, commented",
      "Design tokens and placeholder assets",
      "Setup documentation",
      "Licence for one production site",
      "14 days of installation support by email",
    ],
    delivery: "Repository access within 24 hours of payment.",
  },
  {
    id: "launch",
    name: "Setup & Launch",
    summary: "We put your content in and take it live",
    icon: "rocket",
    price: 25000,
    from: true,
    unit: "one-time",
    who: "Brands who like a template as it is and want it live, correctly, without hiring a developer.",
    includes: [
      "Everything in Source Code",
      "Your copy, images and products placed",
      "Logo, colour and typography set to your brand",
      "Domain, hosting and deployment configured",
      "Analytics, forms and search metadata connected",
      "Performance and cross-browser pass before handover",
    ],
    delivery: "Live in 5 to 8 working days.",
    popular: true,
  },
  {
    id: "custom",
    name: "Custom Build",
    summary: "Rebuilt around your brand, start to finish",
    icon: "layers",
    price: 75000,
    from: true,
    unit: "starting",
    who: "Brands who want the craft of one of the five shaped entirely around their own product and story.",
    includes: [
      "A template chosen as the structural starting point",
      "New identity, typography, colour and art direction",
      "Information architecture and page set rewritten",
      "Custom motion and interaction design",
      "3D or WebGL product experiences where they earn their place",
      "E-commerce, CMS or bespoke back-end integration",
      "Performance budgets held through to launch",
      "Deployment, handover and clean source code",
    ],
    delivery: "Scoped on a call. Most projects run 3 to 6 weeks.",
    emphasis: true,
  },
  {
    id: "exclusive",
    name: "Exclusive Licence",
    summary: "Buy it outright and remove it from sale",
    icon: "lock",
    price: null,
    from: false,
    unit: "quoted",
    who: "Brands who need certainty that no competitor can ever run the same design.",
    includes: [
      "Sole ownership of the design",
      "Permanently removed from this collection",
      "Delisted from the site and never sold again",
      "Full source code and design files transferred",
      "Written exclusivity agreement",
      "Custom build and launch included in scope",
    ],
    delivery: "Quoted per template. Availability is not guaranteed.",
  },
  {
    id: "care",
    name: "Care Plan",
    summary: "We keep it updated and improving",
    icon: "wrench",
    price: 15000,
    from: true,
    unit: "per month",
    who: "Brands who want the site to keep improving after launch instead of quietly ageing.",
    includes: [
      "Content and section updates",
      "Dependency, security and framework upkeep",
      "Performance monitoring and regression fixes",
      "Small feature and animation additions each month",
      "Priority response within one working day",
    ],
    delivery: "Month to month. Cancel any time.",
  },
];

export const buildPlans = plans.filter((p) => p.id !== "care");
export const carePlan = plans.find((p) => p.id === "care")!;

/**
 * The bridge from the cheap entry point to the real business: surfaced
 * anywhere a source price appears.
 */
export const upgradeCredit = {
  windowDays: 30,
  headline: "Source price credited toward a custom build",
  body: "Buy the source code and upgrade to a custom build within 30 days, and we credit the full source-code price against your project. Starting small costs you nothing.",
} as const;

export const budgetBands = [
  "Under ₹25,000",
  "₹25,000 — ₹75,000",
  "₹75,000 — ₹1,50,000",
  "₹1,50,000 — ₹3,00,000",
  "₹3,00,000+",
  "Not sure yet",
] as const;

export const addOnOptions = [
  "E-commerce / payments",
  "CMS so my team can edit",
  "3D / WebGL product viewer",
  "Extra pages or sections",
  "Copywriting",
  "Logo / brand identity",
  "Product photography direction",
  "Multi-language",
  "Ongoing care plan",
] as const;

const inr = new Intl.NumberFormat(site.market.locale, {
  style: "currency",
  currency: site.market.currency,
  maximumFractionDigits: 0,
});

/** ₹9,999 */
export function formatPrice(value: number | null): string {
  if (value === null) return "On request";
  return inr.format(value);
}

/** "From ₹75,000" / "₹9,999" / "By quotation" */
export function formatPlanPrice(plan: Plan): string {
  if (plan.price === null) return "By quotation";
  return `${plan.from ? "From " : ""}${inr.format(plan.price)}`;
}

export function getPlan(id: string): Plan | undefined {
  return plans.find((p) => p.id === id);
}
