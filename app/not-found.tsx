import Link from "next/link";
import { site } from "@/lib/site";
import { templates } from "@/lib/templates";
import { formatPrice } from "@/lib/pricing";
import { ActionLink } from "@/components/primitives/ActionLink";
import { Eyebrow } from "@/components/primitives/Marks";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="shell py-16 sm:py-24">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6">
          <Eyebrow tone="accent">404</Eyebrow>
          <h1 className="mt-4 font-display text-[clamp(2.25rem,4.4vw,3.5rem)] leading-[1.04] font-bold tracking-[-0.03em] text-ink">
            That page does not exist.
          </h1>
          <p className="mt-5 max-w-md text-[1.0625rem] leading-relaxed text-ink-soft">
            There are {site.templateCount} templates and whatever you were
            looking for is not one of them. It may have been sold exclusively and
            withdrawn, or the address may simply be wrong.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ActionLink href="/templates" variant="primary" size="lg">
              See the templates
            </ActionLink>
            <ActionLink href="/" variant="outline" size="lg">
              Back to home
            </ActionLink>
          </div>
        </div>

        <nav aria-label="Templates" className="lg:col-span-5 lg:col-start-8">
          <p className="eyebrow text-ink-muted">All templates</p>
          <ul className="card mt-4 divide-y divide-rule-soft overflow-hidden">
            {templates.map((template) => (
              <li key={template.slug}>
                <Link
                  href={`/templates/${template.slug}`}
                  className="flex min-h-16 items-center gap-3 px-4 py-3 transition-colors hover:bg-hover"
                >
                  <span className="num w-6 shrink-0 text-[0.75rem] text-ink-faint">
                    {template.number}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-[1rem] font-bold text-ink">
                      {template.name}
                    </span>
                    <span className="block truncate text-[0.8125rem] text-ink-muted">
                      {template.industry}
                    </span>
                  </span>
                  <span className="num shrink-0 text-[0.8125rem] font-bold text-ink">
                    {formatPrice(template.sourcePrice)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
