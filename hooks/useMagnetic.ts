"use client";

import { useEffect, useRef, type RefObject } from "react";
import { useMotionValue, useSpring, type MotionValue } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Efek magnetic untuk CTA utama (prompt Bagian 2.3):
 * - Kursor mendekat (dalam radius) → elemen tertarik ke kursor secara elastis.
 * - Kursor pergi → kembali ke posisi semula dengan pantulan (spring bouncy).
 * - Spring physics: stiffness 300, damping 20 (aturan prompt #4).
 * - Mati total di touch / reduced-motion (guardrail Bagian 4).
 *
 * Pemakaian: const { ref, x, y } = useMagnetic(); → <motion.div ref={ref} style={{ x, y }}>
 */
export function useMagnetic<T extends HTMLElement = HTMLDivElement>(
  strength = 0.35,
  radius = 96,
): { ref: RefObject<T>; x: MotionValue<number>; y: MotionValue<number> } {
  const ref = useRef<T | null>(null);
  const reduced = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  // Spring di atas raw value → gerak elastis + bounce saat kembali.
  const x = useSpring(rawX, { stiffness: 300, damping: 20 });
  const y = useSpring(rawY, { stiffness: 300, damping: 20 });

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
        rawX.set(dx * strength);
        rawY.set(dy * strength);
      } else {
        rawX.set(0);
        rawY.set(0);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduced, radius, strength, rawX, rawY]);

  return { ref, x, y };
}
