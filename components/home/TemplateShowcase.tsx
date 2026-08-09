import Link from "next/link";
import { templates, getFeaturedTemplate } from "@/lib/templates";
import { site } from "@/lib/site";
import { TemplateCard } from "@/components/templates/TemplateCard";
import { Reveal } from "@/components/primitives/Reveal";
import { Eyebrow } from "@/components/primitives/Marks";
import { ActionLink } from "@/components/primitives/ActionLink";

/**
 * THE SHOWCASE
 *
 * Featured template gets a full row with its selling points; the rest sit in
 * a grid. Every card carries a price and a Buy button, because the previous
 * version of this section made people read a manifesto before it admitted
 * anything was for sale.
 */
export function TemplateShowcase() {
  const featured = getFeaturedTemplate();
  /** Featured first, then the rest in collection order. */
  const ordered = [featured, ...templates.filter((t) => t.slug !== featured.slug)];

  return (
    <section id="templates" className="shell scroll-mt-28 section-y" aria-labelledby="templates-title">
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <Eyebrow>The collection</Eyebrow>
          <h2
            id="templates-title"
            className="mt-4 font-display text-display font-bold text-ink"
          >
            {site.templateCount} templates. Each one built for a specific kind
            of business.
          </h2>
        </div>
        <div className="lg:col-span-5 lg:text-right">
          <p className="text-[1rem] leading-relaxed text-ink-muted">
            Not a marketplace with a thousand near-identical themes. Complete
            builds with public demos, each taken to the point where it could
            launch tomorrow.
          </p>
          <div className="mt-5 lg:flex lg:justify-end">
            <ActionLink href="/templates" variant="outline">
              Compare all {site.templateCount}
            </ActionLink>
          </div>
        </div>
      </div>

      {/* Every template gets a full row. With a short collection that reads far
          better than a sparse grid, and it shows each real screenshot at a size
          where the work is actually legible. */}
      <Reveal variant="up" mode="reveal" className="mt-10 grid gap-5">
        {ordered.map((template, i) => (
          <TemplateCard
            key={template.slug}
            template={template}
            layout="wide"
            priority={i === 0}
            mirrored={i % 2 === 1}
          />
        ))}
      </Reveal>

      <p className="mt-8 text-center text-[0.9375rem] text-ink-muted">
        None of them quite right?{" "}
        <Link href="/custom-build" className="link-rule font-bold text-ink">
          We build custom sites from scratch too
        </Link>
      </p>
    </section>
  );
}
