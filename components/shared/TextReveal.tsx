"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

/**
 * TextReveal (prompt Bagian 2.2) — kinetic typography "reveal masking":
 * teks muncul dari bawah ke atas per kata (staggered), tiap kata dibungkus
 * overflow-hidden. Spring 300/20 sesuai aturan prompt #4.
 *
 * - Satu observer per heading (whileInView di container + staggerChildren)
 *   supaya hemat performa walau dipakai di semua heading.
 * - `asOne: true` pada part → seluruh part tersingkap sebagai SATU blok
 *   (dipakai untuk highlight bg-yellow agar blok highlight tidak pecah).
 * - Reduced-motion: teks langsung tampil penuh, tanpa animasi.
 * - Hanya transform — tidak memicu reflow.
 */

export type TextRevealPart = {
  text: string;
  /** Kelas tambahan pada kata (mis. highlight bg-yellow). */
  className?: string;
  /** Render seluruh part sebagai satu blok tersingkap (bukan per kata). */
  asOne?: boolean;
};

type Tag = "h1" | "h2" | "span" | "p";

type Token = { key: string; text: string; className?: string; asOne: boolean };

/** Susun parts → token kata + blok as-one. */
function buildTokens(parts: TextRevealPart[]): Token[] {
  const tokens: Token[] = [];
  parts.forEach((part, pi) => {
    if (part.asOne) {
      tokens.push({
        key: `p${pi}`,
        text: part.text,
        className: part.className,
        asOne: true,
      });
      return;
    }
    part.text
      .split(" ")
      .filter(Boolean)
      .forEach((word, wi) => {
        tokens.push({
          key: `p${pi}w${wi}`,
          text: word,
          className: part.className,
          asOne: false,
        });
      });
  });
  return tokens;
}

export function TextReveal({
  parts,
  as = "span",
  id,
  className,
}: {
  parts: TextRevealPart[];
  as?: Tag;
  /** id heading — pasangkan dengan aria-labelledby section (a11y). */
  id?: string;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const tokens = buildTokens(parts);

  if (reduced) {
    const content = parts.map((part, i) =>
      part.className ? (
        <span key={i} className={part.className}>
          {part.text}
        </span>
      ) : (
        <span key={i}>{part.text}</span>
      ),
    );
    if (as === "h1") {
      return <h1 id={id} className={className}>{content}</h1>;
    }
    if (as === "h2") {
      return <h2 id={id} className={className}>{content}</h2>;
    }
    if (as === "p") {
      return <p id={id} className={className}>{content}</p>;
    }
    return <span id={id} className={className}>{content}</span>;
  }

  const MotionTag = motion[as] as typeof motion.span;

  return (
    <MotionTag
      id={id}
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.045 } },
      }}
    >
      {tokens.map((token, i) => (
        <span key={token.key}>
          {/* Wrapper overflow-hidden = "mask"; inner bergeser dari bawah */}
          <span className="inline-block overflow-hidden align-bottom">
            <motion.span
              className={cn("inline-block will-change-transform", token.className)}
              variants={{
                hidden: { y: "115%" },
                show: {
                  y: 0,
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                },
              }}
            >
              {token.text}
            </motion.span>
          </span>
          {/* Spasi eksplisit — inline-block menelan whitespace di sekitarnya */}
          {i < tokens.length - 1 ? " " : null}
        </span>
      ))}
    </MotionTag>
  );
}
