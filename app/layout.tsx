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
 * Adds `js-motion` before first paint, and only when motion is welcome.
 * Elements marked for reveal are hidden by CSS behind this class, so no-JS
 * and reduced-motion visitors always see complete content.
 */
const MOTION_BOOTSTRAP = `(function(){try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('js-motion')}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: MOTION_BOOTSTRAP }} />
      </head>
      <body>
        <IntroLoader />
        <ScrollManager />
        <MotionRuntime />
        <div className="flex min-h-screen flex-col">
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
