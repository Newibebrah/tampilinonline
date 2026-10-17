import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

/**
 * Heading konsisten untuk semua section: badge (eyebrow) + H2 + subjudul.
 *
 * Subjudul v2 (permintaan review): lebih besar (text-lg → text-xl),
 * TIDAK memanjang ke lebar penuh — block-nya hug konten & dibatasi ukuran
 * supaya barisnya pendek-rapi, dan text-balance bikin panjang baris rata.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  invert = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** Putih teks untuk section berlatar gelap. */
  invert?: boolean;
}) {
  return (
    <div
      className={cn(
        // items-start: badge & teks shrink-to-fit (hug konten), BUKAN stretch
        // selebar kontainer — tanpa ini badge align-kiri jadi |solusi…lebar…|
        "flex flex-col items-start gap-4",
        align === "center" && "items-center text-center",
      )}
    >
      <Badge variant={invert ? "yellow" : "orange"}>{eyebrow}</Badge>
      <h2
        className={cn(
          "font-display font-bold",
          invert ? "text-cream" : "text-ink",
          "text-[clamp(1.5rem,5vw,2.5rem)] leading-tight",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "text-balance font-display text-lg font-medium leading-snug md:text-xl",
            "max-w-md md:max-w-xl",
            invert ? "text-cream/80" : "text-ink/80",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
