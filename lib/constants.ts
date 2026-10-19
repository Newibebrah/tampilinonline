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
  // TODO: konfirmasi handle TikTok asli ke user — placeholder untuk sekarang.
  tiktok: "tampilinonline",
  tiktokUrl: "https://www.tiktok.com/@tampilinonline",
} as const;

/**
 * Anchor navigation — urutan sama dengan urutan section di homepage.
 * Catatan v3:
 * - "Problem Solver" menggabungkan dua section lama (Masalah + Solusi) —
 *   link menuju #masalah (awal gabungan section).
 * - FAQ dihapus dari nav (section tetap ada di halaman).
 * - Simulasi harga pindah ke halaman /harga — nav menampilkan "Harga"
 *   sebagai page link (lihat NAV_PAGE_LINKS).
 * - Blog juga page link.
 */
export const NAV_LINKS = [
  { label: "Problem Solver", href: "#masalah" },
  { label: "Paket Layanan", href: "#paket" },
  { label: "Proses", href: "#proses" },
  { label: "Preview", href: "#portofolio" },
  // Tentang → teaser "Kenalan Sama Ananta" (section di atas FAQ — runtut
  // dengan urutan konten homepage). Dari teaser, tombol menuju /about.
  { label: "Tentang", href: "#tentang" },
] as const;

/** Link page penuh (bukan anchor) — tampil di nav + hamburger menu. */
export const NAV_PAGE_LINKS = [
  { label: "Harga", href: "/harga" },
  { label: "Blog", href: "/blog" },
] as const;

/**
 * Resolusi href nav sesuai halaman aktif.
 * - Anchor "#…" hanya valid di homepage → dari halaman lain jadi "/#…".
 * - Di /about, link "Tentang" (yang menuju teaser di homepage) diarahkan ke
 *   /about itu sendiri — user sudah ada di halaman profil, tidak perlu
 *   dilompat ke section teaser.
 */
export function resolveNavHref(href: string, pathname: string): string {
  if (pathname === "/about" && href === "#tentang") return "/about";
  if (href.startsWith("#") && pathname !== "/") return `/${href}`;
  return href;
}
