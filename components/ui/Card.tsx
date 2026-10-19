import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardProps = HTMLAttributes<HTMLElement> & {
  as?: "div" | "section" | "article";
  /** Aktifkan hover neo-brutalist (geser + shadow mengecil). */
  interactive?: boolean;
  children?: ReactNode;
};

/** Card dasar Soft Pastel Neo-Brutalism v2.1: border 2px ink, radius neo (14px), shadow brutal. */
export function Card({
  as: Tag = "div",
  interactive = false,
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <Tag
      className={cn(
        "rounded-card border-2 border-ink bg-surface p-6 shadow-brutal",
        interactive &&
          "transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-brutal-lg",
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
