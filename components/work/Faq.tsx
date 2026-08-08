import type { FaqItem } from "@/lib/faq";
import { Reveal } from "@/components/primitives/Reveal";
import { LineMask } from "@/components/primitives/LineMask";
import { SectionLabel } from "@/components/primitives/Marks";

/**
 * FAQ.
 *
 * Built on native <details>/<summary>: open and close with keyboard, work
 * with no JavaScript at all, announce state correctly to screen readers, and
 * are findable by in-page search. A hand-rolled accordion would have been
 * more code and less accessible.
 *
 * The marker is a hairline cross that rotates to a minus — the only rotation
 * on the platform, and it carries meaning.
 */
export function Faq({
  items,
  title,
  lead,
  index = "—",
  tone = "paper",
  id = "faq",
}: {
  items: FaqItem[];
  title: [string, string?];
  lead?: string;
  index?: string;
  tone?: "paper" | "void";
  id?: string;
}) {
  const onVoid = tone === "void";
  const rule = onVoid ? "border-void-rule" : "border-rule";
  const muted = onVoid ? "text-chalk-muted" : "text-ink-muted";
  const strong = onVoid ? "text-chalk" : "text-ink";

  return (
    <section
      id={id}
      className={`shell scroll-mt-20 border-t ${rule} section-y`}
      aria-labelledby={`${id}-title`}
    >
      <div className="grid gap-y-10 lg:grid-cols-12 lg:items-start lg:gap-x-8">
        <div className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
          <SectionLabel index={index} tone={tone}>
            QUESTIONS
          </SectionLabel>
          <h2 id={`${id}-title`} className="mt-6">
            <LineMask
              as="span"
              mode="exhibition"
              className={`block font-display text-headline tracking-[-0.015em] ${strong}`}
              lines={title.filter(Boolean) as string[]}
            />
          </h2>
          {lead && (
            <Reveal
              as="p"
              variant="up"
              mode="archive"
              className={`mt-6 max-w-sm text-[0.9375rem] leading-relaxed ${muted}`}
            >
              {lead}
            </Reveal>
          )}
        </div>

        <Reveal
          variant="rise"
          mode="archive"
          group
          className={`border-t ${rule} lg:col-span-7 lg:col-start-6`}
        >
          {items.map((item) => (
            <details key={item.q} className={`faq group/faq border-b ${rule}`}>
              <summary
                className={`flex min-h-14 cursor-pointer list-none items-start justify-between gap-6 py-5 ${strong}`}
              >
                <span className="max-w-[52ch] text-[1.0625rem] leading-snug">
                  {item.q}
                </span>
                <span
                  aria-hidden="true"
                  className={`relative mt-2 block h-3 w-3 shrink-0 ${muted}`}
                >
                  <span className="absolute top-1/2 left-0 block h-px w-3 -translate-y-1/2 bg-current" />
                  <span className="faq-tick absolute top-0 left-1/2 block h-3 w-px -translate-x-1/2 bg-current" />
                </span>
              </summary>
              <p
                className={`max-w-[62ch] pr-8 pb-6 text-[0.9375rem] leading-relaxed ${muted}`}
              >
                {item.a}
              </p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
