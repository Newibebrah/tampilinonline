export type ProcessStep = {
  step: number;
  title: string;
  tagline: string;
  description: string;
  clientRole: string;
  ourRole: string;
  deliverable: string;
  optional?: boolean;
};

export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: "Konsultasi Awal",
    tagline: "Anda ceritakan, kami dengarkan.",
    description:
      "Anda menjelaskan bisnis, tujuan website, dan target pelanggan. Kami ajukan pertanyaan untuk memahami konteks — bukan langsung menawarkan paket.",
    clientRole: "Cerita tentang bisnis & tujuan.",
    ourRole: "Dengar, tanya, petakan kebutuhan.",
    deliverable: "Pemahaman bersama tentang lingkup & tujuan.",
  },
  {
    step: 2,
    title: "Rekomendasi & Penawaran",
    tagline: "Kami usulkan, Anda putuskan.",
    description:
      "Berdasarkan konsultasi, kami rekomendasikan paket dan fitur yang paling sesuai. Anda review, tanya apa saja, lalu setujui.",
    clientRole: "Review & setujui penawaran.",
    ourRole: "Susun rekomendasi & rincian biaya.",
    deliverable: "Kesepakatan lingkup kerja & biaya yang transparan.",
  },
  {
    step: 3,
    title: "Pengumpulan Materi",
    tagline: "Anda siapkan bahan, kami bantu tata.",
    description:
      "Anda kirim logo, foto, teks, dan informasi bisnis. Jika materi belum lengkap, kami bantu susun — atau tawarkan layanan copywriting jika dibutuhkan.",
    clientRole: "Kirim materi (logo, foto, teks, info bisnis).",
    ourRole: "Bantu susun & tata materi.",
    deliverable: "Materi lengkap siap produksi.",
  },
  {
    step: 4,
    title: "Desain & Pengembangan",
    tagline: "Kami bangun, Anda pantau.",
    description:
      "Kami merancang dan membangun website sesuai paket dan identitas brand Anda. Anda dapat preview link untuk melihat progres.",
    clientRole: "Pantau progres lewat preview link.",
    ourRole: "Desain & bangun website.",
    deliverable: "Website versi pertama siap direview.",
  },
  {
    step: 5,
    title: "Review & Revisi",
    tagline: "Anda beri masukan, kami perbaiki.",
    description:
      "Anda review hasilnya dan beri masukan pada bagian yang perlu disesuaikan. Kami revisi sesuai lingkup yang disepakati — maksimal 2 putaran revisi.",
    clientRole: "Review & beri masukan.",
    ourRole: "Revisi sesuai kesepakatan.",
    deliverable: "Website final yang disetujui.",
  },
  {
    step: 6,
    title: "Peluncuran",
    tagline: "Website live, siap diakses.",
    description:
      "Kami deploy ke hosting, setting domain, dan test semua tombol, halaman, serta tautan. Website Anda resmi bisa diakses publik.",
    clientRole: "Konfirmasi final.",
    ourRole: "Deploy, setting domain, test menyeluruh.",
    deliverable: "Website live dan berfungsi.",
  },
  {
    step: 7,
    title: "Serah Terima & Panduan",
    tagline: "Anda pegang kendali penuh.",
    description:
      "Kami serahkan akses, kredensial, dan panduan singkat penggunaan. Anda bisa kelola sendiri, atau lanjut ke layanan maintenance.",
    clientRole: "Terima akses & panduan.",
    ourRole: "Handover lengkap.",
    deliverable: "Anda punya kendali penuh atas website.",
  },
  {
    step: 8,
    title: "Dukungan",
    tagline: "Kalau butuh, kami siap.",
    description:
      "Update konten, perbaikan bug, atau pemantauan rutin — sesuai paket maintenance yang Anda pilih. Tidak wajib, tapi tersedia.",
    clientRole: "Pilih paket maintenance (jika perlu).",
    ourRole: "Update & pantau berkala.",
    deliverable: "Website tetap segar & aman.",
    optional: true,
  },
];

export const processContent = {
  heading: "Proses Kerja yang Jelas, Tanpa Kejutan",
  subheading:
    "Dari konsultasi sampai website live, Anda tahu persis apa yang terjadi di setiap tahap.",
  preparationTitle: "Yang Perlu Anda Siapkan",
  preparationItems: [
    "Logo (jika ada)",
    "Foto produk / usaha / tim",
    "Teks informasi bisnis (profil, layanan, kontak)",
    "Info domain & hosting (jika sudah punya)",
    "Referensi visual yang Anda suka (opsional)",
  ],
  preparationNote:
    "Belum punya semuanya? Tidak masalah — kami bantu susun.",
  exclusionsTitle: "Yang Tidak Termasuk (Kecuali Disepakati)",
  exclusionsItems: [
    "Domain & hosting (dihitung terpisah)",
    "Copywriting (tersedia sebagai add-on)",
    "Revisi di luar 2 putaran",
    "Fitur di luar lingkup paket",
  ],
  exclusionsNote:
    "Semua biaya tambahan selalu dikonfirmasi dulu sebelum dikerjakan.",
  principlesTitle: "Prinsip Kerja Kami",
  principles: [
    { label: "Transparan", value: "Tidak ada biaya tersembunyi" },
    { label: "Komunikatif", value: "Anda bisa tanya kapan saja" },
    { label: "Terukur", value: "Setiap tahap punya hasil yang jelas" },
    { label: "Tanpa Kejutan", value: "Lingkup disepakati sebelum mulai" },
  ],
  ctaTitle: "Siap mulai? Konsultasi gratis dulu.",
  ctaSubtitle:
    "Ceritakan bisnis Anda — kami bantu petakan kebutuhan websitenya.",
  ctaLabel: "Konsultasi via WhatsApp",
} as const;
