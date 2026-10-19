#!/usr/bin/env node
/**
 * check-meta — validasi SEO metadata dari sumber, tanpa build:
 * - Semua meta title unik & ≤60 karakter (target ≥50).
 * - Semua meta description unik & ≤160 karakter (target ≥150).
 * Sumber: lib/seo.ts (title default), app/**\/page.tsx, app/layout.tsx,
 * data/blogPosts.ts, data/caseStudies.ts (metaTitle/metaDescription blog &
 * studi kasus — page dinamis memakainya).
 *
 * Pakai: node scripts/check-meta.mjs  (exit 1 bila melanggar batas keras)
 */

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const FILES = [
  "lib/seo.ts",
  "app/layout.tsx",
  "app/page.tsx",
  "app/about/page.tsx",
  "app/blog/page.tsx",
  "app/privacy/page.tsx",
  "app/terms/page.tsx",
  "app/sitemap/page.tsx",
  "data/blogPosts.ts",
  "data/caseStudies.ts",
];

const titles = [];
const descs = [];
const errors = [];
const warns = [];

for (const rel of FILES) {
  const file = path.join(ROOT, rel);
  if (!fs.existsSync(file)) {
    errors.push(`File tidak ada: ${rel}`);
    continue;
  }
  const src = fs.readFileSync(file, "utf8");

  // metaTitle: "..." (data blog & studi kasus)
  for (const m of src.matchAll(/metaTitle:\s*"([^"]+)"/g)) {
    titles.push({ file: rel, len: m[1].length, value: m[1] });
  }
  // title: { absolute: "..." } — bisa inline atau multiline
  for (const m of src.matchAll(/title:\s*\{\s*\n?\s*absolute:\s*"([^"]+)"/g)) {
    titles.push({ file: rel, len: m[1].length, value: m[1] });
  }
  // title: "..." (halaman statis) — SKIP di data/* (itu H1 artikel, bukan meta)
  if (!rel.startsWith("data/")) {
    for (const m of src.matchAll(/(?<![\w.])title:\s*"([^"]+)"/g)) {
      titles.push({ file: rel, len: m[1].length, value: m[1] });
    }
  }
  // description: "..." — lib/seo.ts & app/**/page.tsx; skip data/* & schema builders
  if (!rel.startsWith("data/") && !rel.includes("schema")) {
    for (const m of src.matchAll(/description:\s*\n?\s*"([^"]+)"/g)) {
      descs.push({ file: rel, len: m[1].length, value: m[1] });
    }
  }
}

const quote = (s, n = 58) => (s.length > n ? s.slice(0, n) + "…" : s);

for (const t of titles) {
  if (t.len > 60) errors.push(`TITLE >60 (${t.len}) [${t.file}]: ${t.value}`);
  else if (t.len < 50) warns.push(`TITLE <50 (${t.len}) [${t.file}]: ${quote(t.value)}`);
}
for (const [i, t] of titles.entries()) {
  for (const [j, u] of titles.entries()) {
    // lib/seo.ts = layout default (base template). Homepage override title dari
    // page-level — hanya SATU yang dirender, jadi pasangan itu bukan duplikat.
    if (j > i && t.value === u.value && !(t.file === "lib/seo.ts" || u.file === "lib/seo.ts"))
      errors.push(`TITLE DUP [${t.file} = ${u.file}]: ${quote(t.value)}`);
  }
}
for (const d of descs) {
  if (d.len > 160) errors.push(`DESC >160 (${d.len}) [${d.file}]: ${quote(d.value)}`);
  else if (d.len < 150) warns.push(`DESC <150 (${d.len}) [${d.file}]: ${quote(d.value)}`);
}
for (const [i, d] of descs.entries()) {
  for (const [j, u] of descs.entries()) {
    if (j > i && d.value === u.value)
      errors.push(`DESC DUP [${d.file} = ${u.file}]: ${quote(d.value)}`);
  }
}

console.log("=== TITLE ===");
for (const t of titles) console.log(`  ${String(t.len).padStart(3)}  ${t.file.padEnd(22)}  ${quote(t.value)}`);
console.log("=== DESCRIPTION ===");
for (const d of descs) console.log(`  ${String(d.len).padStart(3)}  ${d.file.padEnd(22)}  ${quote(d.value)}`);
if (warns.length) {
  console.log("=== WARN ===");
  warns.forEach((w) => console.log("  " + w));
}
if (errors.length) {
  console.log("=== ERROR ===");
  errors.forEach((e) => console.log("  " + e));
  process.exit(1);
}
console.log("OK — semua metadata dalam batas.");
