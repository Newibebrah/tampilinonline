"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle,
  MessageCircle,
  Package,
  User,
  Wrench,
  X,
  XCircle,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { ProcessStepCard } from "@/components/ui/ProcessStep";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";
import { processSteps, processContent } from "@/data/process";

/**
 * Section Proses v3 — konsep "Sticky Story Viewer" (SAMA dengan section
 * Masalah/ProblemScrolly), diterapkan pada konten alur kerja:
 *
 * - Mobile (<768px): SwipeCarousel — 8 kartu langkah geser horizontal
 *   (sama seperti mobile Problem).
 * - Desktop (lg+): panel sticky kiri menampilkan langkah AKTIF (nomor besar,
 *   role split, deliverable, progress segments) yang bertukar konten saat
 *   IntersectionObserver melihat kartu pemicu di kanan memasuki band tengah
 *   viewport. Kartu pemicu = konten lengkap per langkah.
 * - Gambar grid pemanis: 4 tile preview (CSS mock + ilustrasi) setelah
 *   langkah — penyeimbang visual sebelum masuk preparation/exclusions.
 *
 * Semua teks dari data/process.ts.
 */

const STRIP_SCHEMES = ["bg-yellow", "bg-orange", "bg-ink"] as const;

export function Process() {
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);

  // Sama seperti ProblemScrolly: kartu yang memotong band tengah viewport
  // (±40%) menjadi langkah aktif yang tampil di panel sticky.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.index));
          }
        }
      },
      { rootMargin: "-40% 0px -40% 0px" },
    );
    const nodes = document.querySelectorAll<HTMLElement>("[data-step-card]");
    nodes.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const step = processSteps[Math.min(active, processSteps.length - 1)];

  return (
    <section
      id="proses"
      aria-label="Proses kerja Tampilin.online"
      className="py-16 md:py-24"
    >
      <div className="container">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Alur Kerja"
            title={processContent.heading}
            description={processContent.subheading}
          />
        </ScrollReveal>

        {/* --- MOBILE & TABLET (<1024px): grid kartu — layout yang sudah ada (tidak berubah) --- */}
        <div className="mt-12 grid grid-cols-1 items-start gap-6 md:grid-cols-2">
          {processSteps.map((s, index) => (
            <ScrollReveal key={s.step} delay={Math.min(index * 0.05, 0.4)}>
              <ProcessStepCard step={s} index={index} />
            </ScrollReveal>
          ))}
        </div>

        {/* --- DESKTOP (lg+): sticky story viewer — konsep sama dgn Problem --- */}
        <div className="mt-16 hidden gap-8 lg:grid lg:grid-cols-2 lg:gap-12">
          {/* Panel sticky — langkah aktif yang diperbarui dinamis */}
          <aside className="relative hidden lg:block">
            <div className="sticky top-24">
              <div className="overflow-hidden rounded-card border-[3px] border-ink bg-white shadow-brutal">
                <span
                  aria-hidden="true"
                  className={cn(
                    "block h-3 w-full transition-colors duration-300",
                    STRIP_SCHEMES[(step.step - 1) % STRIP_SCHEMES.length],
                  )}
                />
                <div className="flex min-h-[540px] flex-col p-8">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={step.step}
                      className="flex-1"
                      initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reducedMotion ? undefined : { opacity: 0, y: -16 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                    >
                      <span
                        className={cn(
                          "font-display text-[7rem] font-extrabold leading-none tracking-tight text-ink/15",
                        )}
                      >
                        {String(step.step).padStart(2, "0")}
                      </span>
                      <p className="mt-2 font-display text-2xl font-bold text-ink">
                        {step.title}
                      </p>
                      <p className="mt-1 text-base italic text-ink/60">
                        {step.tagline}
                      </p>

                      {/* Visual zone: role split + deliverable langkah aktif */}
                      <div className="mt-8 space-y-3">
                        <p className="flex items-start gap-2 text-sm text-ink/80">
                          <User aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
                          <span>
                            <span className="font-medium text-ink">Anda:</span> {step.clientRole}
                          </span>
                        </p>
                        <p className="flex items-start gap-2 text-sm text-ink/80">
                          <Wrench aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-ink" />
                          <span>
                            <span className="font-medium text-ink">Kami:</span> {step.ourRole}
                          </span>
                        </p>
                        <p className="inline-flex items-center gap-1.5 rounded-pill border-[1.5px] border-ink/30 bg-yellow/20 px-3 py-1.5 text-xs font-medium text-ink">
                          <CheckCircle aria-hidden="true" className="h-4 w-4 shrink-0" />
                          {step.deliverable}
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Progress segments */}
                  <div className="mt-6 border-t-2 border-dashed border-ink/15 pt-4">
                    <div aria-hidden="true" className="flex gap-1.5">
                      {processSteps.map((s, index) => (
                        <span
                          key={s.step}
                          className={cn(
                            "h-1.5 flex-1 rounded-pill transition-colors duration-300",
                            index <= active ? "bg-yellow" : "bg-ink/15",
                          )}
                        />
                      ))}
                    </div>
                    <p className="mt-2 text-xs font-medium text-ink/50">
                      Langkah {active + 1} dari {processSteps.length} — ikuti kartu di kanan
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Kartu pemicu — konten lengkap per langkah (hanya tampil di lg,
              karena <lg sudah dilayani grid ProcessStepCard di atas) */}
          <div className="flex flex-col gap-6">
            {processSteps.map((s, index) => (
              <article
                key={s.step}
                data-step-card
                data-index={index}
                className={cn(
                  "rounded-card border-2 border-ink bg-cream p-6 md:p-8 shadow-brutal transition-transform duration-200 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-brutal-sm lg:flex lg:min-h-[55vh] lg:flex-col lg:justify-center",
                  s.step === 1 && "bg-yellow/10",
                  active === index ? "opacity-100" : "lg:opacity-80",
                )}
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink bg-yellow font-display text-sm font-extrabold"
                  >
                    {s.step}
                  </span>
                  <h3 className="font-display text-2xl font-extrabold leading-tight md:text-3xl">
                    {s.title}
                  </h3>
                  {s.optional ? (
                    <span className="rounded-pill border border-ink/20 bg-ink/5 px-2.5 py-1 text-xs font-medium uppercase tracking-wide text-ink/70">
                      Opsional
                    </span>
                  ) : null}
                </div>
                <p className="mt-2 text-base italic text-ink/70">{s.tagline}</p>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-ink/80">
                  {s.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* --- GAMBAR GRID PEMANIS --- */}
        <ScrollReveal className="mt-12 md:mt-16">
          <ul className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            <li className="flex flex-col overflow-hidden rounded-card border-2 border-ink bg-white shadow-brutal">
              <div
                aria-hidden="true"
                className="flex flex-1 items-center justify-center bg-cream p-4"
              >
                {/* Mock browser mini */}
                <div className="w-full max-w-[170px] overflow-hidden rounded-card border-2 border-ink bg-white">
                  <div className="flex items-center gap-1 border-b-2 border-ink bg-cream px-2 py-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-ink" />
                    <span className="h-1.5 w-1.5 rounded-full bg-yellow" />
                    <span className="h-1.5 w-1.5 rounded-full bg-orange" />
                  </div>
                  <div className="p-2">
                    <span className="block h-2 w-2/3 rounded-pill bg-ink" />
                    <span className="mt-1 block h-2 w-1/2 rounded-pill bg-ink/60" />
                    <span className="mt-2 block h-6 w-full rounded-sm bg-yellow" />
                  </div>
                </div>
              </div>
              <p className="border-t-2 border-ink bg-white px-3 py-2 text-center text-xs font-medium text-ink/70">
                Preview website
              </p>
            </li>

            <li className="flex flex-col overflow-hidden rounded-card border-2 border-ink bg-white shadow-brutal">
              <div
                aria-hidden="true"
                className="flex flex-1 items-center justify-center bg-yellow/10 p-4"
              >
                {/* Mock ponsel mini */}
                <div className="w-[86px] rounded-card border-[3px] border-ink bg-white p-2">
                  <div className="mx-auto mb-1.5 h-1 w-6 rounded-pill bg-ink/30" />
                  <span className="block h-10 rounded-sm bg-yellow" />
                  <span className="mt-1.5 block h-1.5 w-3/4 rounded-pill bg-ink/40" />
                  <span className="mt-1 block h-1.5 w-1/2 rounded-pill bg-ink/30" />
                  <span className="mt-2 block h-4 rounded-pill bg-orange" />
                </div>
              </div>
              <p className="border-t-2 border-ink bg-white px-3 py-2 text-center text-xs font-medium text-ink/70">
                Responsif di HP
              </p>
            </li>

            <li className="flex flex-col overflow-hidden rounded-card border-2 border-ink bg-white shadow-brutal">
              <div
                aria-hidden="true"
                className="flex flex-1 items-center justify-center bg-cream p-4"
              >
                {/* Mock grid konten/produk */}
                <div className="grid w-full max-w-[150px] grid-cols-3 gap-1.5">
                  <span className="h-10 rounded-sm border-2 border-ink bg-white" />
                  <span className="h-10 rounded-sm border-2 border-ink bg-orange" />
                  <span className="h-10 rounded-sm border-2 border-ink bg-white" />
                  <span className="h-10 rounded-sm border-2 border-ink bg-white" />
                  <span className="h-10 rounded-sm border-2 border-ink bg-ink" />
                  <span className="h-10 rounded-sm border-2 border-ink bg-white" />
                </div>
              </div>
              <p className="border-t-2 border-ink bg-white px-3 py-2 text-center text-xs font-medium text-ink/70">
                Produk &amp; galeri
              </p>
            </li>

            <li className="flex flex-col overflow-hidden rounded-card border-2 border-ink bg-white shadow-brutal">
              <div className="flex flex-1 items-center justify-center bg-white p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/solution/solution-illustration.svg"
                  alt="Ilustrasi website sebagai kantor digital bisnis yang selalu terhubung"
                  width={800}
                  height={600}
                  loading="lazy"
                  className="w-full rounded-sm"
                />
              </div>
              <p className="border-t-2 border-ink bg-white px-3 py-2 text-center text-xs font-medium text-ink/70">
                Kantor digital bisnis
              </p>
            </li>
          </ul>
        </ScrollReveal>

        {/* --- Preparation + Exclusions (bento 2 kolom) — tidak berubah --- */}
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

        {/* --- Prinsip kerja (bento 4 kolom) — tidak berubah --- */}
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

        {/* --- CTA final — tidak berubah --- */}
        <ScrollReveal className="mt-16 flex flex-col items-center gap-4 text-center">
          <h3 className="font-display text-[clamp(1.5rem,5vw,2.5rem)] font-bold leading-tight text-ink">
            {processContent.ctaTitle}
          </h3>
          <p className="max-w-xl text-balance text-ink/70">
            {processContent.ctaSubtitle}
          </p>
          <WhatsAppButton size="lg" className="mt-2">
            {processContent.ctaLabel}
          </WhatsAppButton>
        </ScrollReveal>
      </div>
    </section>
  );
}
