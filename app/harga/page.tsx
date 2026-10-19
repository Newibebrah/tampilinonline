import type { Metadata } from "next";
import { PriceSimulator } from "@/components/sections/PriceSimulator";
import { PageHero } from "@/components/shared/PageHero";
import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

// Metadata page-level: title absolute (target 50–60 karakter total) +
// description unik 149–159. JANGAN set openGraph parsial di sini (object page
// menggantikan object layout — lihat docs/seo.md).
export const metadata: Metadata = {
  title: {
    absolute: "Simulasi Harga Website UMKM & Bisnis — Tampilin.online",
  },
  description:
    "Hitung estimasi biaya website sendiri: pilih paket, tambahan halaman & produk, copywriting, sampai maintenance — hasil realtime, gratis, tanpa daftar akun.",
  alternates: {
    canonical: "/harga",
  },
};

/**
 * Halaman /harga — Simulator PriceSimulator pindah dari homepage (revisi user).
 * Homepage kini hanya menampilkan banner CTA di bawah section Paket Layanan
 * yang mengarah ke sini. headingAs="h1" → judul simulator jadi H1 halaman.
 */
export default function HargaPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([{ name: "Simulasi Harga", path: "/harga" }])}
      />
      <main id="konten" className="bg-canvas">
        {/* Header halaman & simulator breakpoint — style sama persis dengan Blog
            (revisi user): teks center + ilustrasi jadi kesatuan kalimat pembuka. */}
        <section className="container relative isolate overflow-hidden pb-2 pt-14 md:pt-20">
          <PageHero
            id="simulasi-heading"
            eyebrow="Simulasi Harga"
            title="Coba hitung sendiri, realtime."
            description="Geser pilihan dan centang kebutuhan — estimasinya langsung muncul. Harga final ditetapkan setelah kebutuhan diperiksa saat konsultasi."
            artSrc="/asset_decor_context/asset_simulasi.png"
            artAlt="Ilustrasi gaya kartun: kalkulator estimasi biaya website Tampilin.online"
            stickers={[
              { text: "Realtime", tone: "red", rotate: 7, className: "hidden md:block -left-10 top-10" },
              { text: "Gratis", tone: "pink", rotate: -6, className: "hidden md:block -right-10 bottom-14", floatDelay: 1.1 },
            ]}
          />
        </section>
        <PriceSimulator headingAs="h1" showHeading={false} />
      </main>
    </>
  );
}
