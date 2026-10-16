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
 * Tombol soft neo-brutalism:
 * - primary: bg yellow, border 3px, shadow brutal
 * - secondary: bg cream, border 2px, shadow brutal
 * - ghost: polos — untuk nav / link sekunder
 * Interaksi: hover turun-kanan + shadow mengecil; active menempel penuh.
 * Jika diberi `href`, dirender sebagai <a> (pengganti asChild tanpa lib Radix).
 */
function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-card font-display font-bold",
    "transition-[transform,box-shadow,background-color] duration-150 ease-out cursor-pointer",
    // shadow brutal + hover "tekan"
    variant === "primary" &&
      "border-[3px] border-ink bg-yellow text-ink shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-brutal-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none",
    variant === "secondary" &&
      "border-2 border-ink bg-cream text-ink shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-brutal-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none",
    variant === "ghost" &&
      "border-2 border-transparent bg-transparent text-ink hover:bg-ink/5 active:bg-ink/10",
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
