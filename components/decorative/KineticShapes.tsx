"use client";

import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMousePosition } from "@/hooks/useMousePosition";
import { cn } from "@/lib/utils";

/**
 * KineticShapes (prompt Bagian 1.3) — ornamen SVG floating di pinggir kiri/
 * kanan layar (desktop lg+ saja, jaga 360–768px tetap bersih):
 *
 * - Parallax scroll: tiap ornamen bergeser dengan kecepatan beda (useScroll).
 * - Kedalaman mouse: sedikit menjauh/mendekat dari kursor (desktop only).
 * - Rotasi pelan infinite (atau wobble untuk bolt & squiggle).
 * - FIXED layer z-20 di depan konten TETAPI pointer-events-none + select-none
 *   (aturan prompt #2 & #3) — tidak pernah memblokir klik/swipe.
 * - Reduced-motion: render statis tanpa semua animasi.
 */

type Shape = "burst" | "bolt" | "squiggle" | "asterisk" | "star";

type OrnamentCfg = {
  id: string;
  shape: Shape;
  /** Posisi fixed — selalu di margin kiri/kanan, tidak pernah tengah. */
  className: string;
  size: number;
  /** Faktor parallax scroll (semakin besar semakin "berat"/lambat). */
  speed: number;
  /** Jarak maksimal reaksi mouse (px). */
  mouse: number;
  /** Durasi rotasi penuh (detik) — untuk bentuk yang cocok diputar. */
  spin?: number;
  /** Amplitudo wobble (derajat) — untuk bolt/squiggle. */
  wobble?: number;
};

const ORNAMENTS: OrnamentCfg[] = [
  { id: "burst-kiri", shape: "burst", className: "left-2 top-[16vh]", size: 52, speed: 0.5, mouse: 14, spin: 36 },
  { id: "bolt-kanan", shape: "bolt", className: "right-3 top-[26vh]", size: 40, speed: 0.9, mouse: 18, wobble: 10 },
  { id: "squiggle-kiri", shape: "squiggle", className: "left-3 top-[58vh]", size: 60, speed: 0.3, mouse: 10, wobble: 6 },
  { id: "asterisk-kanan", shape: "asterisk", className: "right-2 top-[68vh]", size: 44, speed: 0.7, mouse: 16, spin: 48 },
  { id: "star-kanan", shape: "star", className: "right-4 top-[86vh]", size: 34, speed: 1.1, mouse: 12, spin: 30 },
  { id: "star-kiri", shape: "star", className: "left-4 top-[38vh]", size: 28, speed: 1.3, mouse: 12, spin: 40 },
];

/* ---------- SVG ornamen (viewBox 0 0 100 100 kecuali squiggle) ---------- */

function ShapeSvg({ shape }: { shape: Shape }) {
  switch (shape) {
    case "burst":
      // Starburst 12 spike — fill kuning, outline ink tebal.
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <polygon
            points="98,50 67,60 74,92 50,70 26,92 33,60 2,50 33,40 26,8 50,30 74,8 67,40"
            fill="#FFD23F"
            stroke="#1A1A1A"
            strokeWidth="4"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "bolt":
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <polygon
            points="40,2 72,2 52,40 70,40 30,98 40,54 24,54"
            fill="#FF6B35"
            stroke="#1A1A1A"
            strokeWidth="4"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "squiggle":
      return (
        <svg viewBox="0 0 104 24" className="h-full w-full">
          <path
            d="M2 12 Q 12 2 22 12 T 42 12 T 62 12 T 82 12 T 102 12"
            fill="none"
            stroke="#1A1A1A"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "asterisk":
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <g stroke="#1A1A1A" strokeWidth="9" strokeLinecap="round">
            <line x1="50" y1="6" x2="50" y2="94" />
            <line x1="12" y1="28" x2="88" y2="72" />
            <line x1="88" y1="28" x2="12" y2="72" />
          </g>
          <circle cx="50" cy="50" r="7" fill="#FFD23F" stroke="#1A1A1A" strokeWidth="3" />
        </svg>
      );
    case "star":
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <polygon
            points="50,4 61,35 94,36 67,56 77,87 50,68 23,87 33,56 6,36 39,35"
            fill="#FF6B35"
            stroke="#1A1A1A"
            strokeWidth="4"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}

/* ---------- Satu ornamen ---------- */

function Ornament({
  cfg,
  scrollYProgress,
  mouseX,
  mouseY,
  reduced,
}: {
  cfg: OrnamentCfg;
  scrollYProgress: MotionValue<number>;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  reduced: boolean;
}) {
  // Parallax scroll — ornamen bergerak lebih lambat dari halaman.
  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -170 * cfg.speed],
  );
  // Kedalaman mouse — offset kecil mengikuti posisi kursor (normalized).
  const depthX = useTransform(mouseX, (v) => {
    if (typeof window === "undefined") return 0;
    return ((v / window.innerWidth - 0.5) * cfg.mouse) || 0;
  });
  const depthY = useTransform(mouseY, (v) => {
    if (typeof window === "undefined") return 0;
    return ((v / window.innerHeight - 0.5) * cfg.mouse) || 0;
  });

  return (
    <motion.div
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed z-20 hidden select-none will-change-transform lg:block",
        cfg.className,
      )}
      style={{ x: depthX, y: parallaxY, width: cfg.size }}
      initial={false}
      animate={
        reduced
          ? undefined
          : cfg.spin
            ? { rotate: 360 }
            : { rotate: [cfg.wobble ?? 0, -(cfg.wobble ?? 0), cfg.wobble ?? 0] }
      }
      transition={
        reduced
          ? undefined
          : cfg.spin
            ? { repeat: Infinity, duration: cfg.spin, ease: "linear" }
            : { repeat: Infinity, duration: 6, ease: "easeInOut" }
      }
    >
      {/* Depth mouse (vertikal) di inner layer — menambah efek 3D */}
      <motion.div style={{ y: reduced ? undefined : depthY }}>
        <ShapeSvg shape={cfg.shape} />
      </motion.div>
    </motion.div>
  );
}

export function KineticShapes() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  // Mouse hanya dipakai saat !reduced (hook menormalkan guard touch sendiri).
  const { x: mouseX, y: mouseY } = useMousePosition(!reduced);

  return (
    <div aria-hidden="true" className="pointer-events-none">
      {ORNAMENTS.map((cfg) => (
        <Ornament
          key={cfg.id}
          cfg={cfg}
          scrollYProgress={scrollYProgress}
          mouseX={mouseX}
          mouseY={mouseY}
          reduced={reduced}
        />
      ))}
    </div>
  );
}
