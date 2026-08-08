/**
 * ENQUIRY PIPELINE
 *
 * There is no fake back end here and no pretend success state. The route
 * validates the payload, then hands it to whichever delivery provider is
 * configured through environment variables. If none is configured it says so
 * honestly, with a status the client can act on, and the form falls back to
 * a pre-filled email instead of silently swallowing a lead.
 *
 * ── CONFIGURATION ─────────────────────────────────────────────────────────
 * Pick one. Both can be set; the webhook is tried first.
 *
 *   Option A — any webhook (Formspree, Zapier, Make, n8n, Slack, your CRM)
 *     ENQUIRY_WEBHOOK_URL=https://...
 *     ENQUIRY_WEBHOOK_SECRET=optional, sent as X-Aevoura-Signature
 *
 *   Option B — transactional email via Resend (REST, no SDK dependency)
 *     RESEND_API_KEY=re_...
 *     ENQUIRY_TO_EMAIL=you@yourdomain.com
 *     ENQUIRY_FROM_EMAIL=enquiries@yourdomain.com   (must be a verified sender)
 *
 * Nothing else in the codebase needs to change to swap providers.
 * ──────────────────────────────────────────────────────────────────────────
 */

import { budgetBands, serviceOptions } from "./pricing";
import { works } from "./works";
import { site } from "./site";

export type EnquiryPayload = {
  name: string;
  email: string;
  company: string;
  website: string;
  /** Work slug, or "" for none / not sure. */
  work: string;
  services: string[];
  budget: string;
  launchDate: string;
  message: string;
  /** Anti-spam. Must be empty. */
  honeypot?: string;
  /** Client render timestamp; submissions faster than 2s are treated as bots. */
  renderedAt?: number;
};

export type FieldErrors = Partial<Record<keyof EnquiryPayload, string>>;

export type EnquiryResult =
  | { ok: true; reference: string; delivered: boolean; mode: string }
  | { ok: false; status: number; message: string; errors?: FieldErrors };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX = { name: 120, email: 200, company: 160, website: 300, message: 4000 };

export function validateEnquiry(input: unknown): {
  data?: EnquiryPayload;
  errors?: FieldErrors;
} {
  if (typeof input !== "object" || input === null) {
    return { errors: { name: "Something went wrong. Please try again." } };
  }
  const raw = input as Record<string, unknown>;
  const str = (key: string) => (typeof raw[key] === "string" ? (raw[key] as string).trim() : "");

  const data: EnquiryPayload = {
    name: str("name").slice(0, MAX.name),
    email: str("email").slice(0, MAX.email),
    company: str("company").slice(0, MAX.company),
    website: str("website").slice(0, MAX.website),
    work: str("work"),
    services: Array.isArray(raw.services)
      ? (raw.services as unknown[])
          .filter((s): s is string => typeof s === "string")
          .filter((s) => (serviceOptions as readonly string[]).includes(s))
      : [],
    budget: str("budget"),
    launchDate: str("launchDate"),
    message: str("message").slice(0, MAX.message),
    honeypot: str("honeypot"),
    renderedAt: typeof raw.renderedAt === "number" ? raw.renderedAt : undefined,
  };

  const errors: FieldErrors = {};

  if (data.name.length < 2) errors.name = "Please tell us your name.";
  if (!EMAIL.test(data.email)) errors.email = "Please enter an email address we can reply to.";
  if (data.message.length < 20) {
    errors.message =
      "A couple of sentences about the project, please — enough for us to give you a real answer.";
  }
  if (data.budget && !(budgetBands as readonly string[]).includes(data.budget)) {
    errors.budget = "Please choose one of the listed ranges.";
  }
  if (data.work && !works.some((w) => w.slug === data.work)) {
    errors.work = "That work is not in the collection.";
  }
  if (data.website && !/^([a-z]+:\/\/)?[^\s.]+\.[^\s]{2,}$/i.test(data.website)) {
    errors.website = "That does not look like a web address.";
  }

  if (Object.keys(errors).length) return { errors };
  return { data };
}

