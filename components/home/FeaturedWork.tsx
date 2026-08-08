import { getFeaturedWork, availabilityLabel } from "@/lib/works";
import { formatPrice } from "@/lib/pricing";
import { PreviewMedia } from "@/components/work/PreviewMedia";
import { Reveal } from "@/components/primitives/Reveal";
import { LineMask } from "@/components/primitives/LineMask";
import { ActionLink } from "@/components/primitives/ActionLink";
import { AvailabilityMark, Arrow } from "@/components/primitives/Marks";

/**
 * FEATURED WORK — the expanded case study.
 *
 * The point of this section is not that Aurvi is attractive. It is that its
 * central interaction does a job a photograph cannot do, and that job is
 * worth money to a jeweller. Everything here argues commercially.
 *
 * The one inverted section on the homepage's upper half, because the work
 * itself lives in the dark.
 */
export function FeaturedWork() {
  const work = getFeaturedWork();

  const value = [
    {
      index: "01",
      title: "It answers the question that ends the session",
      body: "Every jewellery buyer wants to know what the stone actually looks like — the cut, the depth, the way light leaves it. A photograph cannot answer that, so the customer either goes to a showroom or closes the tab. Here they turn it themselves.",
    },
    {
      index: "02",
      title: "The showroom stays open",
      body: "Inspection is the part of the purchase that normally requires a counter, an appointment and a city. Moving it into the browser means it can happen at one in the morning, from anywhere, without a salesperson.",
    },
    {
      index: "03",
      title: "Expectation matches delivery",
      body: "Returns and disputes come from the gap between what a customer imagined and what arrived. Letting them examine the real geometry before paying narrows that gap — which is a cost saving, not a design flourish.",
    },
  ];

  return (
    <section className="on-void grain relative overflow-hidden" aria-labelledby="featured-title">
      <span aria-hidden="true" className="grain-layer opacity-[0.12]" />

      <div className="shell relative section-y">
        {/* ── plate ── */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-void-rule pb-5">
          <div className="flex items-center gap-4 sm:gap-8">
            <span className="meta text-chalk">WORK {work.number}</span>
            <span className="meta text-chalk-muted">
              {work.classification.toUpperCase()}
            </span>
          </div>
          <div className="flex items-center gap-4 sm:gap-8">
            {work.liveDemo && <span className="meta text-accent">LIVE EXPERIENCE</span>}
            <AvailabilityMark
              label={availabilityLabel[work.availability]}
              available={work.availability === "available"}
              tone="void"
            />
          </div>
        </div>

        {/* ── cinematic visual ── */}
        <Reveal variant="up" mode="exhibition" className="mt-10">
          <PreviewMedia
            work={work}
            priority={false}
            className="aspect-[4/3] border border-void-rule sm:aspect-[21/9]"
            sizes="100vw"
          />
        </Reveal>

        {/* ── the argument ── */}
        <div className="mt-12 grid gap-y-10 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-5">
            <h2 id="featured-title">
              <LineMask
                as="span"
                mode="exhibition"
                className="block font-display text-headline tracking-[-0.015em] text-chalk"
                lines={[
                  <>
                    {work.name}
                    <span className="text-chalk-muted"> —</span>
                  </>,
                  "a stone you can",
                  <>
                    <span className="italic text-accent">pick up.</span>
                  </>,
                ]}
              />
            </h2>
            <Reveal
              as="p"
              variant="up"
              mode="archive"
              className="mt-7 max-w-md text-lede text-chalk-muted"
            >
              A real-time 3D viewer sits at the centre of the product page. The
              customer drags to orbit the solitaire, switches the metal, and
              watches the facets respond to a moving key light. It is the
              product itself, running live — not a rendered video of it.
            </Reveal>

            <Reveal
              variant="rise"
              mode="commerce"
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            >
              {work.liveDemo && (
                <ActionLink
                  href={work.liveDemo}
                  variant="accent"
                  tone="void"
                  external
                  ariaLabel={`Open the ${work.name} live experience in a new tab`}
                >
                  Open the live experience
                </ActionLink>
              )}
              <ActionLink href={`/collection/${work.slug}`} variant="outline" tone="void">
                Explore the work
              </ActionLink>
            </Reveal>

            {work.liveDemoNote && (
              <Reveal
                as="p"
                variant="rise"
                mode="archive"
                className="mt-4 meta text-chalk-muted"
              >
                {work.liveDemoNote}
              </Reveal>
            )}

            <Reveal
              variant="rise"
              mode="archive"
              className="mt-9 flex flex-wrap items-baseline gap-x-6 gap-y-2 border-t border-void-rule pt-5"
            >
              <p className="meta text-chalk-muted">
                Source <span className="text-chalk">{formatPrice(work.sourcePrice)}</span>
              </p>
              <p className="meta text-chalk-muted">
                Built for you <span className="text-chalk">{formatPrice(work.customFrom)}</span>
              </p>
              <a
                href={`/custom-build?work=${work.slug}`}
                className="link-rule meta text-chalk"
              >
                Request this for my brand <Arrow />
              </a>
            </Reveal>
          </div>

          <Reveal
            as="ol"
            variant="up"
            mode="archive"
            group
            className="lg:col-span-6 lg:col-start-7"
          >
            {value.map((item) => (
              <li
                key={item.index}
                className="border-t border-void-rule py-6 first:border-t-0 first:pt-0"
              >
                <div className="flex gap-5 sm:gap-8">
                  <span className="meta shrink-0 text-accent tabular-nums">
                    {item.index}
                  </span>
                  <div>
                    <h3 className="font-display text-title text-chalk">{item.title}</h3>
                    <p className="mt-3 max-w-prose text-[0.9375rem] leading-relaxed text-chalk-muted">
                      {item.body}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
