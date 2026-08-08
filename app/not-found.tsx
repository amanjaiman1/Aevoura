import Link from "next/link";
import { site } from "@/lib/site";
import { works } from "@/lib/works";
import { LineMask } from "@/components/primitives/LineMask";
import { ActionLink } from "@/components/primitives/ActionLink";
import { RegistrationMark } from "@/components/primitives/Marks";

export const metadata = {
  title: "Not in the archive",
};

export default function NotFound() {
  return (
    <section className="shell" aria-labelledby="nf-title">
      <div className="flex items-center justify-between gap-4 border-b border-rule py-4">
        <span className="meta text-ink">404</span>
        <div className="flex items-center gap-4">
          <RegistrationMark className="hidden sm:block" />
          <span className="meta text-ink-muted">EDITION {site.edition}</span>
        </div>
      </div>

      <div className="grid gap-y-12 pt-14 pb-20 lg:grid-cols-12 lg:gap-x-8 lg:pt-20">
        <div className="lg:col-span-7">
          <h1 id="nf-title">
            <LineMask
              as="span"
              mode="exhibition"
              className="block font-display text-statement tracking-[-0.02em] text-ink"
              lines={[
                "Not in",
                <>
                  the{" "}
                  <span className="italic text-accent">archive.</span>
                </>,
              ]}
            />
          </h1>
          <p className="mt-8 max-w-md text-lede text-ink-soft">
            The edition holds {works.length} works. Whatever you were looking
            for is not one of them — it may have been withdrawn after an
            exclusive sale, or the address may simply be wrong.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ActionLink href="/collection" variant="accent">
              See the collection
            </ActionLink>
            <ActionLink href="/" variant="outline">
              Back to the entrance
            </ActionLink>
          </div>
        </div>

        <nav aria-label="The collection" className="lg:col-span-4 lg:col-start-9">
          <p className="meta border-b border-rule pb-4 text-ink-muted">
            THE FIVE WORKS
          </p>
          <ul>
            {works.map((work) => (
              <li key={work.slug} className="border-b border-rule">
                <Link
                  href={`/collection/${work.slug}`}
                  className="flex min-h-14 items-center gap-4 py-3"
                >
                  <span className="meta shrink-0 text-ink-muted tabular-nums">
                    {work.number}
                  </span>
                  <span className="flex-1 text-[1rem] text-ink">{work.name}</span>
                  <span className="meta text-ink-muted">{work.industry}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
