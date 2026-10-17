"use client";

import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Typewriter custom (README: tanpa library luar).
 *
 * - Mengetik per KODE POINT (Array.from) supaya karakter multi-byte
 *   (emoji di narasi) tidak pernah terpotong tengah surrogate pair.
 * - `instant = true` → teks tampil penuh seketika (dipakai saat user
 *   mengetuk untuk skip, dan saat prefers-reduced-motion).
 * - Reset otomatis saat `text` berpindah scene.
 *
 * Return `typed` berisi potongan RAW string (masih mengandung marker
 * ** / * yang akan diparse merahkan oleh komponen render, BUKAN HTML).
 */
export function useTypewriter(text: string, speed = 24, instant = false) {
  const reducedMotion = useReducedMotion();
  // Pecah per code point sekali per teks (memo) — emoji tetap utuh.
  const codePoints = useMemo(() => Array.from(text), [text]);
  const active = !instant && !reducedMotion;

  const [count, setCount] = useState(active ? 0 : codePoints.length);

  useEffect(() => {
    if (!active) {
      setCount(codePoints.length);
      return;
    }
    setCount(0);
    const id = setInterval(() => {
      setCount((current) => {
        if (current >= codePoints.length - 1) {
          clearInterval(id);
          return codePoints.length;
        }
        return current + 1;
      });
    }, speed);
    return () => clearInterval(id);
  }, [codePoints, active, speed]);

  return {
    typed: codePoints.slice(0, count).join(""),
    done: count >= codePoints.length,
  };
}
