import type { Metadata } from "next";
import { PrivacyContent } from "@/components/pages/PrivacyContent";

// Metadata page-level: title + canonical SAJA — jangan set openGraph parsial
// (object metadata page menggantikan seluruh object layout, pitfall tertulis di docs/seo.md).
export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
