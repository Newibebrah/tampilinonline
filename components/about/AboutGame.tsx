"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { Button } from "@/components/ui/Button";
import {
  aboutScenes,
  parseHighlightTokens,
  type HighlightToken,
} from "@/data/aboutNarrative";
import { useTypewriter } from "@/hooks/useTypewriter";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

/**
 * Visual Novel "Kenalan Sama Ananta" (Soft Neo-Brutalism × retro RPG).
 *
 * Mekanik tap (README interactif):
 * - Tap saat teks masih mengetik → skip, tampil penuh.
 * - Tap lagi saat teks penuh → lanjut dialog berikutnya.
 * - Dialog ke-7 selesai → game finished: layar unlock, transkrip 7 paragraf
 *   tampil vertical (chat log) + CTA WhatsApp di akhir.
 * - Refresh halaman → state kembali ke scene 1 (tanpa persistensi — memang
 *   perilaku yang diinginkan).
 */

/** Render token hasil parser menjadi span berwarna. */
function HighlightedSpans({ tokens }: { tokens: HighlightToken[] }) {
  return (
    <>
      {tokens.map((token, index) => {
        if (token.style === "yellow") {
          return (
            <span key={index} className="bg-yellow px-0.5 font-bold text-ink">
              {token.text}
            </span>
          );
        }
        if (token.style === "orange") {
          return (
            <span key={index} className="font-bold text-orange">
              {token.text}
            </span>
          );
        }
        return <span key={index}>{token.text}</span>;
      })}
    </>
  );
}

export function AboutGame() {
  const [currentScene, setCurrentScene] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const reducedMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);

  const scene = aboutScenes[currentScene];
  const { typed, done } = useTypewriter(scene.text, 24, !isTyping);
  const tokens = parseHighlightTokens(typed);

  // Sinkronkan isTyping dengan kondisi selesai mengetik natural
  // (supaya indikator ▼ muncul tanpa perlu diketuk dulu).
  useEffect(() => {
    if (done && isTyping) setIsTyping(false);
  }, [done, isTyping]);

  //.proj Auto-scroll kotak dialog mengikuti teks yang baru diketik (feel VN).
  useEffect(() => {
    const el = dialogRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [typed]);

  const handleTap = () => {
    if (isGameFinished) return;
    if (isTyping && !done) {
      setIsTyping(false); // tap ke-1: skip typing → tampil penuh
      return;
    }
    if (currentScene < aboutScenes.length - 1) {
      setCurrentScene((c) => c + 1); // tap ke-2: dialog berikutnya
      setIsTyping(true);
      return;
    }
    setIsGameFinished(true); // dialog terakhir selesai → end game
  };

  const restart = () => {
    setCurrentScene(0);
    setIsTyping(true);
    setIsGameFinished(false);
  };

  /* ---------------- END GAME: transkrip vertikal ---------------- */
  if (isGameFinished) {
    return (
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mx-auto w-full max-w-2xl space-y-6 py-12"
      >
        <p className="text-center font-display text-sm font-bold uppercase tracking-wide text-ink/60">
          Transkrip lengkap
        </p>

        {aboutScenes.map((s) => (
          <article
            key={s.id}
            className="flex items-start gap-4 rounded-card border-2 border-ink bg-cream p-4 shadow-brutal md:p-6"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={s.image}
              alt={`Ananta — ilustrasi bagian ${s.id}`}
              width={120}
              height={120}
              loading={s.id === 1 ? "eager" : "lazy"}
              className="h-16 w-16 shrink-0 rounded-card border-2 border-ink bg-white md:h-20 md:w-20 [image-rendering:pixelated]"
            />
            <p className="text-base leading-relaxed text-ink/80">
              <HighlightedSpans tokens={parseHighlightTokens(s.text)} />
            </p>
          </article>
        ))}

        <div className="flex flex-col items-center gap-4 pt-2">
          <WhatsAppButton size="lg" />
          <Button variant="secondary" size="md" onClick={restart}>
            Ulangi cerita dari awal
          </Button>
        </div>
      </motion.div>
    );
  }

  /* ---------------- GAME SCREEN (locked layar penuh) ---------------- */
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Ketuk untuk melanjutkan dialog"
      onClick={handleTap}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleTap();
        }
      }}
      className={cn(
        "flex cursor-pointer select-none flex-col items-center justify-center px-4 pb-6 pt-4 text-center focus-visible:outline-2 focus-visible:outline-yellow focus-visible:outline-offset-2",
        "h-dvh overflow-hidden", // LOCKED sampai game selesai
      )}
    >
      {/* Karakter */}
      <div className="flex flex-1 items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={scene.id}
            src={scene.image}
            alt={`Ananta — ilustrasi dialog ${scene.id}`}
            width={360}
            height={360}
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="max-h-[32dvh] w-auto max-w-[280px] rounded-full border-[3px] border-ink bg-white p-1 shadow-brutal md:max-w-[380px] [image-rendering:pixelated]"
          />
        </AnimatePresence>
      </div>

      {/* Kotak dialog */}
      <div className="relative mt-6 w-full max-w-2xl">
        <span className="absolute -top-4 left-1/2 z-10 -translate-x-1/2 rounded-pill border-2 border-ink bg-yellow px-4 py-1 font-display text-sm font-bold text-ink shadow-brutal-sm">
          Ananta
        </span>

        <div
          ref={dialogRef}
          className="relative max-h-[42dvh] overflow-y-auto rounded-card border-[3px] border-ink bg-cream p-6 [box-shadow:8px_8px_0_#1A1A1A]"
        >
          <p className="pr-6 text-left text-base leading-relaxed text-ink/85">
            <HighlightedSpans tokens={tokens} />
          </p>

          {/* Indikator lanjut — hanya saat teks penuh (isTyping === false) */}
          {!isTyping ? (
            <span
              aria-hidden="true"
              className="absolute bottom-3 right-4 inline-block text-sm animate-bounce"
            >
              ▼
            </span>
          ) : null}
        </div>

        <p className="mt-3 text-xs font-medium text-ink/50">
          {isTyping
            ? "Ketuk untuk melompati teks"
            : `Bagian ${currentScene + 1} dari ${aboutScenes.length} — ketuk untuk lanjut`}
        </p>
      </div>
    </div>
  );
}
