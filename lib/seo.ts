/**
 * Centralized SEO config — satu sumber kebenaran untuk semua sinyal SEO.
 * Semua URL harus absolut (https://www.tampilin.online) untuk schema & canonical.
 * Catatan: situs diserve di www (apex redirect 308 → www, urutan Vercel).
 */
import { blogPosts } from "@/data/blogPosts";
import { caseStudies } from "@/data/caseStudies";

const BASE_URL = "https://www.tampilin.online";

export const SITE = {
  name: "Tampilin.online",
  url: BASE_URL,
  // Homepage title — 54 karakter (target 50–60, lihat scripts/check-meta.mjs).
  title: "Jasa Pembuatan Website UMKM & Bisnis — Tampilin.online",
  description:
    "Semua usaha harus punya website. Landing page Rp499.000 sampai company profile & e-commerce — untuk UMKM, sales, freelancer, dan pemilik bisnis online.",
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
  "jasa pembuatan website umkm",
  "jasa pembuatan website untuk sales",
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
 * fragment sebagai halaman terpisah. lastModified pakai ISO 8601 (Date object
 * → Next serialisasi otomatis ke ISO).
 */
export function generateSitemapEntries(): Array<{
  url: string;
  lastModified: Date;
  changeFrequency: "weekly" | "monthly" | "yearly";
  priority: number;
}> {
  const now = new Date();

  return [
    {
      url: SITE.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    // Halaman informatif (link di footer)
    {
      url: siteUrl("/privacy"),
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: siteUrl("/terms"),
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: siteUrl("/sitemap"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.2,
    },
    {
      url: siteUrl("/about"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // Simulator harga (pindah dari anchor homepage — revisi user)
    {
      url: siteUrl("/harga"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    // Blog (OE index + artikel) — lastModified dari tanggal artikel sendiri.
    {
      url: siteUrl("/blog"),
      lastModified: new Date(
        Math.max(
          ...blogPosts.map((post) => new Date(post.dateModified).getTime()),
        ),
      ),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...blogPosts.map((post) => ({
      url: siteUrl(`/blog/${post.slug}`),
      lastModified: new Date(post.dateModified),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    // Studi kasus (/portofolio/[slug])
    ...caseStudies.map((study) => ({
      url: siteUrl(`/portofolio/${study.slug}`),
      lastModified: new Date(study.datePublished),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
