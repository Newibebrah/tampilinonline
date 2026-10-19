"use client";

import { useEffect } from "react";
import { useMotionValue, type MotionValue } from "framer-motion";

/**
 * Posisi kursor viewport sebagai MotionValue (tanpa re-render).
 * HANYA aktif di perangkat fine-pointer (mouse) — di touch/reduced-motion
 * nilai tetap di luar layar (-1000) sehingga efek mouse otomatis "mati".
 *
 * Dipakai: CanvasTexture (dot interaktif di persilangan grid).
 */
export function useMousePosition(enabled = true): {
  x: MotionValue<number>;
  y: MotionValue<number>;
} {
  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);

  useEffect(() => {
    if (!enabled) return;
    // Guardrail prompt: efek mouse hanya di pointer halus (desktop), bukan sentuh.
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onLeave = () => {
      x.set(-1000);
      y.set(-1000);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled, x, y]);

  return { x, y };
}
