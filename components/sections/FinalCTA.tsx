import { Instagram } from "lucide-react";
import { BRAND } from "@/lib/constants";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

/**
 * CTA final — headline besar + 2 tombol di atas panel kuning (README Phase 8).
 */
export function FinalCTA() {
  return (
    <section aria-labelledby="cta-final-heading" className="px-5 pb-20 md:pb-28">
      <ScrollReveal>
        <div className="container relative overflow-hidden rounded-card border-[3px] border-ink bg-yellow p-8 text-center shadow-brutal md:p-14">
          {/* dekorasi sudut */}
          <span aria-hidden="true" className="absolute -left-10 -top-10 h-28 w-28 rounded-card border-[3px] border-ink bg-cream" />
          <span aria-hidden="true" className="absolute -bottom-12 -right-10 h-32 w-32 rotate-12 rounded-card border-[3px] border-ink bg-cream" />

          <div className="relative flex flex-col items-center gap-6">
            <h2
              id="cta-final-heading"
              className="text-balance font-display text-[clamp(1.75rem,6vw,3rem)] font-extrabold leading-tight"
            >
              Saatnya usaha Anda{" "}
              <span className="bg-cream px-2 shadow-brutal-sm">tampil online.</span>
            </h2>
            <p className="max-w-xl text-lg text-ink/80">
              Konsultasi dulu, gratis, tanpa paksaan. Ceritakan usaha Anda —
              kami bantu carikan paket yang paling masuk akal.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <WhatsAppButton
                size="lg"
                variant="primary"
                className="bg-ink text-cream"
              >
                Konsultasi Gratis via WhatsApp
              </WhatsAppButton>
              <ButtonLink href="#paket" variant="secondary" size="lg">
                Lihat Paket Layanan Lagi
              </ButtonLink>
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
