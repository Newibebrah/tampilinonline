/**
 * PALETTE v3.0 — Bold Pastel Neo-Brutalism + RED system (satu sumber kebenaran).
 * Diimport oleh tailwind.config.ts DAN komponen yang butuh nilai warna mentah
 * (canvas 2D, SVG, data-URI) — TIDAK ADA hex di-hardcode di file komponen.
 *
 * - `red`   = warna aksi: CTA utama, highlight penting, penanda progres.
 * - `*Lite` = versi TINT SOLID pastel untuk background section — menggantikan
 *   pola `bg-pink/20` dst. ATURAN USER: 0 transparansi pada card & background
 *   (grid background boleh tertutup).
 */
export const PALETTE = {
  canvas: "#FFFCF8",
  surface: "#FFFFFF",
  ink: "#2B2433",
  red: "#FF5A5A",
  pink: "#F2A3C7",
  blue: "#8FC5F8",
  mint: "#92E0C6",
  yellow: "#FFE28A",
  lavender: "#C6B5F2",
  // Tint solid (hasil campuran 20% pastel + canvas) — bg section tanpa opacity
  pinkLite: "#FCEAEE",
  blueLite: "#E8F1F8",
  mintLite: "#E9F6EE",
  lavenderLite: "#F3EEF7",
  yellowLite: "#FFF7E2",
} as const;

/** rgb triplet ink — untuk rgba() CSS/canvas yang tidak bisa pakai token Tailwind. */
export const INK_RGB = "43, 36, 51";
