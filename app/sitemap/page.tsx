import type { Metadata } from "next";
import { SiteMapContent } from "@/components/pages/SiteMapContent";

// Metadata page-level: title + canonical SAJA (lihat docs/seo.md — pitfall
// replace-whole-object antara metadata layout & page).
export const metadata: Metadata = {
  title: "Site Map",
  alternates: {
    canonical: "/sitemap",
  },
};

export default function SitemapPage() {
  return <SiteMapContent />;
}
