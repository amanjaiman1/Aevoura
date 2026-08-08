import type { Metadata } from "next";
import { site } from "@/lib/site";
import { templates } from "@/lib/templates";
import { Reveal } from "@/components/primitives/Reveal";
import { ActionLink } from "@/components/primitives/ActionLink";
import { Eyebrow } from "@/components/primitives/Marks";

export const metadata: Metadata = {
  title: "About",
  description: `Why ${site.name} sells five website templates instead of five hundred, how we work, and what we will not pretend about.`,
  alternates: { canonical: "/about" },
};

const beliefs = [
  {
    title: "A website should survive losing its logo",
    body: "If you can swap the wordmark and nobody notices the brand changed, the design was decoration. Each template is built so its structure and pacing belong to one kind of business and would look wrong on another.",
  },
  {
    title: "Interaction should answer a question",
    body: "A 3D viewer that lets someone judge a diamond's cut is worth building. The same viewer spinning a logo is a loading screen with extra steps. We ask what buying question an interaction removes before we build it.",
  },
  {
    title: "Restraint is the harder skill",
    body: "Adding animation is easy. Knowing which four to keep is the work. Most of what we design gets removed, and the site is better for what is missing.",
  },
  {
    title: "Fast is not a trade-off",
    body: "Ambitious work is usually slow because nobody set a budget, not because ambition costs milliseconds. We set the budget first and design inside it.",
  },
];

const honest = [
  {
    q: "How new is this?",
    a: `New. There are ${site.templateCount} templates and this is the first release. We are not going to invent a client list or a customer counter.`,
  },
  {
    q: "How big is the team?",
    a: "Small, deliberately. You talk to the person who builds it. That is a real advantage on work like this and a real limit on how much we can take at once.",
  },
  {
    q: "Where are you?",
    a: `${site.contact.location}, working ${site.contact.timezone}. ${site.market.internationalNote}`,
  },
  {
    q: "Why should we trust the quality?",
    a: "Do not take our word for it. Open the live demo, run your own audit, read the source before you buy. Everything we claim is checkable, which is the point of publishing a working demo rather than a screenshot.",
  },
  {
    q: "Why is there no card checkout?",
    a: "We have not set up a payment gateway yet. Orders go by email and we reply with an invoice. It is a genuine limitation, not a strategy, and we would rather write that than pretend otherwise.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="shell pt-10 pb-8 sm:pt-14">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Eyebrow>About</Eyebrow>
            <h1 className="mt-4 font-display text-[clamp(2.25rem,4.4vw,3.5rem)] leading-[1.04] font-bold tracking-[-0.03em] text-ink">
              {site.templateCountWord.charAt(0).toUpperCase() +
                site.templateCountWord.slice(1)}{" "}
              templates, because five is what we could make this good.
            </h1>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <ActionLink href="/templates" variant="primary" size="lg">
              See the templates
            </ActionLink>
          </div>
        </div>
      </section>

      <section className="shell pb-12" aria-labelledby="why-finite">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
          <div className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
            <Eyebrow>Why finite</Eyebrow>
            <h2 id="why-finite" className="mt-4 font-display text-display font-bold text-ink">
              A small catalogue is a promise, not a limitation.
            </h2>
          </div>
          <Reveal
            variant="up"
            mode="archive"
            className="prose-body measure lg:col-span-8"
          >
            <p>
              A marketplace with a thousand templates is not offering you choice.
              It is offering you a search problem, and it has to be indifferent
              to whether any individual item is good. The economics require
              volume, so volume is what you get.
            </p>
            <p>
              We wanted the opposite constraint. {site.templateCount} templates
              means every one had to justify existing — a different industry, a
              different visual world, a different central interaction. It also
              means we cannot hide a weak one in a grid, and that we know all
              five well enough to support them properly.
            </p>
            <p>
              The trade-off is real and we will not pretend otherwise: if none of
              the five suits your brand, there is no sixth to browse. That is
              exactly when a custom build stops being an upsell and starts being
              the actual product — the templates are the portfolio, and the
              portfolio is the argument for hiring us.
            </p>
            <p>
              This site is built to the same standard as the templates it sells.
              It uses no WebGL, because 3D belongs in the products, not in the
              shop window. It has no smooth-scroll library hijacking your input.
              If we can make the shop this quiet and still hold your attention,
              you can reasonably guess what happens when your website is the
              thing being designed.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── beliefs ── */}
      <section className="px-2 sm:px-3" aria-labelledby="beliefs-title">
        <div className="on-dark panel">
          <div className="shell py-14 lg:py-20">
            <Eyebrow tone="accent">What we believe</Eyebrow>
            <h2
              id="beliefs-title"
              className="mt-4 max-w-2xl font-display text-display font-bold text-white"
            >
              Four positions we design from.
            </h2>

            <Reveal
              as="ul"
              variant="up"
              mode="reveal"
              group
              className="mt-12 grid gap-4 sm:grid-cols-2"
            >
              {beliefs.map((item, i) => (
                <li
                  key={item.title}
                  className="rounded-lg border border-dark-rule bg-dark-raised p-6 sm:p-7"
                >
                  <span className="num text-[0.75rem] font-bold text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-[1.25rem] font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-chalk-muted">
                    {item.body}
                  </p>
                </li>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── plainly ── */}
      <section className="shell section-y" aria-labelledby="honest-title">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
          <div className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
            <Eyebrow>Plainly</Eyebrow>
            <h2
              id="honest-title"
              className="mt-4 font-display text-display font-bold text-ink"
            >
              What we are not going to pretend.
            </h2>
            <p className="mt-5 max-w-sm text-[0.9375rem] leading-relaxed text-ink-muted">
              No fabricated client logos, no invented review counts, no award
              badges we did not win, no performance scores we did not measure on
              your hardware.
            </p>
          </div>

          <Reveal
            as="dl"
            variant="rise"
            mode="archive"
            group
            className="card divide-y divide-rule-soft overflow-hidden lg:col-span-8"
          >
            {honest.map((item) => (
              <div key={item.q} className="px-5 py-6 sm:px-7">
                <dt className="font-display text-[1.0625rem] font-bold text-ink">
                  {item.q}
                </dt>
                <dd className="mt-2.5 measure text-[0.9375rem] leading-relaxed text-ink-muted">
                  {item.a}
                </dd>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="shell pb-16">
        <div className="card flex flex-wrap items-center justify-between gap-6 p-7 sm:p-10">
          <div>
            <h2 className="font-display text-[clamp(1.5rem,2.4vw,2rem)] font-bold text-ink">
              Look at the work before you decide about us.
            </h2>
            <p className="mt-2 text-[0.9375rem] text-ink-muted">
              {templates.filter((t) => t.liveDemo).length} of{" "}
              {templates.length} have a public live demo.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ActionLink href="/templates" variant="primary" size="lg">
              See the templates
            </ActionLink>
            <ActionLink href="/custom-build" variant="outline" size="lg">
              Custom build
            </ActionLink>
          </div>
        </div>
      </section>
    </>
  );
}
