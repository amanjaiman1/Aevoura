import Link from "next/link";
import type { Work } from "@/lib/works";
import { engagements, carePlan, formatPrice, formatFrom, upgradeCredit } from "@/lib/pricing";
import { Reveal } from "@/components/primitives/Reveal";
import { LineMask } from "@/components/primitives/LineMask";
import { ActionLink } from "@/components/primitives/ActionLink";
import { SectionLabel, Arrow } from "@/components/primitives/Marks";

/**
 * Purchase options, scoped to one work.
 *
 * The four routes are shown with this work's own numbers rather than generic
 * tiers, so a buyer never has to translate between a price list and the thing
 * they are looking at. Custom is the dark panel: the most important option
 * gets the most visual weight.
 */
export function WorkPurchase({ work }: { work: Work }) {
  const source = engagements.find((e) => e.id === "source")!;
  const launch = engagements.find((e) => e.id === "launch")!;
  const custom = engagements.find((e) => e.id === "custom")!;
  const exclusive = engagements.find((e) => e.id === "exclusive")!;

  const options = [
    {
      ...source,
      price: formatPrice(work.sourcePrice),
      href: `/contact?intent=source&work=${work.slug}`,
      label: "Buy the source",
    },
    {
      ...launch,
      price: formatFrom(launch.priceFrom),
      href: `/contact?intent=launch&work=${work.slug}`,
      label: "Get it launched",
    },
  ];

  return (
    <section
      id="purchase"
      className="shell scroll-mt-20 border-t border-rule section-y"
      aria-labelledby="purchase-title"
    >
      <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-8">
        <div className="lg:col-span-4">
          <SectionLabel index="—">OWNING IT</SectionLabel>
          <h2 id="purchase-title" className="mt-6">
            <LineMask
              as="span"
              mode="exhibition"
              className="block font-display text-headline tracking-[-0.015em] text-ink"
              lines={["Three ways", "to own", `${work.name}.`]}
            />
          </h2>
          <Reveal
            as="p"
            variant="up"
            mode="archive"
            className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-ink-muted"
          >
            {upgradeCredit.body}
          </Reveal>
          <Reveal variant="rise" mode="archive" className="mt-6">
            <Link href="/license" className="link-rule meta text-ink">
              Read the licence terms <Arrow />
            </Link>
          </Reveal>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          {/* the two lighter routes */}
          <div className="grid border-t border-rule sm:grid-cols-2">
            {options.map((option, i) => (
              <Reveal
                key={option.id}
                variant="rise"
                mode="commerce"
                delay={i * 0.06}
                className={`flex flex-col border-b border-rule py-7 sm:py-8 ${
                  i === 1 ? "sm:border-l sm:border-rule sm:pl-8" : "sm:pr-8"
                }`}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-title text-ink">{option.name}</h3>
                  <span className="meta text-ink-muted tabular-nums">{option.index}</span>
                </div>
                <p className="mt-3 text-[1.125rem] text-ink">{option.price}</p>
                <p className="mt-1.5 meta text-ink-muted">{option.priceNote}</p>
                <p className="mt-4 flex-1 text-[0.875rem] leading-relaxed text-ink-muted">
                  {option.who}
                </p>
                <p className="mt-4 meta text-ink-muted">{option.delivery}</p>
                <div className="mt-6">
                  <ActionLink href={option.href} variant="outline" full>
                    {option.label}
                  </ActionLink>
                </div>
              </Reveal>
            ))}
          </div>

          {/* the primary route */}
          <Reveal variant="up" mode="commerce" className="on-void mt-0 px-6 py-9 sm:px-8">
            <div className="flex items-center gap-3">
              <span className="meta text-accent tabular-nums">{custom.index}</span>
              <span className="meta text-accent">THE ROUTE MOST BRANDS TAKE</span>
            </div>
            <div className="mt-5 flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
              <h3 className="font-display text-headline tracking-[-0.015em] text-chalk">
                Build {work.name} for my brand
              </h3>
              <p className="text-[1.0625rem] text-chalk">
                {formatFrom(work.customFrom)}
              </p>
            </div>
            <p className="mt-5 measure text-[0.9375rem] leading-relaxed text-chalk/85">
              {work.name} becomes the structural and engineering starting point.
              Identity, content, pages, commerce and motion are rebuilt around
              your brand — so the result shares this build&rsquo;s standard
              without sharing its face.
            </p>
            <ul className="mt-6 grid gap-x-8 gap-y-2 sm:grid-cols-2">
              {custom.includes.slice(0, 6).map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 block h-px w-3 shrink-0 bg-chalk-muted" />
                  <span className="text-[0.875rem] leading-snug text-chalk/85">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ActionLink
                href={`/custom-build?work=${work.slug}`}
                variant="accent"
                tone="void"
              >
                Start a custom project
              </ActionLink>
              <ActionLink href="/process" variant="outline" tone="void">
                How we work
              </ActionLink>
            </div>
            <p className="mt-5 meta text-chalk-muted">{custom.delivery}</p>
          </Reveal>

          {/* exclusivity */}
          <Reveal
            id="exclusive"
            variant="rise"
            mode="archive"
            className="scroll-mt-24 border-b border-rule border-l-2 border-l-accent bg-paper-raised px-6 py-8"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="meta text-ink-muted tabular-nums">{exclusive.index}</span>
                <h3 className="font-display text-title text-ink">
                  Exclusive licence
                </h3>
              </div>
              <p className="meta text-ink">{formatFrom(exclusive.priceFrom)}</p>
            </div>
            <p className="mt-4 measure text-[0.9375rem] leading-relaxed text-ink-soft">
              {work.exclusiveAvailable ? (
                <>
                  Purchase {work.name} exclusively and it is permanently removed
                  from the public collection — delisted from this site, never
                  sold again, and recorded in a written agreement. Edition{" "}
                  {work.number} would end with you.
                </>
              ) : (
                <>
                  {work.name} is not available for exclusive licence. A custom
                  build gives you a result nobody else can buy anyway.
                </>
              )}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              {work.exclusiveAvailable ? (
                <ActionLink
                  href={`/contact?intent=exclusive&work=${work.slug}`}
                  variant="outline"
                >
                  Request exclusivity
                </ActionLink>
              ) : (
                <ActionLink href={`/custom-build?work=${work.slug}`} variant="outline">
                  Commission a custom build
                </ActionLink>
              )}
              <Link href="/license#exclusive" className="link-rule meta text-ink-muted">
                What exclusivity guarantees <Arrow />
              </Link>
            </div>
          </Reveal>

          {/* care plan footnote */}
          <Reveal
            variant="rise"
            mode="archive"
            className="flex flex-wrap items-center justify-between gap-4 border-b border-rule py-6"
          >
            <div>
              <h3 className="text-[1rem] font-medium text-ink">
                {carePlan.name} — {formatPrice(carePlan.priceFrom)}
                <span className="meta ml-2 text-ink-muted">{carePlan.priceNote}</span>
              </h3>
              <p className="mt-2 measure text-[0.875rem] leading-relaxed text-ink-muted">
                {carePlan.who}
              </p>
            </div>
            <Link href={carePlan.cta.href} className="link-rule meta text-ink">
              Add a care plan <Arrow />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
