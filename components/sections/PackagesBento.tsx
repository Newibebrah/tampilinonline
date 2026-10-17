"use client";

import { Check, MessageCircle } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SwipeCarousel } from "@/components/ui/SwipeCarousel";
import { cn } from "@/lib/utils";
import { buildWhatsAppUrl, packageMessage } from "@/lib/whatsapp";
import { packages } from "@/data/packages";
import type { Package } from "@/types";

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
    <section id="paket" aria-labelledby="paket-heading" className="container py-16 md:py-24">
      <ScrollReveal>
        <SectionHeading
          eyebrow="Paket & Harga"
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
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}

function PackageCard({ pkg }: { pkg: Package }) {
  return (
    <article
      style={{ gridArea: pkg.gridArea }}
      className={cn(
        "flex h-full flex-col rounded-card p-6 shadow-brutal transition-[transform,box-shadow] duration-200 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-brutal-sm",
        pkg.featured
          ? "border-[3px] border-ink bg-yellow"
          : "border-2 border-ink bg-white",
      )}
    >
      <header className="flex flex-wrap items-center gap-2">
        <h3 className="mr-auto font-display text-xl font-bold">{pkg.name}</h3>
        {pkg.badge ? (
          <span
            className={cn(
              "rounded-pill border-2 border-ink px-3 py-0.5 font-display text-xs font-bold",
              pkg.badge === "Terpopuler" ? "bg-orange" : "bg-cream",
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
            ? "border-[3px] border-ink bg-ink px-4 py-3 text-cream hover:translate-x-[2px] hover:translate-y-[2px]"
            : "border-[3px] border-ink bg-yellow px-4 py-3 shadow-brutal-sm hover:translate-x-[2px] hover:translate-y-[2px]",
        )}
      >
        <MessageCircle aria-hidden="true" className="h-5 w-5" />
        Pilih Paket
      </a>
    </article>
  );
}
