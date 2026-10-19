import { MessageCircle } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Magnetic } from "@/components/decorative/Magnetic";
import { DEFAULT_WA_MESSAGE } from "@/lib/whatsapp";

/**
 * CTA WhatsApp standar: <a target="_blank" rel="noopener noreferrer">
 * (aturan README 14.3 — arti pesan hanya "terkirim" setelah user kirim sendiri).
 * Dibungkus Magnetic (prompt visionary 2.3) — tarikan elastis ke kursor,
 * desktop fine-pointer only; di mobile wrapper ini netral (inline-block).
 */
export function WhatsAppButton({
  message = DEFAULT_WA_MESSAGE,
  children = "Konsultasi via WhatsApp",
  variant = "primary",
  size = "md",
  className,
}: {
  message?: string;
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  return (
    <Magnetic>
      <ButtonLink
        variant={variant}
        size={size}
        className={className}
        href={`https://wa.me/6287716058371?text=${encodeURIComponent(message)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <MessageCircle aria-hidden="true" className="h-5 w-5" />
        {children}
      </ButtonLink>
    </Magnetic>
  );
}
