import type { PortfolioItem } from "@/types";

/**
 * Placeholder portofolio v1 — semua berlabel "Demo Concept".
 * Gambar SVG di folder sesuai konvensi README 11.3 (nanti diganti screenshot nyata di V1.2).
 * Alt text mengikuti README Section 12 (deskriptif, ID, tanpa "Gambar...").
 */
export const portfolioItems: PortfolioItem[] = [
  {
    id: "umkm",
    title: "Website UMKM",
    category: "UMKM",
    label: "Demo Concept",
    image: "/images/portfolio/portfolio-umkm.svg",
    alt: "Contoh desain website UMKM dengan katalog produk dan tombol WhatsApp",
  },
  {
    id: "portfolio",
    title: "Website Preview Pribadi",
    category: "Personal",
    label: "Demo Concept",
    image: "/images/portfolio/portfolio-personal.svg",
    alt: "Contoh website preview pribadi dengan galeri proyek dan profil",
  },
  {
    id: "sales",
    title: "Sales Landing Page",
    category: "Sales",
    label: "Demo Concept",
    image: "/images/portfolio/portfolio-sales.svg",
    alt: "Contoh landing page sales dengan headline tegas dan tombol WhatsApp",
  },
  {
    id: "company",
    title: "Company Profile",
    category: "Perusahaan",
    label: "Demo Concept",
    image: "/images/portfolio/portfolio-company.svg",
    alt: "Contoh website company profile multi-halaman dengan navigasi konsisten",
  },
  {
    id: "catalog",
    title: "Katalog Online",
    category: "Toko",
    label: "Demo Concept",
    image: "/images/portfolio/portfolio-catalog.svg",
    alt: "Contoh website katalog online dengan grid produk dan tombol pesan WhatsApp",
  },
  {
    id: "ecommerce",
    title: "E-Commerce",
    category: "Toko Online",
    label: "Demo Concept",
    image: "/images/portfolio/portfolio-ecommerce.svg",
    alt: "Contoh website e-commerce dengan keranjang belanja dan alur checkout",
  },
];
