import type { Metadata } from "next";
import { site } from "@/lib/site";
import { performanceStatement } from "@/lib/works";
import { HowItWorks } from "@/components/home/HowItWorks";
import { LineMask } from "@/components/primitives/LineMask";
import { Reveal } from "@/components/primitives/Reveal";
import { ActionLink } from "@/components/primitives/ActionLink";
import { RegistrationMark, SectionLabel } from "@/components/primitives/Marks";

export const metadata: Metadata = {
  title: "Process — how a build actually runs",
  description:
    "Scope written before anything begins, staging you can watch, performance budgets held to launch, and a clean handover. The unglamorous parts, in order.",
  alternates: { canonical: "/process" },
};

const phases = [
  {
    index: "01",
    name: "Conversation",
    duration: "30 — 45 minutes",
    body: "We look at what you sell, who buys it, and what the site has to do. If a template fits, we say so and you keep your money. If it does not, we tell you which of the five is the closest foundation and why.",
    deliverable: "A recommendation, in writing, at no cost.",
  },
  {
    index: "02",
    name: "Scope",
    duration: "2 — 4 days",
    body: "Everything that will change is written down: pages, sections, integrations, motion, content responsibilities, and who supplies what. Then it is priced as a fixed number, not an estimate that drifts.",
    deliverable: "A scope document and a fixed price.",
  },
  {
    index: "03",
    name: "Design",
    duration: "1 — 2 weeks",
    body: "Direction is established on the real build rather than in a static mockup, because animation and pacing cannot be judged in a flat image. You review it in a browser, on your own phone.",
    deliverable: "A staging URL you can open any time.",
  },
  {
    index: "04",
    name: "Build",
    duration: "2 — 4 weeks",
    body: "Content integration, commerce, custom interactions and every breakpoint. Performance budgets are checked as we go, on a mid-range Android device, not at the end when it is expensive to fix.",
    deliverable: "Weekly staging updates, no status meetings required.",
  },
  {
    index: "05",
    name: "Launch",
    duration: "1 — 2 days",
    body: "Domain, hosting, analytics, forms, redirects, metadata and structured data. We run the accessibility and performance pass, fix what it finds, and only then point the domain.",
    deliverable: "A live site, and the repository in your name.",
  },
  {
    index: "06",
    name: "After",
    duration: "Ongoing or never",
    body: "Either a monthly care plan for upkeep and steady improvement, or a clean handover with documentation your developer can follow. There is no penalty for choosing the second one.",
    deliverable: "Your choice, in writing.",
  },
];

const principles = [
  {
    title: "Scope before money",
    body: "Nothing is invoiced before what you are buying is written down. If we cannot describe it, we should not be charging for it.",
  },
  {
    title: "The real build, early",
    body: "Static mockups hide the two things that matter most in this kind of work: how it moves and how it feels on a phone. You see the actual site from the first week.",
  },
  {
    title: "Bad news early",
    body: "If a feature will break the performance budget or the timeline, we say so before building it. Surprises at launch are a process failure, not bad luck.",
  },
  {
    title: "Your repository",
    body: "Code is written to be handed over from the first commit — typed, commented, conventional. You are never locked in by our habits.",
  },
];

