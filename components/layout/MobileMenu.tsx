"use client";

import { useEffect, useRef } from "react";
import { X, MessageCircle } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { buildWhatsAppUrl, DEFAULT_WA_MESSAGE } from "@/lib/whatsapp";

/**
 * Drawer menu mobile (<768px). Esc & backdrop menutup, fokus tetap aman.
 * Render selalu; visibility via prop isOpen (transition handle animasi via CSS).
 */
export function MobileMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Esc menutup drawer (a11y README 15.1) + kunci scroll body.
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    // Fokus masuk ke item pertama agar navigasi Tab menempel di drawer.
    firstLinkRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 md:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Menu navigasi"
    >
      {/* backdrop */}
      <button
        type="button"
        aria-label="Tutup menu"
        onClick={onClose}
        className="absolute inset-0 w-full bg-ink/50"
      />

      <div className="absolute right-0 top-0 flex h-full w-72 max-w-[85vw] flex-col border-l-2 border-ink bg-cream pb-6 pt-6">
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup menu navigasi"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-card border-2 border-ink bg-cream shadow-brutal-sm"
        >
          <X aria-hidden="true" className="h-5 w-5" />
        </button>

        <ul className="mt-8 flex flex-col gap-1 px-4">
          {NAV_LINKS.map((link, index) => (
            <li key={link.href}>
              <a
                ref={index === 0 ? firstLinkRef : undefined}
                href={link.href}
                onClick={onClose}
                className="block rounded-card border-2 border-transparent px-4 py-3 font-display text-lg font-bold hover:border-ink hover:bg-yellow"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={buildWhatsAppUrl(DEFAULT_WA_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
          className="mx-4 mt-auto inline-flex items-center justify-center gap-2 rounded-card border-[3px] border-ink bg-yellow px-6 py-3 font-display font-bold shadow-brutal"
        >
          <MessageCircle aria-hidden="true" className="h-5 w-5" />
          Konsultasi via WhatsApp
        </a>
      </div>
    </div>
  );
}
