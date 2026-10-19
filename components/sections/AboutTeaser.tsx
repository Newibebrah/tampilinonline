import { ButtonLink } from "@/components/ui/Button";
import Image from "next/image";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SectionArt } from "@/components/decorative/SectionArt";

/**
 * Teaser halaman About (visual novel) di homepage — center, mobile-first.
 * Terpasang di app/page.tsx setelah PriceSimulator, sebelum FAQ.
 * Punya id="tentang" — target link nav "Tentang" (NAV_LINKS).
 * Tombol mengarah ke /about: di sana tampil start scheme
 * "Mulai mendengarkan cerita", game baru berjalan setelah tombol diklik.
 */
export function AboutTeaser() {
  return (
    <section id="tentang" aria-label="Kenalan sama pembuat" className="relative isolate bg-surface py-16 md:py-24">
      <SectionArt src="/asset_decor_context/asset_tentang.png" className="-rotate-2 bottom-0 right-2 w-32 lg:block lg:w-44" />
      <div className="container">
        <ScrollReveal className="flex flex-col items-center gap-6 text-center">
          <SectionHeading
            align="center"
            eyebrow="Tentang"
            title="Kenalan Sama Ananta"
            description="Orang di balik layar Tampilin.online."
          />
          <Image
            src="/images/aboutme_pixel/profile.png"
            alt="Ananta, pembuat Tampilin.online, sedang minum kopi"
            width={192}
            height={192}
            loading="lazy"
            className="h-40 w-40 rounded-full border-[3px] border-ink bg-pink/20 p-1 shadow-brutal md:h-48 md:w-48 [image-rendering:pixelated]"
          />
          <ButtonLink href="/about" variant="primary" size="lg">
            Kenal lebih jauh
          </ButtonLink>
        </ScrollReveal>
      </div>
    </section>
  );
}
