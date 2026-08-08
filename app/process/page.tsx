import type { Metadata } from "next";
import { site } from "@/lib/site";
import { performanceStatement } from "@/lib/templates";
import { Steps } from "@/components/home/Steps";
import { Reveal } from "@/components/primitives/Reveal";
import { ActionLink } from "@/components/primitives/ActionLink";
import { Eyebrow, CheckMark } from "@/components/primitives/Marks";

export const metadata: Metadata = {
  title: "How we work",
  description:
    "Scope written before anything begins, staging you can watch, performance budgets held to launch, and a clean handover. The unglamorous parts, in order.",
  alternates: { canonical: "/process" },
};

const phases = [
  {
    n: "01",
    name: "Conversation",
    time: "30 — 45 minutes",
    body: "We look at what you sell, who buys it, and what the site has to do. If a template fits as-is, we say so and you keep your money. If it does not, we tell you which one is the closest foundation and why.",
    out: "A recommendation in writing, at no cost.",
  },
  {
    n: "02",
    name: "Scope and quote",
    time: "2 — 4 days",
    body: "Everything that will change is written down: pages, sections, integrations, motion, who supplies what. Then it is priced as a fixed number, not an estimate that drifts.",
    out: "A scope document and a fixed price.",
  },
  {
    n: "03",
    name: "Design",
    time: "1 — 2 weeks",
    body: "Direction is established on the real build rather than in a static mockup, because animation and pacing cannot be judged in a flat image. You review it in a browser, on your own phone.",
    out: "A staging URL you can open any time.",
  },
  {
    n: "04",
    name: "Build",
    time: "2 — 4 weeks",
    body: "Content integration, commerce, custom interactions and every breakpoint. Performance is checked as we go, on a mid-range Android device, not at the end when it is expensive to fix.",
    out: "Weekly staging updates, no status meetings.",
  },
  {
    n: "05",
    name: "Launch",
    time: "1 — 2 days",
    body: "Domain, hosting, analytics, forms, redirects, metadata and structured data. We run the accessibility and performance pass, fix what it finds, and only then point the domain.",
    out: "A live site and the repository in your name.",
  },
  {
    n: "06",
    name: "After",
    time: "Ongoing or never",
    body: "Either a monthly care plan for upkeep and steady improvement, or a clean handover with documentation your developer can follow. There is no penalty for choosing the second.",
    out: "Your choice, in writing.",
  },
];

const principles = [
  {
    title: "Scope before money",
    body: "Nothing is invoiced before what you are buying is written down. If we cannot describe it, we should not be charging for it.",
  },
  {
    title: "The real build, early",
    body: "Static mockups hide the two things that matter most here: how it moves and how it feels on a phone. You see the actual site from the first week.",
  },
  {
    title: "Bad news early",
    body: "If a feature will break the budget or the timeline, we say so before building it. Surprises at launch are a process failure, not bad luck.",
  },
  {
    title: "Your repository",
    body: "Code is written to be handed over from the first commit — typed, commented, conventional. You are never locked in by our habits.",
  },
];

export default function ProcessPage() {
  return (
    <>
      <section className="shell pt-10 pb-8 sm:pt-14">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow>How we work</Eyebrow>
            <h1 className="mt-4 font-display text-[clamp(2.25rem,4.4vw,3.5rem)] leading-[1.04] font-bold tracking-[-0.03em] text-ink">
              No mystery. Just the order of work.
            </h1>
            <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-ink-soft">
              Most of what goes wrong in a website project is process, not craft:
              unclear scope, invisible progress, and problems found at launch.
              Here is how we avoid all three.
            </p>
          </div>
          <div className="lg:col-span-5 lg:text-right">
            <ActionLink href="/buy" variant="primary" size="lg">
              Start an order
            </ActionLink>
          </div>
        </div>
      </section>

      <Steps />

      {/* ── phases ── */}
      <section className="shell pb-12" aria-labelledby="phases-title">
        <Eyebrow>Custom projects, in six phases</Eyebrow>
        <h2 id="phases-title" className="mt-4 font-display text-display font-bold text-ink">
          From first call to your repository.
        </h2>

        <Reveal
          as="ol"
          variant="rise"
          mode="archive"
          group
          className="card mt-10 divide-y divide-rule-soft overflow-hidden"
        >
          {phases.map((phase) => (
            <li key={phase.n} className="grid gap-3 px-5 py-6 sm:px-7 lg:grid-cols-12 lg:gap-6">
              <div className="lg:col-span-3">
                <div className="flex items-baseline gap-3">
                  <span className="num text-[0.8125rem] font-bold text-accent">
                    {phase.n}
                  </span>
                  <h3 className="font-display text-[1.125rem] font-bold text-ink">
                    {phase.name}
                  </h3>
                </div>
                <p className="mt-1.5 text-[0.8125rem] text-ink-muted">{phase.time}</p>
              </div>
              <p className="text-[0.9375rem] leading-relaxed text-ink-soft lg:col-span-6">
                {phase.body}
              </p>
              <p className="flex gap-2.5 text-[0.8125rem] text-ink-muted lg:col-span-3">
                <CheckMark className="mt-0.5 shrink-0 text-endorse" />
                {phase.out}
              </p>
            </li>
          ))}
        </Reveal>
      </section>

      {/* ── principles ── */}
      <section className="px-2 sm:px-3" aria-labelledby="principles-title">
        <div className="on-dark panel">
          <div className="shell py-14 lg:py-20">
            <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <Eyebrow tone="accent">Principles</Eyebrow>
                <h2
                  id="principles-title"
                  className="mt-4 font-display text-display font-bold text-white"
                >
                  Four rules we do not break.
                </h2>
              </div>
              <p className="text-[1rem] leading-relaxed text-chalk-muted lg:col-span-5">
                {performanceStatement}
              </p>
            </div>

            <Reveal
              as="ul"
              variant="up"
              mode="reveal"
              group
              className="mt-12 grid gap-4 sm:grid-cols-2"
            >
              {principles.map((item) => (
                <li
                  key={item.title}
                  className="rounded-lg border border-dark-rule bg-dark-raised p-6 sm:p-7"
                >
                  <h3 className="font-display text-[1.25rem] font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-chalk-muted">
                    {item.body}
                  </p>
                </li>
              ))}
            </Reveal>

            <div className="mt-10 flex flex-wrap gap-3 border-t border-dark-rule pt-8">
              <ActionLink href="/custom-build" variant="primary" size="lg">
                Start a custom project
              </ActionLink>
              <ActionLink
                href={`mailto:${site.contact.email}`}
                variant="outlineLight"
                size="lg"
                arrow={false}
              >
                {site.contact.email}
              </ActionLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
