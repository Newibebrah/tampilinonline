import { SectionHeading } from "@/components/shared/SectionHeading";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { portfolioItems } from "@/data/portfolio";

/**
 * Portofolio v1: grid placeholder berlabel "Demo Concept" (README 6.6).
 * Semua gambar wajib punya alt (README 11.4) dan lazy load.
 */
export function Portfolio() {
  return (
    <section id="portofolio" aria-labelledby="portofolio-heading" className="container bg-cream py-16 md:py-24">
      <ScrollReveal>
        <SectionHeading
          eyebrow="Portofolio"
          title="Contoh hasil pengerjaan."
          description="Semua contoh di bawah adalah konsep desain — acuan bentuk hasil pengerjaan sebelum kami menampilkan proyek klien."
        />
      </ScrollReveal>

      <ScrollReveal className="mt-10 md:mt-14">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {portfolioItems.map((item) => (
            <li
              key={item.id}
              className="overflow-hidden rounded-card border-2 border-ink bg-white shadow-brutal transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-brutal-sm"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.alt}
                width={800}
                height={600}
                loading="lazy"
                className="aspect-[4/3] w-full border-b-2 border-ink bg-cream object-cover"
              />
              <div className="flex flex-wrap items-center gap-2 p-5">
                <h3 className="mr-auto font-display text-lg font-bold">
                  {item.title}
                </h3>
                <span className="rounded-pill border-2 border-ink bg-cream px-2.5 py-0.5 text-xs font-medium text-ink/60">
                  {item.category}
                </span>
                <span className="rounded-pill border-2 border-ink bg-orange px-2.5 py-0.5 font-display text-xs font-bold">
                  {item.label}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </ScrollReveal>
    </section>
  );
}
