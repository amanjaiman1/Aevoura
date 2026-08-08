import Link from "next/link";
import { buildPlans, carePlan, formatPlanPrice, upgradeCredit } from "@/lib/pricing";
import type { Plan } from "@/lib/pricing";
import { ActionLink } from "@/components/primitives/ActionLink";
import { Reveal } from "@/components/primitives/Reveal";
import {
  ArrowUpRight,
  Badge,
  CheckMark,
  Eyebrow,
  iconMap,
} from "@/components/primitives/Marks";

/** Where a plan sends you. Custom is scoped on a call, so it goes to a brief. */
function planHref(plan: Plan, template?: string): string {
  const params = new URLSearchParams();
  if (template) params.set("template", template);
  params.set("plan", plan.id);
  if (plan.id === "custom") return `/custom-build?${params.toString()}`;
  return `/buy?${params.toString()}`;
}

/**
 * PRICING ROWS
 *
 * A scannable row list rather than a wall of feature-comparison cards: name,
 * what it costs, one tap to order. Someone deciding between ₹9,999 and
 * ₹75,000 wants to see both numbers on one screen, not scroll between them.
 */
export function PricingRows({
  template,
  heading = true,
}: {
  /** Pre-selects a template when these rows sit on a template page. */
  template?: string;
  heading?: boolean;
}) {
  return (
    <section id="pricing" className="shell scroll-mt-28 section-y">
      {heading && (
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow>Pricing</Eyebrow>
            <h2 className="mt-4 font-display text-display font-bold text-ink">
              Buy it, launch it, or have it built.
            </h2>
          </div>
          <p className="text-[1rem] leading-relaxed text-ink-muted lg:col-span-5">
            One-time prices in {"\u20B9"}, no subscriptions, and full source-code
            ownership on every option.
          </p>
        </div>
      )}

      <div className="mt-10 card overflow-hidden">
        <div className="px-5 pt-6 sm:px-7">
          <Eyebrow>One-time</Eyebrow>
        </div>

        <ul className="mt-2 divide-y divide-rule-soft">
          {buildPlans.map((plan) => {
            const Icon = iconMap[plan.icon];
            return (
              <li key={plan.id}>
                <Link
                  href={planHref(plan, template)}
                  className="group/row flex min-h-20 flex-wrap items-center gap-x-4 gap-y-2 px-5 py-5 transition-colors duration-200 hover:bg-hover sm:px-7"
                >
                  <Icon className="text-ink-faint transition-colors duration-200 group-hover/row:text-accent" />

                  <span className="flex flex-wrap items-center gap-2.5">
                    <span className="font-display text-[1.125rem] font-bold text-ink sm:text-[1.3125rem]">
                      {plan.name}
                    </span>
                    {plan.popular && <Badge>Most popular</Badge>}
                    {plan.emphasis && <Badge tone="accent">Best value</Badge>}
                  </span>

                  <span className="hidden flex-1 text-[0.875rem] text-ink-muted xl:block">
                    {plan.summary}
                  </span>

                  <span className="ml-auto flex items-center gap-3">
                    <span className="num text-[0.9375rem] font-bold whitespace-nowrap text-ink sm:text-[1.0625rem]">
                      {formatPlanPrice(plan)}
                    </span>
                    <ArrowUpRight className="text-ink-faint transition-transform duration-300 group-hover/row:translate-x-0.5 group-hover/row:text-accent" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="border-t border-rule-soft px-5 pt-6 sm:px-7">
          <Eyebrow>Monthly, optional</Eyebrow>
        </div>
        <ul className="mt-2 divide-y divide-rule-soft border-t border-rule-soft">
          <li>
            <Link
              href={planHref(carePlan, template)}
              className="group/row flex min-h-20 flex-wrap items-center gap-x-4 gap-y-2 px-5 py-5 transition-colors duration-200 hover:bg-hover sm:px-7"
            >
              {(() => {
                const Icon = iconMap[carePlan.icon];
                return (
                  <Icon className="text-ink-faint transition-colors duration-200 group-hover/row:text-accent" />
                );
              })()}
              <span className="font-display text-[1.125rem] font-bold text-ink sm:text-[1.3125rem]">
                {carePlan.name}
              </span>
              <span className="hidden flex-1 text-[0.875rem] text-ink-muted xl:block">
                {carePlan.summary}
              </span>
              <span className="ml-auto flex items-center gap-3">
                <span className="num text-[0.9375rem] font-bold whitespace-nowrap text-ink sm:text-[1.0625rem]">
                  {formatPlanPrice(carePlan)}
                  <span className="font-normal text-ink-muted"> /mo</span>
                </span>
                <ArrowUpRight className="text-ink-faint transition-transform duration-300 group-hover/row:translate-x-0.5 group-hover/row:text-accent" />
              </span>
            </Link>
          </li>
        </ul>

        <p className="border-t border-rule-soft px-5 py-5 text-[0.875rem] text-ink-muted sm:px-7">
          Every option includes full source-code ownership.{" "}
          <Link href="/pricing" className="link-rule font-bold text-ink">
            See what each plan includes
          </Link>
        </p>
      </div>

      <Reveal
        variant="rise"
        mode="archive"
        className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-lg bg-endorse-tint px-5 py-4"
      >
        <CheckMark className="text-endorse" />
        <p className="text-[0.9375rem] text-ink-soft">
          <span className="font-bold text-ink">{upgradeCredit.headline}.</span>{" "}
          Buy the source now and upgrade within {upgradeCredit.windowDays} days —
          we take the full source price off your project.
        </p>
      </Reveal>
    </section>
  );
}

/**
 * FULL PLAN DETAIL — used on the pricing page, where someone has already
 * decided to spend money and now wants the small print.
 */
export function PlanCards({ template }: { template?: string }) {
  const all = [...buildPlans, carePlan];

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {all.map((plan) => {
        const Icon = iconMap[plan.icon];
        const emphasis = Boolean(plan.emphasis);
        return (
          <Reveal
            key={plan.id}
            variant="up"
            mode="reveal"
            className={
              emphasis
                ? "on-dark panel flex flex-col p-7 lg:col-span-2 lg:flex-row lg:gap-10"
                : "card flex flex-col p-7"
            }
          >
            <div className={emphasis ? "lg:w-1/2" : ""}>
              <div className="flex items-center justify-between gap-4">
                <span
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-full ${
                    emphasis ? "bg-white/10 text-accent" : "bg-sunk text-ink-soft"
                  }`}
                >
                  <Icon />
                </span>
                {plan.popular && <Badge>Most popular</Badge>}
                {emphasis && <Badge tone="accent">Best value</Badge>}
              </div>

              <h3
                className={`mt-5 font-display text-[1.625rem] font-bold ${
                  emphasis ? "text-white" : "text-ink"
                }`}
              >
                {plan.name}
              </h3>

              <p className="mt-3 flex items-baseline gap-2">
                <span
                  className={`num font-display text-[2rem] font-bold ${
                    emphasis ? "text-white" : "text-ink"
                  }`}
                >
                  {formatPlanPrice(plan)}
                </span>
                <span
                  className={`text-[0.8125rem] ${
                    emphasis ? "text-chalk-muted" : "text-ink-muted"
                  }`}
                >
                  {plan.unit}
                </span>
              </p>

              <p
                className={`mt-4 text-[0.9375rem] leading-relaxed ${
                  emphasis ? "text-chalk-muted" : "text-ink-soft"
                }`}
              >
                {plan.who}
              </p>

              <p
                className={`mt-5 rounded-md px-4 py-3 text-[0.8125rem] font-medium ${
                  emphasis ? "bg-white/5 text-chalk-muted" : "bg-sunk text-ink-muted"
                }`}
              >
                {plan.delivery}
              </p>

              <div className="mt-6">
                <ActionLink
                  href={planHref(plan, template)}
                  variant={emphasis ? "primary" : plan.popular ? "dark" : "outline"}
                  full={!emphasis}
                >
                  {plan.id === "custom"
                    ? "Start a custom project"
                    : plan.id === "exclusive"
                      ? "Request a quote"
                      : plan.id === "care"
                        ? "Add a care plan"
                        : `Order ${plan.name.toLowerCase()}`}
                </ActionLink>
              </div>
            </div>

            <div className={emphasis ? "mt-8 lg:mt-0 lg:w-1/2" : "mt-7"}>
              <p
                className={`eyebrow ${emphasis ? "text-chalk-muted" : "text-ink-muted"}`}
              >
                What you get
              </p>
              <ul className="mt-4 space-y-2.5">
                {plan.includes.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <CheckMark
                      className={emphasis ? "mt-0.5 text-accent" : "mt-0.5 text-endorse"}
                    />
                    <span
                      className={`text-[0.875rem] leading-snug ${
                        emphasis ? "text-white/85" : "text-ink-soft"
                      }`}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              {plan.id === "exclusive" && (
                <p className="mt-5 rounded-md bg-accent-tint px-4 py-3 text-[0.8125rem] leading-relaxed text-ink-soft">
                  Buy exclusively and the template is permanently withdrawn from
                  this collection — delisted from the site, never sold again,
                  recorded in writing.
                </p>
              )}
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
