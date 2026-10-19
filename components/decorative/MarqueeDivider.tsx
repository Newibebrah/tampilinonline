"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

/**
 * MarqueeDivider — v2.1 Soft Pastel Neo-Brutalism:
 * - Pita gelap `bg-ink` dengan teks `text-yellow` (prompt FASE 5 #2).
 * - Starburst mini di-restyle ke gaya baru: fill pastel pink + garis
 *   plum ink (outline kartun, stroke menyatu ke band gelap — aman).
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

/** Starburst mini cartoon gaya pastel-plum — pemisah antar item. */
function MiniBurst() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="mx-3 h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      <polygon
        points="98,50 67,60 74,92 50,70 26,92 33,60 2,50 33,40 26,8 50,30 74,8 67,40"
        fill="var(--pink)"
        stroke="var(--ink)"
        strokeWidth="6"
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
          <span className="mx-1 inline-block whitespace-nowrap font-display text-sm font-bold uppercase tracking-widest text-yellow sm:text-base">
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
      {/* Pita gelap datar + teks kuning (highlight konversi). */}
      <div className="border-y-2 border-ink bg-ink py-2.5">
        <div className={cn("flex w-max", !reduced && "animate-marquee")}>
          <Row />
          <Row hidden />
        </div>
      </div>
    </div>
  );
}
