import { User, Wrench, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProcessStep } from "@/data/process";

/**
 * Card satu langkah proses (README 6.6 v2).
 * Struktur: nomor + title (+ badge Opsional) → tagline → deskripsi →
 * role split (Anda/Kami) → badge deliverable.
 */
export function ProcessStepCard({
  step,
  className,
}: {
  step: ProcessStep;
  /** Index urutan card — tersedia untuk stagger animasi di section. */
  index: number;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "relative z-10 rounded-card border-2 border-ink bg-surface p-6 shadow-brutal",
        // Highlight step pertama
        step.step === 1 && "bg-mint",
        // Hover neo-brutalist — desktop only
        "md:hover:translate-x-[2px] md:hover:translate-y-[2px] md:hover:shadow-brutal-sm",
        "transition-[transform,box-shadow] duration-200 ease-out",
        className,
      )}
    >
      {/* Header: nomor + title + badge opsional */}
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-mint font-display text-xl font-extrabold text-ink md:h-14 md:w-14"
        >
          {step.step}
        </span>
        <h3 className="font-display text-lg font-bold text-ink md:text-xl">
          {step.title}
        </h3>
        {step.optional ? (
          <span className="ml-auto hidden shrink-0 rounded-pill border-2 border-ink bg-canvas px-2.5 py-1 text-xs font-medium uppercase tracking-wide text-ink/70 sm:inline-block">
            Opsional
          </span>
        ) : null}
      </div>

      {/* Badge "Opsional" di mobile — di bawah header agar tak sesak */}
      {step.optional ? (
        <span className="mt-3 inline-block rounded-pill border-2 border-ink bg-canvas px-2.5 py-1 text-xs font-medium uppercase tracking-wide text-ink/70 sm:hidden">
          Opsional
        </span>
      ) : null}

      <p className="mt-2 text-base italic text-ink/70">{step.tagline}</p>

      <p className="mt-3 text-base leading-relaxed text-ink/80">
        {step.description}
      </p>

      {/* Role split: Anda / Kami */}
      <div className="mt-4 grid gap-2 md:grid-cols-2 md:gap-4">
        <p className="flex items-start gap-2 text-ink/80">
          <User
            aria-hidden="true"
            className="mt-0.5 h-4 w-4 shrink-0 text-mint"
          />
          <span>
            <span className="font-medium text-ink">Anda:</span> {step.clientRole}
          </span>
        </p>
        <p className="flex items-start gap-2 text-ink/80">
          <Wrench aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-ink" />
          <span>
            <span className="font-medium text-ink">Kami:</span> {step.ourRole}
          </span>
        </p>
      </div>

      {/* Deliverable */}
      <p className="mt-4 inline-flex items-center gap-1.5 rounded-pill border-2 border-ink bg-lavender px-3 py-1.5 text-xs font-medium text-ink">
        <CheckCircle aria-hidden="true" className="h-4 w-4 shrink-0" />
        {step.deliverable}
      </p>
    </article>
  );
}
