import { Reveal } from "@/components/primitives/Reveal";
import { LineMask } from "@/components/primitives/LineMask";
import { SectionLabel } from "@/components/primitives/Marks";

const steps = [
  {
    index: "01",
    title: "Choose a foundation",
    body: "Pick the work closest to where you want to end up. It decides the structure and the engineering, not the final look.",
    note: "One call, no charge",
  },
  {
    index: "02",
    title: "Define your version",
    body: "We write down exactly what changes — identity, pages, content, commerce, motion — and what it costs. You approve the scope before anything begins.",
    note: "Fixed scope, fixed price",
  },
  {
    index: "03",
    title: "We build and launch it",
    body: "You see it in a staging environment early and often. Deployment, metadata, analytics and performance are part of the work, not an afterthought.",
    note: "Typically 3 — 6 weeks",
  },
  {
    index: "04",
    title: "We stay if you need us",
    body: "A monthly plan for updates, upkeep and small improvements. Or a clean handover to your team and no ongoing cost.",
    note: "Optional, cancellable",
  },
];

export function HowItWorks() {
  return (
    <section className="shell border-t border-rule section-y" aria-labelledby="process-title">
      <div className="grid gap-y-8 lg:grid-cols-12 lg:items-start lg:gap-x-8">
        {/* The label column travels with the list rather than leaving a hole. */}
        <div className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
          <SectionLabel index="—">HOW IT WORKS</SectionLabel>
          <h2 id="process-title" className="mt-6">
            <LineMask
              as="span"
              mode="exhibition"
              className="block font-display text-headline tracking-[-0.015em] text-ink"
              lines={["Four steps.", "No mystery."]}
            />
          </h2>
        </div>

        <Reveal
          as="ol"
          variant="up"
          mode="archive"
          group
          className="lg:col-span-7 lg:col-start-6"
        >
          {steps.map((step) => (
            <li key={step.index} className="border-t border-rule first:border-t-0">
              <div className="flex flex-col gap-2 py-7 sm:flex-row sm:gap-8">
                <span className="meta shrink-0 pt-1 text-accent tabular-nums sm:w-12">
                  {step.index}
                </span>
                <div className="flex-1">
                  <h3 className="font-display text-title text-ink">{step.title}</h3>
                  <p className="mt-3 max-w-prose text-[0.9375rem] leading-relaxed text-ink-muted">
                    {step.body}
                  </p>
                </div>
                <span className="meta shrink-0 pt-1 text-ink-muted sm:w-36 sm:text-right">
                  {step.note}
                </span>
              </div>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
