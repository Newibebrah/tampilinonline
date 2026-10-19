import type { Metadata } from "next";
import { SiteMapContent } from "@/components/pages/SiteMapContent";

// Metadata page-level: title + canonical SAJA (lihat docs/seo.md — pitfall
// replace-whole-object antara metadata layout & page).
export const metadata: Metadata = {
  title: { absolute: "Daftar Isi Situs Tampilin.online — Semua Halaman Penting" },
  description:
    "Peta halaman Tampilin.online: beranda, tentang Ananta, blog, studi kasus katalog online, kebijakan privasi, syarat & ketentuan, serta daftar isi lengkap situs.",
  alternates: {
    canonical: "/sitemap",
  },
};

export default function SitemapPage() {
  return <SiteMapContent />;
}
