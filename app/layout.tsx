import type { Metadata, Viewport } from "next";
import { Comfortaa, DM_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";

import { site } from "@/lib/site";
import { SiteHeader } from "@/components/chrome/SiteHeader";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { IntroLoader } from "@/components/chrome/IntroLoader";
import { ScrollManager } from "@/components/chrome/ScrollManager";
import { MotionRuntime } from "@/components/motion/MotionRuntime";

/**
 * Two families with a clear division of labour, plus mono for figures.
 *   display  Comfortaa — rounded geometric, warm and confident. Headlines.
 *   sans     DM Sans — everything you actually read and click.
 *   mono     tabular figures in prices and counts.
 *
 * `display: swap` throughout: text is readable immediately.
 */
const display = Comfortaa({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-comfortaa",
});

const sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-dm-sans",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "premium website templates",
    "buy website template",
    "Next.js website template",
    "custom website development India",
    "GSAP website template",
    "jewellery website template",
    "architecture portfolio template",
    "website design for brands",
  ],
  authors: [{ name: site.name, url: site.url }],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#f7f7f8",
  colorScheme: "light",
};

/**
 * Diameter of the opening's dot, in pixels. Lives here because both the CSS
 * custom property and the cover-scale maths below are derived from it.
 *
 * Changing this is safe: `--intro-cover` is divided by the same number, so a
 * larger dot needs proportionally less scale and the expansion still lands
 * exactly past the furthest corner. The fallbacks in globals.css
 * (`--intro-dot` and `--intro-cover`) are the only values that do not follow
 * automatically — keep them in step.
 */
const INTRO_DOT_PX = 28;

/**
 * Runs before the body is parsed, which is what makes the opening possible
 * without the site flashing underneath first.
 *
 * It opts in to motion by setting `js-motion` (reveal animations) and
 * `data-intro` (the opening overlay), and only when the visitor has not asked
 * for reduced motion. Neither attribute is ever set without JavaScript, so a
 * no-JS visitor gets the site immediately and can never be trapped behind an
 * overlay.
 *
 * It also publishes the two values the CSS cannot work out for itself:
 *   --intro-total   the sequence length, from site.intro.totalMs
 *   --intro-cover   the scale that takes the dot past the furthest corner,
 *                   from the viewport diagonal. CSS has no sqrt() it can rely
 *                   on, and a hardcoded scale would be wrong on most screens.
 *
 * Finally it arms a fallback timer that removes `data-intro` regardless of
 * React, so the scroll lock releases even if hydration never happens.
 */
const BOOTSTRAP = `(function(){try{
var d=document.documentElement;
if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
d.classList.add('js-motion');
${site.intro.enabled ? `
d.setAttribute('data-intro','');
d.style.setProperty('--intro-total','${site.intro.totalMs}ms');
d.style.setProperty('--intro-dot','${INTRO_DOT_PX}px');
var r=Math.sqrt(innerWidth*innerWidth+innerHeight*innerHeight)/2;
d.style.setProperty('--intro-cover',String(Math.ceil(r/${INTRO_DOT_PX / 2})+2));
setTimeout(function(){d.removeAttribute('data-intro')},${Math.round(site.intro.totalMs * 1.45)});
` : ""}
}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOTSTRAP }} />
      </head>
      <body>
        <IntroLoader />
        <ScrollManager />
        <MotionRuntime />
        {/* `site-shell` is what the opening reveals. */}
        <div className="site-shell flex min-h-screen flex-col">
          <SiteHeader />
          {/* tabIndex allows the skip link to move focus here, not just
              scroll. Programmatic focus on a container needs no ring. */}
          <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
