import Image from "next/image";
import { Server, Brush, LifeBuoy } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { TextReveal } from "@/components/shared/TextReveal";
import { Magnetic } from "@/components/decorative/Magnetic";
import { Sticker } from "@/components/decorative/Sticker";
import { BoldShapes } from "@/components/decorative/BoldShapes";

/**
 * Hero v3 — BOLD CENTER-FOCUSED (prompt bold-pastel v3.0 FASE 3):
 * - flex flex-col items-center justify-center text-center min-h-[80vh]
 * - latar blok pastel SOLID (bg-pink) + grid kertas global tetap di belakang
 * - H1 lebih besar (Bricolage Grotesque) dengan highlight MINT ber-border
 * - Visual utama: ilustrasi karakter DI BAWAH teks (in-flow, tidak terpotong)
 * - 3 elemen grafis melayang ala Gumroad (BoldShapes)
 * - Mockup CSS browser/ponsel yang lama DIGANTIKAN karakter ilustrasi
 *   (permintaan user: hero center-focused & berani)
 *
 * COPY 100% identik dengan versi sebelumnya — hanya layout & visual yang
 * berubah (aturan NO LOGIC/COPY CHANGES), KECUALI badge eyebrow
 * "Jasa Pembuatan Website" yang dihapus atas permintaan user
 * (hero sudah self-explanatory). Padding atas hero dipangkas agar
 * konten naik — tidak terlalu banyak ruang kosong di top.
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-[80vh] flex-col items-center justify-center overflow-hidden bg-pink text-center"
    >
      {/* Elemen grafis melayang ala Gumroad (kiri & kanan teks) */}
      <BoldShapes
        shapes={[
          { kind: "star", tone: "yellow", className: "left-[7%] top-14 h-12 w-12 rotate-12" },
          { kind: "star", tone: "red", className: "right-[6%] top-24 h-8 w-8 -rotate-6" },
          { kind: "circle", tone: "blue", className: "right-[9%] top-1/3 h-8 w-8" },
          { kind: "cross", tone: "mint", className: "left-[12%] bottom-24 h-10 w-10" },
          { kind: "cross", tone: "red", className: "left-[6%] bottom-[34%] h-7 w-7" },
          { kind: "ring", className: "right-[13%] bottom-[18%] h-10 w-10" },
        ]}
      />

      {/* Revisi user: padding ATAS dipangkas & center bias ke atas —
          ruang kosong di top hero tidak berlebihan */}
      <div className="container flex flex-col items-center gap-6 pb-16 pt-8 md:pb-20 md:pt-10">
        {/* Teks + CTA — semuanya center sekarang */}
        <ScrollReveal className="flex flex-col items-center gap-6">
          <TextReveal
            as="h1"
            id="hero-heading"
            className="text-balance font-display text-[clamp(2.25rem,7.5vw,4.5rem)] font-extrabold leading-[1.05] tracking-tight"
            parts={[
              { text: "Semua usaha" },
              {
                text: "harus punya",
                className: "border-2 border-ink bg-mint px-2 shadow-brutal-sm",
                asOne: true,
              },
              { text: "website." },
            ]}
          />

          <p className="max-w-lg text-lg text-ink/75">
            Jangan sampai calon pelanggan mencari bisnis Anda, tetapi menemukan
            kompetitor lebih dulu. Tampilin.online bantu usaha Anda hadir
            profesional di internet — mulai Rp499.000.
          </p>

          {/* CTA — Magnetic (desktop only) pada CTA sekunder; WA tetap utama */}
          <div className="order-4 flex flex-col items-center gap-3 sm:order-none sm:flex-row sm:justify-center">
            {/* Magnetic bawaan WhatsAppButton (semua CTA WA utama) */}
            <WhatsAppButton size="lg" />
            <Magnetic>
              <ButtonLink href="#paket" variant="secondary" size="lg">
                Lihat Paket Layanan
              </ButtonLink>
            </Magnetic>
          </div>

          {/* 3 poin — satu baris di mobile, di bawah CTA di desktop, center */}
          <ul className="order-3 flex flex-nowrap items-center justify-center gap-2 text-base font-medium text-ink/70 sm:order-none">
            <li className="flex items-center gap-1.5">
              <Brush aria-hidden="true" className="h-4 w-4 shrink-0" />
              Desain sesuai
            </li>
            <li className="flex items-center gap-1.5">
              <Server aria-hidden="true" className="h-4 w-4 shrink-0" />
              Hosting
            </li>
            <li className="flex items-center gap-1.5">
              <LifeBuoy aria-hidden="true" className="h-4 w-4 shrink-0" />
              2 putaran revisi
            </li>
          </ul>
        </ScrollReveal>

        {/* Visual utama — karakter ilustrasi di bawah teks (FASE 3 #4).
            In-flow (bukan absolute) supaya TIDAK PERNAH terpotong; stiker
            ditempel mengambang di sekeliling karakter. */}
        <ScrollReveal delay={0.15} className="relative">
          <Sticker
            text="100% Custom"
            rotate={7}
            tone="red"
            className="-left-10 -top-4 hidden md:block"
            floatDelay={0.4}
          />
          <Sticker
            text="No Template"
            rotate={-6}
            tone="surface"
            className="-right-12 bottom-16 hidden md:block"
            floatDelay={1.2}
          />
          <Image
            src="/asset_decor/asset_character_coding.png"
            alt="Ilustrasi karakter Tampilin.online sedang membuat website"
            width={768}
            height={768}
            priority
            className="w-64 md:w-80 lg:w-96"
          />
        </ScrollReveal>
      </div>
    </section>
  );
}
