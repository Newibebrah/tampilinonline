"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { cn } from "@/lib/utils";

/**
 * Scrollytelling "Sticky Story Viewer + Narrative Cards" (schema v2).
 *
 * Kenapa schema ini, bukan overlap-pinned fade yang lama?
 * - Tidak ada dead-zone: Reader yang lama punya gap scroll tempat SEMUA beat
 *   transparan → layar kosong. Di schema ini semua konten ada di document
 *   flow dan panel sticky SELALU menampilkan sesuatu.
 * - Aman no-JS & SSR: kartu narasi tetap terbaca semua, panel menampilkan
 *   beat 1 sebagai default; observer hanya menambah interaksi.
 * - Reduced motion: swap konten berlangsung instan, tanpa animasi.
 *
 * Desktop: kolom kiri = panel sticky (visual + progress), kolom kanan = 4
 * kartu narasi sebagai trigger (IntersectionObserver band tengah viewport).
 * Mobile: kartu stack penuh (auto), visual ikut di dalam kartu.
 */

type Scheme = "plain" | "dark" | "accent" | "cta";

type Beat = {
  key: string;
  num: string;
  headline: string;
  sub: string;
  scheme: Scheme;
  visual: "mock" | "image" | "chips" | "cta";
  image?: { src: string; alt: string; width: number; height: number };
};

const BEATS: Beat[] = [
  {
    key: "m1",
    num: "01",
    headline: "Semua usaha harus punya website.",
    sub: "Di era semua orang berjualan dan mencari lewat HP dan internet, belum punya website berarti kehilangan pelanggan setiap hari. Diam saja bukan pilihan yang aman.",
    scheme: "plain",
    visual: "mock",
  },
  {
    key: "m2",
    num: "02",
    headline: "Jangan sampai bisnis Anda sulit ditemukan.",
    sub: "Calon pelanggan beralih ke kompetitor yang muncul duluan di Google — usaha Anda membuka jalan kaki terlambat. Padahal usaha Anda sama bagusnya, hanya belum terlihat.",
    scheme: "dark",
    visual: "image",
    image: {
      src: "/images/problem/problem-illustration.svg",
      alt: "Ilustrasi pemilik usaha kesulitan ditemukan online sementara kompetitor lebih mudah diakses",
      width: 800,
      height: 800,
    },
  },
  {
    key: "m3",
    num: "03",
    headline: "Website adalah kantor digital bisnis Anda.",
    sub: "Buka 24/7, ramah di layar HP, dan siap melayani — bahkan saat Anda sedang sibuk melayani pelanggan di dunia nyata.",
    scheme: "accent",
    visual: "chips",
  },
  {
    key: "m4",
    num: "04",
    headline: "Tampilin.online hadir sebagai solusinya.",
    sub: "Desain tegas, harga transparan, proses jelas. Tinggal pilih paket — kami yang kerjakan dari nol sampai website Anda live.",
    scheme: "cta",
    visual: "cta",
  },
];

const CARD_CLS: Record<Scheme, string> = {
  plain: "bg-white text-ink",
  dark: "bg-ink text-cream",
  accent: "bg-yellow text-ink",
  cta: "bg-white text-ink",
};

const SUB_CLS: Record<Scheme, string> = {
  plain: "text-ink/70",
  dark: "text-cream/75",
  accent: "text-ink/70",
  cta: "text-ink/70",
};

const NUM_CLS: Record<Scheme, string> = {
  plain: "bg-cream text-ink",
  dark: "bg-yellow text-ink",
  accent: "bg-ink text-yellow",
  cta: "bg-cream text-ink",
};

const STRIP_CLS: Record<Scheme, string> = {
  plain: "bg-cream",
  dark: "bg-ink",
  accent: "bg-yellow",
  cta: "bg-orange",
};

const ACCENT_NUM_CLS: Record<Scheme, string> = {
  plain: "text-ink/15",
  dark: "text-yellow",
  accent: "text-orange",
  cta: "text-orange",
};

