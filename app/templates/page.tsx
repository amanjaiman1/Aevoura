import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { templates } from "@/lib/templates";
import { formatPrice } from "@/lib/pricing";
import { templateFaq } from "@/lib/faq";
import { TemplateCard } from "@/components/templates/TemplateCard";
import { PricingRows } from "@/components/commerce/Pricing";
import { Faq } from "@/components/templates/Faq";
import { Reveal } from "@/components/primitives/Reveal";
import { ActionLink } from "@/components/primitives/ActionLink";
import { Eyebrow, CheckMark, Badge } from "@/components/primitives/Marks";

export const metadata: Metadata = {
  title: "All templates",
  description: `Compare all ${site.templateCount} premium website templates — jewellery, automotive, architecture, skincare and technology. From ₹9,999 with full source code.`,
  alternates: { canonical: "/templates" },
};

export default function TemplatesPage() {
  const cheapest = Math.min(...templates.map((t) => t.sourcePrice));

  return (
    <>
      {/* ── head ── */}
      <section className="shell pt-10 pb-8 sm:pt-14">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow>Templates</Eyebrow>
            <h1 className="mt-4 font-display text-[clamp(2.25rem,4.4vw,3.5rem)] leading-[1.04] font-bold tracking-[-0.03em] text-ink">
              {site.templateCount} templates, five kinds of business.
            </h1>
            <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-ink-soft">
              Each is a complete build, not a landing page. Open a live demo,
              read what is included, and buy the one that fits — from{" "}
              <span className="num font-bold text-ink">{formatPrice(cheapest)}</span>.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
            <ActionLink href="/buy" variant="primary" size="lg">
              Buy a template
            </ActionLink>
            <ActionLink href="/custom-build" variant="outline" size="lg">
              Custom build
            </ActionLink>
          </div>
        </div>
      </section>

      {/* ── comparison table ── */}
      {/* Desktop only: on a phone the cards below carry the same facts
          without a horizontally scrolling table. */}
      <section className="shell hidden pb-10 md:block" aria-labelledby="compare-title">
        <h2 id="compare-title" className="sr-only">
          Compare templates at a glance
        </h2>
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[46rem] border-collapse text-left">
              <caption className="sr-only">
                Templates with industry, best use, price and demo availability
              </caption>
              <thead>
                <tr className="border-b border-rule">
                  <th scope="col" className="eyebrow px-5 py-4 text-ink-muted sm:px-7">
                    Template
                  </th>
                  <th scope="col" className="eyebrow px-5 py-4 text-ink-muted">
                    Best for
                  </th>
                  <th scope="col" className="eyebrow px-5 py-4 text-ink-muted">
                    Source
                  </th>
                  <th scope="col" className="eyebrow px-5 py-4 text-ink-muted">
                    Built for you
                  </th>
                  <th scope="col" className="eyebrow px-5 py-4 text-right text-ink-muted sm:px-7">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rule-soft">
                {templates.map((template) => (
                  <tr key={template.slug} className="transition-colors hover:bg-hover">
                    <th scope="row" className="px-5 py-4 align-top sm:px-7">
                      <Link
                        href={`/templates/${template.slug}`}
                        className="flex items-center gap-3"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element -- pre-optimised SVG poster */}
                        <img
                          src={template.poster}
                          alt=""
                          width={template.posterAspect[0]}
                          height={template.posterAspect[1]}
                          loading="lazy"
                          sizes="80px"
                          className="h-11 w-20 shrink-0 rounded-md object-cover"
                        />
                        <span>
                          <span className="flex items-center gap-2">
                            <span className="font-display text-[1rem] font-bold text-ink">
                              {template.name}
                            </span>
                            {template.liveDemo && <Badge tone="accent">Demo</Badge>}
                          </span>
                          <span className="block text-[0.8125rem] font-normal text-ink-muted">
                            {template.industry}
                          </span>
                        </span>
                      </Link>
                    </th>
                    <td className="px-5 py-4 align-top text-[0.875rem] text-ink-soft">
                      {template.bestFor.slice(0, 2).join(", ")}
                    </td>
                    <td className="num px-5 py-4 align-top text-[0.9375rem] font-bold text-ink">
                      {formatPrice(template.sourcePrice)}
                    </td>
                    <td className="num px-5 py-4 align-top text-[0.9375rem] text-ink-soft">
                      from {formatPrice(template.customFrom)}
                    </td>
                    <td className="px-5 py-4 text-right align-top sm:px-7">
                      <ActionLink
                        href={`/buy?template=${template.slug}`}
                        variant="primary"
                        size="sm"
                        arrow={false}
                      >
                        Buy
                      </ActionLink>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── full cards ── */}
      <section className="shell pb-12" aria-label="Templates in detail">
        <Reveal variant="up" mode="reveal" group className="grid gap-5">
          {templates.map((template, i) => (
            <TemplateCard
              key={template.slug}
              template={template}
              layout="wide"
              priority={i === 0}
              mirrored={i % 2 === 1}
            />
          ))}
        </Reveal>
      </section>

      {/* ── none fit ── */}
      <section className="shell pb-4">
        <div className="on-dark panel px-7 py-10 sm:px-10">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <Eyebrow tone="accent">If none of them fit</Eyebrow>
              <h2 className="mt-4 font-display text-[clamp(1.75rem,2.8vw,2.5rem)] leading-tight font-bold text-white">
                Five templates cannot cover every business. That is what custom
                builds are for.
              </h2>
              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                {[
                  "Start from the closest template",
                  "Or design from scratch",
                  "Same engineering standard",
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <CheckMark className="mt-0.5 text-accent" />
                    <span className="text-[0.875rem] text-chalk-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <ActionLink href="/custom-build" variant="primary" size="lg">
                Start a custom project
              </ActionLink>
            </div>
          </div>
        </div>
      </section>

      <PricingRows />

      <Faq
        items={templateFaq}
        eyebrow="Questions"
        title="Before you buy."
        lead={`Anything else, email ${site.contact.email}.`}
      />
    </>
  );
}