export default function ProcessPage() {
  return (
    <>
      <section className="shell" aria-labelledby="process-page-title">
        <div className="flex items-center justify-between gap-4 border-b border-rule py-4">
          <span className="meta text-ink">PROCESS</span>
          <div className="flex items-center gap-4 sm:gap-8">
            <RegistrationMark className="hidden sm:block" />
            <span className="meta text-ink-muted">06 PHASES</span>
          </div>
        </div>

        <div className="grid gap-y-10 pt-12 pb-16 lg:grid-cols-12 lg:gap-x-8 lg:pt-16">
          <div className="lg:col-span-7">
            <h1 id="process-page-title">
              <LineMask
                as="span"
                mode="exhibition"
                className="block font-display text-statement tracking-[-0.02em] text-ink"
                lines={[
                  "No mystery.",
                  <>
                    Just the{" "}
                    <span className="italic text-accent">order of work.</span>
                  </>,
                ]}
              />
            </h1>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:pt-3">
            <Reveal as="p" variant="up" mode="archive" className="text-lede text-ink-soft">
              Most of what goes wrong in a website project is process, not
              craft: unclear scope, invisible progress, and problems found at
              launch. Here is how we avoid all three.
            </Reveal>
            <Reveal variant="rise" mode="commerce" className="mt-8">
              <ActionLink href="/custom-build#enquiry" variant="accent">
                Start with a conversation
              </ActionLink>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── phases ── */}
      <section className="shell border-t border-rule section-y" aria-labelledby="phases-title">
        <SectionLabel index="—">THE SIX PHASES</SectionLabel>
        <h2 id="phases-title" className="mt-5">
          <LineMask
            as="span"
            mode="exhibition"
            className="block font-display text-headline tracking-[-0.015em] text-ink"
            lines={["From first call to your repository."]}
          />
        </h2>

        <Reveal as="ol" variant="rise" mode="archive" group className="mt-12 border-t border-rule">
          {phases.map((phase) => (
            <li key={phase.index} className="border-b border-rule">
              <div className="grid gap-y-4 py-8 lg:grid-cols-12 lg:gap-x-8">
                <div className="lg:col-span-3">
                  <div className="flex items-baseline gap-4">
                    <span className="meta text-accent tabular-nums">{phase.index}</span>
                    <h3 className="font-display text-title text-ink">{phase.name}</h3>
                  </div>
                  <p className="mt-2 meta text-ink-muted">{phase.duration}</p>
                </div>
                <p className="text-[0.9375rem] leading-relaxed text-ink-soft lg:col-span-6">
                  {phase.body}
                </p>
                <p className="meta text-ink-muted lg:col-span-3 lg:text-right">
                  {phase.deliverable}
                </p>
              </div>
            </li>
          ))}
        </Reveal>
      </section>

      {/* ── principles ── */}
      <section className="on-void grain relative overflow-hidden" aria-labelledby="principles-title">
        <span aria-hidden="true" className="grain-layer opacity-[0.12]" />
        <div className="shell relative section-y">
          <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-4">
              <SectionLabel index="—" tone="void">
                PRINCIPLES
              </SectionLabel>
              <h2 id="principles-title" className="mt-6">
                <LineMask
                  as="span"
                  mode="exhibition"
                  className="block font-display text-headline tracking-[-0.015em] text-chalk"
                  lines={["Four rules we", "do not break."]}
                />
              </h2>
              <Reveal
                as="p"
                variant="up"
                mode="archive"
                className="mt-7 max-w-sm text-[0.9375rem] leading-relaxed text-chalk-muted"
              >
                {performanceStatement}
              </Reveal>
            </div>
            <Reveal
              as="ul"
              variant="rise"
              mode="archive"
              group
              className="border-t border-void-rule lg:col-span-7 lg:col-start-6"
            >
              {principles.map((item) => (
                <li key={item.title} className="border-b border-void-rule py-7">
                  <h3 className="font-display text-title text-chalk">{item.title}</h3>
                  <p className="mt-3 measure text-[0.9375rem] leading-relaxed text-chalk-muted">
                    {item.body}
                  </p>
                </li>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      <HowItWorks />

      {/* ── close ── */}
      <section className="shell border-t border-rule section-y">
        <div className="grid gap-y-8 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-7">
            <h2>
              <LineMask
                as="span"
                mode="exhibition"
                className="block font-display text-headline tracking-[-0.015em] text-ink"
                lines={["The first conversation", "costs nothing."]}
              />
            </h2>
            <Reveal as="p" variant="up" mode="archive" className="mt-6 max-w-xl text-lede text-ink-soft">
              Bring the brand, whatever assets exist, and what the site has to
              achieve. You will leave with a recommendation whether or not you
              hire us.
            </Reveal>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal variant="rise" mode="commerce" group className="flex flex-col gap-3">
              <ActionLink href="/custom-build#enquiry" variant="accent" full>
                Start a project
              </ActionLink>
              <ActionLink href={`mailto:${site.contact.email}`} variant="outline" full>
                Email us instead
              </ActionLink>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
