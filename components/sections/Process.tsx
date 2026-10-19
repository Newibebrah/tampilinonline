"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  Camera,
  CheckCircle,
  FileText,
  KeyRound,
  MessageCircle,
  Package,
  Rocket,
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
import { SectionArt } from "@/components/decorative/SectionArt";

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

const STRIP_SCHEMES = ["bg-pink", "bg-blue", "bg-ink"] as const;

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
      className="relative isolate bg-lavenderLite py-16 md:py-24"
    >
      <SectionArt src="/asset_decor_context/asset_proses.png" className="top-0 right-0 w-32 lg:block lg:w-44" />
      <div className="container">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Alur Kerja"
            title={processContent.heading}
            description={processContent.subheading}
          />
        </ScrollReveal>

        {/* --- MOBILE & TABLET (<1024px): grid kartu — layout yang sudah ada (tidak berubah).
              lg:hidden: sebelumnya grid ini ikut tampil di desktop dan muncul GANDA
              dengan sticky viewer di bawahnya (laporan user). --- */}
        <div className="mt-12 grid grid-cols-1 items-start gap-6 md:grid-cols-2 lg:hidden">
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
              <div className="overflow-hidden rounded-card border-[3px] border-ink bg-mintLite shadow-brutal">
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
                          "font-display text-[7rem] font-extrabold leading-none tracking-tight text-red",
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

                      {/* Ilustrasi mini per langkah (dekorerutif — aria-hidden) */}
                      <div
                        aria-hidden="true"
                        className="mt-6 flex h-44 items-center justify-center"
                      >
                        <StepVisual step={step.step} />
                      </div>

                      {/* Visual zone: role split + deliverable langkah aktif */}
                      <div className="mt-8 space-y-3">
                        <p className="flex items-start gap-2 text-sm text-ink/80">
                          <User aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-pink" />
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
                        <p className="inline-flex items-center gap-1.5 rounded-pill border-2 border-ink bg-lavender px-3 py-1.5 text-xs font-medium text-ink">
                          <CheckCircle aria-hidden="true" className="h-4 w-4 shrink-0" />
                          {step.deliverable}
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Progress segments */}
                  <div className="mt-6 border-t-2 border-dashed border-ink pt-4">
                    <div aria-hidden="true" className="flex gap-1.5">
                      {processSteps.map((s, index) => (
                        <span
                          key={s.step}
                          className={cn(
                            "h-2.5 flex-1 rounded-pill border-2 border-ink bg-surface transition-colors duration-300",
                            index <= active ? "bg-red" : "bg-surface",
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
                  "rounded-card border-2 border-ink bg-surface p-6 md:p-8 shadow-brutal transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-brutal-lg lg:flex lg:min-h-[55vh] lg:flex-col lg:justify-center",
                  s.step === 1 && "bg-mint",
                  active === index ? "opacity-100" : "lg:opacity-80",
                )}
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink bg-mint font-display text-sm font-extrabold"
                  >
                    {s.step}
                  </span>
                  <h3 className="font-display text-2xl font-extrabold leading-tight md:text-3xl">
                    {s.title}
                  </h3>
                  {s.optional ? (
                    <span className="rounded-pill border-2 border-ink bg-canvas px-2.5 py-1 text-xs font-medium uppercase tracking-wide text-ink/70">
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
            <li className="flex flex-col overflow-hidden rounded-card border-2 border-ink bg-surface shadow-brutal">
              <div
                aria-hidden="true"
                className="flex flex-1 items-center justify-center bg-canvas p-4"
              >
                {/* Mock browser mini */}
                <div className="w-full max-w-[170px] overflow-hidden rounded-card border-2 border-ink bg-surface">
                  <div className="flex items-center gap-1 border-b-2 border-ink bg-canvas px-2 py-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-ink" />
                    <span className="h-1.5 w-1.5 rounded-full bg-yellow" />
                    <span className="h-1.5 w-1.5 rounded-full bg-pink" />
                  </div>
                  <div className="p-2">
                    <span className="block h-2 w-2/3 rounded-pill bg-ink" />
                    <span className="mt-1 block h-2 w-1/2 rounded-pill bg-ink" />
                    <span className="mt-2 block h-6 w-full rounded-sm bg-yellow" />
                  </div>
                </div>
              </div>
              <p className="border-t-2 border-ink bg-surface px-3 py-2 text-center text-xs font-medium text-ink/70">
                Preview website
              </p>
            </li>

            <li className="flex flex-col overflow-hidden rounded-card border-2 border-ink bg-surface shadow-brutal">
              <div
                aria-hidden="true"
                className="flex flex-1 items-center justify-center bg-canvas p-4"
              >
                {/* Mock ponsel mini */}
                <div className="w-[86px] rounded-card border-[3px] border-ink bg-surface p-2">
                  <div className="mx-auto mb-1.5 h-1 w-6 rounded-pill bg-blue" />
                  <span className="block h-10 rounded-sm bg-yellow" />
                  <span className="mt-1.5 block h-1.5 w-3/4 rounded-pill bg-ink" />
                  <span className="mt-1 block h-1.5 w-1/2 rounded-pill bg-blue" />
                  <span className="mt-2 block h-4 rounded-pill bg-pink" />
                </div>
              </div>
              <p className="border-t-2 border-ink bg-surface px-3 py-2 text-center text-xs font-medium text-ink/70">
                Responsif di HP
              </p>
            </li>

            <li className="flex flex-col overflow-hidden rounded-card border-2 border-ink bg-surface shadow-brutal">
              <div
                aria-hidden="true"
                className="flex flex-1 items-center justify-center bg-canvas p-4"
              >
                {/* Mock grid konten/produk */}
                <div className="grid w-full max-w-[150px] grid-cols-3 gap-1.5">
                  <span className="h-10 rounded-sm border-2 border-ink bg-surface" />
                  <span className="h-10 rounded-sm border-2 border-ink bg-blue" />
                  <span className="h-10 rounded-sm border-2 border-ink bg-surface" />
                  <span className="h-10 rounded-sm border-2 border-ink bg-surface" />
                  <span className="h-10 rounded-sm border-2 border-ink bg-ink" />
                  <span className="h-10 rounded-sm border-2 border-ink bg-surface" />
                </div>
              </div>
              <p className="border-t-2 border-ink bg-surface px-3 py-2 text-center text-xs font-medium text-ink/70">
                Produk &amp; galeri
              </p>
            </li>

            <li className="flex flex-col overflow-hidden rounded-card border-2 border-ink bg-surface shadow-brutal">
              <div className="flex flex-1 items-center justify-center bg-surface p-4">
                <Image
                  src="/images/solution/solution-illustration.svg"
                  alt="Ilustrasi website sebagai kantor digital bisnis yang selalu terhubung"
                  width={800}
                  height={600}
                  loading="lazy"
                  className="w-full rounded-sm"
                />
              </div>
              <p className="border-t-2 border-ink bg-surface px-3 py-2 text-center text-xs font-medium text-ink/70">
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
                      className="mt-0.5 h-4 w-4 shrink-0 text-mint"
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

/**
 * Ilustrasi mini neo-brutalism per langkah, untuk panel sticky desktop.
 * Semua dekoratif (parent aria-hidden): border tebal ink, warna flat
 * pink/blue/ink, shadow keras MATI (no gradients, no blur) per
 * design system README Section 2.
 */
function StepVisual({ step }: { step: number }) {
  const frame =
    "w-full max-w-[230px] overflow-hidden rounded-card border-2 border-ink bg-surface shadow-brutal-sm";

  switch (step) {
    case 1: // Konsultasi — mock chat WhatsApp
      return (
        <div className={frame}>
          <div className="flex items-center gap-1.5 border-b-2 border-ink bg-yellow px-3 py-1.5">
            <MessageCircle className="h-3.5 w-3.5 text-ink" />
            <span className="font-display text-xs font-bold text-ink">
              Konsultasi via chat
            </span>
          </div>
          <div className="space-y-2 p-3">
            <span className="block max-w-[85%] rounded-card rounded-bl-none border-2 border-ink bg-surface px-2.5 py-1.5">
              <span className="block h-1.5 w-4/5 rounded-pill bg-ink" />
              <span className="mt-1 block h-1.5 w-3/5 rounded-pill bg-blue" />
            </span>
            <span className="ml-auto block max-w-[85%] rounded-card rounded-br-none border-2 border-ink bg-yellow px-2.5 py-1.5">
              <span className="block h-1.5 w-3/5 rounded-pill bg-ink" />
              <span className="mt-1 block h-1.5 w-4/5 rounded-pill bg-blue" />
            </span>
            <span className="flex items-center gap-1.5 rounded-pill border-2 border-ink bg-surface px-3 py-1.5">
              <span className="h-1.5 flex-1 rounded-pill bg-blue" />
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-ink" />
            </span>
          </div>
        </div>
      );

    case 2: // Rekomendasi & penawaran — mock dokumen harga
      return (
        <div className={frame}>
          <div className="flex items-center gap-1.5 border-b-2 border-ink bg-pink px-3 py-1.5">
            <FileText className="h-3.5 w-3.5 text-canvas" />
            <span className="font-display text-xs font-bold text-ink">
              Penawaran
            </span>
          </div>
          <div className="space-y-2 p-3">
            <span className="flex h-1.5 w-full rounded-pill bg-blue" />
            <span className="flex h-1.5 w-4/5 rounded-pill bg-blue" />
            <span className="flex h-1.5 w-3/5 rounded-pill bg-blue" />
            <span className="flex items-center justify-between border-2 border-ink bg-yellow px-2.5 py-1.5">
              <span className="font-display text-xs font-bold text-ink">Total</span>
              <span className="font-display text-xs font-extrabold text-ink">
                sesuai lingkup
              </span>
            </span>
          </div>
        </div>
      );

    case 3: // Pengumpulan materi — chip Logo/Foto/Teks
      return (
        <div className={frame}>
          <div className="border-b-2 border-ink bg-canvas px-3 py-1.5 font-display text-xs font-bold text-ink">
            Materi dari Anda
          </div>
          <div className="grid grid-cols-3 gap-2 p-3">
            <span className="flex flex-col items-center gap-1.5 rounded-card border-2 border-ink bg-surface p-2">
              <Package className="h-4 w-4 text-ink" />
              <span className="font-display text-[10px] font-bold">Logo</span>
            </span>
            <span className="flex flex-col items-center gap-1.5 rounded-card border-2 border-ink bg-surface p-2">
              <Camera className="h-4 w-4 text-ink" />
              <span className="font-display text-[10px] font-bold">Foto</span>
            </span>
            <span className="flex flex-col items-center gap-1.5 rounded-card border-2 border-ink bg-surface p-2">
              <FileText className="h-4 w-4 text-ink" />
              <span className="font-display text-[10px] font-bold">Teks</span>
            </span>
          </div>
        </div>
      );

    case 4: // Desain & pengembangan — mock browser
      return (
        <div className={frame}>
          <div className="flex items-center gap-1 border-b-2 border-ink bg-canvas px-2.5 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-ink" />
            <span className="h-1.5 w-1.5 rounded-full bg-yellow" />
            <span className="h-1.5 w-1.5 rounded-full bg-pink" />
            <span className="ml-1.5 h-2.5 flex-1 rounded-pill border-2 border-ink bg-surface" />
          </div>
          <div className="p-3">
            <span className="block h-2 w-2/3 rounded-pill bg-ink" />
            <span className="mt-1.5 block h-2 w-1/2 rounded-pill bg-ink" />
            <span className="mt-2.5 block h-8 w-full rounded-sm bg-yellow" />
            <div className="mt-2 grid grid-cols-3 gap-1.5">
              <span className="block h-6 rounded-sm bg-canvas" />
              <span className="block h-6 rounded-sm bg-canvas" />
              <span className="block h-6 rounded-sm bg-pink" />
            </div>
          </div>
        </div>
      );

    case 5: // Review & revisi — mock checklist
      return (
        <div className={frame}>
          <div className="border-b-2 border-ink bg-yellow px-3 py-1.5 font-display text-xs font-bold text-ink">
            Review Anda
          </div>
          <div className="space-y-1.5 p-3">
            {[1, 2, 3].map((row) => (
              <span
                key={row}
                className="flex items-center gap-2 rounded-card border-2 border-ink bg-surface px-2.5 py-1.5"
              >
                <CheckCircle className="h-3.5 w-3.5 shrink-0 text-ink" />
                <span
                  className={cn(
                    "h-1.5 rounded-pill bg-ink",
                    row === 1 ? "w-3/4" : row === 2 ? "w-1/2" : "w-2/3",
                  )}
                />
              </span>
            ))}
            <span className="flex h-4 items-center justify-center rounded-pill border-2 border-dashed border-ink bg-surface">
              <span className="font-display text-[9px] font-bold uppercase tracking-wide text-ink/60">
                maks. 2 putaran revisi
              </span>
            </span>
          </div>
        </div>
      );

    case 6: // Peluncuran — mock status live
      return (
        <div className={frame}>
          <div className="border-b-2 border-ink bg-pink px-3 py-1.5 font-display text-xs font-bold text-ink">
            Buka untuk publik
          </div>
          <div className="flex flex-col items-center gap-2 p-4">
            <Rocket className="h-6 w-6 text-ink" />
            <span className="flex items-center gap-1.5 rounded-pill border-2 border-ink bg-surface px-3 py-1">
              <span className="h-2 w-2 rounded-full bg-pink" />
              <span className="font-display text-[10px] font-bold text-ink">
                website live
              </span>
            </span>
            <span className="block h-1.5 w-2/3 rounded-pill bg-blue" />
            <span className="block h-1.5 w-1/2 rounded-pill bg-blue" />
          </div>
        </div>
      );

    case 7: // Serah terima — mock kredensial + kunci
      return (
        <div className={frame}>
          <div className="flex items-center gap-1.5 border-b-2 border-ink bg-yellow px-3 py-1.5">
            <KeyRound className="h-3.5 w-3.5 text-ink" />
            <span className="font-display text-xs font-bold text-ink">
              Kendali Anda
            </span>
          </div>
          <div className="space-y-1.5 p-3">
            {["Akses & kredensial", "Panduan singkat", "Kode & domain"].map(
              (item) => (
                <span
                  key={item}
                  className="flex items-center justify-between rounded-card border-2 border-ink bg-canvas px-2.5 py-1.5"
                >
                  <span className="font-display text-[10px] font-bold text-ink">
                    {item}
                  </span>
                  <CheckCircle className="h-3.5 w-3.5 text-ink" />
                </span>
              ),
            )}
          </div>
        </div>
      );

    default: // 8 — Dukungan — mock maintenance berkala
      return (
        <div className={frame}>
          <div className="border-b-2 border-ink bg-canvas px-3 py-1.5 font-display text-xs font-bold text-ink">
            Opsional — paket maintenance
          </div>
          <div className="flex flex-col items-center gap-2 p-4">
            <Wrench className="h-6 w-6 text-ink" />
            <span className="block h-1.5 w-3/4 rounded-pill bg-blue" />
            <span className="block h-1.5 w-2/3 rounded-pill bg-blue" />
            <span className="flex items-center gap-1.5 rounded-pill border-2 border-ink bg-surface px-3 py-1">
              <span className="h-2 w-2 rounded-full bg-yellow" />
              <span className="font-display text-[10px] font-bold text-ink">
                update & pantau berkala
              </span>
            </span>
          </div>
        </div>
      );
  }
}
