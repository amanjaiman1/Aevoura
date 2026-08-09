import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { templates } from "@/lib/templates";
import { formatPrice, upgradeCredit } from "@/lib/pricing";
import { buyFaq } from "@/lib/faq";
import { PlanCards } from "@/components/commerce/Pricing";
import { Faq } from "@/components/templates/Faq";
import { ActionLink } from "@/components/primitives/ActionLink";
import { Eyebrow, CheckMark } from "@/components/primitives/Marks";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Source code from ₹9,999, setup and launch from ₹25,000, custom builds from ₹75,000, care plans from ₹15,000 a month. One-time prices, full source ownership.",
  alternates: { canonical: "/pricing" },
};

/** An honest comparison. Pretending the alternatives are worthless would not
 *  be believable to anyone who has actually bought a website before. */
const comparison = [
  {
    label: "A marketplace theme",
    price: "₹2,000 — ₹6,000",
    points: [
      "Cheap and instant",
      "Thousands of other sites look identical",
      "Support depends on an anonymous author",
      "Usually built on page builders",
    ],
    tone: "muted" as const,
  },
  {
    label: "Aevoura template",
    price: "₹9,999 — ₹75,000",
    points: [
      "One of a handful, not one of ten thousand",
      "Real engineering, no page builder",
      "The people who built it answer you",
      "Upgrade path to a custom build",
    ],
    tone: "accent" as const,
  },
  {
    label: "An agency from scratch",
    price: "₹3,00,000+",
    points: [
      "Everything bespoke",
      "Weeks spent finding a direction",
      "Budget goes into discovery",
      "Two to four months to launch",
    ],
    tone: "muted" as const,
  },
];

export default function PricingPage() {
  const cheapest = Math.min(...templates.map((t) => t.sourcePrice));

  return (
    <>
      <section className="shell pt-10 pb-8 sm:pt-14">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow>Pricing</Eyebrow>
            <h1 className="mt-4 font-display text-[clamp(2.25rem,4.4vw,3.5rem)] leading-[1.04] font-bold tracking-[-0.03em] text-ink">
              One-time prices. Full ownership.
            </h1>
            <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-ink-soft">
              Every option below includes the complete source code and a licence
              you keep forever. No subscriptions, no seats, no licence key that
              can be switched off.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
            <ActionLink href="/buy" variant="primary" size="lg">
              Place an order
            </ActionLink>
            <ActionLink href="/templates" variant="outline" size="lg">
              See templates
            </ActionLink>
          </div>
        </div>
      </section>

      <section className="shell pb-12" aria-label="Plans">
        <PlanCards />

        <div className="mt-6 flex flex-wrap items-center gap-3 rounded-lg bg-endorse-tint px-6 py-5">
          <CheckMark className="text-endorse" />
          <p className="text-[0.9375rem] text-ink-soft">
            <span className="font-bold text-ink">{upgradeCredit.headline}.</span>{" "}
            {upgradeCredit.body.replace(upgradeCredit.headline, "").trim()}
          </p>
        </div>
      </section>

      {/* ── comparison ── */}
      <section className="shell section-y" aria-labelledby="compare-title">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow>Where this sits</Eyebrow>
            <h2
              id="compare-title"
              className="mt-4 font-display text-display font-bold text-ink"
            >
              Cheaper than an agency. Not as cheap as a theme.
            </h2>
          </div>
          <p className="text-[1rem] leading-relaxed text-ink-muted lg:col-span-5">
            If a ₹3,000 theme genuinely fits what you sell, buy it and keep your
            money. This is for when it does not.
          </p>
        </div>

        <ul className="mt-10 grid gap-4 lg:grid-cols-3">
          {comparison.map((column) => (
            <li
              key={column.label}
              className={
                column.tone === "accent"
                  ? "card border-2 border-accent p-6 sm:p-7"
                  : "card p-6 sm:p-7"
              }
            >
              <p
                className={`eyebrow ${
                  column.tone === "accent" ? "text-accent" : "text-ink-muted"
                }`}
              >
                {column.label}
              </p>
              <p className="num mt-3 font-display text-[1.5rem] font-bold text-ink">
                {column.price}
              </p>
              <ul className="mt-5 space-y-2.5">
                {column.points.map((point) => (
                  <li key={point} className="flex gap-2.5">
                    <span
                      aria-hidden="true"
                      className={`mt-2 block h-1 w-1 shrink-0 rounded-full ${
                        column.tone === "accent" ? "bg-accent" : "bg-ink-faint"
                      }`}
                    />
                    <span className="text-[0.875rem] leading-snug text-ink-soft">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
              {column.tone === "accent" && (
                <div className="mt-6">
                  <ActionLink href="/buy" variant="primary" full>
                    Buy from {formatPrice(cheapest)}
                  </ActionLink>
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* ── what is not included ── */}
      <section className="shell pb-12">
        <div className="card p-7 sm:p-10">
          <Eyebrow>Being straight with you</Eyebrow>
          <h2 className="mt-4 font-display text-[clamp(1.5rem,2.4vw,2rem)] font-bold text-ink">
            What the price does not include.
          </h2>
          <ul className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {[
              {
                t: "Hosting and domains",
                d: "Paid directly to your provider, in your name. Usually ₹500–₹2,000 a month. We configure it either way.",
              },
              {
                t: "Commercially licensed fonts",
                d: "Open-source families are included. If you want a paid typeface, that licence has to be bought in your name.",
              },
              {
                t: "Photography and video",
                d: "We art-direct and place it. Shooting it is a separate cost if you need it.",
              },
              {
                t: "Third-party services",
                d: "Shopify, a CMS or email tooling are billed by them, not us. We set them up in your accounts.",
              },
            ].map((item) => (
              <li key={item.t}>
                <p className="font-display text-[1rem] font-bold text-ink">{item.t}</p>
                <p className="mt-1.5 text-[0.875rem] leading-relaxed text-ink-muted">
                  {item.d}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-7 border-t border-rule pt-5 text-[0.875rem] text-ink-muted">
            Taxes as applicable. International clients can be invoiced in USD.{" "}
            <Link href="/license" className="link-rule font-bold text-ink">
              Read the licence terms
            </Link>
          </p>
        </div>
      </section>

      <Faq
        items={buyFaq}
        eyebrow="Payment"
        title="How buying works."
        lead={`Anything unclear, ask before you spend — ${site.contact.email}.`}
      />
    </>
  );
}
