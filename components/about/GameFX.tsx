"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

/**
 * GameFX (prompt Bagian 3.3) — aksen retro halaman /about.
 *
 * 1. `PixelParticles` — 12 kotak pixel kecil melayang di BELAKANG konten
 *    dialog (z negatif dalam stacking context terisolasi parent). Saat dialog
 *    sedang diketik (`active`), kotak membesar satu tingkat — merespons
 *    ketikan tanpa menambah node baru.
 * 2. Scanlines & kursor pixel dikendalikan via CSS (globals.css): kelas
 *    `crt-scanlines` (pseudo ::after fixed) dan `cursor-pixel`.
 *
 * Reduced-motion: particles tidak dirender; scanlines (CSS statis) tetap —
 * bukan animasi. Animasi float dimatikan otomatis oleh blok
 * prefers-reduced-motion global di globals.css.
 */

type ParticleCfg = {
  left: string;
  top: string;
  color: string;
  delay: string;
  duration: string;
};

const PARTICLES: ParticleCfg[] = [
  { left: "6%", top: "18%", color: "bg-lavender", delay: "0s", duration: "5.2s" },
  { left: "14%", top: "64%", color: "bg-pink", delay: "1.1s", duration: "6.1s" },
  { left: "23%", top: "38%", color: "bg-ink/30", delay: "2.3s", duration: "5.6s" },
  { left: "31%", top: "82%", color: "bg-lavender", delay: "0.7s", duration: "6.8s" },
  { left: "42%", top: "10%", color: "bg-ink/30", delay: "1.9s", duration: "5.9s" },
  { left: "55%", top: "70%", color: "bg-pink", delay: "3s", duration: "6.4s" },
  { left: "63%", top: "26%", color: "bg-lavender", delay: "0.4s", duration: "5.4s" },
  { left: "71%", top: "56%", color: "bg-ink/30", delay: "2.7s", duration: "6.6s" },
  { left: "79%", top: "12%", color: "bg-pink", delay: "1.5s", duration: "5.1s" },
  { left: "86%", top: "44%", color: "bg-lavender", delay: "3.4s", duration: "6.9s" },
  { left: "93%", top: "76%", color: "bg-ink/30", delay: "0.9s", duration: "5.7s" },
  { left: "48%", top: "88%", color: "bg-pink", delay: "2s", duration: "6.2s" },
];

export function PixelParticles({ active }: { active: boolean }) {
  const reduced = useReducedMotion();
  if (reduced) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none"
    >
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className={cn(
            "pixel-particle absolute",
            active ? "h-2 w-2" : "h-1.5 w-1.5",
            p.color,
          )}
          style={{
            left: p.left,
            top: p.top,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  );
}
