import Link from "next/link";
import { site, footerNav } from "@/lib/site";
import { templates } from "@/lib/templates";
import { ActionLink } from "@/components/primitives/ActionLink";
import { Eyebrow, MailIcon } from "@/components/primitives/Marks";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const available = templates.filter((t) => t.availability === "available").length;

  return (
    <footer className="px-2 pb-2 sm:px-3 sm:pb-3">
      <div className="on-dark panel relative">
        <div className="shell py-14 lg:py-20">
          {/* closing CTA */}
          <div className="grid gap-8 border-b border-dark-rule pb-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Eyebrow tone="accent">Ready when you are</Eyebrow>
              <h2 className="mt-5 font-display text-display font-bold text-white">
                Pick a template, or tell us what you need building.
              </h2>
              <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-chalk-muted">
                Orders and questions both go to the same inbox, and you get a
                reply from the person who does the work — {site.contact.responseTime}.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
              <ActionLink href="/buy" variant="primary" size="lg">
                Buy a template
              </ActionLink>
              <ActionLink href="/custom-build" variant="outlineLight" size="lg">
                Custom build
              </ActionLink>
            </div>
          </div>

          {/* columns */}
          <div className="grid gap-10 py-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="font-display text-[1.25rem] font-bold text-white">
                {site.name}
              </p>
              <p className="mt-4 max-w-xs text-[0.9375rem] leading-relaxed text-chalk-muted">
                {site.templateCountWord.charAt(0).toUpperCase() +
                  site.templateCountWord.slice(1)}{" "}
                premium website templates, engineered end to end. Buy the
                source, or have us build it around your brand.
              </p>
              <a
                href={`mailto:${site.contact.email}`}
                className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-dark-rule px-4 py-2.5 text-[0.875rem] font-medium text-white transition-colors duration-200 hover:border-white/40"
              >
                <MailIcon className="text-accent" />
                {site.contact.email}
              </a>
              <p className="mt-4 text-[0.8125rem] text-chalk-muted">
                {site.contact.location} · {site.contact.timezone}
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-3 lg:col-span-7 lg:col-start-6">
              {footerNav.map((group) => (
                <nav key={group.title} aria-label={group.title}>
                  <h3 className="eyebrow text-chalk-muted">{group.title}</h3>
                  <ul className="mt-4 space-y-2.5">
                    {group.items.map((item) => (
                      <li key={item.href + item.label}>
                        <Link
                          href={item.href}
                          className="link-rule text-[0.9375rem] text-white/85 hover:text-white"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>
          </div>

          {/* base */}
          <div className="flex flex-col gap-4 border-t border-dark-rule pt-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {site.social.map((channel) =>
                channel.href ? (
                  <a
                    key={channel.label}
                    href={channel.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-rule text-[0.8125rem] font-medium text-white/80 hover:text-white"
                  >
                    {channel.label}
                  </a>
                ) : (
                  /* Placeholder: add a URL in lib/site.ts to activate. */
                  <span
                    key={channel.label}
                    className="text-[0.8125rem] text-chalk-muted/45"
                  >
                    {channel.label}
                  </span>
                )
              )}
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.8125rem] text-chalk-muted">
              <span className="num">
                {available} of {templates.length} available
              </span>
              <Link href="/license" className="link-rule hover:text-white">
                Licence
              </Link>
              <span>
                © {year} {site.name}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
