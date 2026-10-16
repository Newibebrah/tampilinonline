import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

/**
 * Heading konsisten untuk semua section: badge kecil (eyebrow) + H2 + deskripsi.
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
        "flex flex-col gap-4",
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
        <p className={cn("max-w-2xl text-ink/70", invert && "text-cream/80")}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
