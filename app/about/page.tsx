import type { Metadata } from "next";
import { site } from "@/lib/site";
import { works } from "@/lib/works";
import { LineMask } from "@/components/primitives/LineMask";
import { Reveal } from "@/components/primitives/Reveal";
import { ActionLink } from "@/components/primitives/ActionLink";
import { RegistrationMark, SectionLabel } from "@/components/primitives/Marks";

export const metadata: Metadata = {
  title: "About — a finite collection, on purpose",
  description: `Why ${site.name} launched with five works instead of five hundred, what we believe about website design, and what we will not pretend about.`,
  alternates: { canonical: "/about" },
};

const beliefs = [
  {
    title: "A website should survive losing its logo",
    body: "If you can swap the wordmark and nobody notices the brand changed, the design was decoration. Every work here is built so its structure, pacing and motion belong to one kind of business and would look wrong on another.",
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
    a: `New. Edition ${site.edition} is the first release and there are ${site.workCount} works in it. We are not going to invent a client list or a customer counter.`,
  },
  {
    q: "How big is the team?",
    a: "Small and deliberately so. You talk to the people who build it. That is a genuine advantage on work like this and a genuine limit on how much of it we can take at once.",
  },
  {
    q: "Where are you?",
    a: `${site.contact.location}, working ${site.contact.timezone}. ${site.market.internationalNote}`,
  },
  {
    q: "Why should we trust the quality?",
    a: "Do not take our word for it. Open the live experience, run your own audit, read the source before you buy. Everything we claim is checkable, which is the point of publishing a demo rather than a screenshot.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="shell" aria-labelledby="about-title">
        <div className="flex items-center justify-between gap-4 border-b border-rule py-4">
          <span className="meta text-ink">ABOUT</span>
          <div className="flex items-center gap-4 sm:gap-8">
            <RegistrationMark className="hidden sm:block" />
            <span className="meta text-ink-muted">
              EDITION {site.edition} — 0{works.length} WORKS
            </span>
          </div>
        </div>

        <div className="grid gap-y-10 pt-12 pb-16 lg:grid-cols-12 lg:gap-x-8 lg:pt-16">
          <div className="lg:col-span-8">
            <h1 id="about-title">
              <LineMask
                as="span"
                mode="exhibition"
                className="block font-display text-statement tracking-[-0.02em] text-ink"
                lines={[
                  "Five works, because",
                  "five is what we could",
                  <>
                    make <span className="italic text-accent">this good.</span>
                  </>,
                ]}
              />
            </h1>
          </div>
        </div>

        <div className="grid gap-y-10 border-t border-rule pt-12 pb-4 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-4">
            <SectionLabel index="—">WHY FINITE</SectionLabel>
          </div>
          <Reveal
            variant="up"
            mode="archive"
            className="prose-editorial measure text-ink-soft lg:col-span-7 lg:col-start-6"
          >
            <p>
              A marketplace with a thousand templates is not offering you
              choice. It is offering you a search problem, and it has to be
              indifferent to whether any individual item is good. The economics
              require volume, so volume is what you get.
            </p>
            <p>
              We wanted the opposite constraint. {site.workCountWord} works means
              every one of them had to justify existing — a different industry,
              a different visual world, a different central interaction. It also
              means we cannot hide a weak one in a grid.
            </p>
            <p>
              The trade-off is real and we will not pretend otherwise: if none
              of the five suits your brand, there is no sixth to browse. That is
              exactly when the custom build stops being an upsell and starts
              being the actual product — the collection is the portfolio, and
              the portfolio is the argument for hiring us.
            </p>
            <p>
              This platform is built to the same standard as the works it sells,
              and then deliberately held back. It does not use WebGL anywhere.
              It has no smooth-scroll library hijacking your input. The one
              animated flourish, the aperture in the hero, exists to show you
              five things at once. If we can make the gallery this quiet and
              still have it hold your attention, you can reasonably guess what
              happens when your website is the artwork.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── beliefs ── */}
      <section className="shell border-t border-rule section-y" aria-labelledby="beliefs-title">
        <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-4">
            <SectionLabel index="—">WHAT WE BELIEVE</SectionLabel>
            <h2 id="beliefs-title" className="mt-6">
              <LineMask
                as="span"
                mode="exhibition"
                className="block font-display text-headline tracking-[-0.015em] text-ink"
                lines={["Four positions", "we design from."]}
              />
            </h2>
          </div>
          <Reveal
            as="ul"
            variant="rise"
            mode="archive"
            group
            className="border-t border-rule lg:col-span-7 lg:col-start-6"
          >
            {beliefs.map((item, i) => (
              <li key={item.title} className="border-b border-rule py-7">
                <div className="flex gap-5 sm:gap-8">
                  <span className="meta shrink-0 pt-1 text-accent tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-title text-ink">{item.title}</h3>
                    <p className="mt-3 measure text-[0.9375rem] leading-relaxed text-ink-muted">
                      {item.body}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── plainly ── */}
      <section className="on-void grain relative overflow-hidden" aria-labelledby="honest-title">
        <span aria-hidden="true" className="grain-layer opacity-[0.12]" />
        <div className="shell relative section-y">
          <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-4">
              <SectionLabel index="—" tone="void">
                PLAINLY
              </SectionLabel>
              <h2 id="honest-title" className="mt-6">
                <LineMask
                  as="span"
                  mode="exhibition"
                  className="block font-display text-headline tracking-[-0.015em] text-chalk"
                  lines={["What we are not", "going to pretend."]}
                />
              </h2>
              <Reveal
                as="p"
                variant="up"
                mode="archive"
                className="mt-7 max-w-sm text-[0.9375rem] leading-relaxed text-chalk-muted"
              >
                No fabricated client logos, no invented review counts, no award
                badges we did not win, no performance scores we did not measure
                on your hardware.
              </Reveal>
            </div>
            <Reveal
              as="dl"
              variant="rise"
              mode="archive"
              group
              className="border-t border-void-rule lg:col-span-7 lg:col-start-6"
            >
              {honest.map((item) => (
                <div key={item.q} className="border-b border-void-rule py-7">
                  <dt className="font-display text-title text-chalk">{item.q}</dt>
                  <dd className="mt-3 measure text-[0.9375rem] leading-relaxed text-chalk-muted">
                    {item.a}
                  </dd>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── close ── */}
      <section className="shell section-y">
        <div className="grid gap-y-8 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-7">
            <h2>
              <LineMask
                as="span"
                mode="exhibition"
                className="block font-display text-headline tracking-[-0.015em] text-ink"
                lines={["Look at the work", "before you decide", "about us."]}
              />
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal variant="rise" mode="commerce" group className="flex flex-col gap-3">
              <ActionLink href="/collection" variant="accent" full>
                See the five works
              </ActionLink>
              <ActionLink href="/custom-build" variant="outline" full>
                Commission a build
              </ActionLink>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
