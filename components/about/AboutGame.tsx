"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SkipForward, ChevronRight, Flag } from "lucide-react";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { Button } from "@/components/ui/Button";
import {
  aboutScenes,
  parseHighlightTokens,
  type HighlightToken,
} from "@/data/aboutNarrative";
import { useTypewriter } from "@/hooks/useTypewriter";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Visual Novel "Kenalan Sama Ananta" (Soft Neo-Brutalism × retro RPG).
 *
 * Struktur per feedback user (revisi 2):
 * - Ilustrasi karakter PAKEM fix di atas (zona tinggi tetap, tidak ikut
 *   bergeser/menggecil saat teks tumbuh) — mobile & desktop sama pola.
 * - Teks mengetik top-anchored: tumbuh KE BAWAH di kotak yang ikut
 *   mengembang (tanpa overflow/reset). Halaman bisa di-scroll bebas;
 *   scroll otomatis sticky-bottom ala chat — baris terbaru selalu terlihat,
 *   tapi kalau user scroll ke atas, halaman TIDAK diseret paksa.
 * - Tombol eksplisit di bawah kotak: "Lewati ⏵" saat mengetik,
 *   "Lanjut ▶" saat teks penuh, "Selesai" di scene terakhir (tetap dipasang
 *   supaya jelas di mobile; kotak dialog juga tetap bisa diketuk).
 * - Scene 7 selesai → teks game hilang, tampil "bait" header halaman:
 *   foto profile.png besar TANPA border + H1 gradient teks
 *   "Just a story about me, making my dreams come true." lalu transkrip
 *   7 kartu + CTA. Refresh → kembali ke scene 1 (state tidak dipersist).
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
  // Sticky-bottom ala chat: true = user "menempel" di dasar halaman →
  // saat teks tumbuh, otomatis ikut ke baris terbaru.
  const stickBottom = useRef(true);

  const scene = aboutScenes[currentScene];
  const isLastScene = currentScene === aboutScenes.length - 1;
  const { typed, done } = useTypewriter(scene.text, 24, !isTyping);
  const tokens = parseHighlightTokens(typed);

  // Sinkronkan isTyping dengan kondisi selesai mengetik natural
  // (supaya indikator ▼ & tombol "Lanjut" muncul tanpa perlu diketuk).
  useEffect(() => {
    if (done && isTyping) setIsTyping(false);
  }, [done, isTyping]);

  // Pantau posisi user: menempel dasar halaman atau sedang scroll ke atas.
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      stickBottom.current =
        window.innerHeight + window.scrollY >= doc.scrollHeight - 160;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Teks tumbuh → ikut ke baris terbaru HANYA kalau user masih di dasar.
  useEffect(() => {
    if (stickBottom.current) {
      window.scrollTo({ top: document.documentElement.scrollHeight });
    }
  }, [typed]);

  // End game: tampilkan bait header dari atas halaman.
  useEffect(() => {
    if (isGameFinished) {
      stickBottom.current = true;
      window.scrollTo({ top: 0 });
    }
  }, [isGameFinished]);

  const handleTap = () => {
    if (isGameFinished) return;
    if (isTyping && !done) {
      setIsTyping(false); // tekan ke-1: skip typing → tampil penuh
      return;
    }
    if (!isLastScene) {
      setCurrentScene((c) => c + 1); // tekan ke-2: dialog berikutnya
      setIsTyping(true);
      return;
    }
    setIsGameFinished(true); // dialog terakhir selesai → end game
  };

  const restart = () => {
    setCurrentScene(0);
    setIsTyping(true);
    setIsGameFinished(false);
    window.scrollTo({ top: 0 });
  };

  /* ---------------- END GAME: header + transkrip vertikal ---------------- */
  if (isGameFinished) {
    return (
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mx-auto w-full max-w-3xl px-4 pb-16"
      >
        {/* Bait pembuka halaman: foto besar (tanpa border) + H1 gradient */}
        <header className="flex flex-col items-center gap-8 py-10 text-center md:flex-row md:items-center md:gap-12 md:py-16 md:text-left">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/aboutme_pixel/profile.png"
            alt="Ananta, pembuat Tampilin.online, sedang menikmati kopi"
            width={240}
            height={240}
            className="h-40 w-40 shrink-0 rounded-full object-cover [image-rendering:pixelated] md:h-56 md:w-56"
          />
          <h1 className="font-display bg-gradient-to-br from-yellow to-orange bg-clip-text text-3xl font-black leading-[1.15] text-transparent [filter:drop-shadow(4px_4px_0_#1A1A1A)] md:text-5xl">
            Just a story about me, making my dreams come true.
          </h1>
        </header>

        <div className="space-y-6">
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
        </div>

        <div className="flex flex-col items-center gap-4 pt-10">
          <WhatsAppButton size="lg" />
          <Button variant="secondary" size="md" onClick={restart}>
            Ulangi cerita dari awal
          </Button>
        </div>
      </motion.div>
    );
  }

  /* -------- GAME SCREEN: gambar fix di atas, teks tumbuh ke bawah -------- */
  return (
    <div className="flex flex-col items-center px-4 pb-20 pt-6 md:pb-24 md:pt-10">
      {/* Zona karakter — tinggi TETAP supaya posisinya pakem walau teks tumbuh */}
      <div className="flex h-48 w-full max-w-xl items-center justify-center md:h-72">
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
            className="max-h-full w-auto max-w-[280px] rounded-full border-[3px] border-ink bg-white p-1 shadow-brutal md:max-w-[380px] [image-rendering:pixelated]"
          />
        </AnimatePresence>
      </div>

      {/* Kotak dialog — mengembang mengikuti isi; teks menumpuk ke bawah.
          Area ini + karakter bisa diketuk (skip/lanjut), tombol di bawah
          sebagai kontrol eksplisit. */}
      <div
        onClick={handleTap}
        className="relative mt-8 w-full max-w-xl cursor-pointer select-none"
      >
        <span className="absolute -top-4 left-4 z-10 rounded-pill border-2 border-ink bg-yellow px-4 py-1 font-display text-sm font-bold text-ink shadow-brutal-sm">
          Ananta
        </span>

        <div className="relative min-h-[200px] rounded-card border-[3px] border-ink bg-cream p-5 pt-7 shadow-brutal md:min-h-[240px] md:p-6 md:pt-7">
          <p className="text-left text-base leading-relaxed text-ink/85 md:text-lg">
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
      </div>

      {/* Kontrol eksplisit (mobile-first, selalu terlihat) */}
      <div className="mt-4 flex flex-col items-center gap-2">
        <Button
          variant="primary"
          size="md"
          onClick={handleTap}
          aria-label={
            isTyping && !done
              ? "Lewati efek mengetik"
              : isLastScene
                ? "Selesaikan cerita"
                : "Lanjut ke dialog berikutnya"
          }
        >
          {isTyping && !done ? (
            <>
              Lewati
              <SkipForward aria-hidden="true" className="h-4 w-4" />
            </>
          ) : isLastScene ? (
            <>
              Selesai
              <Flag aria-hidden="true" className="h-4 w-4" />
            </>
          ) : (
            <>
              Lanjut
              <ChevronRight aria-hidden="true" className="h-4 w-4" />
            </>
          )}
        </Button>
        <p className="text-xs font-medium text-ink/50">
          Bagian {currentScene + 1} dari {aboutScenes.length}
        </p>
      </div>
    </div>
  );
}
