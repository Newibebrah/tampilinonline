"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

/**
 * MarqueeDivider — REVISI USER:
 * - LURUS horizontal (tidak lagi miring -2°).
 * - Lebih cartoonish: pita dua-warna keras (kuning atas / oranye bawah,
 *   hard-stop bukan gradient smooth) + item sebagai "chips" putih
 *   border-ink + shadow keras, dipisah starburst mini — bukan pita hitam flat.
 *
 * - ADDITIVE: hanya disisipkan DI ANTARA section (app/page.tsx).
 * - Konten digandakan 2× (salinan aria-hidden) → loop translateX(-50%)
 *   mulus tanpa "lompatan".
 * - Reduced-motion: pita tampil statis (teks pertama tetap terbaca).
 */

const ITEMS = [
  "Tampilin.online",
  "Website UMKM",
  "Landing Page",
  "Company Profile",
  "Katalog Online",
  "E-Commerce",
] as const;

/** Starburst mini cartoon — pemisah antar chips. */
function MiniBurst() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="mx-2.5 h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      <polygon
        points="98,50 67,60 74,92 50,70 26,92 33,60 2,50 33,40 26,8 50,30 74,8 67,40"
        fill="#FFFFFF"
        stroke="#1A1A1A"
        strokeWidth="7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Satu set konten — dirender 2× untuk loop mulus. */
function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <span className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {ITEMS.map((item) => (
        <span key={item} className="flex items-center">
          <span className="mx-1 inline-block whitespace-nowrap rounded-card border-2 border-ink bg-white px-4 py-1.5 font-display text-sm font-bold uppercase tracking-widest text-ink shadow-brutal-sm sm:text-base">
            {item}
          </span>
          <MiniBurst />
        </span>
      ))}
    </span>
  );
}

export function MarqueeDivider({ className }: { className?: string }) {
  const reduced = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className={cn("relative overflow-hidden py-6 select-none", className)}
    >
      {/* Pita lurus, dua-warna keras: kuning atas / oranye bawah */}
      <div
        className="border-y-[3px] border-ink py-2"
        style={{
          backgroundImage:
            "linear-gradient(180deg, #FFD23F 0 50%, #FF6B35 50% 100%)",
        }}
      >
        <div className={cn("flex w-max", !reduced && "animate-marquee")}>
          <Row />
          <Row hidden />
        </div>
      </div>
    </div>
  );
}
