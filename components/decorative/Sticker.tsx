"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

/**
 * Sticker "die-cut" (prompt Bagian 2.1) — stiker pop-art dengan selotip kertas
 * di ujung atas, terlihat seperti ditempel manual.
 *
 * - WAJIB pointer-events-none + select-none (aturan prompt #2) — konsekuensinya
 *   wiggle-on-hover tidak memungkinkan; sebagai gantinya stiker punya
 *   *floating idle* (naik-turun pelan + rotasi mikro) yang terus hidup.
 * - Posisi absolute ditentukan lewat `className` di tempat pemakaian —
 *   komponen ini tidak pernah mengubah layout section.
 * - Reduced-motion: stiker tetap tampil, statis.
 */
export function Sticker({
  text,
  className,
  rotate = 6,
  tone = "yellow",
  floatDelay = 0,
}: {
  text: string;
  /** Kelas posisi: absolute + koordinat + visibility breakpoint. */
  className?: string;
  /** Rotasi dasar stiker (derajat). */
  rotate?: number;
  tone?: "yellow" | "pink" | "blue" | "lavender" | "surface" | "red";
  /** Delay mulai float (detik) agar beberapa stiker tidak sinkron. */
  floatDelay?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.span
      aria-hidden="true"
      className={cn("pointer-events-none absolute z-20 block select-none", className)}
      initial={false}
      style={{ rotate }}
      animate={
        reduced
          ? undefined
          : { y: [0, -6, 0], rotate: [rotate, rotate + 1.5, rotate] }
      }
      transition={
        reduced
          ? undefined
          : {
              repeat: Infinity,
              duration: 3.8,
              ease: "easeInOut",
              delay: floatDelay,
            }
      }
    >
      <span className="relative inline-block">
        {/* Selotip kertas — dua potongan transparan di ujung atas */}
        <span className="absolute -top-2 left-3 h-4 w-9 -rotate-12 bg-surface" />
        <span className="absolute -top-2 right-3 h-4 w-9 rotate-12 bg-surface" />

        <span
          className={cn(
            "inline-block rounded-card border-2 border-ink px-4 py-2 font-display text-sm font-bold uppercase tracking-wider shadow-brutal-sm",
            tone === "yellow" && "bg-yellow text-ink",
            tone === "pink" && "bg-pink text-ink",
            tone === "blue" && "bg-blue text-ink",
            tone === "lavender" && "bg-lavender text-ink",
            tone === "surface" && "bg-surface text-ink",
            tone === "red" && "bg-red text-ink",
          )}
        >
          {text}
        </span>
      </span>
    </motion.span>
  );
}
