import { upgradeCredit } from "@/lib/pricing";
import { Reveal } from "@/components/primitives/Reveal";
import { LineMask } from "@/components/primitives/LineMask";
import { ActionLink } from "@/components/primitives/ActionLink";

/**
 * CUSTOM BUILD — the primary commercial route.
 *
 * Template sales are the entry point. This is the business. It gets the
 * largest type on the page, the only accent-filled button in the section,
 * and a plain list of exactly what changes — because vagueness is what makes
 * buyers assume they are being sold a re-skin.
 */

const scope = [
  {
    index: "01",
    title: "Brand adaptation",
    body: "Identity, typography, colour, imagery and tone rebuilt around your brand rather than tinted toward it.",
  },
  {
    index: "02",
    title: "Copy and content",
    body: "Your words placed properly, or written with you. Structure adjusted to what you actually have to say.",
  },
  {
    index: "03",
    title: "Motion changes",
    body: "The animation language re-timed, replaced or removed. Some brands need less movement, not more.",
  },
  {
    index: "04",
    title: "New sections and pages",
    body: "Anything the original does not have: product flows, case studies, locations, careers, documentation.",
  },
  {
    index: "05",
    title: "Commerce and CMS",
    body: "Shopify, headless commerce, or a CMS your team can edit without asking a developer for help.",
  },
  {
    index: "06",
    title: "Performance work",
    body: "Budgets set at the start and held to launch, tested on mid-range hardware rather than ours.",
  },
  {
    index: "07",
    title: "Deployment",
    body: "Domains, hosting, analytics, forms, redirects and search metadata configured and verified.",
  },
  {
    index: "08",
    title: "Support afterwards",
    body: "An optional monthly plan for updates, upkeep and small improvements. Or a clean handover and goodbye.",
  },
];

export function CustomBuildSection() {
  return (
    <section
      className="shell border-t-2 border-accent section-y"
      aria-labelledby="custom-title"
    >
      <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-8">
        <div className="lg:col-span-6">
          <span className="meta text-accent">THE PRIMARY ROUTE</span>
          <h2 id="custom-title" className="mt-6">
            <LineMask
              as="span"
              mode="exhibition"
              className="block font-display text-statement tracking-[-0.02em] text-ink"
              lines={[
                "Start with one",
                "of the five.",
                <>
                  End with something{" "}
                  <span className="italic text-accent">entirely yours.</span>
                </>,
              ]}
            />
          </h2>
        </div>

        <div className="lg:col-span-5 lg:col-start-8 lg:pt-4">
          <Reveal as="p" variant="up" mode="archive" className="text-lede text-ink-soft">
            A custom build is not a re-skin. You are buying a finished
            engineering standard as the floor, and then spending the budget on
            the parts that make the site unmistakably yours — instead of on
            three weeks of finding a direction.
          </Reveal>

          <Reveal
            variant="rise"
            mode="commerce"
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
          >
            <ActionLink href="/custom-build" variant="accent">
              Tell us what you need
            </ActionLink>
            <ActionLink href="#engagement" variant="outline">
              See engagement options
            </ActionLink>
          </Reveal>

          {/* The bridge from the secondary path to the primary one. */}
          <Reveal
            variant="rise"
            mode="archive"
            className="mt-8 border-l-2 border-accent bg-paper-raised px-5 py-5"
          >
            <p className="meta text-accent">{upgradeCredit.headline.toUpperCase()}</p>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
              Buy the source code and upgrade to a custom build within{" "}
              {upgradeCredit.windowDays} days, and we credit the full
              source-code price against your project. Starting small costs you
              nothing.
            </p>
          </Reveal>
        </div>
      </div>

      {/* ── what actually changes ── */}
      <Reveal
        as="ol"
        variant="rise"
        mode="archive"
        group
        className="mt-16 grid border-t border-rule sm:grid-cols-2 lg:grid-cols-4"
      >
        {scope.map((item) => (
          <li
            key={item.index}
            className="border-b border-rule px-0 py-7 sm:px-6 sm:first:pl-0 lg:border-l lg:first:border-l-0 lg:[&:nth-child(5)]:border-l-0"
          >
            <span className="meta text-ink-muted tabular-nums">{item.index}</span>
            <h3 className="mt-4 font-display text-[1.375rem] leading-tight text-ink">
              {item.title}
            </h3>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-muted">
              {item.body}
            </p>
          </li>
        ))}
      </Reveal>
    </section>
  );
}
