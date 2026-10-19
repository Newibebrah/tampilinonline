import type { Testimonial } from "@/types";

/**
 * Testimoni v1 — SEMUA berlabel demo (demo: true).
 * ATURAN JUJUR (README 6.5): belum ada klien, jadi TIDAK memakai nama,
 * foto, atau merek fiktif. Isi kutipan menggambarkan PROFIL calon pengguna
 * paket, bukan cerita klien. Ganti dengan testimoni nyata setelah klien
 * pertama menyetujui publikasi, lalu set demo: false.
 */
export const testimonials: Testimonial[] = [
  {
    id: "demo-umkm",
    quote:
      "Profil pengguna demo — pemilik usaha makanan yang ingin katalog produk dan harga selalu rapi di satu link, tanpa harus mengulang penjelasan di setiap chat.",
    authorRole: "Pemilik UMKM makanan",
    demo: true,
  },
  {
    id: "demo-sales",
    quote:
      "Profil pengguna demo — sales yang butuh satu halaman tegas berisi penawaran, bukti keahlian, dan tombol WhatsApp besar yang mudah dibagikan ke calon pembeli.",
    authorRole: "Sales korporat",
    demo: true,
  },
  {
    id: "demo-freelancer",
    quote:
      "Profil pengguna demo — freelancer yang ingin website preview pribadi sederhana supaya klien potensial bisa melihat hasil kerja dan cara menghubungi dalam satu halaman.",
    authorRole: "Desainer lepas",
    demo: true,
  },
];
