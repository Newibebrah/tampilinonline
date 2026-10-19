import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "yellow" | "blue" | "ink";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: Variant;
};

/** Badge pill Soft Pastel Neo-Brutalism v2.1: radius full + border 2px ink. */
export function Badge({ variant = "yellow", className, ...rest }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border-2 border-ink px-4 py-1.5 font-display text-lg font-bold",
        variant === "yellow" && "bg-yellow text-ink",
        variant === "blue" && "bg-blue text-ink",
        variant === "ink" && "bg-ink text-canvas",
        className,
      )}
      {...rest}
    />
  );
}
