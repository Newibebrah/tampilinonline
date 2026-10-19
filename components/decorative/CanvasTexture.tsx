"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMousePosition } from "@/hooks/useMousePosition";

/**
 * CanvasTexture (prompt Bagian 1.1) — "tactile paper" global, 3 layer FIXED:
 *
 * 1. Noise kertas cetak (SVG feTurbulence data-URI, opacity ~4%) — di atas
 *    semua konten (z-[45]) memberi tekstur komik/print mewah. Statis, 0 JS.
 * 2. Dot-matrix statis via CSS radial-gradient (z-[44]) — pola titik tipis
 *    di seluruh layar, ikut terlihat di mobile (di sini dot memang diam).
 * 3. Canvas dot-matrix INTERAKTIF (desktop fine-pointer only): hanya dot
 *    dekat kursor yang digambar ulang (≤ ~40 arc per frame, rAF-throttled) —
 *    jadi murah walau grid penuh beribu titik.
 *
 * Semua layer: pointer-events-none + select-none (aturan prompt #2).
 * Reduced-motion: canvas tidak dirender — sisanya statis murni.
 */

const NOISE_URI =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E";

const SPACING = 28; // harus sama dengan background-size .dot-matrix
const RADIUS = 130; // radius "menyala" di sekitar kursor

export function CanvasTexture() {
  const reduced = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { x, y } = useMousePosition(!reduced);

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // Gambar HANYA dot dalam radius kursor — bukan seluruh grid.
    const draw = () => {
      raf = 0;
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);
      const cx = x.get();
      const cy = y.get();
      if (cx < 0) return; // kursor di luar jendela

      const gx0 = Math.max(0, Math.floor((cx - RADIUS) / SPACING));
      const gx1 = Math.ceil((cx + RADIUS) / SPACING);
      const gy0 = Math.max(0, Math.floor((cy - RADIUS) / SPACING));
      const gy1 = Math.ceil((cy + RADIUS) / SPACING);

      for (let gy = gy0; gy <= gy1; gy++) {
        for (let gx = gx0; gx <= gx1; gx++) {
          const px = gx * SPACING + SPACING / 2;
          const py = gy * SPACING + SPACING / 2;
          const d = Math.hypot(px - cx, py - cy);
          if (d > RADIUS) continue;
          const t = 1 - d / RADIUS; // 1 = tepat di kursor
          ctx.globalAlpha = t * 0.55;
          ctx.fillStyle = t > 0.55 ? "#FF6B35" : "#FFD23F";
          ctx.beginPath();
          ctx.arc(px, py, 1.2 + t * 1.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(draw);
    };
    const offX = x.on("change", schedule);
    const offY = y.on("change", schedule);
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      offX();
      offY();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced, x, y]);

  return (
    <div aria-hidden="true" className="pointer-events-none select-none">
      {/* Layer 1 — noise kertas cetak (di bawah navbar z-40) */}
      <div
        className="fixed inset-0 z-[35] opacity-[0.04]"
        style={{ backgroundImage: `url("${NOISE_URI}")` }}
      />

      {/* Layer 2 — dot-matrix statis (desktop & mobile, tidak beranimasi) */}
      <div className="dot-matrix fixed inset-0 z-[30]" />

      {/* Layer 3 — dot interaktif dekat kursor (desktop only) */}
      {!reduced ? (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 z-[30] hidden h-full w-full md:block"
        />
      ) : null}
    </div>
  );
}
