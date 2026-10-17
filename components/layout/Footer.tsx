import { Instagram, MessageCircle } from "lucide-react";
import { BRAND, NAV_LINKS } from "@/lib/constants";
import { buildWhatsAppUrl, FOOTER_WA_MESSAGE } from "@/lib/whatsapp";
import { Wordmark } from "@/components/brand/Wordmark";

/** Footer: wordmark, tagline, nav, kontak, copyright. */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t-[3px] border-ink bg-ink text-cream">
      <div className="container grid gap-10 py-12 md:grid-cols-3 md:gap-8">
        <div>
          <Wordmark className="text-3xl" />
          <p className="mt-3 max-w-xs text-cream/70">{BRAND.tagline}</p>
        </div>

        <nav aria-label="Navigasi footer">
          <h2 className="font-display font-bold text-yellow">Jelajahi</h2>
          <ul className="mt-3 space-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-cream/80 underline-offset-4 hover:text-yellow hover:underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-display font-bold text-yellow">Hubungi kami</h2>
          <ul className="mt-3 space-y-3">
            <li>
              <a
                href={buildWhatsAppUrl(FOOTER_WA_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-cream/80 underline-offset-4 hover:text-yellow hover:underline"
              >
                <MessageCircle aria-hidden="true" className="h-4 w-4 shrink-0" />
                WhatsApp {BRAND.whatsappNumberLabel}
              </a>
            </li>
            <li>
              <a
                href={BRAND.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-cream/80 underline-offset-4 hover:text-yellow hover:underline"
              >
                <Instagram aria-hidden="true" className="h-4 w-4 shrink-0" />
                @{BRAND.instagram}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/20">
        <div className="container flex flex-col gap-2 py-6 text-sm text-cream/60 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {BRAND.name}. Hak cipta dilindungi.
          </p>
          <p className="italic">All rights to wordmark reserved by Tampilin.online.</p>
        </div>
      </div>
    </footer>
  );
}
