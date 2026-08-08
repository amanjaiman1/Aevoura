import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { getTemplate, templates } from "@/lib/templates";
import { plans, formatPlanPrice, carePlan, formatPrice } from "@/lib/pricing";
import { quickMailto } from "@/lib/order";
import { ActionLink } from "@/components/primitives/ActionLink";
import { Eyebrow, MailIcon, CheckMark } from "@/components/primitives/Marks";

export const metadata: Metadata = {
  title: "Contact",
  description: `Questions about a template, a custom build, or an invoice — email ${site.contact.email} and get a reply from the person who does the work.`,
  alternates: { canonical: "/contact" },
};

/** Intent arrives from CTAs across the site and shapes the framing. */
const intents: Record<string, { label: string; heading: string; lead: string; subject: string }> = {
  demo: {
    label: "Private demo",
    heading: "See it running.",
    lead: "Not every template has a public demo yet. Ask and we will send a private link, or walk you through it on a call — including the parts that are hard to appreciate in a screenshot.",
    subject: "Private demo request",
  },
  exclusive: {
    label: "Exclusive licence",
    heading: "Take it off the market.",
    lead: "Tell us which template you want exclusively. We will quote it, and if you proceed the design is withdrawn from the collection permanently and transferred to you in writing.",
    subject: "Exclusive licence enquiry",
  },
  care: {
    label: "Care plan",
    heading: "Keep it improving.",
    lead: "Monthly upkeep, updates, performance monitoring and small additions. Works on sites we built and, after a review, on sites we did not.",
    subject: "Care plan enquiry",
  },
  invoice: {
    label: "Invoice",
    heading: "Billing and invoices.",
    lead: "Questions about an invoice, a payment method or a GST detail — send the reference number from your order email and we will sort it out.",
    subject: "Invoice question",
  },
};

const defaultIntent = {
  label: "Contact",
  heading: "Talk to the person who builds it.",
  lead: "No sales team, no chatbot, no drip sequence. Your email reaches the person who would do the work, and you get a written reply within one working day.",
  subject: "Question",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ intent?: string; template?: string }>;
}) {
  const params = await searchParams;
  const intent = (params.intent && intents[params.intent]) || defaultIntent;
  const selected = params.template ? getTemplate(params.template) : undefined;

  const subject = selected ? `${intent.subject} — ${selected.name}` : intent.subject;

  return (
    <>
      <section className="shell pt-10 pb-8 sm:pt-14">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow>{intent.label}</Eyebrow>
            <h1 className="mt-4 font-display text-[clamp(2.25rem,4.4vw,3.5rem)] leading-[1.04] font-bold tracking-[-0.03em] text-ink">
              {intent.heading}
            </h1>
            <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-ink-soft">
              {intent.lead}
            </p>
          </div>
        </div>
      </section>

      <section className="shell pb-16" aria-label="Contact details">
        <div className="grid gap-5 lg:grid-cols-12">
          {/* email card */}
          <div className="card p-7 sm:p-10 lg:col-span-7">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent-tint text-accent">
              <MailIcon className="h-6 w-6" />
            </span>
            <h2 className="mt-6 font-display text-[clamp(1.5rem,2.4vw,2rem)] font-bold text-ink">
              Email is the fastest route.
            </h2>
            <p className="mt-4 measure text-[1rem] leading-relaxed text-ink-soft">
              Everything runs through one inbox — orders, questions, invoices.
              You will get a reply {site.contact.responseTime} from{" "}
              {site.contact.location}, working {site.contact.timezone}.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <ActionLink
                href={quickMailto(subject)}
                variant="primary"
                size="lg"
                icon={<MailIcon />}
                arrow={false}
              >
                {site.contact.email}
              </ActionLink>
              <ActionLink href="/buy" variant="outline" size="lg">
                Place an order instead
              </ActionLink>
            </div>

            <div className="mt-8 border-t border-rule pt-6">
              <p className="eyebrow text-ink-muted">Include this and we can answer properly</p>
              <ul className="mt-4 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                {[
                  "Which template you are looking at",
                  "What your business sells",
                  "Whether you have content ready",
                  "Your rough budget and deadline",
                ].map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <CheckMark className="mt-0.5 shrink-0 text-endorse" />
                    <span className="text-[0.875rem] leading-snug text-ink-soft">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {selected && (
              <div className="mt-8 flex items-center gap-4 rounded-lg bg-sunk p-4">
                {/* eslint-disable-next-line @next/next/no-img-element -- pre-optimised SVG poster */}
                <img
                  src={selected.poster}
                  alt=""
                  width={selected.posterAspect[0]}
                  height={selected.posterAspect[1]}
                  loading="lazy"
                  sizes="112px"
                  className="h-16 w-28 shrink-0 rounded-md object-cover"
                />
                <div className="min-w-0">
                  <p className="text-[0.75rem] font-bold text-ink-muted uppercase">
                    About
                  </p>
                  <p className="font-display text-[1.0625rem] font-bold text-ink">
                    {selected.name}
                  </p>
                  <Link
                    href={`/templates/${selected.slug}`}
                    className="link-rule text-[0.8125rem] font-bold text-accent"
                  >
                    Back to the template
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* price reference */}
          <div className="lg:col-span-5">
            <div className="card p-6 sm:p-7">
              <p className="eyebrow text-ink-muted">What things cost</p>
              <dl className="mt-4 divide-y divide-rule-soft">
                {plans
                  .filter((p) => p.id !== "care")
                  .map((plan) => (
                    <div
                      key={plan.id}
                      className="flex items-baseline justify-between gap-4 py-3"
                    >
                      <dt className="text-[0.9375rem] text-ink-soft">{plan.name}</dt>
                      <dd className="num text-[0.9375rem] font-bold whitespace-nowrap text-ink">
                        {formatPlanPrice(plan)}
                      </dd>
                    </div>
                  ))}
                <div className="flex items-baseline justify-between gap-4 py-3">
                  <dt className="text-[0.9375rem] text-ink-soft">{carePlan.name}</dt>
                  <dd className="num text-[0.9375rem] font-bold whitespace-nowrap text-ink">
                    {formatPrice(carePlan.price)}
                    <span className="font-normal text-ink-muted"> /mo</span>
                  </dd>
                </div>
              </dl>
              <div className="mt-5 flex flex-col gap-2.5 border-t border-rule-soft pt-5">
                <Link href="/pricing" className="link-rule text-[0.875rem] font-bold text-ink">
                  Full pricing details
                </Link>
                <Link href="/license" className="link-rule text-[0.875rem] font-bold text-ink">
                  Licence terms
                </Link>
              </div>
            </div>

            <div className="card mt-5 p-6 sm:p-7">
              <p className="eyebrow text-ink-muted">Jump straight in</p>
              <ul className="mt-4 space-y-2">
                {templates.slice(0, 3).map((t) => (
                  <li key={t.slug}>
                    <Link
                      href={`/buy?template=${t.slug}`}
                      className="flex items-center justify-between gap-3 rounded-md px-3 py-2.5 transition-colors hover:bg-sunk"
                    >
                      <span className="text-[0.9375rem] font-medium text-ink">
                        Buy {t.name}
                      </span>
                      <span className="num text-[0.8125rem] font-bold text-ink-muted">
                        {formatPrice(t.sourcePrice)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/templates"
                className="link-rule mt-4 inline-block text-[0.875rem] font-bold text-ink"
              >
                See all {site.templateCount} templates
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
