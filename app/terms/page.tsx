import type { Metadata } from "next";
import { TermsContent } from "@/components/pages/TermsContent";

// Metadata page-level: title + canonical SAJA (lihat docs/seo.md — pitfall
// replace-whole-object antara metadata layout & page).
export const metadata: Metadata = {
  title: "Terms of Use",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return <TermsContent />;
}
