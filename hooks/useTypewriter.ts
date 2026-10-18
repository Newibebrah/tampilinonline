"use client";

import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Typewriter custom (README: tanpa library luar).
 *
 * - Mengetik per KODE POINT (Array.from) supaya karakter multi-byte
 *   tidak pernah terpotong tengah surrogate pair.
 * - API: `play = true` → mulai mengetik dari 0 (reset otomatis saat teks
 *   berganti scene ATAU saat play berubah); `skip()` → langsung tampil penuh.
 * - prefers-reduced-motion → teks tampil penuh seketika tanpa interval.
 * - Saat play = false, teks di-RESET ke kosong (hook tidak pernah " Tales
 *   leaks" posisi lama ke fase berikutnya — sumber bug "teks lompat penuh").
 *
 * Return `typed` berisi potongan RAW string (marker ** / * diparse oleh
 * komponen render, BUKAN HTML).
 */
export function useTypewriter(text: string, speed = 24, play = false) {
  const reducedMotion = useReducedMotion();
  // Pecah per code point sekali per teks (memo) — emoji tetap utuh.
  const codePoints = useMemo(() => Array.from(text), [text]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Reduced motion: tanpa interval — penuh seketika (aturan README).
    if (play && reducedMotion) {
      setCount(codePoints.length);
      return;
    }
    if (!play) {
      setCount(0); // reset bersih: tidak ada sisa teks fase sebelumnya
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
  }, [codePoints, play, reducedMotion, speed]);

  return {
    typed: codePoints.slice(0, count).join(""),
    done: count >= codePoints.length,
    skip: () => setCount(codePoints.length),
  };
}
