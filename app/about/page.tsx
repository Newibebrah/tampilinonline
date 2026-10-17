import type { Metadata } from "next";
import { AboutGame } from "@/components/about/AboutGame";

// Metadata page-level: title + canonical SAJA — jangan menempuh openGraph
// parsial (object page menggantikan object layout; lihat docs/seo.md).
export const metadata: Metadata = {
  title: "Kenalan Sama Ananta",
  alternates: {
    canonical: "/about",
  },
};

/**
 * Halaman /about — visual novel interaktif. HANYA compose; seluruh logic
 * game ada di components/about/AboutGame.tsx.
 */
export default function AboutPage() {
  return (
    <main id="konten" className="bg-cream">
      <AboutGame />
    </main>
  );
}
