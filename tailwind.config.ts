import type { Config } from "tailwindcss";

/**
 * Design system Tampilin.online — Soft Neo-Brutalism.
 * Warna & shadow mengikuti README Section 2.
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
      colors: {
        cream: "#F5F0E8",
        ink: "#1A1A1A",
        yellow: "#FFD23F",
        orange: "#FF6B35",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
        pixel: ["var(--font-press-start)", "monospace"],
      },
      borderRadius: {
        card: "8px",
        pill: "999px",
      },
      boxShadow: {
        brutal: "6px 6px 0 #1A1A1A",
        "brutal-sm": "2px 2px 0 #1A1A1A",
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
