import Image from "next/image";
import { TextReveal } from "@/components/shared/TextReveal";
import { Sticker } from "@/components/decorative/Sticker";

/**
 * PageHero v3 (prompt bold-pastel v3.0 & revisi user) — header halaman
 * standalone (Blog & Harga) dengan gaya yang SAMA PERSIS:
 * - teks CENTER (eyebrow chip merah, H1, deskripsi)
 * - ilustrasi menempel LANGSUNG di bawah kalimat pembuka (gap kecil +
 *   stiker mengambang) → kesatuan satu blok pembuka, bukan pajangan samping.
 *
 * Server component; Sticker/TextReveal client di dalamnya.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  id,
  artSrc,
  artAlt,
  stickers = [],
}: {
  eyebrow: string;
  title: string;
  description: string;
  /** id untuk H1 (mis. "simulasi-heading" yang dirujuk aria-labelledby). */
  id?: string;
  artSrc: string;
  artAlt: string;
  stickers?: {
    text: string;
    tone: "red" | "surface" | "blue" | "yellow" | "pink" | "lavender";
    className: string;
    rotate?: number;
    floatDelay?: number;
  }[];
}) {
  return (
    <div className="relative isolate flex flex-col items-center gap-2 text-center">
      {/* Eyebrow chip merah — kontras aman (ink di atas merah) */}
      <p className="bg-red px-2 py-0.5 font-display text-xs font-bold uppercase tracking-wide text-ink">
        {eyebrow}
      </p>

      <TextReveal
        as="h1"
        id={id}
        className="text-balance text-center font-display text-[clamp(1.75rem,5vw,2.75rem)] font-bold leading-tight"
        parts={[{ text: title }]}
      />
      <p className="mx-auto mt-1 max-w-xl text-lg text-ink/70">{description}</p>

      {/* Ilustrasi = bagian dari kalimat pembuka: langsung di bawah teks,
          gap kecil, stiker menempel di sekelilingnya. */}
      <div className="relative mt-3 mb-2">
        {stickers.map((s, i) => (
          <Sticker
            key={i}
            text={s.text}
            tone={s.tone}
            rotate={s.rotate}
            className={s.className}
            floatDelay={s.floatDelay}
          />
        ))}
        <Image
          src={artSrc}
          alt={artAlt}
          width={768}
          height={768}
          priority
          className="w-52 md:w-64"
        />
      </div>
    </div>
  );
}