export function ProblemScrolly() {
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);

  // Trigger beat aktif: kartu yang memotong "band tengah" viewport (±45%).
  useEffect(() => {
    const register = (el: HTMLElement | null) => {
      if (el) cardRefs.current.push(el);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.index));
          }
        }
      },
      { rootMargin: "-40% 0px -40% 0px" },
    );
    cardRefs.current = [];
    const nodes = document.querySelectorAll<HTMLDivElement>("[data-problem-card]");
    nodes.forEach((el) => {
      register(el);
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const beat = BEATS[Math.min(active, BEATS.length - 1)];

  return (
    <section
      id="masalah"
      aria-labelledby="masalah-heading"
      className="container bg-cream py-16 md:py-24"
    >
      <ScrollReveal>
        <SectionHeading
          eyebrow="Masalah"
          title="Usaha bagus yang tak ditemukan itu rugi peluang."
          description="Empat fakta yang bikin bisnis tanpa website ketinggalan terus. Scroll perlahan — setiap langkahnya dibedah satu per satu."
        />
      </ScrollReveal>

      <div className="mt-10 grid gap-8 md:mt-14 lg:grid-cols-2 lg:gap-12">
        {/* Panel sticky (hanya desktop) */}
        <aside className="relative hidden lg:block">
          <div className="sticky top-24">
            <div className="overflow-hidden rounded-card border-[3px] border-ink bg-white shadow-brutal">
              <span
                aria-hidden="true"
                className={cn("block h-3 w-full transition-colors duration-300", STRIP_CLS[beat.scheme])}
              />
              <div className="flex min-h-[520px] flex-col p-8">
                {/* Nomor beat besar + judul beat */}
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={beat.key}
                    className="flex-1"
                    initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reducedMotion ? undefined : { opacity: 0, y: -16 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    <span
                      className={cn(
                        "font-display text-[7rem] font-extrabold leading-none tracking-tight",
                        ACCENT_NUM_CLS[beat.scheme],
                      )}
                    >
                      {beat.num}
                    </span>
                    <p className="mt-2 max-w-sm font-display text-xl font-bold text-ink">
                      {beat.headline}
                    </p>

                    <div className="mt-6 flex h-56 items-center justify-center">
                      <BeatVisual beat={beat} compact={false} />
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Progress segments */}
                <div className="mt-6 border-t-2 border-dashed border-ink/15 pt-4">
                  <div aria-hidden="true" className="flex gap-1.5">
                    {BEATS.map((b, index) => (
                      <span
                        key={b.key}
                        className={cn(
                          "h-1.5 flex-1 rounded-pill transition-colors duration-300",
                          index <= active ? "bg-yellow" : "bg-ink/15",
                        )}
                      />
                    ))}
                  </div>
                  <p className="mt-2 text-xs font-medium text-ink/50">
                    Bagian {active + 1} dari {BEATS.length} — ikuti kartu di kanan
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Kartu narasi (trigger + mobile full) */}
        <div className="flex flex-col gap-6">
          {BEATS.map((b, index) => (
            <article
              key={b.key}
              data-problem-card
              data-index={index}
              className={cn(
                "rounded-card border-2 border-ink p-6 shadow-brutal transition-transform duration-200 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-brutal-sm md:p-8 lg:min-h-[70vh] lg:flex lg:flex-col lg:justify-center",
                CARD_CLS[b.scheme],
                active === index ? "opacity-100" : "lg:opacity-80",
              )}
            >
              <span
                className={cn(
                  "inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink font-display text-sm font-extrabold",
                  NUM_CLS[b.scheme],
                )}
              >
                {b.num}
              </span>
              <h3 className="mt-4 font-display text-2xl font-extrabold leading-tight md:text-3xl">
                {b.headline}
              </h3>
              <p className={cn("mt-3 max-w-xl", SUB_CLS[b.scheme])}>{b.sub}</p>

              {/* Visual & CTA ikut di dalam kartu (mobile), desktop ada di panel kiri */}
              <div className="mt-6 lg:hidden">
                <BeatVisual beat={b} compact />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Visual per beat — dipakai panel desktop & kartu mobile. */
function BeatVisual({ beat, compact }: { beat: Beat; compact: boolean }) {
  switch (beat.visual) {
    case "mock":
      return <MockPreview compact={compact} />;
    case "image":
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={beat.image!.src}
          alt={beat.image!.alt}
          width={beat.image!.width}
          height={beat.image!.height}
          loading="lazy"
          className={cn(
            "w-full rounded-card border-2 border-ink shadow-brutal-sm",
            compact ? "max-w-xs" : "max-w-[240px]",
          )}
        />
      );
    case "chips":
      return (
        <ul className="grid grid-cols-3 gap-2.5">
          {["Galeri", "Produk", "Kontak"].map((item) => (
            <li
              key={item}
              className="rounded-card border-2 border-ink bg-ink px-3 py-3.5 text-center font-display text-xs font-bold text-yellow shadow-brutal-sm sm:py-4"
            >
              {item}
            </li>
          ))}
        </ul>
      );
    case "cta":
      return (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <WhatsAppButton size={compact ? "md" : "lg"} />
          <ButtonLink href="#paket" variant="secondary" size={compact ? "md" : "lg"}>
            Lihat Paket
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </ButtonLink>
        </div>
      );
    default:
      return null;
  }
}

/** Mock browser mini sebagai visual beat 1. */
function MockPreview({ compact }: { compact: boolean }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-card border-2 border-ink bg-white shadow-brutal-sm",
        compact ? "w-full max-w-xs" : "w-full max-w-[260px]",
      )}
    >
      <div className="flex items-center gap-1 border-b-2 border-ink bg-cream px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-ink" />
        <span className="h-2 w-2 rounded-full bg-yellow" />
        <span className="h-2 w-2 rounded-full bg-orange" />
        <span className="ml-2 h-3 flex-1 rounded-pill border border-ink/40 bg-white" />
      </div>
      <div className="p-3">
        <span className="block h-3 w-2/3 rounded-pill bg-ink" />
        <span className="mt-1.5 block h-3 w-1/2 rounded-pill bg-ink" />
        <span className="mt-3 block h-10 w-full rounded-sm bg-yellow" />
        <div className="mt-3 grid grid-cols-3 gap-2">
          <span className="block h-8 rounded-sm bg-cream" />
          <span className="block h-8 rounded-sm bg-cream" />
          <span className="block h-8 rounded-sm bg-orange" />
        </div>
      </div>
    </div>
  );
}
