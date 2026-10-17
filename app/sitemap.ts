import type { MetadataRoute } from "next";
import { generateSitemapEntries } from "@/lib/seo";

/**
 * Sitemap — daftar halaman dikonfigurasi di generateSitemapEntries()
 * supaya penambahan halaman baru (v1.3 multi-page) hanya edit satu tempat.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return generateSitemapEntries();
}
