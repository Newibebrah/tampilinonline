import type { Config } from "tailwindcss";
import { PALETTE } from "./lib/colors";

/**
 * Design system v2.1 — Soft Pastel Neo-Brutalism (migrasi dari v1 cream/orange).
 * Warna & shadow mengikuti token PALETTE — JANGAN hardcode hex di sini lagi.
 *
 * Aturan rasio 75/20/5:
 * - 75% neutral: canvas, surface, ink
 * - 20% pastel: pink (kreatif/manusia), blue (teknologi/UI), mint (sukses),
 *   lavender (edukasi/ide)
 * - 5% highlight: yellow — HANYA CTA utama, harga, badge terpopuler.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: { ...PALETTE },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
        pixel: ["var(--font-press-start)", "monospace"],
      },
      borderRadius: {
        // v2.1: radius "card" & "pill" dinaikkan ke skala neo (14px / 999px)
        // supaya ratusan class existing naik standalone tanpa churn — nilai
        // sama dengan "neo". Token baru: neo, neo-lg, full.
        card: "14px",
        pill: "999px",
        neo: "14px",
        "neo-lg": "18px",
        full: "9999px",
      },
      boxShadow: {
        // v2.1: tanpa blur, offset lebih kecil dari v1 (4px utama).
        "brutal-sm": "3px 3px 0 #2B2433",
        brutal: "4px 4px 0 #2B2433",
        "brutal-lg": "6px 6px 0 #2B2433",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1.25rem", // 20px, aman untuk 360px
          md: "2rem",
          lg: "3rem",
        },
        screens: {
          "2xl": "1200px",
        },
      },
    },
  },
  plugins: [],
};

export default config;
