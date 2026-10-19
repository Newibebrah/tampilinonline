#!/usr/bin/env node
/**
 * wordcount — hitung kata isi konten blog dari data sungguhan
 * (tanpa build; data di-stub jadi JS murni lalu diimpor).
 * Target: 800–1500 kata per artikel.
 */
import fs from "node:fs";
import path from "node:path";

const src = fs.readFileSync(
  path.join(process.cwd(), "data/blogPosts.ts"),
  "utf8",
);
const js = src
  .replace(/^import type .*\n/m, "")
  .replace(/: BlogPost\[\]/, "")
  .replace(/: BlogPost \| undefined/, "")
  .replace(/\(slug: string\)/, "(slug)")
  .replace(/limit = 2\): BlogPost\[\]/, "limit = 2)")
  .replace(/(\nexport const blogPosts)/, "\nexport const blogPosts")
  // buang helper — cukup array-nya
  .replace(/\/\*\* Ambil satu post[\s\S]*$/, "");

const tmp = path.join(process.cwd(), ".wordcount-tmp.mjs");
fs.writeFileSync(tmp, js);
const { blogPosts } = await import(tmp);
fs.unlinkSync(tmp);

let fail = false;
for (const p of blogPosts) {
  let words = p.tldr.split(/\s+/).length;
  for (const b of p.content) {
    if (b.type === "p" || b.type === "h2" || b.type === "h3")
      words += b.text.split(/\s+/).filter(Boolean).length;
    else if (b.type === "list")
      words += b.items.join(" ").split(/\s+/).filter(Boolean).length;
    else if (b.type === "links")
      words += b.items.map((i) => i.label).join(" ").split(/\s+/).filter(Boolean).length;
  }
  const ok = words >= 800 && words <= 1500;
  if (!ok) fail = true;
  console.log(`${ok ? "OK " : "!! "} ${p.slug}: ${words} kata`);
}
process.exit(fail ? 1 : 0);
