import Link from "next/link";
import type { Template } from "@/lib/templates";
import { availabilityLabel } from "@/lib/templates";
import { formatPrice } from "@/lib/pricing";
import { PreviewMedia } from "./PreviewMedia";
import { ActionLink } from "@/components/primitives/ActionLink";
import { Badge, CheckMark } from "@/components/primitives/Marks";

/**
 * The commercial unit of the whole site.
 *
 * Every card answers the four questions a buyer has, in order: what is it,
 * who is it for, what does it cost, and how do I get it. The Buy button is
 * the crimson one and it is never more than one tap away — the previous
 * version of this page made you read an essay first.
 *
 * `wide` gives a template a full row with its selling points listed;
 * `stack` is the grid card.
 */
export function TemplateCard({
  template,
  layout = "stack",
  priority = false,
  /** Flip the media to the other side on `wide`, for rhythm down the page. */
  mirrored = false,
}: {
  template: Template;
  layout?: "stack" | "wide";
  priority?: boolean;
  mirrored?: boolean;
}) {
  const available = template.availability === "available";
  const buyHref = `/buy?template=${template.slug}`;
  const detailHref = `/templates/${template.slug}`;

  const media = (
    <Link
      href={detailHref}
      aria-label={`View the ${template.name} template`}
      className="zoom-parent group/media block"
    >
      <div className="zoom-frame relative overflow-hidden rounded-lg">
        <PreviewMedia
          template={template}
          priority={priority}
          className={layout === "wide" ? "aspect-[16/10]" : "aspect-[16/10]"}
          sizes={
            layout === "wide"
              ? "(max-width: 1024px) 100vw, 55vw"
              : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          }
        />
        <div className="pointer-events-none absolute top-3 left-3 flex flex-wrap gap-2">
          {template.liveDemo && <Badge tone="accent">Live demo</Badge>}
          {!available && <Badge tone="dark">{availabilityLabel[template.availability]}</Badge>}
        </div>
      </div>
    </Link>
  );

  if (layout === "wide") {
    return (
      <article className="card card-hover overflow-hidden p-3 sm:p-4">
        <div className="grid gap-5 lg:grid-cols-12 lg:items-center lg:gap-7">
          <div className={`lg:col-span-7 ${mirrored ? "lg:order-2" : ""}`}>{media}</div>

          <div
            className={`px-2 pb-3 lg:col-span-5 lg:px-4 lg:pb-0 ${
              mirrored ? "lg:order-1" : ""
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="num text-[0.75rem] text-ink-faint">{template.number}</span>
              <span aria-hidden="true" className="h-px w-4 bg-rule" />
              <span className="text-[0.8125rem] font-medium text-ink-muted">
                {template.category}
              </span>
            </div>

            <h3 className="mt-3 font-display text-title font-bold text-ink">
              <Link href={detailHref} className="hover:text-accent">
                {template.name}
              </Link>
            </h3>

            <p className="mt-3 text-[1rem] leading-relaxed text-ink-soft">
              {template.tagline}
            </p>

            <ul className="mt-5 space-y-2">
              {template.highlights.slice(0, 3).map((h) => (
                <li key={h.title} className="flex gap-2.5">
                  <CheckMark className="mt-0.5 text-endorse" />
                  <span className="text-[0.875rem] leading-snug text-ink-soft">
                    {h.title}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-end justify-between gap-4 border-t border-rule-soft pt-5">
              <div>
                <p className="text-[0.75rem] font-medium text-ink-muted">Source code</p>
                <p className="num font-display text-[1.5rem] font-bold text-ink">
                  {formatPrice(template.sourcePrice)}
                </p>
              </div>
              <p className="text-right text-[0.75rem] leading-snug text-ink-muted">
                Built for you
                <br />
                <span className="num font-medium text-ink">
                  from {formatPrice(template.customFrom)}
                </span>
              </p>
            </div>

            <div className="mt-5 flex flex-wrap gap-2.5">
              <ActionLink href={buyHref} variant="primary">
                Buy this template
              </ActionLink>
              {template.liveDemo && (
                <ActionLink href={template.liveDemo} variant="outline" external>
                  Live demo
                </ActionLink>
              )}
              <ActionLink href={detailHref} variant="quiet" arrow>
                Details
              </ActionLink>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="card card-hover flex flex-col overflow-hidden p-3">
      {media}

      <div className="flex flex-1 flex-col px-2 pt-5 pb-2">
        <div className="flex items-center gap-2.5">
          <span className="num text-[0.75rem] text-ink-faint">{template.number}</span>
          <span aria-hidden="true" className="h-px w-4 bg-rule" />
          <span className="text-[0.8125rem] font-medium text-ink-muted">
            {template.industry}
          </span>
        </div>

        <h3 className="mt-2.5 font-display text-[1.5rem] leading-tight font-bold tracking-[-0.02em] text-ink">
          <Link href={detailHref} className="hover:text-accent">
            {template.name}
          </Link>
        </h3>

        <p className="mt-2.5 flex-1 text-[0.9375rem] leading-relaxed text-ink-soft">
          {template.tagline}
        </p>

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-rule-soft pt-4">
          <p className="num font-display text-[1.25rem] font-bold text-ink">
            {formatPrice(template.sourcePrice)}
          </p>
          {template.liveDemo && (
            <a
              href={template.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="link-rule text-[0.8125rem] font-bold text-accent"
            >
              Live demo
            </a>
          )}
        </div>

        <div className="mt-4 flex gap-2">
          <ActionLink href={buyHref} variant="primary" size="sm" full>
            Buy
          </ActionLink>
          <ActionLink href={detailHref} variant="outline" size="sm" arrow={false}>
            Details
          </ActionLink>
        </div>
      </div>
    </article>
  );
}
