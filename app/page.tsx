import { JsonLd } from "@/components/shared/JsonLd";
import { Hero } from "@/components/sections/Hero";
import { ProblemScrolly } from "@/components/sections/ProblemScrolly";
import { Solution } from "@/components/sections/Solution";
import { PackagesBento } from "@/components/sections/PackagesBento";
import { Process } from "@/components/sections/Process";
import { Portfolio } from "@/components/sections/Portfolio";
import { Testimonials } from "@/components/sections/Testimonials";
import { PriceSimulator } from "@/components/sections/PriceSimulator";
import { FAQ } from "@/components/sections/FAQ";
import { LeadForm } from "@/components/sections/LeadForm";
import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { FinalCTA } from "@/components/sections/FinalCTA";
import {
  organizationSchema,
  websiteSchema,
  serviceSchema,
  faqSchema,
} from "@/lib/schema";
import { faqItems } from "@/data/faq";
import { MarqueeDivider } from "@/components/decorative/MarqueeDivider";

/** Metadata page-level homepage — override title & canonical saja.
 * PERHATIAN: field object (mis. openGraph) di level page MENGGANTIKAN seluruh
 * object level layout, jadi jangan set key parsial di sini jika ingin isian
 * layout tetap dipakai. */
export const metadata = {
  title: "Jasa Pembuatan Website UMKM & Bisnis — Tampilin.online",
  alternates: {
    canonical: "/",
  },
};

/**
 * Homepage one-page. HANYA compose — tanpa logic (aturan README 4.1).
 * Urutan = alur narasi: Hero → Masalah → Solusi → Paket → Proses →
 * Portofolio → Testimoni → Simulasi → Tentang → FAQ → Formulir → CTA Final.
 */
export default function HomePage() {
  return (
    <>
      {/* JSON-LD sebagai <script> native — data terstruktur untuk Google, BUKAN di metadata. */}
      <JsonLd data={organizationSchema} />
      <JsonLd data={websiteSchema} />
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema(faqItems)} />

      <main id="konten" className="relative">
        {/* Pita marquee pemisah section — ADDITIVE ONLY, layout section utuh. */}
        <Hero />
        <ProblemScrolly />
        <Solution />
        <MarqueeDivider />
        <PackagesBento />
        <Process />
        <MarqueeDivider />
        <Portfolio />
        <Testimonials />
        <PriceSimulator />
        <AboutTeaser />
        <FAQ />
        <LeadForm />
        <MarqueeDivider />
        <FinalCTA />
      </main>
    </>
  );
}
