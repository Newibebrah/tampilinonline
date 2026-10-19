/**
 * PALETTE v2.1 — Soft Pastel Neo-Brutalism (satu sumber kebenaran).
 * Diimport oleh tailwind.config.ts (token Tailwind) DAN oleh komponen yang
 * butuh nilai warna mentah (canvas 2D, SVG, data-URI) — sehingga TIDAK ADA
 * hex yang di-hardcode di file komponen (aturan anti-slop #2).
 */
export const PALETTE = {
  canvas: "#FFFCF8",
  surface: "#FFFFFF",
  ink: "#2B2433",
  pink: "#F2A3C7",
  blue: "#8FC5F8",
  mint: "#92E0C6",
  yellow: "#FFE28A",
  lavender: "#C6B5F2",
} as const;

/** rgb triplet ink — untuk rgba() CSS/canvas yang tidak bisa pakai token Tailwind. */
export const INK_RGB = "43, 36, 51";
