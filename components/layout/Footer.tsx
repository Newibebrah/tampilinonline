import { MessageCircle } from "lucide-react";
import { BRAND, NAV_LINKS } from "@/lib/constants";
import { buildWhatsAppUrl, FOOTER_WA_MESSAGE } from "@/lib/whatsapp";
import { Wordmark } from "@/components/brand/Wordmark";
import {
  WhatsAppIcon,
  TikTokIcon,
  InstagramIcon,
} from "@/components/brand/SocialIcons";

/**
 * Footer v2 — informatif & profesional: brand + deskripsi + 3 ikon medsos
 * (WhatsApp / TikTok / Instagram), navigasi section, page informatif
 * (Privacy Policy / Terms of Use / Site Map), dan kontak.
 * Ikon medsos = logo brand asli (simple-icons), bukan ikon generik.
 */

const SOCIALS = [
  {
    name: "Instagram",
    href: BRAND.instagramUrl,
    label: `Instagram @${BRAND.instagram}`,
    icon: InstagramIcon,
  },
  {
    name: "TikTok",
    href: BRAND.tiktokUrl,
    label: `TikTok @${BRAND.tiktok}`,
    icon: TikTokIcon,
  },
  {
    name: "WhatsApp",
    href: `https://wa.me/${BRAND.whatsapp}`,
    label: "WhatsApp Tampilin.online",
    icon: WhatsAppIcon,
  },
];

const INFO_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Site Map", href: "/sitemap" },
];

const linkCls =
  "text-canvas/80 underline-offset-4 transition-colors hover:text-yellow hover:underline";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t-[3px] border-ink bg-ink text-canvas">
      <div className="container grid gap-10 py-14 md:grid-cols-2 md:gap-8 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr]">
        {/* Brand + tagline + medsos */}
        <div className="flex flex-col items-start gap-4">
          <Wordmark className="text-3xl" />
          <p className="max-w-xs font-display text-sm font-bold uppercase tracking-wide text-yellow">
            {BRAND.tagline}
          </p>
          <p className="max-w-xs text-sm leading-relaxed text-canvas/70">
            Jasa pembuatan website untuk semua skala usaha — dari landing page
            mulai Rp499.000 sampai e-commerce.
          </p>

          {/* Medsos: WhatsApp / TikTok / Instagram dengan logo brand */}
          <ul aria-label="Media sosial kami" className="mt-1 flex gap-3">
            {SOCIALS.map((social) => (
              <li key={social.name}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-11 w-11 items-center justify-center rounded-card border-2 border-ink bg-canvas text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-yellow hover:bg-yellow hover:text-ink"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Navigasi section */}
        <nav aria-label="Navigasi footer">
          <h2 className="font-display text-base font-bold uppercase tracking-wide text-yellow">
            Jelajahi
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <a href="/" className={linkCls}>
                Beranda
              </a>
            </li>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={`/${link.href}`} className={linkCls}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Page informatif */}
        <nav aria-label="Informasi situs">
          <h2 className="font-display text-base font-bold uppercase tracking-wide text-yellow">
            Informasi
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {INFO_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={linkCls}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Kontak */}
        <div>
          <h2 className="font-display text-base font-bold uppercase tracking-wide text-yellow">
            Hubungi kami
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href={buildWhatsAppUrl(FOOTER_WA_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className={`${linkCls} flex items-start gap-2`}
              >
                <MessageCircle
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0"
                />
                <span>
                  WhatsApp
                  <span className="block text-canvas/60">
                    {BRAND.whatsappNumberLabel}
                  </span>
                </span>
              </a>
            </li>
            <li>
              <a
                href={BRAND.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${linkCls} flex items-start gap-2`}
              >
                <InstagramIcon className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  Instagram
                  <span className="block text-canvas/60">
                    @{BRAND.instagram}
                  </span>
                </span>
              </a>
            </li>
            <li>
              <a
                href={BRAND.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${linkCls} flex items-start gap-2`}
              >
                <TikTokIcon className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  TikTok
                  <span className="block text-canvas/60">@{BRAND.tiktok}</span>
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bar bawah: copyright + legal inline */}
      <div className="border-t-2 border-canvas">
        <div className="container flex flex-col gap-3 py-6 text-sm text-canvas/60 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {BRAND.name}. Hak cipta dilindungi.
          </p>
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {INFO_LINKS.map((link, index) => (
              <li key={link.href} className="flex items-center gap-x-4">
                <a
                  href={link.href}
                  className="transition-colors hover:text-yellow"
                >
                  {link.label}
                </a>
                {index < INFO_LINKS.length - 1 ? (
                  <span aria-hidden="true" className="text-canvas/30">
                    |
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
          <p className="italic">All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
