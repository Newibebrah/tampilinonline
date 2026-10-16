import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "yellow" | "orange" | "ink";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: Variant;
};

/** Badge pill soft neo-brutalism: radius pill + border 2px ink. */
export function Badge({ variant = "yellow", className, ...rest }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-pill border-2 border-ink px-3 py-1 font-display text-xs font-bold",
        variant === "yellow" && "bg-yellow text-ink",
        variant === "orange" && "bg-orange text-ink",
        variant === "ink" && "bg-ink text-cream",
        className,
      )}
      {...rest}
    />
  );
}
