"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Beat = {
  key: string;
  invert: boolean;
  accent: boolean;
  cta: boolean;
  headline: string;
  sub: string;
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};

const BEATS: Beat[] = [
  /**
   * Scrollytelling 4 beat (README 9): wrapper 400vh + sticky 100vh.
   */
  {
    key: "p1",
    invert: false,
    accent: false,
    cta: false,
    headline: "Semua usaha harus punya website.",
    sub: "Di era semua orang punya HP dan internet, belum punya website berarti kehilangan pelanggan setiap hari.",
  },
  {
    key: "p2",
    invert: true,
    accent: false,
    cta: false,
    headline: "Jangan sampai bisnis Anda sulit ditemukan.",
    sub: "Calon pelanggan lari ke kompetitor yang muncul duluan di Google. Padahal usaha Anda sama bagusnya.",
    image: {
      src: "/images/problem/problem-illustration.svg",
      alt: "Ilustrasi pemilik usaha kesulitan ditemukan online sementara kompetitor lebih mudah diakses",
      width: 800,
      height: 800,
    },
  },
  {
    key: "p3",
    invert: false,
    accent: true,
    cta: false,
    headline: "Website adalah kantor digital bisnis Anda.",
    sub: "Buka 24/7, ramah di HP, dan siap melayani — bahkan saat Anda sedang sibuk.",
  },
  {
    key: "p4",
    invert: false,
    accent: false,
    cta: true,
    headline: "Tampilin.online hadir sebagai solusinya.",
    sub: "Desain tegas, harga transparan, proses jelas. Tinggal pilih paket — kami yang kerjakan.",
  },
];

export function ProblemScrolly() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const [activeBeat, setActiveBeat] = useState(0);

  // Track beat aktif untuk dots navigasi.
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActiveBeat(Math.min(BEATS.length - 1, Math.floor(v * BEATS.length)));
  });

  const scrollToBeat = (index: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const top =
      section.offsetTop +
      (index / BEATS.length) * (section.offsetHeight - window.innerHeight);
    window.scrollTo({ top, behavior: reducedMotion ? "auto" : "smooth" });
  };

  if (reducedMotion) {
    return (
      <section id="masalah" aria-label="Masalah tanpa kehadiran website">
        {BEATS.map((beat, index) => (
          <div
            key={beat.key}
            className={cn(
              "flex min-h-[60vh] flex-col items-center justify-center px-6 py-20 text-center",
              beat.invert ? "bg-ink text-cream" : "bg-cream text-ink",
            )}
          >
            <StaticBeat beat={beat} index={index} />
          </div>
        ))}
      </section>
    );
  }

  return (
    <section
      id="masalah"
      ref={sectionRef}
      data-scrolly-wrapper
      className="relative h-[400vh]"
      aria-label="Narasi masalah: bisnis tanpa website"
    >
      <div
        data-scrolly-sticky
        className="sticky top-0 h-screen overflow-hidden"
      >
        {BEATS.map((beat, index) => (
          <BeatLayer
            key={beat.key}
            progress={scrollYProgress}
            index={index}
            total={BEATS.length}
          />
        ))}
      </div>

      {/* Dots navigasi opsional (kanan). */}
      <div
        data-scrolly-dots
        className="absolute right-4 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-2 sm:flex"
        role="group"
        aria-label="Navigasi beat scrollytelling"
      >
        {BEATS.map((beat, index) => (
          <button
            key={beat.key}
            type="button"
            onClick={() => scrollToBeat(index)}
            aria-label={`Ke bagian ${index + 1}`}
            className={cn(
              "h-3 w-3 rounded-full border-2 transition-transform",
              // Di beat gelap (index 1) outline dot memakai cream agar terlihat.
              activeBeat === 1 ? "border-cream" : "border-ink",
              activeBeat === index
                ? "scale-125 bg-ink"
                : "bg-transparent",
              activeBeat === index && beat.invert && "bg-yellow",
            )}
          />
        ))}
      </div>
    </section>
  );
}

/**
 * Beat individual: opacity & translate digerakkan dari scroll progress.
 * Beat terakhir tetap terlihat sampai section selesai.
 */
function BeatLayer({
  progress,
  index,
  total,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const isLast = index === total - 1;
  const beat = BEATS[index];

  const opacity = useTransform(
    progress,
    [start, start + 0.15, end - 0.08, end],
    isLast ? [0, 1, 1, 1] : [0, 1, 1, 0],
  );
  const y = useTransform(
    progress,
    [start, start + 0.15, end - 0.08, end],
    isLast ? [48, 0, 0, 0] : [48, 0, 0, -48],
  );
  // "Clip reveal" beat 3 diaproksimasi scale (masih transform-only, murah).
  const scale = useTransform(
    progress,
    [start, start + 0.2],
    beat.accent ? [0.94, 1] : [1, 1],
  );

  return (
    <motion.article
      data-scrolly-beat
      style={{ opacity, y, scale }}
      className={cn(
        "absolute inset-0 flex flex-col items-center justify-center px-6 text-center",
        beat.invert ? "bg-ink text-cream" : "bg-cream text-ink",
      )}
    >
      <StaticBeat beat={beat} index={index} />
    </motion.article>
  );
}

/** Konten visual per beat (dipakai versi animasi & fallback statis). */
function StaticBeat({
  beat,
  index,
}: {
  beat: (typeof BEATS)[number];
  index: number;
}) {
  return (
    <div className="flex max-w-3xl flex-col items-center gap-5">
      <span
        className={cn(
          "font-display text-sm font-bold",
          beat.invert ? "text-yellow" : "text-orange",
        )}
      >
        {`0${index + 1}`}
      </span>

      <h2 className="text-balance font-display text-[clamp(1.75rem,7vw,3.25rem)] font-extrabold leading-tight tracking-tight">
        {beat.headline}
      </h2>
      <p
        className={cn(
          "max-w-xl",
          beat.invert ? "text-cream/75" : "text-ink/70",
        )}
      >
        {beat.sub}
      </p>

      {beat.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={beat.image.src}
          alt={beat.image.alt}
          width={beat.image.width}
          height={beat.image.height}
          loading="lazy"
          className="mt-2 max-w-xs rounded-card border-2 border-cream/40 shadow-brutal-sm sm:max-w-sm"
        />
      ) : null}

      {/* Beat 3: teaser bento kecil */}
      {beat.accent ? (
        <ul className="mt-4 grid max-w-md grid-cols-3 gap-2">
          {["Galeri", "Produk", "Kontak"].map((item) => (
            <li
              key={item}
              className="flex h-16 w-20 items-center justify-center rounded-card border-2 border-ink bg-yellow font-display text-xs font-bold shadow-brutal-sm"
            >
              {item}
            </li>
          ))}
        </ul>
      ) : null}

      {/* Beat 4: CTA */}
      {beat.cta ? (
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row">
          <WhatsAppButton size="md" />
          <ButtonLink href="#paket" variant="secondary" size="md">
            Lihat Paket
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </ButtonLink>
        </div>
      ) : null}
    </div>
  );
}
