import type { Metadata } from "next";
import { PriceSimulator } from "@/components/sections/PriceSimulator";
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
      <main id="konten">
        <PriceSimulator headingAs="h1" />
      </main>
    </>
  );
}
