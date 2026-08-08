import { site } from "@/lib/site";
import { LineMask } from "@/components/primitives/LineMask";
import { Reveal } from "@/components/primitives/Reveal";
import { ActionLink } from "@/components/primitives/ActionLink";

/**
 * FINAL CALL TO ACTION
 *
 * An editorial closing statement, not a contact block. The offer is stated
 * as a choice between two real things, and the number 05 does the rest of
 * the work: if none of the five is right, the sixth is the product.
 */
export function FinalCta() {
  return (
    <section className="on-void grain relative overflow-hidden" aria-labelledby="final-title">
      <span aria-hidden="true" className="grain-layer opacity-[0.12]" />

      <div className="shell relative section-y">
        <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-7">
            <span className="meta text-chalk-muted">
              EDITION {site.edition} — 0{site.workCount} WORKS
            </span>
            <h2 id="final-title" className="mt-8">
              <LineMask
                as="span"
                mode="exhibition"
                className="block font-display text-statement tracking-[-0.02em] text-chalk"
                lines={[
                  "Choose a work.",
                  "Or ask us to make",
                  <>
                    the <span className="italic text-accent">sixth.</span>
                  </>,
                ]}
              />
            </h2>
            <Reveal
              as="p"
              variant="up"
              mode="archive"
              className="mt-8 max-w-xl text-lede text-chalk-muted"
            >
              Five are finished and for sale. The sixth does not exist yet, and
              it would be built for one brand only. Either conversation starts
              the same way.
            </Reveal>
          </div>

          <div className="lg:col-span-4 lg:col-start-9 lg:pt-4">
            <Reveal
              variant="rise"
              mode="commerce"
              group
              className="flex flex-col gap-3"
            >
              <ActionLink href="/custom-build" variant="accent" tone="void" full>
                Start a project
              </ActionLink>
              <ActionLink href="/collection" variant="outline" tone="void" full>
                Browse the collection
              </ActionLink>
            </Reveal>

            <Reveal
              variant="rise"
              mode="archive"
              className="mt-8 border-t border-void-rule pt-6"
            >
              <p className="meta text-chalk-muted">OR WRITE DIRECTLY</p>
              <a
                href={`mailto:${site.contact.email}?subject=Project%20enquiry%20—%20${site.name}`}
                data-cursor="link"
                className="link-rule mt-3 inline-block font-display text-[clamp(1.125rem,2vw,1.5rem)] break-all text-chalk"
              >
                {site.contact.email}
              </a>
              <p className="mt-4 meta text-chalk-muted">
                Replies within one working day · {site.contact.timezone}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
