"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * ScrollProgress v3 — PENANDA PROGRES BACA yang jelas & berani (revisi user:
 * versi lama tipis + kuning "tidak jelas dan monoton"):
 * - Track surface SOLID dengan border-b 2px ink (garis tegas di bawah bar).
 * - Isi SOLID merah (warna aksi) — scaleX mengikuti scroll, spring 300/30.
 * - Reduced-motion: tetap berfungsi (scroll-driven, bukan animasi waktu).
 * Fixed + pointer-events-none — tidak memblokir navbar/menu.
 */
export function ScrollProgress() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const springScaleX = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-2.5 select-none border-b-2 border-ink bg-surface"
    >
      <motion.div
        className="h-full w-full origin-left bg-red"
        style={{
          scaleX: reduced ? scrollYProgress : springScaleX,
          willChange: "transform",
        }}
      />
    </div>
  );
}
