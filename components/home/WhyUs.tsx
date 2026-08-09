import { Reveal } from "@/components/primitives/Reveal";
import { ActionLink } from "@/components/primitives/ActionLink";
import {
  Eyebrow,
  LayersIcon,
  LockIcon,
  RocketIcon,
  WrenchIcon,
} from "@/components/primitives/Marks";

/**
 * WHY BUY HERE
 *
 * Differentiation without invented credentials. Every claim below is
 * something we control and can be held to, rather than a statistic nobody
 * can check. That is the whole reason there is no "500+ happy clients" row.
 */

const reasons = [
  {
    Icon: LayersIcon,
    title: "Built by the people who sell them",
    body: "No marketplace middleman, no anonymous author who vanishes after purchase. The person who wrote the code answers your email, so support is not a lottery.",
  },
  {
    Icon: RocketIcon,
    title: "You can try all of them before you pay",
    body: "Every template has a public live demo. Open it on your phone, break it, run your own Lighthouse audit. We would rather you tested the work than trusted a screenshot of a score.",
  },
  {
    Icon: LockIcon,
    title: "You own it outright",
    body: "One-time price, full source code, no subscription and no licence key that can be revoked. Deploy it anywhere, change anything, keep it forever.",
  },
  {
    Icon: WrenchIcon,
    title: "A route up, not a dead end",
    body: "If the template turns out to be the wrong shape for your business, the source price comes off a custom build within 30 days. Starting small costs you nothing.",
  },
];

export function WhyUs() {
  return (
    <section className="px-2 sm:px-3" aria-labelledby="why-title">
      <div className="on-dark panel">
        <div className="shell py-14 lg:py-20">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Eyebrow tone="accent">Why buy here</Eyebrow>
              <h2
                id="why-title"
                className="mt-4 font-display text-display font-bold text-white"
              >
                A small studio, not a template farm.
              </h2>
            </div>
            <p className="text-[1rem] leading-relaxed text-chalk-muted lg:col-span-5">
              We sell a handful of things and we know all of them inside out.
              That is the trade-off we picked, and it is the reason support
              actually works.
            </p>
          </div>

          <Reveal
            as="ul"
            variant="up"
            mode="reveal"
            group
            className="mt-12 grid gap-4 sm:grid-cols-2"
          >
            {reasons.map(({ Icon, title, body }) => (
              <li
                key={title}
                className="rounded-lg border border-dark-rule bg-dark-raised p-6 sm:p-7"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-accent">
                  <Icon />
                </span>
                <h3 className="mt-5 font-display text-[1.25rem] font-bold text-white">
                  {title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-chalk-muted">
                  {body}
                </p>
              </li>
            ))}
          </Reveal>

          <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-dark-rule pt-8">
            <ActionLink href="/buy" variant="primary" size="lg">
              Buy a template
            </ActionLink>
            <ActionLink href="/about" variant="outlineLight" size="lg">
              More about us
            </ActionLink>
          </div>
        </div>
      </div>
    </section>
  );
}
