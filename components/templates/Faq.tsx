import type { FaqItem } from "@/lib/faq";
import { Reveal } from "@/components/primitives/Reveal";
import { Eyebrow } from "@/components/primitives/Marks";

/**
 * FAQ built on native <details>/<summary>: keyboard operable, works with no
 * JavaScript, announces state correctly, and findable by in-page search. A
 * hand-rolled accordion would be more code and less accessible.
 */
export function Faq({
  items,
  title,
  lead,
  eyebrow = "Questions",
  id = "faq",
}: {
  items: FaqItem[];
  title: string;
  lead?: string;
  eyebrow?: string;
  id?: string;
}) {
  return (
    <section id={id} className="shell scroll-mt-28 section-y" aria-labelledby={`${id}-title`}>
      <div className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-10">
        <div className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2
            id={`${id}-title`}
            className="mt-4 font-display text-display font-bold text-ink"
          >
            {title}
          </h2>
          {lead && (
            <p className="mt-5 max-w-sm text-[0.9375rem] leading-relaxed text-ink-muted">
              {lead}
            </p>
          )}
        </div>

        <Reveal
          variant="rise"
          mode="archive"
          group
          className="card divide-y divide-rule-soft overflow-hidden lg:col-span-8"
        >
          {items.map((item) => (
            <details key={item.q} className="faq group/faq">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 px-5 py-4 text-ink sm:px-7">
                <span className="max-w-[52ch] font-display text-[1.0625rem] leading-snug font-bold">
                  {item.q}
                </span>
                <span
                  aria-hidden="true"
                  className="relative block h-3.5 w-3.5 shrink-0 text-ink-muted"
                >
                  <span className="absolute top-1/2 left-0 block h-px w-3.5 -translate-y-1/2 bg-current" />
                  <span className="faq-tick absolute top-0 left-1/2 block h-3.5 w-px -translate-x-1/2 bg-current" />
                </span>
              </summary>
              <p className="max-w-[64ch] px-5 pb-5 text-[0.9375rem] leading-relaxed text-ink-soft sm:px-7">
                {item.a}
              </p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
