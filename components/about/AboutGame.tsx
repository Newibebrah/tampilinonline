"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { PixelParticles } from "@/components/about/GameFX";
import { Play, SkipForward, ChevronRight, Flag } from "lucide-react";
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
 * Visual Novel "Kenalan Sama Ananta" (Soft Neo-Brutalism × retro arcade).
 *
 * Alur 3 fase (permintaan user):
 * - "start"  → profile index / start screen: foto pixel besar TANPA border +
 *   H1 font arcade Press Start 2P (gradient, TIDAK bold) + sub judul ala
 *   section lain + tombol "Mulai mendengarkan cerita" kedip pudar-jelas-pudar
 *   (animate-blink, dimatikan oleh prefers-reduced-motion).
 * - "playing" → ilustrasi pakem fix di atas, teks top-anchored tumbuh ke
 *   bawah, tombol eksplisit Lewati/Lanjut/Selesai. Halaman bebas di-scroll;
 * - scroll otomatis DIHAPUS (laporan user): start/lanjut/selesai tidak pernah
 *   menggerakkan halaman — user scroll sendiri, tidak ada lock di footer.
 * - "finished" → transkrip RAME: bubble chat (avatar di kolom samping di
 *   LUAR bubble, align top sinkron dengan baris pertama) — gambar & teks
 *   bukan satu kartu grid. Diakhiri CTA WhatsApp + kembali ke profil.
 *
 * Emoji TIDAK ada di narasi — emosi digambarkan ikon per scene.
 * Refresh → kembali ke fase "start" (state tidak dipersist, memang disengaja).
 */

type Phase = "start" | "playing" | "finished";

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
        if (token.style === "pink") {
          return (
            <span key={index} className="font-bold text-pink">
              {token.text}
            </span>
          );
        }
        return <span key={index}>{token.text}</span>;
      })}
    </>
  );
}

/**
 * Bait pembuka halaman /about: foto besar (tanpa border) + judul arcade.
 * `font-pixel` = Press Start 2P (weight 400 — chunky, jadi TANPA bold tambah),
 * warna solid pastel pink + hard shadow plum ink ala neo-brutalism
 * (gradient smooth DIHAPUS — aturan FASE 5 prompt migrasi v2.1).
 */
function StoryBait() {
  return (
    <header className="flex flex-col items-center gap-7 text-center md:flex-row md:items-center md:gap-10 md:text-left">
      <Image
        src="/images/aboutme_pixel/profile.png"
        alt="Ananta, pembuat Tampilin.online, sedang menikmati kopi"
        width={240}
        height={240}
        className="h-36 w-36 shrink-0 rounded-full object-cover [image-rendering:pixelated] md:h-52 md:w-52"
      />
      <h1 className="font-pixel text-sm leading-[2] text-pink [filter:drop-shadow(3px_3px_0_var(--ink))] sm:text-base md:text-lg">
        Just a story about me, making my dreams come true.
      </h1>
    </header>
  );
}

