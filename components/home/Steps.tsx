import { Reveal } from "@/components/primitives/Reveal";
import { Eyebrow } from "@/components/primitives/Marks";
import { ActionLink } from "@/components/primitives/ActionLink";
import { site } from "@/lib/site";

const steps = [
  {
    n: "01",
    title: "Pick a template and a plan",
    body: "Choose the template closest to your business, then decide how much you want us to do — just the code, a full launch, or a custom build.",
    meta: "2 minutes",
  },
  {
    n: "02",
    title: "Send the order",
    body: "The order form fills an email with everything we need. No card details, no account. You press send.",
    meta: "One click",
  },
  {
    n: "03",
    title: "We reply with an invoice",
    body: `A real reply from a person ${site.contact.responseTime}, confirming scope and price in writing before anything is charged.`,
    meta: "1 working day",
  },
  {
    n: "04",
    title: "You get the site",
    body: "Repository access within 24 hours for source code. Live in 5 to 8 working days for a launch. 3 to 6 weeks for a custom build.",
    meta: "24 hours onward",
  },
];

export function Steps() {
  return (
    <section className="shell section-y" aria-labelledby="steps-title">
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <Eyebrow>How it works</Eyebrow>
          <h2 id="steps-title" className="mt-4 font-display text-display font-bold text-ink">
            From picking one to owning it, in four steps.
          </h2>
        </div>
        <div className="lg:col-span-5 lg:text-right">
          <ActionLink href="/process" variant="outline">
            See the full process
          </ActionLink>
        </div>
      </div>

      <Reveal
        as="ol"
        variant="up"
        mode="reveal"
        group
        className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {steps.map((step) => (
          <li key={step.n} className="card flex flex-col p-6">
            <div className="flex items-center justify-between gap-3">
              <span className="num font-display text-[1.75rem] font-bold text-accent">
                {step.n}
              </span>
              <span className="rounded-full bg-sunk px-3 py-1 text-[0.6875rem] font-bold text-ink-muted">
                {step.meta}
              </span>
            </div>
            <h3 className="mt-5 font-display text-[1.125rem] leading-snug font-bold text-ink">
              {step.title}
            </h3>
            <p className="mt-2.5 flex-1 text-[0.9375rem] leading-relaxed text-ink-muted">
              {step.body}
            </p>
          </li>
        ))}
      </Reveal>
    </section>
  );
}
