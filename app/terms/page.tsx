import type { Metadata } from "next";
import { TermsContent } from "@/components/pages/TermsContent";

// Metadata page-level: title absolut + description unik (lihat docs/seo.md —
// pitfall replace-whole-object antara metadata layout & page).
export const metadata: Metadata = {
  title: { absolute: "Syarat & Ketentuan Layanan Website — Tampilin.online" },
  description:
    "Ketentuan layanan website: lingkup kerja per paket, revisi maksimal 2 putaran, DP 50%, konten tetap milik klien, dan batasan tanggung jawab pengerjaan.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return <TermsContent />;
}
