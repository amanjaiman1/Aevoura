import { performanceStatement } from "@/lib/works";
import { Reveal } from "@/components/primitives/Reveal";
import { LineMask } from "@/components/primitives/LineMask";
import { SectionLabel } from "@/components/primitives/Marks";

/**
 * QUALITY AND PERFORMANCE
 *
 * No Lighthouse screenshots, no invented numbers, no award badges. We have
 * not measured your hardware, so we describe what we actually do and let the
 * claim be checkable. Honesty here is a conversion asset, not a compromise —
 * anyone technical enough to spend ₹1,00,000 can tell a fake score.
 */

const standards = [
  {
    title: "Responsive engineering",
    body: "Layouts authored per breakpoint, not scaled down. Mobile gets its own composition and its own reading order.",
  },
  {
    title: "Mobile fallbacks",
    body: "Heavy interactions have a designed alternative — a still viewer, a simpler transition — rather than being switched off and left blank.",
  },
  {
    title: "Reduced motion",
    body: "The prefers-reduced-motion setting is honoured everywhere. All content and every action stay fully usable with animation off.",
  },
  {
    title: "Semantic structure",
    body: "One h1, ordered headings, real landmarks, real buttons and links. Keyboard navigation works because the markup is correct.",
  },
  {
    title: "SEO fundamentals",
    body: "Titles, descriptions, canonical URLs, Open Graph, structured data, sitemap and robots — configured, not assumed.",
  },
  {
    title: "Optimised assets",
    body: "Modern image formats with fallbacks, sized and lazy-loaded below the fold. Preview video is never loaded until it is wanted.",
  },
  {
    title: "Performance budgets",
    body: "A weight and interaction budget agreed at the start. If a feature breaks it, we say so before building it, not after.",
  },
  {
    title: "Browser testing",
    body: "Current Chrome, Safari, Firefox and Edge, on desktop and on a real mid-range Android device.",
  },
  {
    title: "Clean handover",
    body: "Typed, commented, conventional code. Centralised tokens. A README your developer can follow without calling us.",
  },
];

export function QualitySection() {
  return (
    <section
      className="shell border-t border-rule section-y"
      aria-labelledby="quality-title"
    >
      <div className="grid gap-y-10 lg:grid-cols-12 lg:items-start lg:gap-x-8">
        <div className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
          <SectionLabel index="—">STANDARDS</SectionLabel>
          <h2 id="quality-title" className="mt-6">
            <LineMask
              as="span"
              mode="exhibition"
              className="block font-display text-headline tracking-[-0.015em] text-ink"
              lines={["Creative work,", "engineered like", "it has a job."]}
            />
          </h2>

          <Reveal
            as="p"
            variant="up"
            mode="archive"
            className="mt-7 max-w-md text-[0.9375rem] leading-relaxed text-ink-muted"
          >
            {performanceStatement}
          </Reveal>

          <Reveal
            variant="rise"
            mode="archive"
            className="mt-7 border-l-2 border-rule pl-5"
          >
            <p className="meta text-ink">NO PUBLISHED SCORES</p>
            <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-muted">
              Other platforms show you a 100/100 badge. We would rather show
              you the live build and let you run the audit yourself.
            </p>
          </Reveal>
        </div>

        <Reveal
          as="ul"
          variant="rise"
          mode="archive"
          group
          className="grid gap-x-8 border-t border-rule sm:grid-cols-2 lg:col-span-7 lg:col-start-6 lg:border-t-0"
        >
          {standards.map((item) => (
            <li key={item.title} className="border-b border-rule py-6">
              <h3 className="text-[1rem] leading-snug font-medium text-ink">
                {item.title}
              </h3>
              <p className="mt-2.5 text-[0.875rem] leading-relaxed text-ink-muted">
                {item.body}
              </p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
