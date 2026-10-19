import { SectionHeading } from "@/components/shared/SectionHeading";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Card } from "@/components/ui/Card";
import { testimonials } from "@/data/testimonials";
import { SectionArt } from "@/components/decorative/SectionArt";
import { TapePair } from "@/components/decorative/TapePair";

/**
 * Testimoni v1 — SEMUA kartu berlabel "Demo" (aturan jujur README 6.5).
 * Tidak ada nama/foto fiktif; profil pengguna memperlihatkan target paket.
 * Layout grid sederhana — komponen baru, tidak menyentuh section final.
 */
export function Testimonials() {
  return (
    <section
      id="testimoni"
      aria-labelledby="testimoni-heading"
      className="container relative isolate bg-canvas py-16 md:py-24"
    >
      <SectionArt src="/asset_decor_context/asset_target_audience.png" className="top-0 left-0 w-32 lg:block lg:w-44" />
    <TapePair className="right-8 bottom-14" tone="bg-pink" tone2="bg-yellow" />
      <ScrollReveal>
        <SectionHeading
          id="testimoni-heading"
          eyebrow="Kata Mereka"
          title="Kepada siapa layanan ini ditujukan?"
          description="Belum ada klien, belum ada testimoni. Sebagai gantinya, ini profil pengguna yang cocok dengan setiap paket — gugus data yang akan diganti testimoni nyata setelah klien pertama."
        />
      </ScrollReveal>

      <ScrollReveal className="mt-10 md:mt-14">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <li key={item.id}>
              <Card className="flex h-full flex-col gap-4">
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full border-2 border-ink bg-blue px-2.5 py-0.5 text-xs font-bold">
                  {item.demo ? "Testimoni Demo" : "Testimoni Klien"}
                </span>
                <blockquote className="text-ink/80">“{item.quote}”</blockquote>
                <p className="mt-auto border-t-2 border-dashed border-ink pt-3 font-display text-sm font-bold">
                  {item.authorRole}
                </p>
              </Card>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-ink/60">
          Testimoni Demo — akan diperbarui setelah klien pertama. Kami tidak
          menampilkan ulasan yang belum terjadi.
        </p>
      </ScrollReveal>
    </section>
  );
}
