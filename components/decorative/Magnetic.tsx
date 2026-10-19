"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useMagnetic } from "@/hooks/useMagnetic";
import { cn } from "@/lib/utils";

/**
 * Wrapper magnetic untuk CTA utama (prompt Bagian 2.3).
 * ADDITIVE ONLY: div inline-block tipis di sekitar children — layout tombol
 * tidak berubah. Efek hanya hidup di desktop fine-pointer (lihat useMagnetic).
 */
export function Magnetic({
  children,
  className,
  strength = 0.25,
  radius = 64,
  maxShift = 10,
}: {
  children: ReactNode;
  className?: string;
  /** Seberapa kuat tarikan ke kursor (0–1). */
  strength?: number;
  /** Radius aktivasi diukur dari tepi elemen (px) — persempit default 64. */
  radius?: number;
  /** Batas maksimal pergeseran dari tempat statis (px) — revisi user. */
  maxShift?: number;
}) {
  const { ref, x, y } = useMagnetic<HTMLDivElement>(
    strength,
    radius,
    maxShift,
  );
  return (
    <motion.div
      ref={ref}
      style={{ x, y, willChange: "transform" }}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.div>
  );
}
