import { cn } from "@/lib/utils";

/**
 * Wordmark brand — teks "Tampilin.online" di Space Grotesk Bold.
 * Struktur sederhana supaya nanti bisa diganti SVG logo tanpa rombak layout.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("font-display font-bold tracking-tight", className)}>
      Tampilin<span className="text-pink">.online</span>
    </span>
  );
}
