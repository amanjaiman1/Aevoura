import { performanceStatement } from "@/lib/templates";
import { Reveal } from "@/components/primitives/Reveal";
import { Eyebrow, CheckMark } from "@/components/primitives/Marks";
import { ActionLink } from "@/components/primitives/ActionLink";

/**
 * WHAT'S IN THE BOX
 *
 * The most common reason someone does not buy a template is not knowing what
 * they are actually getting. This is the answer, in plain items.
 */

const included = [
  {
    title: "Complete source code",
    body: "Every page, component, animation and style file. Typed, commented and conventional — no obfuscation, no build-only bundle.",
  },
  {
    title: "Centralised design tokens",
    body: "Colour, type, spacing and motion live in one file, so rebranding is editing a handful of values rather than hunting through components.",
  },
  {
    title: "Every page built, not stubbed",
    body: "Eight or nine real pages per template, including the boring ones — cart, contact, 404, legal. Nothing is left as a placeholder.",
  },
  {
    title: "Mobile designed separately",
    body: "Its own layout and reading order, not a squeezed desktop. Tested on a real mid-range Android device before delivery.",
  },
  {
    title: "Art-directed placeholder assets",
    body: "Nothing looks broken on day one. Swap in your photography whenever it is ready.",
  },
  {
    title: "SEO and metadata configured",
    body: "Titles, descriptions, Open Graph, structured data, sitemap and robots — set up properly, not left to defaults.",
  },
  {
    title: "Accessibility built in",
    body: "Semantic markup, keyboard navigation, visible focus, reduced-motion support. It is why the code is clean, not a bolt-on.",
  },
  {
    title: "Setup documentation",
    body: "A README that gets it running locally in minutes and explains where everything lives, so you are not dependent on us.",
  },
  {
    title: "14 days of support",
    body: "Free installation help by email after purchase. If it will not run, that is our problem to solve.",
  },
];

export function Included() {
  return (
    <section className="shell section-y" aria-labelledby="included-title">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
        <div className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
          <Eyebrow>What you get</Eyebrow>
          <h2
            id="included-title"
            className="mt-4 font-display text-display font-bold text-ink"
          >
            Everything included, in every template.
          </h2>
          <p className="mt-5 max-w-sm text-[0.9375rem] leading-relaxed text-ink-muted">
            {performanceStatement}
          </p>
          <div className="mt-7 flex flex-wrap gap-2.5">
            <ActionLink href="/buy" variant="primary">
              Buy a template
            </ActionLink>
            <ActionLink href="/pricing" variant="outline">
              Compare plans
            </ActionLink>
          </div>
        </div>

        <Reveal
          as="ul"
          variant="rise"
          mode="archive"
          group
          className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:col-span-8"
        >
          {included.map((item) => (
            <li key={item.title} className="flex gap-3">
              <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-endorse-tint text-endorse">
                <CheckMark className="h-4 w-4" />
              </span>
              <span>
                <span className="block font-display text-[1.0625rem] font-bold text-ink">
                  {item.title}
                </span>
                <span className="mt-1.5 block text-[0.9375rem] leading-relaxed text-ink-muted">
                  {item.body}
                </span>
              </span>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
