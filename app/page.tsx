import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { ProblemScrolly } from "@/components/sections/ProblemScrolly";
import { Solution } from "@/components/sections/Solution";
import { PackagesBento } from "@/components/sections/PackagesBento";
import { Process } from "@/components/sections/Process";
import { Portfolio } from "@/components/sections/Portfolio";
import { PriceSimulator } from "@/components/sections/PriceSimulator";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";

/**
 * Homepage one-page. HANYA compose — tanpa logic (aturan README 4.1).
 * Urutan = alur narasi: Hero → Masalah → Solusi → Paket → Proses →
 * Portofolio → Simulasi Harga → FAQ → CTA Final.
 */
export default function HomePage() {
  return (
    <>
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
