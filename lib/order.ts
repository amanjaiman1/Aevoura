/**
 * ORDER → EMAIL
 *
 * There is no payment gateway and no server storing orders. The order form
 * composes a complete, structured email and hands it to the visitor's mail
 * client addressed to us. That is the entire mechanism, and it is stated
 * plainly in the interface rather than disguised as a checkout.
 *
 * Why this is fine commercially: every one of these engagements needs a
 * conversation before money changes hands anyway — which template, which
 * plan, what content exists. The email *is* the first step, so removing a
 * card form removes a step rather than adding friction.
 *
 * Robustness matters more than elegance here, because `mailto:` can fail
 * silently — no mail client configured, a webmail-only user, a locked-down
 * browser. So every order also produces:
 *   · a plain-text summary for one-click copy to the clipboard
 *   · a Gmail compose URL, since most of our market is on Gmail
 * and the success screen shows all three routes.
 */

import { site } from "./site";
import { getPlan, formatPlanPrice, formatPrice } from "./pricing";
import { getTemplate } from "./templates";

export type OrderDetails = {
  /** Template slug. Required — the order form always has one selected. */
  template: string;
  /** Plan id. */
  plan: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  /** Extra services requested. */
  addOns: string[];
  budget: string;
  launchDate: string;
  notes: string;
};

/** Human-readable reference so an order can be quoted in a reply. */
export function makeOrderReference(date = new Date()): string {
  const stamp = [
    date.getFullYear().toString().slice(2),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("");
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `AEV-${stamp}-${rand}`;
}

/** Keep the mail body inside what mail clients reliably accept. */
const MAX_NOTES = 900;

function line(label: string, value: string): string {
  return `${label.padEnd(14)}${value || "—"}`;
}

export type ComposedOrder = {
  reference: string;
  subject: string;
  /** Plain text, also used for the clipboard fallback. */
  body: string;
  /** mailto: href */
  mailto: string;
  /** Gmail web compose href, for visitors with no desktop mail client. */
  gmail: string;
  /** What the customer is asking for, for the on-screen summary. */
  headline: string;
};

export function composeOrder(
  details: OrderDetails,
  reference = makeOrderReference()
): ComposedOrder {
  const template = getTemplate(details.template);
  const plan = getPlan(details.plan);

  const templateName = template ? `${template.name} (${template.number})` : "Not selected";
  const planName = plan?.name ?? "Not selected";
  const planPrice = plan ? formatPlanPrice(plan) : "—";

  // Source Code is the one fixed price; everything else is a starting point.
  const indicative =
    plan?.id === "source" && template
      ? formatPrice(template.sourcePrice)
      : planPrice;

  const notes =
    details.notes.length > MAX_NOTES
      ? `${details.notes.slice(0, MAX_NOTES)}\n\n[…continued — please ask me for the rest]`
      : details.notes;

  const subject = `Order ${reference} — ${template?.name ?? "Template"} · ${planName}`;

  const body = [
    `NEW ORDER — ${site.name}`,
    `Reference: ${reference}`,
    "",
    "── WHAT I WANT ─────────────────────────────",
    line("Template:", templateName),
    line("Plan:", planName),
    line("Indicative:", indicative),
    details.addOns.length ? line("Also need:", details.addOns.join(", ")) : null,
    details.budget ? line("Budget:", details.budget) : null,
    details.launchDate ? line("Launch by:", details.launchDate) : null,
    "",
    "── ABOUT ME ───────────────────────────────",
    line("Name:", details.name),
    line("Email:", details.email),
    line("Phone:", details.phone),
    line("Company:", details.company),
    line("Website:", details.website),
    "",
    "── DETAILS ────────────────────────────────",
    notes || "(none provided)",
    "",
    "───────────────────────────────────────────",
    `Sent from ${site.domain}. Please reply with an invoice and next steps.`,
  ]
    .filter((l) => l !== null)
    .join("\n");

  const to = site.contact.email;
  const mailto = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    to
  )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return {
    reference,
    subject,
    body,
    mailto,
    gmail,
    headline: `${template?.name ?? "Template"} · ${planName}`,
  };
}

/**
 * A short mailto for "just ask a question" links, where a full order body
 * would be inappropriate.
 */
export function quickMailto(subject: string, body?: string): string {
  const params = new URLSearchParams();
  params.set("subject", subject);
  if (body) params.set("body", body);
  return `mailto:${site.contact.email}?${params.toString().replace(/\+/g, "%20")}`;
}
