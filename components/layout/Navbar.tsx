"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, MessageCircle } from "lucide-react";
import { NAV_LINKS, NAV_PAGE_LINKS } from "@/lib/constants";
import { buildWhatsAppUrl, DEFAULT_WA_MESSAGE } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { Wordmark } from "@/components/brand/Wordmark";
import { MobileMenu } from "@/components/layout/MobileMenu";

/**
 * Navbar sticky: transparan di atas → solid canvas + border saat scroll > 50px.
 * Mobile (<md) memakai drawer; active link dari useScrollSpy.
 */
export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Anchor "#…" hanya valid dari homepage — dari halaman lain harus "/#…".
  const pathname = usePathname();
  const isHome = pathname === "/";
  const resolveHref = (href: string) =>
    href.startsWith("#") && !isHome ? `/${href}` : href;
  const activeId = useScrollSpy(
    // ScrollSpy hanya untuk anchor section (skip "/blog" dsb.)
    NAV_LINKS.map((link) => link.href.replace("#", "")).filter(
      (id) => !id.includes("/"),
    ),
  );

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-colors duration-200",
        isScrolled
          ? "border-b-2 border-ink bg-canvas"
          : "border-b-2 border-transparent bg-transparent",
      )}
    >
      <nav
        aria-label="Navigasi utama"
        className="container flex h-16 items-center justify-between gap-4 md:h-20"
      >
        <a
          href={isHome ? "#" : "/"}
          aria-label="Tampilin.online — kembali ke atas"
          className="rounded-sm"
        >
          <Wordmark className="text-2xl md:text-3xl" />
        </a>

        {/* Nav desktop */}
        <ul className="hidden items-center gap-1 md:flex">
          {/* Anchor section (homepage) + page link (Blog).
              Di /about: page link disembunyikan (fokus pengalaman game). */}
          {(pathname === "/about"
            ? NAV_LINKS
            : [...NAV_LINKS, ...NAV_PAGE_LINKS]
          ).map((link) => {
            const isActive = activeId === link.href.replace("#", "");
            return (
              <li key={link.href}>
                <a
                  href={resolveHref(link.href)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "rounded-pill border-2 border-transparent px-3 py-2 font-display text-sm font-bold transition-colors hover:bg-yellow",
                    isActive && "border-2 border-ink bg-yellow shadow-brutal-sm",
                  )}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          {/* CTA desktop */}
          <a
            href={buildWhatsAppUrl(DEFAULT_WA_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center rounded-card border-[3px] border-ink bg-red px-4 py-2 font-display text-sm font-bold shadow-brutal-sm transition-transform hover:translate-x-[2px] hover:translate-y-[2px] md:inline-flex"
          >
            <MessageCircle aria-hidden="true" className="mr-2 inline h-4 w-4" />
            Konsultasi
          </a>

          {/* Hamburger mobile */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Buka menu navigasi"
            aria-expanded={isMobileMenuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-card border-2 border-ink bg-canvas shadow-brutal-sm md:hidden"
          >
            <Menu aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>
      </nav>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
}