/** Human-readable reference so an enquiry can be quoted in a reply. */
function makeReference(): string {
  const now = new Date();
  const stamp = [
    now.getUTCFullYear().toString().slice(2),
    String(now.getUTCMonth() + 1).padStart(2, "0"),
    String(now.getUTCDate()).padStart(2, "0"),
  ].join("");
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `AEV-${stamp}-${rand}`;
}

function asPlainText(data: EnquiryPayload, reference: string): string {
  const work = works.find((w) => w.slug === data.work);
  return [
    `New enquiry — ${site.name}`,
    `Reference: ${reference}`,
    "",
    `Name:      ${data.name}`,
    `Email:     ${data.email}`,
    `Company:   ${data.company || "—"}`,
    `Website:   ${data.website || "—"}`,
    `Work:      ${work ? `${work.name} (${work.number})` : "None selected"}`,
    `Services:  ${data.services.length ? data.services.join(", ") : "—"}`,
    `Budget:    ${data.budget || "—"}`,
    `Launch by: ${data.launchDate || "—"}`,
    "",
    "Project description",
    "-------------------",
    data.message,
  ].join("\n");
}

async function viaWebhook(
  data: EnquiryPayload,
  reference: string
): Promise<EnquiryResult | null> {
  const url = process.env.ENQUIRY_WEBHOOK_URL;
  if (!url) return null;

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (process.env.ENQUIRY_WEBHOOK_SECRET) {
    headers["X-Aevoura-Signature"] = process.env.ENQUIRY_WEBHOOK_SECRET;
  }

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({
      reference,
      receivedAt: new Date().toISOString(),
      source: site.domain,
      ...data,
      honeypot: undefined,
      renderedAt: undefined,
      summary: asPlainText(data, reference),
    }),
  });

  if (!response.ok) {
    return {
      ok: false,
      status: 502,
      message: "Our enquiry service rejected that. Please email us directly.",
    };
  }
  return { ok: true, reference, delivered: true, mode: "webhook" };
}

async function viaResend(
  data: EnquiryPayload,
  reference: string
): Promise<EnquiryResult | null> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO_EMAIL || site.contact.email;
  const from = process.env.ENQUIRY_FROM_EMAIL;
  if (!key || !from) return null;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: data.email,
      subject: `Enquiry ${reference} — ${data.name}${data.company ? ` · ${data.company}` : ""}`,
      text: asPlainText(data, reference),
    }),
  });

  if (!response.ok) {
    return {
      ok: false,
      status: 502,
      message: "We could not send that just now. Please email us directly.",
    };
  }
  return { ok: true, reference, delivered: true, mode: "email" };
}

/**
 * Deliver an enquiry. Returns an honest result: `delivered: false` when no
 * provider is configured, so the interface can offer the email fallback
 * rather than showing a success screen that means nothing.
 */
export async function deliverEnquiry(data: EnquiryPayload): Promise<EnquiryResult> {
  // Spam gates. Silent success: bots get a 200 and nothing is delivered.
  if (data.honeypot) {
    return { ok: true, reference: makeReference(), delivered: false, mode: "discarded" };
  }
  if (data.renderedAt && Date.now() - data.renderedAt < 2000) {
    return { ok: true, reference: makeReference(), delivered: false, mode: "discarded" };
  }

  const reference = makeReference();

  try {
    const webhook = await viaWebhook(data, reference);
    if (webhook) return webhook;

    const email = await viaResend(data, reference);
    if (email) return email;
  } catch {
    return {
      ok: false,
      status: 502,
      message: "We could not reach our enquiry service. Please email us directly.",
    };
  }

  // Nothing configured. Say so rather than lying.
  console.warn(
    `[aevoura] Enquiry ${reference} received but no delivery provider is configured. ` +
      `Set ENQUIRY_WEBHOOK_URL or RESEND_API_KEY — see lib/enquiry.ts.\n` +
      asPlainText(data, reference)
  );
  return { ok: false, status: 501, message: "not-configured" };
}
