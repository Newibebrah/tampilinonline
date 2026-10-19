"use client";

import { useEffect, useRef, type RefObject } from "react";
import { useMotionValue, useSpring, type MotionValue } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Efek magnetic untuk CTA utama (prompt Bagian 2.3) — REVISI user:
 * - Jangkaauan DIPERPENCIL: hanya merespons saat kursor benar-benar dekat
 *   (radius default 64px dari tepi, sebelumnya 96px).
 * - Separah-apreh: angkat dibatasi maxShift (default 10px) + strength 0.25 —
 *   tombol tidak "dilempar" jauh mengikuti kursor, tetap dekat tempat statis.
 * - Spring lebih kalem: stiffness 220 / damping 30 → gerak halus & minim bounce
 *   (sebelumnya 300/20 yang sering overshoot keras).
 * - Mati total di touch / reduced-motion (guardrail Bagian 4).
 *
 * Pemakaian: const { ref, x, y } = useMagnetic(); → <motion.div ref={ref} style={{ x, y }}>
 */
export function useMagnetic<T extends HTMLElement = HTMLDivElement>(
  strength = 0.25,
  radius = 64,
  maxShift = 10,
): { ref: RefObject<T>; x: MotionValue<number>; y: MotionValue<number> } {
  const ref = useRef<T | null>(null);
  const reduced = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  // Spring kalem (revisi user: tidak terlalu brutal) — gerak halus,
  // minim bounce yang berlebihan.
  const x = useSpring(rawX, { stiffness: 220, damping: 30 });
  const y = useSpring(rawY, { stiffness: 220, damping: 30 });

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      // Radius diukur dari tepi elemen, bukan pusat, agar CTA lebar ikut aktif.
      const distFromEdge =
        Math.hypot(dx, dy) - Math.max(rect.width, rect.height) / 2;
      if (distFromEdge < radius) {
        let vx = dx * strength;
        let vy = dy * strength;
        // maxShift: tarikan tidak melebihi N px dari tempat statis —
        // tombol tetap "bertanah", tidak ikut lari menjauh.
        const mag = Math.hypot(vx, vy);
        if (mag > maxShift) {
          const scale = maxShift / mag;
          vx *= scale;
          vy *= scale;
        }
        rawX.set(vx);
        rawY.set(vy);
      } else {
        rawX.set(0);
        rawY.set(0);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduced, radius, strength, maxShift, rawX, rawY]);

  return { ref, x, y };
}
