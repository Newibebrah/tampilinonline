"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { motion, useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

/**
 * TiltCard (prompt Bagian 3.2) — 3D tilt mengikuti mouse saat hover.
 *
 * - Spring physics 300/20; maksimal ~6° agar tetap "soft" & tidak merusak
 *   keterbacaan card.
 * - transformPerspective di elemen card sendiri → TIDAK mengubah grid/layout
 *   (transform tidak memicu reflow; grid-area parent tetap utuh).
 * - Mobile / touch / reduced-motion: mati total (statis seperti semula).
 * - Render tag fleksibel: "div" (bento wrapper) atau "li" (grid portofolio)
 *   supaya markup semantik tidak berubah.
 */
export function TiltCard({
  children,
  className,
  style,
  max = 6,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  /** Style passthrough — dipakai untuk grid-area di bento grid. */
  style?: CSSProperties;
  /** Kemiringan maksimum (derajat). */
  max?: number;
  as?: "div" | "li";
}) {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const rotateX = useSpring(0, { stiffness: 300, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 300, damping: 20 });

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    setEnabled(true);
  }, [reduced]);

  // Cast terbatas (bukan any): motion.li & motion.div share API yang kita pakai.
  const Tag = as === "li" ? (motion.li as typeof motion.div) : motion.div;

  const onMouseMove = (e: React.MouseEvent) => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * max * 2); // -max .. +max
    rotateX.set(-py * max * 2);
  };
  const onMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <Tag
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        ...style,
        rotateX: enabled ? rotateX : 0,
        rotateY: enabled ? rotateY : 0,
        transformPerspective: 900,
        willChange: enabled ? "transform" : undefined,
      }}
      className={className}
    >
      {children}
    </Tag>
  );
}
