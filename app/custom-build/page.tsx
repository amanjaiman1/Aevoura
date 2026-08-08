import type { Metadata } from "next";
import Link from "next/link";

import { site } from "@/lib/site";
import { works, getWork } from "@/lib/works";
import { engagements, formatFrom, upgradeCredit } from "@/lib/pricing";
import { customBuildFaq } from "@/lib/faq";

import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { EngagementModels } from "@/components/commerce/EngagementModels";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Faq } from "@/components/work/Faq";
import { LineMask } from "@/components/primitives/LineMask";
import { Reveal } from "@/components/primitives/Reveal";
import { ActionLink } from "@/components/primitives/ActionLink";
import { RegistrationMark, SectionLabel, Arrow } from "@/components/primitives/Marks";

export const metadata: Metadata = {
  title: "Custom Build — start with one of the five",
  description:
    "Exceptional starting points without the limitations of an off-the-shelf template. Identity, content, motion, commerce and deployment rebuilt around your brand.",
  alternates: { canonical: "/custom-build" },
};

/** Intent from a CTA elsewhere on the site pre-selects the right services. */
const intentServices: Record<string, string[]> = {
  source: ["Source code only"],
  launch: ["Setup & deployment"],
  custom: ["Full customisation"],
  exclusive: ["Exclusive licence"],
  care: ["Ongoing care plan"],
  commerce: ["E-commerce integration"],
};

const changeable = [
  {
    title: "Identity and visual language",
    body: "Logo, marks, art direction, photographic treatment, illustration. The build stops looking like the original and starts looking like you.",
  },
  {
    title: "Typography and colour",
    body: "New families, new scale, new palette. These are centralised tokens, so a rebrand is a considered decision rather than a rebuild.",
  },
  {
    title: "Copy and imagery",
    body: "Your words and your assets placed properly — or written and art-directed with you if they do not exist yet.",
  },
  {
    title: "Layout and architecture",
    body: "Page order, navigation, section structure and hierarchy rebuilt around what you actually sell and how people actually decide.",
  },
  {
    title: "Motion language",
    body: "GSAP timings, entrances and transitions re-authored, reduced or removed. Restraint is a valid brief and we will tell you when it is the right one.",
  },
  {
    title: "3D and WebGL",
    body: "Three.js product viewers, configurators and material studies — added where they answer a real buying question, not for the showreel.",
  },
  {
    title: "CMS and commerce",
    body: "Shopify, headless commerce, or a CMS your team edits without a developer. Product data, inventory, carts, subscriptions.",
  },
  {
    title: "New pages and flows",
    body: "Anything the original lacks: configurators, booking, quote flows, locations, documentation, careers, journals.",
  },
  {
    title: "Hosting and deployment",
    body: "Domains, DNS, hosting, analytics, forms, redirects, search metadata. Configured, verified and documented for your team.",
  },
  {
    title: "Maintenance and iteration",
    body: "A monthly plan for upkeep and steady improvement, or a clean handover and no ongoing relationship. Both are fine.",
  },
];

const comparison = [
  {
    label: "A template",
    lines: [
      "Cheap and immediate",
      "Recognisable to anyone who has seen it before",
      "You adapt to its structure",
      "Support ends at installation",
    ],
    tone: "muted" as const,
  },
  {
    label: "An agency from zero",
    lines: [
      "Three weeks discovering a direction",
      "Budget spent before anything is built",
      "Quality depends on who is free that month",
      "Long timelines, moving scope",
    ],
    tone: "muted" as const,
  },
  {
    label: "This",
    lines: [
      "A finished engineering standard as the floor",
      "Budget spent on what makes it yours",
      "The structure adapts to you",
      "Optional support that keeps improving it",
    ],
    tone: "accent" as const,
  },
];

