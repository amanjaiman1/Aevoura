import sharp from "sharp";
import { mkdirSync, statSync } from "node:fs";

const RAW = new URL("../.raw-shots/", import.meta.url).pathname.replace(/\/$/, "");
const OUT = new URL("../public/works/", import.meta.url).pathname.replace(/\/$/, "");
mkdirSync(OUT, { recursive: true });

const jobs = [
  ["aabha-hero", "aabha.webp"],
  ["aabha-mid", "aabha-2.webp"],
  ["aabha-deep", "aabha-3.webp"],
  ["section-hero", "section.webp"],
  ["section-mid", "section-2.webp"],
  ["section-deep", "section-3.webp"],
  ["pointofview-hero", "pointofview.webp"],
  ["pointofview-mid", "pointofview-2.webp"],
  ["pointofview-deep", "pointofview-3.webp"],
];

for (const [from, to] of jobs) {
  const src = `${RAW}/${from}.png`;
  const dest = `${OUT}/${to}`;
  await sharp(src)
    .resize(1600, 1000, { fit: "cover", position: "top" })
    .webp({ quality: 82, effort: 6 })
    .toFile(dest);
  const before = (statSync(src).size / 1024).toFixed(0);
  const after = (statSync(dest).size / 1024).toFixed(0);
  console.log(`${to.padEnd(22)} ${before.padStart(5)} KB png -> ${after.padStart(4)} KB webp`);
}
