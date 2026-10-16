/** Informasi brand Tampilin.online — satu sumber kebenaran untuk kontak. */
export const BRAND = {
  name: "Tampilin.online",
  tagline: "Semua usaha harus punya website.",
  description:
    "Jasa pembuatan website untuk UMKM, fresh graduate, freelancer, sales, perusahaan, dan bisnis online. Mulai Rp499.000.",
  whatsapp: "6287716058371",
  whatsappNumberLabel: "+62 877-1605-8371",
  whatsappUrl: "https://wa.me/6287716058371",
  instagram: "anandcaprio",
  instagramUrl: "https://instagram.com/anandcaprio",
} as const;

/** Anchor navigation — urutan sama dengan urutan section di homepage. */
export const NAV_LINKS = [
  { label: "Masalah", href: "#masalah" },
  { label: "Solusi", href: "#solusi" },
  { label: "Paket", href: "#paket" },
  { label: "Portofolio", href: "#portofolio" },
  { label: "Simulasi", href: "#simulasi" },
  { label: "FAQ", href: "#faq" },
] as const;
