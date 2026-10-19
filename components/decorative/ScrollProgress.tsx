"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * ScrollProgress (prompt Bagian 1.2) — garis putus-putus di atas layar yang
 * "terisi" solid kuning→oranye (hard-stop, bukan gradient smooth) mengikuti
 * scroll. Spring 300/30 agar terasa hidup; reduced-motion tetap berfungsi
 * sebagai indikator (scroll-driven, bukan animasi waktu) tanpa spring.
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
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(26,26,26,0.35) 0 6px, transparent 6px 12px)",
        }}
      />
      {/* Isi solid — scaleX mengikuti progres baca */}
      <motion.div
        className="h-full w-full origin-left"
        style={{
          scaleX: reduced ? scrollYProgress : springScaleX,
          willChange: "transform",
          backgroundImage:
            "linear-gradient(90deg, #FFD23F 0 70%, #FF6B35 70% 100%)",
        }}
      />
    </div>
  );
}
