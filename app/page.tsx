import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { Hero } from "@/components/sections/Hero";
import { ProblemScrolly } from "@/components/sections/ProblemScrolly";
import { Solution } from "@/components/sections/Solution";
import { PackagesBento } from "@/components/sections/PackagesBento";
import { Process } from "@/components/sections/Process";
import { Portfolio } from "@/components/sections/Portfolio";
import { PriceSimulator } from "@/components/sections/PriceSimulator";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import {
  organizationSchema,
  websiteSchema,
  serviceSchema,
  faqSchema,
} from "@/lib/schema";
import { faqItems } from "@/data/faq";

/** Metadata page-level homepage — override title & canonical saja.
 * PERHATIAN: field object (mis. openGraph) di level page MENGGANTIKAN seluruh
 * object level layout, jeda jangan set key parsial di sini jika ingin isian
 * layout tetap dipakai. */
export const metadata = {
  title: "Tampilin.online — Semua Usaha Harus Punya Website",
  alternates: {
    canonical: "/",
  },
};

/**
 * Homepage one-page. HANYA compose — tanpa logic (aturan README 4.1).
 * Urutan = alur narasi: Hero → Masalah → Solusi → Paket → Proses →
 * Portofolio → Simulasi Harga → FAQ → CTA Final.
 */
export default function HomePage() {
  return (
    <>
      {/* JSON-LD sebagai <script> native — data terstructural untuk Google, BUKAN di metadata. */}
      <JsonLd data={organizationSchema} />
      <JsonLd data={websiteSchema} />
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema(faqItems)} />

      <Navbar />
      <main id="konten">
        <Hero />
        <ProblemScrolly />
        <Solution />
        <PackagesBento />
        <Process />
        <Portfolio />
        <PriceSimulator />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
