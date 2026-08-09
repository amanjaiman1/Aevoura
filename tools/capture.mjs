import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

/**
 * Captures real poster frames from the live template demos.
 * Run once when a demo changes; the output is committed to /public/works.
 */

const RAW = new URL("../.raw-shots/", import.meta.url).pathname;
mkdirSync(RAW, { recursive: true });

const demos = [
  { slug: "aabha", url: "https://temp-jwel.vercel.app/" },
  { slug: "section", url: "https://temp-interior.vercel.app/" },
  { slug: "pointofview", url: "https://temp-marketing-eight.vercel.app/" },
];

const browser = await chromium.launch({ args: ["--no-sandbox"] });

for (const demo of demos) {
  const ctx = await browser.newContext({
    viewport: { width: 1600, height: 1000 },
    deviceScaleFactor: 1,
    // These templates gate their hero behind an intro animation; let it run.
    reducedMotion: "no-preference",
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));

  await page.goto(demo.url, { waitUntil: "networkidle", timeout: 90000 });
  // Loaders and page intros need real time before the hero is composed.
  await page.waitForTimeout(7000);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1500);

  await page.screenshot({ path: `${RAW}/${demo.slug}-hero.png` });

  // A second frame deeper in, useful for choosing the strongest poster.
  await page.evaluate(() => window.scrollTo(0, window.innerHeight * 1.6));
  await page.waitForTimeout(2500);
  await page.screenshot({ path: `${RAW}/${demo.slug}-mid.png` });

  await page.evaluate(() => window.scrollTo(0, window.innerHeight * 3.2));
  await page.waitForTimeout(2500);
  await page.screenshot({ path: `${RAW}/${demo.slug}-deep.png` });

  // What the site actually says, for accurate copy.
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(800);
  const info = await page.evaluate(() => ({
    title: document.title,
    h1: [...document.querySelectorAll("h1")].map((h) => h.textContent.replace(/\s+/g, " ").trim()).slice(0, 3),
    nav: [...document.querySelectorAll("nav a, header a")].map((a) => a.textContent.replace(/\s+/g, " ").trim()).filter(Boolean).slice(0, 14),
    headings: [...document.querySelectorAll("h2")].map((h) => h.textContent.replace(/\s+/g, " ").trim()).filter(Boolean).slice(0, 16),
    bodyBg: getComputedStyle(document.body).backgroundColor,
    bodyColor: getComputedStyle(document.body).color,
    fonts: [...new Set([...document.querySelectorAll("h1,h2,p,a")].map((e) => getComputedStyle(e).fontFamily.split(",")[0].replace(/['"]/g, "")))].slice(0, 6),
  }));

  console.log(`\n════ ${demo.slug} — ${demo.url}`);
  console.log(JSON.stringify(info, null, 1));
  if (errors.length) console.log(" pageerrors:", errors.slice(0, 3));

  await ctx.close();
}

await browser.close();
console.log("\nraw frames in", RAW);
