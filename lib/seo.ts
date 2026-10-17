/**
 * Centralized SEO config — satu sumber kebenaran untuk semua sinyal SEO.
 * Semua URL harus absolut (https://www.tampilin.online) untuk schema & canonical.
 * Catatan: situs diserve di www (apex redirect 308 → www, urutan Vercel).
 */

const BASE_URL = "https://www.tampilin.online";

export const SITE = {
  name: "Tampilin.online",
  url: BASE_URL,
  title:
    "Tampilin.online — Jasa Pembuatan Website untuk UMKM, Profesional, dan Bisnis",
  description:
    "Semua usaha harus punya website. Mulai dari landing page Rp499.000, portofolio, UMKM, company profile, hingga e-commerce. Konsultasi gratis via WhatsApp.",
  shortDescription: "Semua usaha harus punya website.",
  locale: "id_ID",
  ogImage: "/images/og/og-image.png",
  twitterHandle: "@anandcaprio",
  instagram: "https://instagram.com/anandcaprio",
  whatsapp: "https://wa.me/6287716058371",
  // @id node schema.org (absolut) — dirujuk antar-schema supaya satu graph.
  brandId: `${BASE_URL}/#organization`,
  websiteId: `${BASE_URL}/#website`,
} as const;

/** Kata kunci utama — meta keywords (Google abaikan, tapi tetap disiapkan). */
export const DEFAULT_KEYWORDS = [
  "jasa pembuatan website",
  "website UMKM",
  "landing page murah",
  "website company profile",
  "jasa website Indonesia",
  "tampilin online",
] as const;

/**
 * URL absolut lengkap — helper untuk path relatif.
 * siteUrl("/brand/logo-horizontal.svg") → "https://www.tampilin.online/brand/logo-horizontal.svg"
 */
export function siteUrl(path: string): string {
  return new URL(path, SITE.url).toString();
}

/**
 * Daftar asset brand untuk metadata icons — dipisah supaya mudah ditukar
 * saat logo final tersedia.
 */
export const BRAND_ICONS = {
  favicon: "/brand/favicon.ico",
  appleTouchIcon: "/brand/apple-touch-icon.png",
  logoHorizontal: "/brand/logo-horizontal.svg",
} as const;

/**
 * Helper sitemap — tambahkan halaman baru HANYA di sini.
 * Anchor (#paket, #faq) sengaja TIDAK dimasukkan: Google tidak mengindeks
 * fragment sebagai halaman terpisah.
 */
export function generateSitemapEntries(): Array<{
  url: string;
  lastModified: Date;
  changeFrequency: "weekly" | "monthly" | "yearly";
  priority: number;
}> {
  const now = new Date();

  return [
    // Halaman nantinya ditambahkan di sini, contoh:
    // { url: siteUrl("/tentang"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    {
      url: SITE.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
