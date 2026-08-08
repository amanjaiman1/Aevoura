import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter_Tight, Geist_Mono } from "next/font/google";
import "./globals.css";

import { site } from "@/lib/site";
import { SiteHeader } from "@/components/chrome/SiteHeader";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { ArchiveRail } from "@/components/chrome/ArchiveRail";
import { Cursor } from "@/components/chrome/Cursor";
import { MotionRuntime } from "@/components/motion/MotionRuntime";

/**
 * Three families, each with a job:
 *   display  the manifesto voice
 *   sans     everything you actually read and click
 *   mono     archive metadata — the platform's typographic signature
 *
 * `display: swap` throughout: text is readable immediately and never
 * blocked on a font download.
 */
const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-instrument-serif",
});

const sans = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-tight",
});

const mono = Geist_Mono({
  subsets: ["latin"],
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
    "custom website development",
    "Next.js website design",
    "GSAP website",
    "Three.js product experience",
    "website design India",
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
  themeColor: "#efebe3",
  colorScheme: "light",
};

/**
 * Sets `js-motion` before first paint, and only when motion is welcome.
 * Elements marked for reveal are hidden by CSS behind this class, so:
 *   no JS      → content visible
 *   reduced    → content visible
 *   otherwise  → MotionRuntime animates it in
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
        <Cursor />
        <MotionRuntime />

        {/* The rail is a physical margin: content begins after it. */}
        <div className="relative flex min-h-screen flex-col lg:pl-rail">
          <SiteHeader />
          {/* Fixed-position, so DOM order is purely about the tab sequence:
              skip link and primary navigation first, then the collection
              index, then the page itself. */}
          <ArchiveRail />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
