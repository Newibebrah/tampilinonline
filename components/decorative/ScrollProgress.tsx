"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { INK_RGB } from "@/lib/colors";

/**
 * ScrollProgress (prompt Bagian 1.2) — garis putus-putus di atas layar yang
 * "terisi" solid kuning (highlight konversi, token PALETTE — tanpa hex)
 * mengikuti scroll. Spring 300/30 agar terasa hidup; reduced-motion tetap
 * berfungsi sebagai indikator (scroll-driven, bukan animasi waktu) tanpa spring.
 *
 * Fixed + pointer-events-none — tidak memblokir navbar/menu di bawahnya.
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
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-1.5 select-none"
    >
      {/* Track putus-putus (ink transparan) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, rgba(${INK_RGB},0.35) 0 6px, transparent 6px 12px)`,
        }}
      />
      {/* Isi solid kuning — scaleX mengikuti progres baca */}
      <motion.div
        className="h-full w-full origin-left bg-yellow"
        style={{
          scaleX: reduced ? scrollYProgress : springScaleX,
          willChange: "transform",
        }}
      />
    </div>
  );
}