export function AboutGame() {
  const [phase, setPhase] = useState<Phase>("start");
  const [currentScene, setCurrentScene] = useState(0);
  const reducedMotion = useReducedMotion();

  const scene = aboutScenes[currentScene];
  const isLastScene = currentScene === aboutScenes.length - 1;
  const playing = phase === "playing";

  // Halaman /about HARUS selalu dibuka dan dipindah fase dari PALING ATAS —
  // TANPA scroll otomatis apa pun (laporan user: auto-scroll membuat halaman
  // lompat ke footer & terkunci di bawah saat teks berjalan, scroll-up tidak
  // bisa). scrollRestoration dimatikan supaya browser tidak me-restore posisi
  // lama; scrollTop assignment = instant, tidak terpengaruh
  // scroll-behavior:smooth.
  const scrollTop = () => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };
  useEffect(() => {
    history.scrollRestoration = "manual";
    scrollTop();
    return () => {
      history.scrollRestoration = "auto";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Tidak sedang "playing" → tanpa ketikan; play=true saat start/tap lanjut.
  const { typed, done, skip } = useTypewriter(scene.text, 24, playing);
  const tokens = parseHighlightTokens(typed);
  const isTyping = playing && !done;

  const startGame = () => {
    setPhase("playing"); // scene 0 + hook play=true → ketikan DARI NOL
    scrollTop(); // TANPA scroll ke bawah — pemandangan tetap di paling atas
  };

  const handleTap = () => {
    if (!playing) return;
    if (isTyping) {
      skip(); // tekan ke-1: skip typing → tampil penuh
      return;
    }
    if (!isLastScene) {
      // Dialog berikutnya — TANPA scroll otomatis; konten bertukar di lokasi.
      setCurrentScene((c) => c + 1);
      return;
    }
    setPhase("finished"); // dialog terakhir selesai → transkrip
    scrollTop();
  };

  const backToProfile = () => {
    setPhase("start"); // hook otomatis reset → start screen bersih
    scrollTop();
  };

  /* ---------------- START: profile index + start screen ---------------- */
  if (phase === "start") {
    return (
      <div className="flex flex-col items-center px-4 pb-20 pt-10 text-center md:pb-28 md:pt-16">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="flex w-full max-w-3xl flex-col items-center gap-10 md:gap-12"
        >
          <StoryBait />

          {/* Judul section — TANPA eyebrow "Tentang": label itu identitas
              item navbar ( Bonus target "#tentang" di homepage), tidak
              diulang di dalam page /about. */}
          <div className="flex flex-col items-center gap-4">
            <h2 className="font-display text-[clamp(1.5rem,5vw,2.5rem)] font-bold leading-tight text-ink">
              Kenalan Sama Ananta
            </h2>
            <p className="max-w-md text-balance font-display text-lg font-medium leading-snug text-ink/80 md:max-w-xl">
              Orang di balik layar Tampilin.online — dengarkan ceritanya seperti
              membuka game, satu bagian demi satu bagian.
            </p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Button
              variant="primary"
              size="lg"
              onClick={startGame}
              aria-label="Mulai mendengarkan cerita"
              className="animate-blink"
            >
              <Play aria-hidden="true" className="h-5 w-5" />
              Mulai mendengarkan cerita
            </Button>
            <p className="text-xs font-medium text-ink/50">
              {aboutScenes.length} bagian cerita · bisa dilewati kapan saja
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  /* ---------------- FINISHED: bubble chat ---------------- */
  if (phase === "finished") {
    return (
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mx-auto w-full max-w-3xl px-4 pb-16"
      >
        <StoryBait />

        <div className="mt-10 space-y-5 md:mt-12">
          {aboutScenes.map((s) => (
            <article
              key={s.id}
              className="flex items-start gap-3 md:gap-4"
            >
              {/* Avatar di kolom samping — LUAR bubble, align top sinkron
                  dengan baris pertama narasi */}
              <Image
                src={s.image}
                alt={`Ananta — ilustrasi bagian ${s.id}`}
                width={96}
                height={96}
                loading={s.id === 1 ? "eager" : "lazy"}
                className="h-12 w-12 shrink-0 rounded-full border-2 border-ink bg-pink/20 [image-rendering:pixelated] md:h-16 md:w-16"
              />
              <div className="min-w-0 flex-1 rounded-card rounded-tl-none border-[3px] border-ink bg-surface p-4 shadow-brutal md:p-5">
                <p className="text-base leading-relaxed text-ink/85 md:text-lg">
                  <HighlightedSpans tokens={parseHighlightTokens(s.text)} />
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="flex flex-col items-center gap-4 pt-10">
          <WhatsAppButton size="lg" />
          <Button variant="secondary" size="md" onClick={backToProfile}>
            Kembali ke profil
          </Button>
        </div>
      </motion.div>
    );
  }

  /* ---------- PLAYING: gambar fix di atas, teks tumbuh ke bawah ---------- */
  return (
    // isolate → stacking context sendiri; PixelParticles (-z-10) melayang
    // DI BELAKANG konten dialog (prompt visionary 3.3).
    <div className="relative isolate flex flex-col items-center px-4 pb-20 pt-6 md:pb-24">
      {/* Pixel particles — melayang di latar; membesar saat dialog diketik */}
      <PixelParticles active={isTyping} />

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
            className="max-h-full w-auto max-w-[280px] rounded-full border-[3px] border-ink bg-pink/20 p-1 shadow-brutal md:max-w-[380px] [image-rendering:pixelated]"
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
        <span className="absolute -top-4 left-4 z-10 rounded-pill border-2 border-ink bg-lavender px-4 py-1 font-display text-sm font-bold text-ink shadow-brutal-sm">
          Ananta
        </span>

        <div className="relative min-h-[200px] rounded-card border-[3px] border-ink bg-surface p-5 pt-7 shadow-brutal md:min-h-[240px] md:p-6 md:pt-7">
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
            isTyping
              ? "Lewati efek mengetik"
              : isLastScene
                ? "Selesaikan cerita"
                : "Lanjut ke dialog berikutnya"
          }
        >
          {isTyping ? (
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
