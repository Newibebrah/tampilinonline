import { Check } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { processSteps } from "@/data/process";

/**
 * Timeline proses kerja 5 langkah (README 6.6 / data/process.ts).
 */
export function Process() {
  return (
    <section aria-labelledby="proses-heading" className="container bg-cream py-16 md:py-24">
      <ScrollReveal>
        <SectionHeading
          eyebrow="Cara Kerja"
          title="Lima langkah, tanpa drama."
          description="Dari chat pertama sampai website live — alurnya singkat dan jelas."
        />
      </ScrollReveal>

      <ScrollReveal className="mt-10 md:mt-14">
        <ol className="relative flex flex-col gap-8 md:grid md:grid-cols-5 md:gap-4">
          {processSteps.map((step, index) => (
            <li key={step.step} className="relative flex gap-4 md:flex-col md:items-start">
              {/* garis penghubung */}
              {index !== processSteps.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute left-10 top-12 h-full w-0.5 border-l-2 border-dashed border-ink/30 md:static md:h-1 md:w-full md:border-t-2 md:border-l-0"
                />
              ) : null}

              <span className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-yellow font-display font-extrabold shadow-brutal-sm">
                {step.step}
              </span>
              <div>
                <h3 className="font-display text-lg font-bold">{step.title}</h3>
                <p className="mt-1 max-w-xs text-sm text-ink/70">{step.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </ScrollReveal>

      {/* catatan bare minimum supaya visibly lengkap */}
      <p className="mt-10 flex items-start gap-2 rounded-card border-2 border-ink bg-white p-4 text-sm text-ink/70">
        <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
        Waktu pengerjaan mulai dihitung setelah konten (teks, foto, logo) lengkap kami terima.
      </p>
    </section>
  );
}
