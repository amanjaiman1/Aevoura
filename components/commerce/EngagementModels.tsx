import { engagements, carePlan, formatPrice, upgradeCredit } from "@/lib/pricing";
import type { Engagement } from "@/lib/pricing";
import { Reveal } from "@/components/primitives/Reveal";
import { LineMask } from "@/components/primitives/LineMask";
import { ActionLink } from "@/components/primitives/ActionLink";
import { SectionLabel } from "@/components/primitives/Marks";

/**
 * ENGAGEMENT MODELS
 *
 * Deliberately not four pricing cards. This is an archive table: index,
 * name, who it is for, what is included, what it starts at, one route out.
 * Rows scale in weight with commitment.
 *
 * The Custom row is inverted. On a paper site, the dark row is the one your
 * eye lands on first — which is the correct commercial hierarchy without
 * resorting to a "MOST POPULAR" ribbon we have no data to justify.
 */

function Row({ model }: { model: Engagement }) {
  const emphasis = Boolean(model.emphasis);
  const tone = emphasis ? "void" : "paper";

  const muted = emphasis ? "text-chalk-muted" : "text-ink-muted";
  const strong = emphasis ? "text-chalk" : "text-ink";
  const rule = emphasis ? "border-void-rule" : "border-rule";

  return (
    <li
      className={
        emphasis
          ? "on-void relative my-0 border-t border-void-rule"
          : "border-t border-rule"
      }
    >
      <div className={emphasis ? "px-gutter lg:px-10" : ""}>
        <div className="grid gap-y-7 py-10 lg:grid-cols-12 lg:gap-x-8 lg:py-12">
          {/* identity + price */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3">
              <span className={`meta tabular-nums ${emphasis ? "text-accent" : muted}`}>
                {model.index}
              </span>
              {emphasis && (
                <span className="meta text-accent">WHERE MOST PROJECTS END UP</span>
              )}
            </div>
            <h3
              className={`mt-4 font-display tracking-[-0.015em] ${strong} ${
                emphasis ? "text-headline" : "text-title"
              }`}
            >
              {model.name}
            </h3>
            <p className="mt-4 flex items-baseline gap-2">
              {model.priceFrom !== null && (
                <span className={`meta ${muted}`}>FROM</span>
              )}
              <span className={`text-[1.125rem] ${strong}`}>
                {model.priceFrom === null ? "By quotation" : formatPrice(model.priceFrom)}
              </span>
            </p>
            <p className={`mt-1.5 meta ${muted}`}>{model.priceNote}</p>
          </div>

          {/* who + delivery */}
          <div className="lg:col-span-4">
            <h4 className={`meta ${muted}`}>WHO IT IS FOR</h4>
            <p className={`mt-3 text-[0.9375rem] leading-relaxed ${emphasis ? "text-chalk/85" : "text-ink-soft"}`}>
              {model.who}
            </p>
            <p className={`mt-5 border-t ${rule} pt-4 meta ${muted}`}>
              {model.delivery}
            </p>
            {model.id === "exclusive" && (
              <p className="mt-4 border-l-2 border-accent pl-4 text-[0.875rem] leading-relaxed text-ink-soft">
                Purchase the design exclusively and it is permanently removed
                from the public collection — delisted here, never sold again,
                recorded in writing.
              </p>
            )}
            {model.id === "source" && (
              <p className={`mt-4 meta ${muted}`}>
                Credited toward a custom build within {upgradeCredit.windowDays} days.
              </p>
            )}
          </div>

          {/* includes + route out */}
          <div className="lg:col-span-4 lg:col-start-9">
            <h4 className={`meta ${muted}`}>INCLUDED</h4>
            <ul className="mt-3 space-y-2">
              {model.includes.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden="true" className={`mt-2 block h-px w-3 shrink-0 ${emphasis ? "bg-chalk-muted" : "bg-rule"}`} />
                  <span className={`text-[0.875rem] leading-snug ${emphasis ? "text-chalk/85" : "text-ink-soft"}`}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-7">
              <ActionLink
                href={model.cta.href}
                variant={emphasis ? "accent" : "outline"}
                tone={tone}
                full
              >
                {model.cta.label}
              </ActionLink>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export function EngagementModels({
  heading = true,
}: {
  /** The custom-build page introduces this section itself. */
  heading?: boolean;
}) {
  return (
    <section
      id="engagement"
      className="scroll-mt-20 border-t border-rule pt-[clamp(3.5rem,8vh,6rem)] pb-[clamp(4.5rem,11vh,9.5rem)]"
      aria-labelledby="engagement-title"
    >
      {heading && (
        <div className="shell">
          <div className="grid gap-y-8 lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-5">
              <SectionLabel index="—">ENGAGEMENT</SectionLabel>
              <h2 id="engagement-title" className="mt-6">
                <LineMask
                  as="span"
                  mode="exhibition"
                  className="block font-display text-headline tracking-[-0.015em] text-ink"
                  lines={["Four ways in.", "One of them is ours."]}
                />
              </h2>
            </div>
            <Reveal
              as="p"
              variant="up"
              mode="archive"
              className="text-lede text-ink-soft lg:col-span-6 lg:col-start-7"
            >
              Prices are starting points, quoted in {"\u20B9"} and honoured as
              written. Nothing here is a subscription you have to cancel, and
              nothing is priced by seat.
            </Reveal>
          </div>
        </div>
      )}

      <div className="shell mt-12">
        <ol className="border-b border-rule">
          {engagements.map((model) => (
            <Row key={model.id} model={model} />
          ))}
        </ol>

        {/* ── care plan: a quieter, ongoing option ── */}
        <Reveal
          variant="rise"
          mode="archive"
          className="grid gap-y-6 border-b border-rule py-10 lg:grid-cols-12 lg:gap-x-8"
        >
          <div className="lg:col-span-3">
            <span className="meta text-ink-muted">05</span>
            <h3 className="mt-4 font-display text-title text-ink">{carePlan.name}</h3>
            <p className="mt-4 flex items-baseline gap-2">
              <span className="text-[1.125rem] text-ink">
                {formatPrice(carePlan.priceFrom)}
              </span>
              <span className="meta text-ink-muted">/ MONTH</span>
            </p>
            <p className="mt-1.5 meta text-ink-muted">{carePlan.priceNote}</p>
          </div>
          <div className="lg:col-span-4">
            <h4 className="meta text-ink-muted">WHO IT IS FOR</h4>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
              {carePlan.who}
            </p>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <h4 className="meta text-ink-muted">INCLUDED</h4>
            <ul className="mt-3 space-y-2">
              {carePlan.includes.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 block h-px w-3 shrink-0 bg-rule" />
                  <span className="text-[0.875rem] leading-snug text-ink-soft">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-7">
              <ActionLink href={carePlan.cta.href} variant="outline" full>
                {carePlan.cta.label}
              </ActionLink>
            </div>
          </div>
        </Reveal>

        <p className="mt-6 max-w-2xl meta text-ink-muted">
          Taxes as applicable. International clients can be invoiced in USD at
          the prevailing rate. Payment is milestone-based and never requested
          before a written scope.
        </p>
      </div>
    </section>
  );
}
