"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Reveal on scroll — animasi HANYA transform & opacity (README 8.1).
 * whileInView + once supaya tidak menjalankan ulang animasi.
 * Reduced-motion: render langsung tanpa animasi.
 */
export function ScrollReveal({
  children,
  className,
  delay = 0,
  y = 24,
}: {
  children: ReactNode;
  className?: string;
  /** Delay inisial dalam detik (untuk stagger sederhana). */
  delay?: number;
  y?: number;
}) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.4, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
