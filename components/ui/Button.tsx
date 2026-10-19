import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

type BaseProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };

type ButtonLinkProps = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type StyleProps = BaseProps & { href?: string };

/**
 * Tombol Soft Pastel Neo-Brutalism v2.1:
 * - primary: bg RED, border 2px, shadow brutal — merah = warna aksi v3.0
 * - secondary: bg INK (pasangan 50/50 coklat-merah), hover flip ke merah
 * - ghost: polos — untuk nav / link sekunder
 * Interaksi: hover terangkat (translate-y kecil + shadow membesar ke brutal-lg);
 * active menempel. Semua variant punya focus-visible ring ink (FASE 6 audit #6).
 */
function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-card font-display font-bold",
    "transition-[transform,box-shadow,background-color] duration-150 ease-out cursor-pointer",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
    // shadow brutal + hover "angkat" (v2.1) — active menempel
    variant === "primary" &&
      "border-2 border-ink bg-red text-ink shadow-brutal hover:-translate-y-0.5 hover:shadow-brutal-lg active:translate-y-0 active:shadow-brutal-sm",
    variant === "secondary" &&
      "border-2 border-ink bg-ink text-canvas shadow-brutal-sm hover:-translate-y-0.5 hover:bg-red hover:text-ink hover:shadow-brutal active:translate-y-0 active:shadow-brutal-sm",
    variant === "ghost" &&
      "border-2 border-transparent bg-transparent text-ink hover:bg-lavender active:bg-lavender",
    size === "sm" && "px-4 py-2 text-sm",
    size === "md" && "px-6 py-3 text-base",
    size === "lg" && "px-8 py-4 text-lg",
    className,
  );
}

function renderInner(children: ReactNode) {
  return children;
}

function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={buttonClasses(variant, size, className)}
      {...rest}
    >
      {renderInner(children)}
    </button>
  );
}

function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  ...rest
}: ButtonLinkProps) {
  return (
    <a href={href} className={buttonClasses(variant, size, className)} {...rest}>
      {renderInner(children)}
    </a>
  );
}

export { Button, ButtonLink, buttonClasses };
export type { StyleProps };
