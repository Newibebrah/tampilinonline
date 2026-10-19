"use client";

import { Globe, Smartphone, MessageCircle, LayoutGrid } from "lucide-react";
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { SwipeCarousel } from "@/components/ui/SwipeCarousel";
import { SectionArt } from "@/components/decorative/SectionArt";
import { TapePair } from "@/components/decorative/TapePair";

const SOLUTIONS = [
  {
    icon: Globe,
    title: "Mudah ditemukan di Google",
    desc: "SEO dasar dan struktur halaman rapi — supaya calon pelanggan menemukan bisnis Anda dulu, bukan kompetitor Anda.",
  },
  {
    icon: Smartphone,
    title: "Tampil bagus di semua HP",
    desc: "Mayoritas pengunjung datang dari ponsel. Desain responsif membuat website Anda tetap enak dipakai di layar kecil.",
  },
  {
    icon: MessageCircle,
    title: "Langsung terhubung ke WhatsApp",
    desc: "Tombol di setiap halaman menuju langsung ke chat Anda. Pengunjung tinggal klik dan jadi pelanggan.",
  },
  {
    icon: LayoutGrid,
    title: "Sesuai tahap & budget usaha",
    desc: "Dari landing page mulai Rp499.000 sampai toko online — pilih yang pas sekarang, upgrade saat usaha berkembang.",
  },
];

/** Sweetener card mobile — closing visual setelah 4 card swipe habis. */
const SOLUTION_HIGHLIGHT = {
  illustration: {
    src: "/images/solution/solution-illustration.svg",
    alt: "Ilustrasi website sebagai pusat digital bisnis yang terhubung dengan berbagai kanal",
    width: 800,
    height: 600,
  },
  headline: "Website adalah kantor digital bisnis Anda.",
  caption: "Satu pusat, semua terhubung: produk, promosi, dan pesanan.",
};

/** 4 alasan + ilustrasi kantor digital — bagian BAWAH unit "Problem Solver".
 * Heading tersendiri dihapus (digabung ke heading "Problem Solver" di atas);
 * section saling menyambung: masalah dulu, solusi langsung mengikuti. */
export function Solution() {
  return (
    <section
      id="solusi"
      aria-label="Solusi dari Tampilin.online"
      className="container relative isolate bg-canvas pb-16 pt-2 md:pb-24 md:pt-4"
    >

      <SectionArt src="/asset_decor/asset_character_idea.png" className="bottom-0 left-2 w-36 lg:block lg:w-48" />
      <TapePair className="right-8 top-10" tone="bg-mint" tone2="bg-blue" />
      {/* --- MOBILE (<768px): swipe carousel 4 card + sweetener card di bawah --- */}
      <div className="mt-10 md:hidden">
        <SwipeCarousel
          items={SOLUTIONS}
          ariaLabel="Keunggulan website buatan Tampilin.online"
          cardWidthClass="w-[85vw] max-w-[380px]"
          renderItem={(item) => (
            <div className="flex h-full rounded-card border-2 border-ink bg-surface p-6 shadow-brutal">
              <div>
                <item.icon
                  aria-hidden="true"
                  className="h-9 w-9 rounded-card border-2 border-ink bg-blue p-1.5"
                />
                <h3 className="mt-4 font-display text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-ink/80">{item.desc}</p>
              </div>
            </div>
          )}
        />

        {/* Card 5 — closing visual, TIDAK di dalam carousel */}
        <ScrollReveal className="mx-auto mt-8 max-w-[340px]">
          <Card className="flex flex-col items-center gap-3 border-2 border-ink bg-yellow p-6 text-center shadow-brutal">
            <Image
              src={SOLUTION_HIGHLIGHT.illustration.src}
              alt={SOLUTION_HIGHLIGHT.illustration.alt}
              width={SOLUTION_HIGHLIGHT.illustration.width}
              height={SOLUTION_HIGHLIGHT.illustration.height}
              loading="lazy"
              className="w-full rounded-sm"
            />
            <p className="font-display text-lg font-bold leading-snug">
              {SOLUTION_HIGHLIGHT.headline}
            </p>
            <p className="text-sm italic text-ink/70">{SOLUTION_HIGHLIGHT.caption}</p>
            <WhatsAppButton size="md" className="mt-1" />
          </Card>
        </ScrollReveal>
      </div>

      {/* --- DESKTOP (≥768px): grid — TIDAK DIUBAH --- */}
      <div className="mt-10 hidden gap-6 md:mt-14 md:grid md:grid-cols-2 lg:grid-cols-3">
        {SOLUTIONS.map((item, index) => (
          <ScrollReveal key={item.title} delay={index * 0.08}>
            <Card interactive className="h-full">
              <item.icon
                aria-hidden="true"
                className="h-9 w-9 rounded-card border-2 border-ink bg-blue p-1.5"
              />
              <h3 className="mt-4 font-display text-lg font-bold">{item.title}</h3>
              <p className="mt-2 text-ink/70">{item.desc}</p>
            </Card>
          </ScrollReveal>
        ))}

        {/* Ilustrasi sebagai card visual */}
        <ScrollReveal delay={0.32}>
          <Card className="flex h-full flex-col items-center justify-center gap-4 bg-surface">
            <Image
              src="/images/solution/solution-illustration.svg"
              alt="Ilustrasi website sebagai pusat digital bisnis yang terhubung dengan berbagai kanal"
              width={800}
              height={600}
              loading="lazy"
              className="w-full rounded-sm"
            />
            <p className="text-center text-ink/70">
              Satu pusat, semua terhubung: produk, promosi, dan pesanan.
            </p>
          </Card>
        </ScrollReveal>
      </div>

      {/* --- NARASI PENUTUP unit "Problem Solver": masalah → sudah dijawab --- */}
      <ScrollReveal className="mx-auto mt-12 max-w-2xl px-4 text-center md:mt-16">
        <p className="text-balance font-display text-lg font-medium leading-snug text-ink/80 md:text-xl">
          Itulah jawabannya: satu website yang kini{" "}
          <span className="bg-yellow px-1 font-bold text-ink">
            bekerja untuk usaha Anda 24/7
          </span>{" "}
          — bukan sekadar pajangan di internet. Masalah sudah terpetakan,
          solusinya sudah siap — tinggal tahap apa yang paling pas untuk
          memulainya.
        </p>
      </ScrollReveal>
    </section>
  );
}
