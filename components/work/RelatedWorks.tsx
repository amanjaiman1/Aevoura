import Link from "next/link";
import { getRelatedWorks } from "@/lib/works";
import { formatPrice } from "@/lib/pricing";
import { PreviewMedia } from "@/components/work/PreviewMedia";
import { Reveal } from "@/components/primitives/Reveal";
import { LineMask } from "@/components/primitives/LineMask";
import { SectionLabel, Arrow } from "@/components/primitives/Marks";

/** The rest of the collection. Wraps around, so there is never a dead end. */
export function RelatedWorks({ slug }: { slug: string }) {
  const related = getRelatedWorks(slug, 2);

  return (
    <section
      className="shell border-t border-rule section-y"
      aria-labelledby="related-title"
    >
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <SectionLabel index="—">ELSEWHERE IN THE EDITION</SectionLabel>
          <h2 id="related-title" className="mt-5">
            <LineMask
              as="span"
              mode="exhibition"
              className="block font-display text-headline tracking-[-0.015em] text-ink"
              lines={["Continue through", "the collection."]}
            />
          </h2>
        </div>
        <Link href="/collection" className="link-rule meta text-ink">
          See all works <Arrow />
        </Link>
      </div>

      <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2">
        {related.map((work, i) => (
          <Reveal key={work.slug} variant="up" mode="exhibition" delay={i * 0.08}>
            <Link
              href={`/collection/${work.slug}`}
              data-cursor="view"
              className="exhibit-link group/rel block"
              aria-label={`View ${work.name} — ${work.industry}`}
            >
              <div className="exhibit border border-rule">
                <PreviewMedia
                  work={work}
                  className="aspect-[4/3] exhibit-zoom"
                  sizes="(max-width: 640px) 100vw, 45vw"
                />
              </div>
              <div className="mt-5 flex items-baseline justify-between gap-4">
                <span className="meta text-ink-muted tabular-nums">
                  WORK {work.number}
                </span>
                <span className="meta text-ink-muted">
                  {formatPrice(work.sourcePrice)}
                </span>
              </div>
              <h3 className="mt-3 font-display text-title text-ink">{work.name}</h3>
              <p className="mt-2 meta text-ink-muted">
                {work.classification.toUpperCase()}
              </p>
              <p className="mt-4 max-w-prose text-[0.9375rem] leading-relaxed text-ink-soft">
                {work.philosophy}
              </p>
              <span className="mt-4 inline-block meta text-ink group-hover/rel:text-accent">
                View work <Arrow />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
