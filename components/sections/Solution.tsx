"use client";

import { Globe, Smartphone, MessageCircle, LayoutGrid } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { SwipeCarousel } from "@/components/ui/SwipeCarousel";

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

/** Solusi: 4 alasan + ilustrasi kantor digital. */
export function Solution() {
  return (
    <section id="solusi" aria-labelledby="solusi-heading" className="container py-16 md:py-24">
      <ScrollReveal>
        <SectionHeading
          eyebrow="Solusi"
          title="Kantor digital untuk bisnis Anda."
          description="Website bukan sekadar pajangan — dia bekerja merepresentasikan usaha Anda setiap hari."
        />
      </ScrollReveal>

      {/* --- MOBILE (<768px): swipe carousel 4 card + sweetener card di bawah --- */}
      <div className="mt-10 md:hidden">
        <SwipeCarousel
          items={SOLUTIONS}
          ariaLabel="Keunggulan website buatan Tampilin.online"
          cardWidthClass="w-[85vw] max-w-[380px]"
          renderItem={(item) => (
            <div className="flex h-full rounded-card border-2 border-ink bg-cream p-6 shadow-brutal">
              <div>
                <item.icon
                  aria-hidden="true"
                  className="h-9 w-9 rounded-card border-2 border-ink bg-yellow p-1.5"
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
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
                className="h-9 w-9 rounded-card border-2 border-ink bg-yellow p-1.5"
              />
              <h3 className="mt-4 font-display text-lg font-bold">{item.title}</h3>
              <p className="mt-2 text-ink/70">{item.desc}</p>
            </Card>
          </ScrollReveal>
        ))}

        {/* Ilustrasi sebagai card visual */}
        <ScrollReveal delay={0.32}>
          <Card className="flex h-full flex-col items-center justify-center gap-4 bg-cream">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
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
    </section>
  );
}
