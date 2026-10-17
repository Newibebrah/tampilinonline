"use client";

import { CheckCircle, Package, X, XCircle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { ProcessStepCard } from "@/components/ui/ProcessStep";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { processSteps, processContent } from "@/data/process";

/**
 * Section Proses (README 6.6 v2): 8 langkah detail + preparation/exclusions
 * bento + prinsip kerja + CTA. Semua teks dari data/process.ts.
 *
 * Layout steps: mobile = timeline vertikal (garis latar di kiri),
 * tablet/desktop = grid 2 kolom full-detail (README: Pilihan B).
 */
export function Process() {
  return (
    <section id="proses" aria-labelledby="proses-heading" className="py-16 md:py-24">
      <div className="container">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Alur Kerja"
            title={processContent.heading}
            description={processContent.subheading}
            align="center"
          />
        </ScrollReveal>

        {/* --- 8 langkah --- */}
        <div className="relative mt-12 md:mt-16">
          {/* Garis timeline mobile: pass di belakang nomor bulat card
              (nomor card center-nya at 48px dari tepi kiri container). */}
          <span
            aria-hidden="true"
            className="absolute left-12 top-4 bottom-4 z-0 w-[2px] -translate-x-1/2 bg-ink/15 md:hidden"
          />

          <div className="relative z-10 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {processSteps.map((step, index) => (
              <ScrollReveal
                key={step.step}
                delay={Math.min(index * 0.05, 0.4)}
              >
                <ProcessStepCard step={step} index={index} />
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* --- Preparation + Exclusions (bento 2 kolom) --- */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          <ScrollReveal className="h-full">
            <Card className="h-full md:p-8">
              <div className="flex items-center gap-3">
                <Package aria-hidden="true" className="h-6 w-6 text-ink" />
                <h3 className="font-display text-xl font-bold text-ink">
                  {processContent.preparationTitle}
                </h3>
              </div>
              <ul className="mt-4 space-y-2.5">
                {processContent.preparationItems.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-ink/80"
                  >
                    <CheckCircle
                      aria-hidden="true"
                      className="mt-0.5 h-4 w-4 shrink-0 text-ink"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm italic text-ink/70">
                {processContent.preparationNote}
              </p>
            </Card>
          </ScrollReveal>

          <ScrollReveal className="h-full" delay={0.1}>
            <Card className="h-full md:p-8">
              <div className="flex items-center gap-3">
                <XCircle aria-hidden="true" className="h-6 w-6 text-ink" />
                <h3 className="font-display text-xl font-bold text-ink">
                  {processContent.exclusionsTitle}
                </h3>
              </div>
              <ul className="mt-4 space-y-2.5">
                {processContent.exclusionsItems.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-ink/80"
                  >
                    <X
                      aria-hidden="true"
                      className="mt-0.5 h-4 w-4 shrink-0 text-orange"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm italic text-ink/70">
                {processContent.exclusionsNote}
              </p>
            </Card>
          </ScrollReveal>
        </div>

        {/* --- Prinsip kerja (bento 4 kolom) --- */}
        <div className="mt-12 md:mt-16">
          <h3 className="font-display text-xl font-bold text-ink md:text-2xl">
            {processContent.principlesTitle}
          </h3>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            {processContent.principles.map((principle, index) => (
              <ScrollReveal key={principle.label} delay={index * 0.05}>
                <Card className="h-full p-4 shadow-brutal-sm md:p-5">
                  <p className="text-xs font-medium uppercase tracking-wide text-ink/60">
                    {principle.label}
                  </p>
                  <p className="mt-1.5 font-display text-base font-medium text-ink">
                    {principle.value}
                  </p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* --- CTA final --- */}
        <ScrollReveal className="mt-16 flex flex-col items-center gap-4 text-center">
          <h3 className="font-display text-[clamp(1.5rem,5vw,2.5rem)] font-bold leading-tight text-ink">
            {processContent.ctaTitle}
          </h3>
          <p className="max-w-xl text-ink/70">{processContent.ctaSubtitle}</p>
          <WhatsAppButton size="lg" className="mt-2">
            {processContent.ctaLabel}
          </WhatsAppButton>
        </ScrollReveal>
      </div>
    </section>
  );
}
