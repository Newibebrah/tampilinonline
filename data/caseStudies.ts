import type { CaseStudy } from "@/types";

/**
 * Studi kasus untuk /portofolio/[slug].
 * ATURAN JUJUR (README): belum ada klien nyata → HASIL adalah TARGET
 * berlabel demo=true. Jangan pernah menulis angka seolah-olah sudah
 * tercapai. Ganti jadi data nyata setelah klien pertama menyetujui
 * publikasi (demo: false).
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "katalog-online",
    title: "Website Katalog Online — Konsep untuk UMKM Makanan",
    category: "UMKM / Toko",
    metaTitle: "Studi Kasus: Website Katalog Online untuk UMKM (Demo)",
    metaDescription:
      "Studi kasus konsep website katalog online untuk UMKM makanan: masalah katalog tersebar di chat, solusi halaman produk dengan tombol pesan WhatsApp, dan target hasil yang diukur setelah launch.",
    summary:
      "Konsep desain yang menggambarkan cara kerja kami untuk kebutuhan UMKM makanan: dari masalah operasional sehari-hari sampai tampilan halaman produk yang memudahkan pelanggan memesan.",
    image: "/images/portfolio/portfolio-catalog.svg",
    imageAlt:
      "Contoh desain katalog online dengan grid produk dan tombol pesan WhatsApp",
    datePublished: "2026-10-12",
    problem: [
      "Katalog produk tersebar di banyak unggahan media sosial, dan calon pembeli harus menggulir balik hanya untuk mencari harga yang sering berubah.",
      "Pertanyaan berapa harganya dijawab manual satu per satu di chat, memakan waktu pemilik usaha setiap hari.",
      "Tidak ada satu tempat resmi untuk ditampilkan di WhatsApp Business atau bio Instagram; sebagian link yang beredar sudah usang tidak pernah diperbarui.",
    ],
    solution: [
      "Satu halaman katalog sebagai sumber resmi: setiap produk punya foto, deskripsi singkat, harga terkini, dan tombol pesan langsung ke WhatsApp dengan pesan produk terisi otomatis.",
      "Struktur konten mengikuti cara menjual pemilik usaha: kategori sederhana, produk terlaris di depan, info jam buka dan area pengiriman di tempat yang mudah ditemukan.",
      "Halaman responsif penuh dan dites pada layar ponsel kecil, karena mayoritas pengunjung datang dari tautan chat dan media sosial.",
    ],
    results: [
      {
        label: "Lama pengerjaan",
        value: "Rencana 1–2 minggu sesuai lingkup katalog",
        demo: true,
      },
      {
        label: "Pertanyaan harga yang terjawab tanpa chat manual",
        value: "Target: mayoritas pertanyaan dijawab langsung oleh website",
        demo: true,
      },
      {
        label: "Pesanan via tombol WhatsApp terstruktur",
        value: "Target: mengurangi chat yang bolak-balik mencari info",
        demo: true,
      },
    ],
  },
];

/** Ambil satu studi kasus; undefined jika slug tidak ada (page panggil notFound). */
export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}
