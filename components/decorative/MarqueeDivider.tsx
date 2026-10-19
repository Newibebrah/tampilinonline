"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

/**
 * MarqueeDivider (prompt Bagian 3.1) — pita hitam miring -2° dengan border
 * kuning atas-bawah, berisi teks berjalan infinite dipisah bintang ✦.
 *
 * - ADDITIVE: hanya disisipkan DI ANTARA section (app/page.tsx) — tidak
 *   menyentuh markup section mana pun.
 * - Wrapper luar overflow-hidden → rotasi pita tidak pernah memicu
 *   horizontal scroll (guardrail Bagian 4), termasuk di 360px.
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

/** Satu set konten — dirender 2× untuk loop mulus. */
function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <span className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {ITEMS.map((item) => (
        <span key={item} className="flex items-center">
          <span className="whitespace-nowrap px-5 font-display text-sm font-bold uppercase tracking-widest text-cream sm:text-base">
            {item}
          </span>
          <span className="text-yellow" aria-hidden="true">
            ✦
          </span>
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
      className={cn("relative overflow-hidden py-8 select-none", className)}
    >
      {/* Pita miring — 110% lebar digeser -5% agar sudut rotasi terpotong rapi */}
      <div className="relative -left-[5%] w-[110%] -rotate-2 border-y-[3px] border-ink bg-ink py-2.5 shadow-brutal-sm">
        <motion.div
          className={cn("flex w-max", !reduced && "animate-marquee")}
          initial={false}
        >
          <Row />
          <Row hidden />
        </motion.div>
      </div>
    </div>
  );
}
