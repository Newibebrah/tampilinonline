"use client";

import { Calculator, Check, MessageCircle } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SwipeCarousel } from "@/components/ui/SwipeCarousel";
import { TiltCard } from "@/components/decorative/TiltCard";
import { Magnetic } from "@/components/decorative/Magnetic";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { buildWhatsAppUrl, packageMessage } from "@/lib/whatsapp";
import { packages } from "@/data/packages";
import type { Package } from "@/types";
import { SectionArt } from "@/components/decorative/SectionArt";
import { BoldShapes } from "@/components/decorative/BoldShapes";

/**
 * Bento Grid paket (README 10):
 * - Desktop (≥1024): CSS Grid 4 kolom via .bento-grid + grid-area per card.
 * - Tablet (768–1023): stack 1 kolom — seperti sebelumnya (tidak diubah).
 * - Mobile (<768): SwipeCarousel — 6 paket sebagai card geser horizontal,
 *   order array data (Sales = slide pertama), badge tetap tampil.
 * - UMKM = featured (bg yellow, badge "Terpopuler").
 * CTA per paket → WhatsApp dengan pesan pre-filled.
 */
export function PackagesBento() {
  return (
    <section id="paket" aria-labelledby="paket-heading" className="container relative isolate bg-surface py-16 md:py-24">
      <ScrollReveal>
        <SectionHeading
          id="paket-heading"
          eyebrow="Paket Layanan"
          title="Pilih paket yang pas untuk tahap usaha Anda."
          description="Semua paket sudah termasuk desain responsif dan pengerjaan sesuai kesepakatan. Perlu fitur custom? Bisa dibahas setelah paket."
        />
      </ScrollReveal>

      {/* --- MOBILE (<768px): swipe carousel 6 paket --- */}
      <div className="mt-10 md:hidden">
        <ScrollReveal>
          <SwipeCarousel
            items={packages}
            ariaLabel="Daftar paket layanan pembuatan website"
            cardWidthClass="w-[85vw] max-w-[380px]"
            renderItem={(pkg) => <PackageCard pkg={pkg} />}
          />
        </ScrollReveal>
      </div>

      {/* --- TABLET & DESKTOP (≥768px): bento grid — TIDAK DIUBAH --- */}
      <ScrollReveal className="mt-10 hidden md:block md:mt-14">
        <div className="bento-grid">
          {packages.map((pkg) => (
            // TiltCard = wrapper additive (3D tilt desktop only, prompt 3.2);
            // grid-area pindah ke wrapper, area grid tidak berubah.
            <TiltCard key={pkg.id} style={{ gridArea: pkg.gridArea }} className="h-full">
              <PackageCard pkg={pkg} />
            </TiltCard>
          ))}
        </div>
      </ScrollReveal>

      {/* --- Banner CTA ke /harga (revisi user): simulator pindah halaman
          sendiri. Gaya MIRIP banner CTA final: panel kuning, border 3px,
          shadow brutal, dekorasi sudut pastel. Bagian dari section Paket
          Layanan — muncul di bawah grid/carousel. --- */}
      <ScrollReveal className="mt-10 md:mt-14">
        <div
          aria-labelledby="paket-harga-banner"
          className="relative isolate overflow-hidden rounded-card border-[3px] border-ink bg-yellow p-8 text-center shadow-brutal md:p-12"
        >
          {/* dekorasi sudut — sama dengan banner CTA final */}
          <SectionArt src="/asset_decor_context/asset_paket_layanan.png" className="-bottom-8 -left-6 w-36 md:block lg:w-48" />
          <span aria-hidden="true" className="absolute -bottom-10 -right-8 h-28 w-28 rotate-12 rounded-card border-[3px] border-ink bg-blue" />

          <div className="relative flex flex-col items-center gap-5">
            <h3
              id="paket-harga-banner"
              className="text-balance font-display text-[clamp(1.5rem,4.5vw,2.25rem)] font-extrabold leading-tight"
            >
              Masih bingung{" "}
              <span className="bg-surface px-2 shadow-brutal-sm">soal harga?</span>
            </h3>
            <p className="max-w-xl text-base leading-relaxed text-ink/80 md:text-lg">
              Tidak perlu menebak — buka simulator, geser pilihan, dan lihat
              estimasinya muncul langsung. Gratis, tanpa perlu chat dulu.
            </p>
            <Magnetic>
              <ButtonLink href="/harga" variant="primary" size="lg">
                <Calculator aria-hidden="true" className="h-5 w-5" />
                Hitung Estimasi Sendiri
              </ButtonLink>
            </Magnetic>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

/** Peta warna kartu paket v3.0 — pastel SOLID per id (FASE 4 prompt). */
const CARD_BG: Record<Package["id"], string> = {
  sales: "bg-blue",
  portfolio: "bg-surface",
  umkm: "bg-yellow",
  company: "bg-pink",
  catalog: "bg-mint",
  ecommerce: "bg-lavender",
};

function PackageCard({ pkg }: { pkg: Package }) {
  return (
    // gridArea diteruskan wrapper TiltCard di desktop grid (lihat pemanggil);
    // di mobile carousel properti grid ini tidak berpengaruh.
    <article
      className={cn(
        "flex h-full flex-col rounded-card p-6 shadow-brutal transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-brutal-lg",
        pkg.featured
          ? "border-[3px] border-ink hover:scale-[1.02]"
          : "border-2 border-ink",
        CARD_BG[pkg.id],
      )}
    >
      <header className="flex flex-wrap items-center gap-2">
        <h3 className="mr-auto font-display text-xl font-bold">{pkg.name}</h3>
        {pkg.badge ? (
          <span
            className={cn(
              "rounded-pill border-2 border-ink px-3 py-0.5 font-display text-xs font-bold",
              pkg.badge === "Terpopuler" ? "bg-ink text-canvas" : "bg-surface",
            )}
          >
            {pkg.badge}
          </span>
        ) : null}
      </header>

      <p className="mt-3">
        <span
          className={cn(
            "font-display text-2xl font-extrabold",
            pkg.featured ? "text-ink" : "bg-yellow px-1",
          )}
        >
          {pkg.priceLabel.replace("Mulai dari ", "")}
        </span>
      </p>
      <p className="text-ink/70">Target: {pkg.target}</p>

      <ul className="mt-4 flex flex-1 flex-col gap-2">
        {pkg.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2">
            <Check
              aria-hidden="true"
              className="mt-0.5 h-4 w-4 shrink-0 stroke-[3]"
            />
            {feature}
          </li>
        ))}
      </ul>

      <a
        href={buildWhatsAppUrl(packageMessage(pkg.name))}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "mt-6 inline-flex items-center justify-center gap-2 rounded-card font-display font-bold transition-transform cursor-pointer",
          pkg.featured
            // CTA merah di SEMUA kartu — kontras jelas di bg pastel mana pun
            ? "border-[3px] border-ink bg-red px-4 py-3 text-ink hover:translate-x-[2px] hover:translate-y-[2px]"
            : "border-[3px] border-ink bg-red px-4 py-3 text-ink shadow-brutal-sm hover:translate-x-[2px] hover:translate-y-[2px]",
        )}
      >
        <MessageCircle aria-hidden="true" className="h-5 w-5" />
        Pilih Paket
      </a>
    </article>
  );
}
