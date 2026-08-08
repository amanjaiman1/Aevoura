import { formatPrice } from "@/lib/pricing";
import { plans } from "@/lib/pricing";
import { Reveal } from "@/components/primitives/Reveal";
import { ActionLink } from "@/components/primitives/ActionLink";
import { Eyebrow, CheckMark } from "@/components/primitives/Marks";

/**
 * THE UPSELL, STATED HONESTLY
 *
 * Template sales are the entry point; custom builds are the business. This
 * band makes the bigger option attractive without hiding the cheaper one —
 * the crimson button is here, and the template prices stay on every card.
 */

const changes = [
  "New identity, colour and typography",
  "Your content and photography",
  "Pages and flows the template does not have",
  "E-commerce, CMS or custom back end",
  "Different animation, or less of it",
  "3D product experiences where they earn it",
];

export function CustomBand() {
  const custom = plans.find((p) => p.id === "custom")!;

  return (
    <section className="shell section-y" aria-labelledby="custom-title">
      <div className="card overflow-hidden">
        <div className="grid lg:grid-cols-12">
          <div className="p-7 sm:p-10 lg:col-span-7">
            <Eyebrow tone="accent">Custom build</Eyebrow>
            <h2
              id="custom-title"
              className="mt-4 font-display text-display font-bold text-ink"
            >
              Start with a template. End with something only yours.
            </h2>
            <p className="mt-5 measure text-[1.0625rem] leading-relaxed text-ink-soft">
              A custom build takes one of the five as its structural and
              engineering foundation, then rebuilds everything above it around
              your brand. You get the standard of a long agency engagement
              without paying for the weeks where nobody knows what it should
              look like yet.
            </p>

            <ul className="mt-7 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {changes.map((change) => (
                <li key={change} className="flex gap-2.5">
                  <CheckMark className="mt-0.5 shrink-0 text-endorse" />
                  <span className="text-[0.875rem] leading-snug text-ink-soft">
                    {change}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <ActionLink href="/custom-build" variant="primary" size="lg">
                Start a custom project
              </ActionLink>
              <ActionLink href="/pricing" variant="outline" size="lg">
                See what it costs
              </ActionLink>
            </div>
          </div>

          <Reveal
            variant="rise"
            mode="archive"
            className="flex flex-col justify-center gap-6 bg-sunk p-7 sm:p-10 lg:col-span-5"
          >
            <div>
              <p className="eyebrow text-ink-muted">Custom builds start at</p>
              <p className="num mt-2 font-display text-[2.5rem] leading-none font-bold text-ink">
                {formatPrice(custom.price)}
              </p>
              <p className="mt-2.5 text-[0.875rem] text-ink-muted">
                {custom.delivery}
              </p>
            </div>

            <div className="rounded-lg border border-rule bg-surface p-5">
              <p className="text-[0.875rem] font-bold text-ink">
                Already bought a template?
              </p>
              <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-muted">
                The full source price comes off your custom build if you upgrade
                within 30 days. Nothing is wasted by starting small.
              </p>
            </div>

            <div className="rounded-lg border border-rule bg-surface p-5">
              <p className="text-[0.875rem] font-bold text-ink">
                Or start from nothing
              </p>
              <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-muted">
                If none of the five is the right shape, we design from scratch.
                Same standard, quoted per project.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
