import type { Metadata } from "next";
import { PrivacyContent } from "@/components/pages/PrivacyContent";

// Metadata page-level: title absolut + description unik. Jangan set openGraph
// parsial (object metadata page menggantikan seluruh object layout).
export const metadata: Metadata = {
  title: { absolute: "Kebijakan Privasi Tampilin.online — Perlindungan Data" },
  description:
    "Data yang Anda kirim lewat formulir atau WhatsApp hanya dipakai untuk membalas, tidak dibagikan ke pihak ketiga, dan bisa diminta dihapus kapan saja.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
