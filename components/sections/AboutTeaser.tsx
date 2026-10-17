import { ButtonLink } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

/**
 * Teaser halaman About (visual novel) di homepage — center, mobile-first.
 * Terpasang di app/page.tsx setelah PriceSimulator.
 */
export function AboutTeaser() {
  return (
    <section
      aria-label="Kenalan sama pembuat"
      className="bg-cream py-16 md:py-24"
    >
      <div className="container">
        <ScrollReveal className="flex flex-col items-center gap-5 text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/aboutme_pixel/profile.png"
            alt="Ananta, pembuat Tampilin.online, sedang minum kopi"
            width={192}
            height={192}
            loading="lazy"
            className="h-40 w-40 rounded-full border-[3px] border-ink bg-white p-1 shadow-brutal md:h-48 md:w-48 [image-rendering:pixelated]"
          />
          <div>
            <h2 className="font-display text-[clamp(1.5rem,5vw,2.5rem)] font-bold leading-tight text-ink">
              Kenalan Sama Ananta
            </h2>
            <p className="mt-2 text-lg text-ink/70">
              Orang di balik layar Tampilin.online.
            </p>
          </div>
          <ButtonLink href="/about" variant="primary" size="lg">
            Baca Ceritaku ☕
          </ButtonLink>
        </ScrollReveal>
      </div>
    </section>
  );
}
