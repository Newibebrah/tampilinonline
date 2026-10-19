import { Server, Brush, LifeBuoy } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { SectionArt } from "@/components/decorative/SectionArt";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { TextReveal } from "@/components/shared/TextReveal";
import { Magnetic } from "@/components/decorative/Magnetic";
import { Sticker } from "@/components/decorative/Sticker";

/**
 * Hero — above the fold. H1 + subheadline + 2 CTA + mockup CSS browser & ponsel
 * dengan label "Demo Concept" (README 6.2).
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative isolate overflow-hidden">
      {/* Ilustrasi dekoratif — karakter coding mengintip dari sudut kiri bawah */}
      <SectionArt src="/asset_decor/asset_character_coding.png" className="-rotate-2 bottom-0 left-0 w-40 md:block lg:w-52" />

      <div className="container grid items-center gap-12 pb-8 pt-10 md:grid-cols-2 md:pb-12 md:pt-16 lg:gap-16 lg:pt-20">
        {/* Kiri: teks + CTA */}
        <ScrollReveal className="flex flex-col items-start gap-6">
          {/* Badge + H1: center di mobile (<768px), kiri di desktop (permintaan user). */}
          <Badge variant="blue" className="self-center text-center md:self-start md:text-left">
            Jasa Pembuatan Website
          </Badge>

          <TextReveal
            as="h1"
            id="hero-heading"
            className="text-balance text-center font-display text-[clamp(2rem,8vw,3.5rem)] font-extrabold leading-[1.08] tracking-tight md:text-left"
            parts={[
              { text: "Semua usaha" },
              {
                text: "harus punya",
                className: "bg-yellow px-2 leading-[1.25] shadow-brutal-sm",
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

          {/* CTA — mobile: auto-width & CENTER di bawah list; desktop row seperti sebelumnya.
              Magnetic (desktop only) — tarikan elastis ke kursor (prompt visionary 2.3). */}
          <div className="order-4 flex flex-col items-center gap-3 sm:order-none sm:flex-row sm:items-center">
            {/* Magnetic bawaan WhatsAppButton (semua CTA WA utama) */}
            <WhatsAppButton size="lg" />
            <Magnetic>
              <ButtonLink href="#paket" variant="secondary" size="lg">
                Lihat Paket Layanan
              </ButtonLink>
            </Magnetic>
          </div>

          {/* 3 poin: mobile = SATU baris lurus di atas button (copy pendek biar
              muat 360px), centered; desktop = di bawah CTA, rata kiri. */}
          <ul className="order-3 flex flex-nowrap items-center justify-center gap-2 text-base font-medium text-ink/70 sm:order-none sm:justify-start sm:gap-4">
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

        {/* Kanan: mockup CSS browser + ponsel */}
        <ScrollReveal delay={0.15} className="relative mx-auto w-full max-w-xl">
          <Badge
            variant="blue"
            className="absolute -top-4 right-2 z-20 rotate-2"
          >
            Demo Concept
          </Badge>

          {/* Sticker bombing (prompt visionary 2.1) — pointer-events-none,
              floating idle; hanya desktop agar 360px tetap bersih. */}
          <Sticker
            text="100% Custom"
            rotate={7}
            tone="pink"
            className="-bottom-10 right-0 hidden sm:block"
            floatDelay={0.4}
          />
          <Sticker
            text="No Template"
            rotate={-6}
            tone="surface"
            className="-left-6 top-6 hidden lg:block"
            floatDelay={1.2}
          />

          {/* Browser desktop */}
          <div className="relative rounded-card border-[3px] border-ink bg-surface shadow-brutal">
            <div className="flex items-center gap-1.5 border-b-2 border-ink bg-canvas px-4 py-3">
              <span className="h-3 w-3 rounded-full border border-ink bg-ink" />
              <span className="h-3 w-3 rounded-full border border-ink bg-yellow" />
              <span className="h-3 w-3 rounded-full border border-ink bg-pink" />
              <span className="ml-3 hidden h-5 flex-1 rounded-pill border-2 border-ink bg-surface sm:block" />
            </div>
            <div className="flex items-center justify-between border-b-2 border-ink px-4 py-2.5">
              <span className="h-3 w-16 rounded-pill bg-ink" />
              <div className="flex gap-2">
                <span className="h-2.5 w-8 rounded-pill bg-ink/30" />
                <span className="h-2.5 w-8 rounded-pill bg-ink/30" />
                <span className="h-2.5 w-8 rounded-pill bg-ink/30" />
              </div>
            </div>
            <div className="bg-yellow px-4 py-5">
              <span className="block h-4 w-2/3 rounded-pill bg-ink" />
              <span className="mt-2 block h-4 w-1/2 rounded-pill bg-ink" />
              <span className="mt-3 inline-block h-7 w-24 rounded-pill border-2 border-ink bg-canvas" />
            </div>
            <div className="grid grid-cols-3 gap-3 p-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="rounded-card border-2 border-ink bg-surface p-2"
                >
                  <span className="block h-12 w-full rounded-sm bg-canvas" />
                  <span className="mt-2 block h-2 w-3/4 rounded-pill bg-ink/40" />
                </div>
              ))}
            </div>
          </div>

          {/* Ponsel overlap */}
          <div className="absolute -bottom-8 -left-4 w-28 sm:w-36 md:-left-8">
            <div className="rounded-card border-[3px] border-ink bg-surface p-2 shadow-brutal">
              <div className="mx-auto mb-1.5 h-1.5 w-10 rounded-pill border border-ink bg-canvas" />
              <div className="space-y-1.5">
                <span className="block h-16 rounded-sm bg-yellow" />
                <span className="block h-2 w-3/4 rounded-pill bg-ink/40" />
                <span className="block h-2 w-1/2 rounded-pill bg-ink/30" />
                <div className="flex gap-1.5 pt-1">
                  <span className="block h-10 w-1/2 rounded-sm bg-canvas" />
                  <span className="block h-10 w-1/2 rounded-sm bg-canvas" />
                </div>
                <span className="block h-6 rounded-pill bg-pink" />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
