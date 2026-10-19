import { Instagram } from "lucide-react";
import { BRAND } from "@/lib/constants";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { TextReveal } from "@/components/shared/TextReveal";
import { Magnetic } from "@/components/decorative/Magnetic";
import { Sticker } from "@/components/decorative/Sticker";
import { BoldShapes } from "@/components/decorative/BoldShapes";
import { SectionArt } from "@/components/decorative/SectionArt";

/**
 * CTA final — headline besar + 2 tombol di atas panel kuning (README Phase 8).
 */
export function FinalCTA() {
  return (
    <section aria-labelledby="cta-final-heading" className="relative isolate overflow-hidden border-y-4 border-ink bg-yellow py-16 md:py-24">
      <ScrollReveal>
        <div className="container relative p-8 text-center md:p-14">
          <SectionArt src="/asset_decor_context/asset_hasil_growth.png" className="rotate-2 -bottom-10 -right-6 w-32 md:block lg:w-44" />
          {/* dekorasi sudut */}
          <span aria-hidden="true" className="absolute -left-10 -top-10 h-28 w-28 rounded-card border-[3px] border-ink bg-pink" />

          <div className="relative flex flex-col items-center gap-6">
            {/* Sticker bombing di panel kuning (prompt visionary 2.1) */}
            <Sticker
              text="Gratis Konsultasi"
              rotate={8}
              tone="surface"
              className="right-4 top-4 hidden md:block"
              floatDelay={0.8}
            />

            <TextReveal
              as="h2"
              id="cta-final-heading"
              className="text-balance font-display text-[clamp(1.75rem,6vw,3rem)] font-extrabold leading-tight"
              parts={[
                { text: "Saatnya usaha Anda" },
                {
                  text: "tampil online.",
                  className: "bg-surface px-2 shadow-brutal-sm",
                  asOne: true,
                },
              ]}
            />
            <p className="max-w-xl text-lg text-ink/80">
              Konsultasi dulu, gratis, tanpa paksaan. Ceritakan usaha Anda —
              kami bantu carikan paket yang paling masuk akal.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              {/* Magnetic bawaan WhatsAppButton */}
              <WhatsAppButton
                size="lg"
                variant="primary"
                className="bg-ink text-canvas"
              >
                Konsultasi Gratis via WhatsApp
              </WhatsAppButton>
              <Magnetic>
                <ButtonLink href="#paket" variant="secondary" size="lg">
                  Lihat Paket Layanan Lagi
                </ButtonLink>
              </Magnetic>
            </div>
            <a
              href={BRAND.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-bold underline-offset-4 hover:underline"
            >
              <Instagram aria-hidden="true" className="h-4 w-4" />
              Monitor karya kami di @{BRAND.instagram}
            </a>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
