import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardProps = HTMLAttributes<HTMLElement> & {
  as?: "div" | "section" | "article";
  /** Aktifkan hover neo-brutalist (geser + shadow mengecil). */
  interactive?: boolean;
  children?: ReactNode;
};

/** Card dasar soft neo-brutalism: border 2px ink, radius 8px, shadow brutal. */
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
        "rounded-card border-2 border-ink bg-white p-6 shadow-brutal",
        interactive &&
          "transition-[transform,box-shadow] duration-200 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-brutal-sm",
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
