import { cn } from "@/lib/utils";
import { TextReveal } from "@/components/shared/TextReveal";

/**
 * SectionHeading v3 — "Sticker + Underline" (hasil acc user).
 *
 * Perubahan dari v2:
 * - Eyebrow bukan lagi Badge pill besar, melainkan STIKER: kotak kuning
 *   miring -1°, border ink, shadow keras kecil, uppercase — bahasa visual
 *   yang sama dengan label/tombol di kartu-kartu section.
 * - "Anchor visual": garis pendek orange di bawah title menyatukan judul
 *   dengan stiker (sebelumnya title & badge terasa lepas).
 * - Deskripsi lebih tenang: Inter biasa text-base md:text-lg, ink/70 —
 *   bukan font-display besar yang "bersaing" dengan title.
 *
 * Semua section center secara default (keputusan v2 tetap berlaku);
 * align="left" tersedia bila ada section yang butuh rata kiri.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  /** id untuk <h2> — pasangkan dengan aria-labelledby section (a11y). */
  id,
  /** Tag title: "h2" default; "h1" untuk heading utama halaman standalone. */
  titleAs = "h2",
  align = "center",
  /** Putih teks untuk section berlatar gelap. */
  invert = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  id?: string;
  titleAs?: "h1" | "h2";
  align?: "left" | "center";
  invert?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start",
      )}
    >
      {/* Stiker eyebrow — miring -1° agar terasa "ditempel" */}
      <span
        className={cn(
          "inline-block -rotate-1 rounded-card border-2 border-ink bg-yellow px-3.5 py-1.5",
          "font-display text-sm font-bold uppercase tracking-wider text-ink shadow-brutal-sm",
        )}
      >
        {eyebrow}
      </span>

      {/* Title dengan text reveal masking (per kata, staggered saat masuk
          viewport — prompt visionary 2.2). id tetap di h2 untuk aria-labelledby. */}
      <TextReveal
        as={titleAs}
        id={id}
        className={cn(
          "font-display font-bold",
          invert ? "text-cream" : "text-ink",
          "text-[clamp(1.5rem,5vw,2.5rem)] leading-tight",
        )}
        parts={[{ text: title }]}
      />

      {/* Garis anchor pendek — penghubung stiker → title → narasi */}
      <span
        aria-hidden="true"
        className={cn(
          "h-1.5 w-16 rounded-pill bg-orange",
          align === "center" && "mx-auto",
        )}
      />

      {description ? (
        <p
          className={cn(
            "text-balance text-base leading-relaxed md:text-lg",
            "mx-auto max-w-md md:max-w-xl",
            invert ? "text-cream/70" : "text-ink/70",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