export default async function CustomBuildPage({
  searchParams,
}: {
  searchParams: Promise<{ work?: string; intent?: string }>;
}) {
  const params = await searchParams;
  const selected = params.work ? getWork(params.work) : undefined;
  const defaultServices = params.intent
    ? (intentServices[params.intent] ?? ["Full customisation"])
    : ["Full customisation"];
  const custom = engagements.find((e) => e.id === "custom")!;

  return (
    <>
      {/* ── head ── */}
      <section className="shell" aria-labelledby="cb-title">
        <div className="flex items-center justify-between gap-4 border-b border-rule py-4">
          <span className="meta text-accent">CUSTOM BUILD</span>
          <div className="flex items-center gap-4 sm:gap-8">
            <RegistrationMark className="hidden sm:block" />
            <span className="meta text-ink-muted">
              {formatFrom(custom.priceFrom).toUpperCase()}
            </span>
          </div>
        </div>

        <div className="grid gap-y-10 pt-12 pb-16 lg:grid-cols-12 lg:gap-x-8 lg:pt-16">
          <div className="lg:col-span-7">
            <h1 id="cb-title">
              <LineMask
                as="span"
                mode="exhibition"
                className="block font-display text-statement tracking-[-0.02em] text-ink"
                lines={[
                  "An exceptional",
                  "starting point.",
                  <>
                    None of the{" "}
                    <span className="italic text-accent">limits.</span>
                  </>,
                ]}
              />
            </h1>
          </div>

          <div className="lg:col-span-4 lg:col-start-9 lg:pt-3">
            <Reveal as="p" variant="up" mode="archive" className="text-lede text-ink-soft">
              A custom build takes one of the five as its structural and
              engineering foundation, then rebuilds everything above it around
              your brand. You get the standard of a long agency engagement
              without paying for the part where nobody knows what it should
              look like yet.
            </Reveal>

            <Reveal
              variant="rise"
              mode="commerce"
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            >
              <ActionLink href="#enquiry" variant="accent">
                Tell us what you need
              </ActionLink>
              <ActionLink href="#engagement" variant="outline">
                See engagement options
              </ActionLink>
            </Reveal>

            {selected && (
              <Reveal
                variant="rise"
                mode="archive"
                className="mt-8 border-l-2 border-accent bg-paper-raised px-5 py-4"
              >
                <p className="meta text-accent">
                  STARTING FROM WORK {selected.number}
                </p>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">
                  <span className="text-ink">{selected.name}</span> is selected
                  below. {selected.philosophy}
                </p>
                <Link
                  href={`/collection/${selected.slug}`}
                  className="link-rule mt-3 inline-block meta text-ink"
                >
                  Review the work <Arrow />
                </Link>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* ── honest comparison ── */}
      <section
        className="shell border-t border-rule section-y"
        aria-labelledby="compare-title"
      >
        <div className="grid gap-y-8 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-4">
            <SectionLabel index="—">WHERE THIS SITS</SectionLabel>
            <h2 id="compare-title" className="mt-6">
              <LineMask
                as="span"
                mode="exhibition"
                className="block font-display text-headline tracking-[-0.015em] text-ink"
                lines={["Three ways to get", "a website. Only one", "of them is ours."]}
              />
            </h2>
            <Reveal
              as="p"
              variant="rise"
              mode="archive"
              className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-ink-muted"
            >
              We are not pretending the other two are worthless. If a template
              genuinely fits, buy the source and keep your money.
            </Reveal>
          </div>

          <Reveal
            as="ul"
            variant="rise"
            mode="archive"
            group
            className="grid gap-x-8 border-t border-rule sm:grid-cols-3 lg:col-span-7 lg:col-start-6"
          >
            {comparison.map((column) => (
              <li
                key={column.label}
                className={`border-b py-7 sm:border-b-0 sm:pb-0 ${
                  column.tone === "accent"
                    ? "border-accent sm:border-t-2 sm:border-t-accent sm:pt-6"
                    : "border-rule sm:border-t sm:border-t-rule sm:pt-6"
                }`}
              >
                <h3
                  className={`meta ${
                    column.tone === "accent" ? "text-accent" : "text-ink-muted"
                  }`}
                >
                  {column.label.toUpperCase()}
                </h3>
                <ul className="mt-4 space-y-3">
                  {column.lines.map((line) => (
                    <li
                      key={line}
                      className={`text-[0.9375rem] leading-snug ${
                        column.tone === "accent" ? "text-ink" : "text-ink-muted"
                      }`}
                    >
                      {line}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── what can change ── */}
      <section
        className="shell border-t border-rule section-y"
        aria-labelledby="changeable-title"
      >
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel index="—">SCOPE</SectionLabel>
            <h2 id="changeable-title" className="mt-5">
              <LineMask
                as="span"
                mode="exhibition"
                className="block font-display text-headline tracking-[-0.015em] text-ink"
                lines={["What can change:", "all of it."]}
              />
            </h2>
          </div>
          <p className="max-w-sm text-[0.9375rem] leading-relaxed text-ink-muted">
            The starting point is a floor, not a ceiling. Some projects keep the
            structure and change the face. Others keep only the engineering
            standard.
          </p>
        </div>

        <Reveal
          as="ol"
          variant="rise"
          mode="archive"
          group
          className="mt-12 grid border-t border-rule sm:grid-cols-2 lg:grid-cols-5"
        >
          {changeable.map((item, i) => (
            <li
              key={item.title}
              className="border-b border-rule py-7 sm:px-6 sm:first:pl-0 lg:border-l lg:first:border-l-0 lg:[&:nth-child(6)]:border-l-0"
            >
              <span className="meta text-ink-muted tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-[1.3125rem] leading-tight text-ink">
                {item.title}
              </h3>
              <p className="mt-3 text-[0.875rem] leading-relaxed text-ink-muted">
                {item.body}
              </p>
            </li>
          ))}
        </Reveal>
      </section>

      <HowItWorks />

      <EngagementModels />

      {/* ── enquiry ── */}
      <section
        id="enquiry"
        className="shell scroll-mt-20 border-t border-rule section-y"
        aria-labelledby="enquiry-title"
      >
        <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-4">
            <SectionLabel index="—">ENQUIRY</SectionLabel>
            <h2 id="enquiry-title" className="mt-6">
              <LineMask
                as="span"
                mode="exhibition"
                className="block font-display text-headline tracking-[-0.015em] text-ink"
                lines={["Tell us what", "you need."]}
              />
            </h2>
            <Reveal
              as="p"
              variant="up"
              mode="archive"
              className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-ink-muted"
            >
              Two fields are required. Everything else helps us give you a real
              number instead of a range. If a project is not a fit we will say
              so and suggest where else to look.
            </Reveal>

            <Reveal
              variant="rise"
              mode="archive"
              className="mt-8 border-t border-rule pt-6"
            >
              <p className="meta text-ink-muted">OR WRITE DIRECTLY</p>
              <a
                href={`mailto:${site.contact.email}?subject=Project%20enquiry`}
                className="link-rule mt-2 inline-block text-[0.9375rem] break-all text-ink"
              >
                {site.contact.email}
              </a>
              <p className="mt-4 meta text-ink-muted">
                {site.contact.timezone} · {site.market.internationalNote}
              </p>
            </Reveal>

            <Reveal
              variant="rise"
              mode="archive"
              className="mt-8 border-l-2 border-accent bg-paper-raised px-5 py-4"
            >
              <p className="meta text-accent">
                {upgradeCredit.windowDays}-DAY UPGRADE CREDIT
              </p>
              <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-soft">
                Already bought the source code? Its full price comes off your
                custom build if you upgrade within {upgradeCredit.windowDays}{" "}
                days.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <EnquiryForm
              defaultWork={selected?.slug ?? ""}
              defaultServices={defaultServices}
            />
          </div>
        </div>
      </section>

      <Faq
        items={customBuildFaq}
        index="—"
        title={["The questions", "we always get."]}
        lead={`If yours is not here, ask it — ${site.contact.email}.`}
        id="custom-faq"
      />

      {/* ── closing ── */}
      <section className="on-void grain relative overflow-hidden" aria-labelledby="cb-close">
        <span aria-hidden="true" className="grain-layer opacity-[0.12]" />
        <div className="shell relative section-y">
          <div className="grid gap-y-8 lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-8">
              <span className="meta text-chalk-muted">
                EDITION {site.edition} — 0{works.length} WORKS
              </span>
              <h2 id="cb-close" className="mt-7">
                <LineMask
                  as="span"
                  mode="exhibition"
                  className="block font-display text-statement tracking-[-0.02em] text-chalk"
                  lines={[
                    "We would rather build",
                    <>
                      five good things than{" "}
                      <span className="italic text-accent">five hundred.</span>
                    </>,
                  ]}
                />
              </h2>
            </div>
            <div className="lg:col-span-3 lg:col-start-10 lg:pt-4">
              <Reveal variant="rise" mode="commerce" group className="flex flex-col gap-3">
                <ActionLink href="/collection" variant="outline" tone="void" full>
                  Browse the collection
                </ActionLink>
                <ActionLink href="/process" variant="outline" tone="void" full>
                  How we work
                </ActionLink>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
