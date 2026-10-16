# 📘 README.md — TAMPILIN.ONLINE COMPLETE DEVELOPMENT GUIDE

> **Satu file, satu sumber kebenaran.**
> Berisi: Project overview, design system, tech stack, struktur, phase development, komponen, data, animasi, scrollytelling, bento grid, image spec, AI prompts, price calculator, WhatsApp integration, a11y, testing, deployment, dan prompt Phase 1.
>
> **Cara pakai:** Simpan seluruh isi file ini sebagai `README.md` di root project. Lalu prompt AI coding assistant: *"Baca README.md. Mulai Phase 1."*

---

## 📌 Daftar Isi

1. [Project Overview](#1-project-overview)
2. [Design System](#2-design-system)
3. [Tech Stack & Setup](#3-tech-stack--setup)
4. [Project Structure](#4-project-structure)
5. [Development Phases](#5-development-phases)
6. [Component Breakdown](#6-component-breakdown)
7. [Data Structures](#7-data-structures)
8. [Animation Guidelines](#8-animation-guidelines)
9. [Scrollytelling Spec](#9-scrollytelling-spec)
10. [Bento Grid Spec](#10-bento-grid-spec)
11. [Image Asset Spec](#11-image-asset-spec)
12. [AI Image Generation Prompts](#12-ai-image-generation-prompts)
13. [Price Calculator Logic](#13-price-calculator-logic)
14. [WhatsApp Integration](#14-whatsapp-integration)
15. [Accessibility & Performance](#15-accessibility--performance)
16. [Testing & QA](#16-testing--qa)
17. [Deployment](#17-deployment)
18. [Do's and Don'ts](#18-dos-and-donts)
19. [Future Roadmap](#19-future-roadmap)
20. [Prompt Phase 1 — Siap Tempel](#20-prompt-phase-1--siap-tempel)
21. [Lampiran](#21-lampiran)

---

## 1. Project Overview

### 1.1 Tentang Brand
**Tampilin.online** adalah penyedia jasa pembuatan website untuk:
- UMKM & usaha lokal
- Fresh graduate & freelancer
- Sales & tim penjualan
- Perusahaan & organisasi
- Bisnis online

### 1.2 Tujuan Website
**Primary:** Lead generation via WhatsApp.
**Secondary:** Edukasi pasar, showcase paket, bangun kepercayaan.

### 1.3 Pesan Utama
> **"Semua usaha harus punya website."**

Supporting: *"Jangan sampai calon pelanggan mencari bisnis Anda, tetapi menemukan kompetitor lebih dulu."*

### 1.4 Kontak Resmi
- **WhatsApp:** `https://wa.me/6287716058371`
- **Instagram:** `https://instagram.com/anandcaprio`

### 1.5 Prinsip Pengembangan
1. **Mobile-first** — Develop di 360px, naik ke atas.
2. **Performance > Efek** — Animasi hanya jika perlu.
3. **Conversion-focused** — Setiap section punya tujuan.
4. **Transparan** — Jangan klaim fitur yang belum ada.
5. **Accessible** — Hormati `prefers-reduced-motion`.

### 1.6 Style Utama
**Soft Neo-Brutalism + Bento Grid + Scrollytelling.**
- **Neo-Brutalism:** border tebal, shadow keras, warna kontras, tipografi berani.
- **Bento Grid:** layout modular asimetris untuk menampilkan paket.
- **Scrollytelling:** narasi bergerak mengikuti scroll (problem → solution → brand).

---

## 2. Design System

### 2.1 Color Palette (Light Mode Only)
| Token | Hex | Usage |
|-------|-----|-------|
| `cream` | `#F5F0E8` | Background utama |
| `ink` | `#1A1A1A` | Teks, border, shadow |
| `yellow` | `#FFD23F` | Aksen utama, highlight, CTA hover |
| `orange` | `#FF6B35` | Aksen sekunder, badge, urgensi |
| `white` | `#FFFFFF` | Card background (opsional) |

Contrast minimum WCAG AA. Jangan tambah warna lain tanpa alasan kuat.

### 2.2 Typography
| Elemen | Font | Weight | Mobile Size |
|--------|------|--------|-------------|
| H1 | Space Grotesk | 800 | `clamp(2rem, 8vw, 3.5rem)` |
| H2 | Space Grotesk | 700 | `clamp(1.5rem, 5vw, 2.5rem)` |
| H3 | Space Grotesk | 700 | `1.25rem` |
| Body | Inter | 400 | `1rem` |
| Small | Inter | 500 | `0.875rem` |

Load via `next/font/google`.

### 2.3 Spacing Scale
Tailwind default: `4, 8, 12, 16, 24, 32, 48, 64, 96` (px).
Section padding: `py-16` (mobile) → `py-24` (desktop).

### 2.4 Soft Neo-Brutalism Rules
- **Border:** `2px solid #1A1A1A` untuk card. `3px` untuk tombol utama.
- **Radius:** `8px` card, `999px` pill/badge.
- **Shadow:** `box-shadow: 6px 6px 0 #1A1A1A`
- **Hover:** `transform: translate(2px, 2px)` + `box-shadow: 2px 2px 0 #1A1A1A`
- **Active:** `translate(4px, 4px)` + `box-shadow: none`
- **Jangan:** shadow blur, gradient berlebihan, glassmorphism, border 1px.

### 2.5 Bento Grid Rules
- CSS Grid `grid-template-areas` untuk layout asimetris.
- Konsisten border, shadow, radius di semua card.
- Variasi konten: teks, gambar, statistik, ikon.
- Hierarki lewat ukuran: card terbesar = paket utama.
- Mobile (<768px): stack jadi 1 kolom.

### 2.6 Wordmark
- Teks: `Tampilin.online` di Space Grotesk Bold.
- Struktur siap diganti SVG logo tanpa rombak layout.
- Simpan di `components/brand/Wordmark.tsx`.

---

## 3. Tech Stack & Setup

### 3.1 Stack
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Animations:** Framer Motion (hanya jika perlu)
- **Fonts:** Space Grotesk + Inter (via `next/font`)
- **Deployment:** Vercel

### 3.2 Setup Commands
```bash
npx create-next-app@latest tampilin-online --typescript --tailwind --app --eslint
cd tampilin-online
npm install framer-motion lucide-react clsx tailwind-merge
npm install -D prettier prettier-plugin-tailwindcss
npm run dev
```

### 3.3 Environment Variables
Tidak ada `.env` untuk v1. Semua config ada di `lib/constants.ts`.

### 3.4 Scripts
```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}
```

---

## 4. Project Structure

```
tampilin-online/
├── app/
│   ├── layout.tsx                # Root layout, fonts, metadata
│   ├── page.tsx                  # Homepage (one-page scrollytelling)
│   ├── globals.css               # Tailwind + custom CSS variables
│   └── favicon.ico
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── MobileMenu.tsx
│   │   └── Footer.tsx
│   │
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── ProblemScrolly.tsx
│   │   ├── Solution.tsx
│   │   ├── PackagesBento.tsx
│   │   ├── Process.tsx
│   │   ├── Portfolio.tsx
│   │   ├── PriceSimulator.tsx
│   │   ├── FAQ.tsx
│   │   └── FinalCTA.tsx
│   │
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Accordion.tsx
│   │   ├── Input.tsx
│   │   ├── Checkbox.tsx
│   │   └── Select.tsx
│   │
│   ├── brand/
│   │   └── Wordmark.tsx
│   │
│   └── shared/
│       ├── ScrollReveal.tsx
│       ├── SectionHeading.tsx
│       └── WhatsAppButton.tsx
│
├── lib/
│   ├── constants.ts              # Brand info, contact links
│   ├── pricing.ts                # Price calculator constants
│   ├── whatsapp.ts               # URL builders
│   └── utils.ts                  # cn(), formatRupiah(), dll
│
├── data/
│   ├── packages.ts
│   ├── faq.ts
│   ├── portfolio.ts
│   └── process.ts
│
├── hooks/
│   ├── useScrollSpy.ts
│   ├── useReducedMotion.ts
│   └── usePriceCalculator.ts
│
├── types/
│   └── index.ts
│
├── public/
│   ├── images/
│   │   ├── hero/
│   │   ├── problem/
│   │   ├── solution/
│   │   ├── portfolio/
│   │   └── og/
│   └── favicon.ico
│
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js
├── README.md
└── package.json
```

### 4.1 Rules Struktur
- **Jangan** taruh logic di `app/page.tsx`. Hanya compose components.
- Semua section di `components/sections/`. Satu file = satu section.
- Semua reusable UI di `components/ui/`.
- Semua data statis di `data/`. Jangan hardcode di component.
- Semua konstanta (harga, kontak) di `lib/`.

---

## 5. Development Phases

Kerjakan **bertahap**. Jangan loncat. Test setiap fase sebelum lanjut.

### Phase 1 — Foundation
- [ ] Setup Next.js + TypeScript + Tailwind
- [ ] Konfigurasi `tailwind.config.ts` (colors, fonts, spacing, shadow)
- [ ] Setup `app/globals.css` dengan CSS variables
- [ ] Load fonts via `next/font`
- [ ] Buat `lib/constants.ts`, `lib/utils.ts`
- [ ] Buat `components/brand/Wordmark.tsx`
- [ ] Buat base UI: `Button`, `Card`, `Badge`

**Deliverable:** Halaman kosong dengan warna, font, komponen dasar siap.

### Phase 2 — Layout Shell
- [ ] `Navbar.tsx` (sticky, transparent → solid on scroll)
- [ ] `MobileMenu.tsx` (drawer)
- [ ] `Footer.tsx`
- [ ] `app/layout.tsx` dengan metadata dasar
- [ ] `app/page.tsx` compose semua section (kosong dulu)

**Deliverable:** Layout kerangka dengan navbar & footer berfungsi.

### Phase 3 — Hero & Solution
- [ ] `Hero.tsx` dengan headline, subheadline, 2 CTA, mockup visual
- [ ] `ScrollReveal.tsx` wrapper
- [ ] `SectionHeading.tsx`
- [ ] `Solution.tsx` dengan 3–4 bullet points + ikon

**Deliverable:** Above-the-fold siap, CTA WhatsApp berfungsi.

### Phase 4 — Problem Scrollytelling
- [ ] `ProblemScrolly.tsx` dengan 4 beat
- [ ] Implementasi pinned section + scroll-driven animation
- [ ] Test di mobile (360px) — pastikan tidak berat
- [ ] `prefers-reduced-motion` fallback

**Deliverable:** Scrollytelling smooth di mobile & desktop.

### Phase 5 — Packages Bento Grid
- [ ] `data/packages.ts` dengan 6 paket
- [ ] `PackagesBento.tsx` dengan CSS Grid
- [ ] `PackageCard.tsx` (hover state Neo-Brutalist)
- [ ] CTA per paket → WhatsApp dengan pre-filled message
- [ ] Badge "Terpopuler" di UMKM

**Deliverable:** Bento Grid responsif, semua paket tampil, CTA berfungsi.

### Phase 6 — Process & Portfolio
- [ ] `data/process.ts` + `Process.tsx` (timeline)
- [ ] `data/portfolio.ts` + `Portfolio.tsx` (grid placeholder)
- [ ] Label "Demo Concept" di semua placeholder

**Deliverable:** Section proses & portofolio siap.

### Phase 7 — Price Simulator
- [ ] `lib/pricing.ts` dengan semua konstanta harga
- [ ] `hooks/usePriceCalculator.ts` untuk logic
- [ ] `PriceSimulator.tsx` dengan form interaktif
- [ ] Real-time total + breakdown
- [ ] CTA "Kirim Estimasi ke WhatsApp" dengan dynamic message
- [ ] Validasi input

**Deliverable:** Kalkulator berfungsi, hasil match dengan pesan WA.

### Phase 8 — FAQ & Final CTA
- [ ] `data/faq.ts` + `FAQ.tsx` (accordion)
- [ ] `FinalCTA.tsx` dengan headline besar + CTA
- [ ] `Accordion.tsx` di UI

**Deliverable:** FAQ smooth, CTA final menonjol.

### Phase 9 — Polish & Animations
- [ ] Refine scroll reveal timing
- [ ] Hover state semua interaktif
- [ ] Active nav via `useScrollSpy`
- [ ] Micro-interaction tombol
- [ ] Test `prefers-reduced-motion`

**Deliverable:** Website terasa premium, animasi halus.

### Phase 10 — Testing & QA
- [ ] Test di 360px, 390px, 414px, 768px, 1024px, 1280px
- [ ] Lighthouse audit (target ≥ 90 mobile)
- [ ] Keyboard navigation test
- [ ] Semua CTA WhatsApp test
- [ ] Kalkulator test (edge cases)
- [ ] Fix semua bug

**Deliverable:** Website siap deploy.

### Phase 11 — Deploy
- [ ] Build production: `npm run build`
- [ ] Fix error/warning
- [ ] Deploy ke Vercel
- [ ] Test live URL
- [ ] Setup custom domain (jika ada)

**Deliverable:** Website live.

---

## 6. Component Breakdown

### 6.1 Navbar
**State:** `isScrolled`, `isMobileMenuOpen`
**Behavior:** Transparent di top → solid cream + border-bottom saat scroll > 50px. Anchor links: Masalah, Solusi, Paket, Portofolio, Simulasi, FAQ. CTA WhatsApp kanan. Hamburger menu mobile (<768px). Active link via `useScrollSpy`.

### 6.2 Hero
**Content:** H1 "Semua Usaha Harus Punya Website." Sub 1–2 kalimat. Primary CTA "Konsultasi via WhatsApp". Secondary CTA "Lihat Paket". Visual CSS mockup browser + phone, label "Demo Concept".

### 6.3 ProblemScrolly
**Structure:** 4 beat, masing-masing max 1 viewport height.
**Animation:** `useScroll` + `useTransform` untuk opacity & translate.
**Fallback:** `prefers-reduced-motion` → tampilkan semua beat statis.

### 6.4 PackagesBento
**Data:** dari `data/packages.ts`. Layout: CSS Grid 4 kolom desktop, 1 kolom mobile. Card: nama, harga, target, 3–5 fitur, CTA WA.

### 6.5 PriceSimulator
**State:** Semua variable dari `usePriceCalculator`. UI: Form input Neo-Brutalist, total besar + breakdown, CTA WA. Output: dynamic WhatsApp message dengan rincian.

### 6.6 FAQ
**Data:** dari `data/faq.ts`. UI: Accordion, `aria-expanded`, keyboard navigable.

### 6.7 Footer
**Content:** Wordmark, tagline, nav links, kontak, sosmed, copyright.

---

## 7. Data Structures

### 7.1 `lib/constants.ts`
```typescript
export const BRAND = {
  name: "Tampilin.online",
  tagline: "Semua usaha harus punya website.",
  whatsapp: "6287716058371",
  whatsappUrl: "https://wa.me/6287716058371",
  instagram: "anandcaprio",
  instagramUrl: "https://instagram.com/anandcaprio",
};

export const NAV_LINKS = [
  { label: "Masalah", href: "#masalah" },
  { label: "Solusi", href: "#solusi" },
  { label: "Paket", href: "#paket" },
  { label: "Portofolio", href: "#portofolio" },
  { label: "Simulasi", href: "#simulasi" },
  { label: "FAQ", href: "#faq" },
];
```

### 7.2 `data/packages.ts`
```typescript
export type Package = {
  id: string;
  name: string;
  price: number;
  priceLabel: string;
  target: string;
  features: string[];
  badge?: "Terpopuler" | "Best Value";
  featured?: boolean;
  gridArea: string;
};

export const packages: Package[] = [
  {
    id: "sales",
    name: "Sales Landing Page",
    price: 499000,
    priceLabel: "Mulai dari Rp499.000",
    target: "Sales, marketer, affiliate",
    features: [
      "Landing page 1 halaman",
      "Max 6 bagian utama",
      "Hero + CTA WhatsApp",
      "Profil singkat & produk",
      "SEO dasar & responsif",
      "Deployment hosting",
    ],
    gridArea: "sales",
  },
  {
    id: "portfolio",
    name: "Portofolio Personal",
    price: 499000,
    priceLabel: "Mulai dari Rp499.000",
    target: "Fresh graduate, freelancer",
    features: [
      "Portofolio 1 halaman",
      "Profil & pengalaman",
      "Galeri max 6 proyek",
      "Tombol unduh CV",
      "LinkedIn & sosmed",
      "SEO dasar & responsif",
    ],
    gridArea: "portfolio",
  },
  {
    id: "umkm",
    name: "Website UMKM",
    price: 899000,
    priceLabel: "Mulai dari Rp899.000",
    target: "UMKM, usaha lokal",
    features: [
      "Landing page max 8 sections",
      "Max 12 produk/layanan",
      "Galeri max 10 gambar",
      "Google Maps & jam operasional",
      "Testimoni & FAQ",
      "WA otomatis & SEO dasar",
    ],
    badge: "Terpopuler",
    featured: true,
    gridArea: "umkm",
  },
  {
    id: "company",
    name: "Company Profile",
    price: 1699000,
    priceLabel: "Mulai dari Rp1.699.000",
    target: "Perusahaan, agensi, organisasi",
    features: [
      "Max 5 halaman",
      "Beranda, Tentang, Layanan, Portofolio, Kontak",
      "Profil & visi misi",
      "Form kontak + Google Maps",
      "SEO on-page per halaman",
      "Navigasi konsisten",
    ],
    badge: "Best Value",
    gridArea: "company",
  },
  {
    id: "catalog",
    name: "Katalog Online",
    price: 1999000,
    priceLabel: "Mulai dari Rp1.999.000",
    target: "Toko, distributor, fashion",
    features: [
      "Katalog max 20 produk",
      "Kategori & detail produk",
      "Pencarian/filter",
      "WA order dengan nama produk",
      "SEO dasar & responsif",
      "Deployment hosting",
    ],
    gridArea: "catalog",
  },
  {
    id: "ecommerce",
    name: "E-Commerce Template",
    price: 3499000,
    priceLabel: "Mulai dari Rp3.499.000",
    target: "Bisnis online, toko",
    features: [
      "Toko online lengkap",
      "Keranjang & checkout",
      "Penyimpanan pesanan",
      "Dashboard produk (jika template mendukung)",
      "Payment gateway (tergantung implementasi)",
      "SEO dasar & responsif",
    ],
    gridArea: "ecommerce",
  },
];
```

### 7.3 `lib/pricing.ts`
```typescript
export const BASE_PRICES = {
  sales: 499000,
  portfolio: 499000,
  umkm: 899000,
  company: 1699000,
  catalog: 1999000,
  ecommerce: 3499000,
} as const;

export const ADDON_PRICES = {
  additionalPage: 150000,
  additionalProduct: 10000,
  copywriting: 250000,
  seoAdvanced: 250000,
  customIntegration: 150000,
  maintenance: 150000, // per bulan
  domainHosting: 300000, // per tahun
  urgencyMultiplier: 0.25,
} as const;

export const INCLUDED_PRODUCTS = {
  catalog: 20,
  ecommerce: 20,
} as const;
```

### 7.4 `data/faq.ts`
```typescript
export type FAQItem = {
  question: string;
  answer: string;
};

export const faqItems: FAQItem[] = [
  {
    question: "Berapa lama proses pembuatan website?",
    answer: "Tergantung paket. Landing page 3–5 hari kerja, company profile 1–2 minggu, e-commerce 2–4 minggu.",
  },
  {
    question: "Apakah domain dan hosting termasuk?",
    answer: "Belum termasuk kecuali tertulis di penawaran. Biaya domain & hosting dihitung terpisah sesuai penyedia yang dipilih.",
  },
  {
    question: "Berapa kali revisi yang didapat?",
    answer: "Maksimal 2 putaran revisi dalam lingkup pekerjaan yang disepakati.",
  },
  {
    question: "Apakah saya perlu menyiapkan konten?",
    answer: "Ya. Materi teks, foto, logo, dan informasi bisnis disediakan oleh klien. Kami bantu susun dan tata.",
  },
  {
    question: "Apakah ada biaya maintenance?",
    answer: "Opsional, mulai Rp150.000/bulan untuk update konten ringan dan pemantauan.",
  },
  {
    question: "Bagaimana sistem pembayaran?",
    answer: "DP 50% di awal, sisanya setelah proyek selesai dan disetujui.",
  },
  {
    question: "Apakah website bisa diupdate sendiri?",
    answer: "Untuk paket dengan CMS ya. Untuk paket statis, update konten bisa melalui jasa maintenance.",
  },
  {
    question: "Apakah bisa custom di luar paket?",
    answer: "Bisa. Fitur di luar paket dihitung terpisah setelah kebutuhan diperiksa.",
  },
];
```

### 7.5 `data/process.ts`
```typescript
export const processSteps = [
  { step: 1, title: "Konsultasi", desc: "Diskusi kebutuhan dan tujuan bisnis Anda." },
  { step: 2, title: "Penentuan Kebutuhan", desc: "Pilih paket dan fitur yang sesuai." },
  { step: 3, title: "Desain & Pengembangan", desc: "Kami bangun website Anda." },
  { step: 4, title: "Revisi", desc: "Maksimal 2 putaran revisi sesuai kesepakatan." },
  { step: 5, title: "Peluncuran", desc: "Website live dan siap digunakan." },
];
```

### 7.6 `data/portfolio.ts`
```typescript
export const portfolioItems = [
  { id: "umkm", title: "Website UMKM", category: "UMKM", label: "Demo Concept" },
  { id: "portfolio", title: "Portofolio Personal", category: "Personal", label: "Demo Concept" },
  { id: "sales", title: "Sales Landing Page", category: "Sales", label: "Demo Concept" },
  { id: "company", title: "Company Profile", category: "Perusahaan", label: "Demo Concept" },
  { id: "catalog", title: "Katalog Online", category: "Toko", label: "Demo Concept" },
  { id: "ecommerce", title: "E-Commerce", category: "Toko Online", label: "Demo Concept" },
];
```

---

## 8. Animation Guidelines

### 8.1 Prinsip
- **Intensity:** Medium. Premium, tidak mengganggu.
- **Duration:** 0.2s–0.5s. Jangan lebih.
- **Easing:** `cubic-bezier(0.34, 1.56, 0.64, 1)` untuk bounce halus.
- **Animate only:** `transform` dan `opacity`.

### 8.2 Scroll Reveal
```typescript
<motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.4, ease: "easeOut" }}
>
  {children}
</motion.div>
```

### 8.3 Hover State (Neo-Brutalist)
```css
.card {
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.card:hover {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0 #1A1A1A;
}
```

### 8.4 Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 8.5 Jangan
Scroll-jacking, parallax berlebihan, custom cursor, sound design, animasi > 0.5s, animasi berulang mengganggu.

---

## 9. Scrollytelling Spec

### 9.1 Beat Structure
| Beat | Headline | Background | Animation |
|------|----------|------------|-----------|
| 1 | "Semua usaha harus punya website." | Cream | Fade in + translate up |
| 2 | "Jangan sampai bisnis Anda sulit ditemukan." | Black | Pinned, parallax depth |
| 3 | "Website adalah kantor digital bisnis Anda." | Cream | Clip-path reveal |
| 4 | "Tampilin.online hadir..." + CTA | Cream + accent | Bento teaser + CTA |

### 9.2 Technical
- Framer Motion `useScroll` + `useTransform`.
- Pin section dengan `position: sticky` di wrapper.
- Setiap beat max 1 viewport height di mobile.
- Progress indicator (opsional): dot navigation di kanan.

### 9.3 Fallback
- `prefers-reduced-motion`: semua beat tampil statis, tanpa pinned.
- No JS: tetap tampil sebagai section biasa.

---

## 10. Bento Grid Spec

### 10.1 Desktop Layout (4 columns)
```
"sales    sales    portfolio portfolio"
"umkm     umkm     umkm      company"
"catalog  catalog  ecommerce ecommerce"
```

### 10.2 Mobile Layout (<768px)
Stack vertikal. Full width. Urutan: Sales → Portfolio → UMKM → Company → Catalog → E-commerce.

### 10.3 Card Content
- Nama paket (H3)
- Harga: "Mulai dari Rp..." (bold, yellow highlight)
- Target audience (small, muted)
- 3–5 fitur dengan check icon
- CTA: "Pilih Paket" → WhatsApp
- Badge (opsional)

### 10.4 Hierarchy
- **UMKM:** Card terbesar (3x1). Target utama.
- **Company Profile:** Tall card (1x2).
- **Sales & Portfolio:** Medium (2x1).
- **Catalog & E-commerce:** Wide (2x1).

---

## 11. Image Asset Spec

### 11.1 Daftar Gambar
| # | Asset | Section | Ukuran | Format | Prioritas |
|---|-------|---------|--------|--------|-----------|
| 1 | Hero Mockup | Hero | 1200×900 | WebP | 🔴 Wajib |
| 2 | Problem Illustration | Problem Beat 2 | 800×800 | WebP | 🔴 Wajib |
| 3 | Solution Illustration | Solution | 800×600 | WebP | 🟡 Opsional |
| 4 | Portfolio UMKM | Portfolio | 800×600 | WebP | 🔴 Wajib |
| 5 | Portfolio Personal | Portfolio | 800×600 | WebP | 🔴 Wajib |
| 6 | Portfolio Sales | Portfolio | 800×600 | WebP | 🔴 Wajib |
| 7 | Portfolio Company | Portfolio | 800×600 | WebP | 🔴 Wajib |
| 8 | Portfolio Catalog | Portfolio | 800×600 | WebP | 🔴 Wajib |
| 9 | Portfolio E-Commerce | Portfolio | 800×600 | WebP | 🔴 Wajib |
| 10 | OG Image | Metadata | 1200×630 | PNG | 🔴 Wajib |
| 11 | Favicon | Metadata | 512×512 | PNG/ICO | 🔴 Wajib |

### 11.2 Aturan Konsistensi
- **Palet:** krem `#F5F0E8`, hitam `#1A1A1A`, kuning `#FFD23F`, oranye `#FF6B35`.
- **Style:** flat vector, geometric, bold outlines, no gradients, no photorealism.
- **Jangan:** foto realistis, glassmorphism, AI-slop wajah manusia, teks di dalam gambar.
- **Label:** semua portofolio diberi badge "Demo Concept" di UI (bukan di gambar).

### 11.3 Folder Convention
```
public/images/
├── hero/
│   └── hero-mockup.webp
├── problem/
│   └── problem-illustration.webp
├── solution/
│   └── solution-illustration.webp
├── portfolio/
│   ├── portfolio-umkm.webp
│   ├── portfolio-personal.webp
│   ├── portfolio-sales.webp
│   ├── portfolio-company.webp
│   ├── portfolio-catalog.webp
│   └── portfolio-ecommerce.webp
└── og/
    └── og-image.png
```

**Naming:** lowercase, kebab-case, deskriptif. Tidak ada spasi.

### 11.4 Alt Text
- Deskriptif, Bahasa Indonesia, max 125 karakter.
- Jangan mulai dengan "Gambar..." atau "Foto...".
- Referensi lengkap: lihat Section 12.

### 11.5 Optimasi
- Konversi ke WebP (quality 80) via `cwebp` atau Squoosh.
- Lazy load semua gambar below fold (`loading="lazy"`).
- Gunakan `next/image` dengan `width`/`height` eksplisit.
- Hero image: `priority` + placeholder blur.
- Semua gambar wajib punya `alt`.

### 11.6 Contoh Penggunaan
```tsx
import Image from "next/image";

// Hero (priority)
<Image
  src="/images/hero/hero-mockup.webp"
  alt="Mockup website Tampilin.online di browser desktop dan smartphone"
  width={1200}
  height={900}
  priority
  sizes="(max-width: 768px) 100vw, 600px"
/>

// Portfolio (lazy)
<Image
  src="/images/portfolio/portfolio-umkm.webp"
  alt="Contoh desain website UMKM dengan katalog produk dan tombol WhatsApp"
  width={800}
  height={600}
  loading="lazy"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
/>
```

---

## 12. AI Image Generation Prompts

### 12.1 Global Style Prefix (WAJIB tempel di awal setiap prompt)
```
flat vector illustration, geometric shapes, bold black outlines, soft neo-brutalism aesthetic, limited color palette: cream #F5F0E8, black #1A1A1A, yellow #FFD23F, orange #FF6B35, clean minimal composition, editorial style, no gradients, no photorealism, no human faces, no text in image, high contrast, poster-like
```

**Catatan:**
- Untuk Midjourney, tambahkan `--ar X:Y` di akhir prompt.
- Untuk DALL·E/Ideogram, tulis aspect ratio di deskripsi.
- **Jangan** generate teks di dalam gambar — overlay teks pakai Figma/Canva.

### 12.2 Prompt 1 — Hero Mockup
**File:** `public/images/hero/hero-mockup.webp` | **Size:** 1200×900 | **AR:** 4:3
**Alt:** "Mockup website Tampilin.online di browser desktop dan smartphone"
```
[GLOBAL STYLE PREFIX]
A desktop browser window and a smartphone side by side, both showing a clean business website mockup with cream background, bold black borders, yellow accent buttons. The browser is 3D-tilted slightly. Phone shows a mobile version of the same site. Isometric perspective, clean shadows, editorial composition.
--ar 4:3
```

### 12.3 Prompt 2 — Problem Illustration
**File:** `public/images/problem/problem-illustration.webp` | **Size:** 800×800 | **AR:** 1:1
**Alt:** "Ilustrasi pemilik usaha kesulitan ditemukan online sementara kompetitor lebih mudah diakses"
```
[GLOBAL STYLE PREFIX]
A confused small business owner silhouette standing in front of an empty store, while digital search icons (magnifying glass, question marks) float around. On the right side, a competitor's store is brightly lit and easy to find. Dark background #1A1A1A, yellow accents. Metaphor: hard to be found online.
--ar 1:1
```

### 12.4 Prompt 3 — Solution Illustration
**File:** `public/images/solution/solution-illustration.webp` | **Size:** 800×600 | **AR:** 4:3
**Alt:** "Ilustrasi website sebagai pusat digital bisnis yang terhubung dengan berbagai kanal"
```
[GLOBAL STYLE PREFIX]
A clean browser window floating in the center, surrounded by connected nodes: shop icon, megaphone icon, chat bubble icon, cart icon. Lines connect them like a network. Cream background, black outlines, yellow nodes. Metaphor: website as digital hub.
--ar 4:3
```

### 12.5 Prompt 4 — Portfolio UMKM
**File:** `public/images/portfolio/portfolio-umkm.webp` | **Size:** 800×600 | **AR:** 4:3
**Alt:** "Contoh desain website UMKM dengan katalog produk dan tombol WhatsApp"
```
[GLOBAL STYLE PREFIX]
A mobile phone mockup showing a warm UMKM website: hero with food/salon/bengkel imagery, product grid, WhatsApp CTA button. Cream background, bold black phone frame, yellow CTA. Clean UI mockup style.
--ar 4:3
```

### 12.6 Prompt 5 — Portfolio Personal
**File:** `public/images/portfolio/portfolio-personal.webp` | **Size:** 800×600 | **AR:** 4:3
**Alt:** "Contoh website portofolio personal dengan galeri proyek dan profil"
```
[GLOBAL STYLE PREFIX]
A laptop mockup showing a personal portfolio website: profile photo placeholder (abstract avatar), project grid, skills section, contact button. Cream background, bold black laptop frame, yellow accents.
--ar 4:3
```

### 12.7 Prompt 6 — Portfolio Sales
**File:** `public/images/portfolio/portfolio-sales.webp` | **Size:** 800×600 | **AR:** 4:3
**Alt:** "Contoh landing page sales dengan headline tegas dan tombol WhatsApp"
```
[GLOBAL STYLE PREFIX]
A phone mockup showing a sales landing page: big headline, product image, benefit list, prominent WhatsApp CTA button. Cream background, black phone frame, yellow and orange accents.
--ar 4:3
```

### 12.8 Prompt 7 — Portfolio Company
**File:** `public/images/portfolio/portfolio-company.webp` | **Size:** 800×600 | **AR:** 4:3
**Alt:** "Contoh website company profile multi-halaman dengan navigasi konsisten"
```
[GLOBAL STYLE PREFIX]
A desktop browser mockup showing a multi-page company profile: navigation bar, hero section with team/office imagery, services grid, contact form. Cream background, bold black borders, yellow accents.
--ar 4:3
```

### 12.9 Prompt 8 — Portfolio Catalog
**File:** `public/images/portfolio/portfolio-catalog.webp` | **Size:** 800×600 | **AR:** 4:3
**Alt:** "Contoh website katalog online dengan grid produk dan tombol pesan WhatsApp"
```
[GLOBAL STYLE PREFIX]
A phone and desktop mockup side by side showing a product catalog: grid of product cards with prices, category filter, WhatsApp order button. Cream background, black frames, yellow accents.
--ar 4:3
```

### 12.10 Prompt 9 — Portfolio E-Commerce
**File:** `public/images/portfolio/portfolio-ecommerce.webp` | **Size:** 800×600 | **AR:** 4:3
**Alt:** "Contoh website e-commerce dengan keranjang belanja dan alur checkout"
```
[GLOBAL STYLE PREFIX]
A desktop browser mockup showing an e-commerce store: product grid, shopping cart icon with badge, checkout button, category sidebar. Cream background, bold black borders, yellow and orange accents.
--ar 4:3
```

### 12.11 Prompt 10 — OG Image
**File:** `public/images/og/og-image.png` | **Size:** 1200×630 | **AR:** 1200:630
**Alt:** "Tampilin.online — Jasa pembuatan website untuk UMKM, profesional, dan bisnis online"
```
[GLOBAL STYLE PREFIX]
A bold editorial background composition: cream background with bold black geometric shapes, yellow accent bar at the bottom, abstract browser and phone silhouette on the right. Empty space on the left for text overlay. No text in image.
--ar 1200:630
```
**⚠️** AI sering salah render teks. Generate **background saja**, overlay teks "Tampilin.online" + tagline pakai Figma/Canva dengan font Space Grotesk Bold.

### 12.12 Workflow Generate & Optimasi
1. **Generate** — copy Global Style Prefix + prompt pilihan, generate di Midjourney/DALL·E/Ideogram/Leonardo.
2. **Konversi ke WebP:**
   ```bash
   cwebp -q 80 input.png -o output.webp
   ```
   Atau pakai Squoosh (https://squoosh.app).
3. **Simpan** di `public/images/` sesuai folder convention (Section 11.3).
4. **Optimasi** di Next.js pakai `next/image` dengan `priority` untuk hero, `loading="lazy"` untuk sisanya.
5. **Alt text** — pakai yang sudah disediakan.

### 12.13 Checklist Generate
- [ ] Hero Mockup
- [ ] Problem Illustration
- [ ] Solution Illustration
- [ ] Portfolio UMKM, Personal, Sales, Company, Catalog, E-Commerce
- [ ] OG Image (background + overlay teks)
- [ ] Semua dikonversi ke WebP (quality 80)
- [ ] Semua disimpan di folder sesuai convention
- [ ] Semua punya alt text

---

## 13. Price Calculator Logic

### 13.1 State
```typescript
type CalculatorState = {
  packageId: keyof typeof BASE_PRICES;
  additionalPages: number;
  additionalProducts: number;
  copywriting: boolean;
  seoAdvanced: boolean;
  customIntegration: boolean;
  maintenance: boolean;
  domainHosting: boolean;
  urgency: boolean;
};
```

### 13.2 Formula
```
subtotal = BASE_PRICES[packageId]
         + additionalPages * 150000
         + additionalProducts * 10000
         + (copywriting ? 250000 : 0)
         + (seoAdvanced ? 250000 : 0)
         + (customIntegration ? 150000 : 0)

total = subtotal
      + (urgency ? subtotal * 0.25 : 0)
      + (domainHosting ? 300000 : 0)

maintenanceMonthly = maintenance ? 150000 : 0
```

### 13.3 Rules
- `additionalProducts` hanya aktif untuk paket `catalog` dan `ecommerce`.
- Produk pertama 20 sudah termasuk. Hanya kelebihan yang dihitung.
- `maintenance` ditampilkan terpisah (per bulan).
- Semua angka dalam Rupiah, format dengan `Intl.NumberFormat('id-ID')`.

### 13.4 Output WhatsApp
```
Halo Tampilin.online, saya ingin estimasi untuk:

Paket: [Nama Paket]
Halaman tambahan: [X] — Rp...
Produk tambahan: [X] — Rp...
Copywriting: Ya/Tidak
SEO Lanjutan: Ya/Tidak
Integrasi Kustom: Ya/Tidak
Domain & Hosting: Ya/Tidak
Urgensi: Ya/Tidak

Subtotal: Rp...
Biaya Berulang: Rp150.000/bulan (jika maintenance)

Total Estimasi: Rp...

Mohon info lebih lanjut.
```

---

## 14. WhatsApp Integration

### 14.1 Helper
```typescript
// lib/whatsapp.ts
export function buildWhatsAppUrl(message: string): string {
  const base = "https://wa.me/6287716058371";
  return `${base}?text=${encodeURIComponent(message)}`;
}
```

### 14.2 Pre-filled Messages
| Context | Message |
|---------|---------|
| Default | "Halo Tampilin.online, saya tertarik membuat website untuk bisnis saya. Saya ingin berkonsultasi mengenai paket yang paling sesuai." |
| Package | "Halo Tampilin.online, saya tertarik dengan paket [Nama Paket]. Bisa dijelaskan lebih detail?" |
| Calculator | (dynamic, lihat 13.4) |
| Footer | "Halo Tampilin.online, saya ingin bertanya tentang layanan Anda." |

### 14.3 Rules
- Selalu `encodeURIComponent` pesan.
- Jangan klaim pesan "terkirim" sebelum user kirim di WA.
- Semua CTA WhatsApp pakai `<a href>` dengan `target="_blank"` dan `rel="noopener noreferrer"`.

---

## 15. Accessibility & Performance

### 15.1 Accessibility Checklist
- [ ] Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`.
- [ ] Heading hierarchy: H1 → H2 → H3. Jangan skip.
- [ ] Semua gambar punya `alt`.
- [ ] Form input punya `<label>`.
- [ ] Focus ring visible (yellow outline).
- [ ] Keyboard navigable (Tab, Enter, Esc).
- [ ] `aria-expanded` untuk accordion.
- [ ] `aria-current="page"` untuk active nav.
- [ ] `prefers-reduced-motion` dihormati.
- [ ] Contrast WCAG AA minimum.

### 15.2 Performance Checklist
- [ ] Lighthouse mobile ≥ 90 untuk Performance, Accessibility, SEO.
- [ ] Lazy load image below fold (`loading="lazy"`).
- [ ] Gunakan `next/image` untuk optimasi.
- [ ] Animate hanya `transform` dan `opacity`.
- [ ] Hindari layout shift (CLS < 0.1).
- [ ] Font di-preload.
- [ ] Tidak ada unused CSS/JS.

---

## 16. Testing & QA

### 16.1 Manual Testing
- [ ] Test di Chrome, Safari, Firefox (mobile & desktop).
- [ ] Test di 360px, 390px, 414px, 768px, 1024px, 1280px.
- [ ] Test dengan keyboard only.
- [ ] Test dengan `prefers-reduced-motion` aktif.
- [ ] Test semua CTA WhatsApp — pastikan nomor & pesan benar.
- [ ] Test kalkulator: semua kombinasi, edge cases.
- [ ] Test build production: `npm run build`.

### 16.2 Mobile-Specific Checks
- [ ] CTA WhatsApp mudah dijangkau jempol (min 44×44px tap target).
- [ ] Teks tidak perlu zoom (min 16px body).
- [ ] Tidak ada horizontal scroll.
- [ ] Scrollytelling tidak berat (60fps).
- [ ] Sticky navbar tidak menutupi konten.
- [ ] Form input tidak zoom otomatis (font ≥ 16px).

### 16.3 QA Checklist (Final)
- [ ] Tidak ada teks/card/tombol yang overlap.
- [ ] Semua anchor link berfungsi.
- [ ] Semua CTA WhatsApp mengarah ke nomor benar.
- [ ] Kalkulator akurat, hasil match dengan pesan WA.
- [ ] Placeholder dilabeli "Demo Concept".
- [ ] Tidak ada fitur yang diklaim tanpa implementasi.
- [ ] Build tanpa error.

---

## 17. Deployment

### 17.1 Vercel
```bash
npm i -g vercel
vercel
vercel --prod
```

### 17.2 Pre-deploy Checklist
- [ ] `npm run build` sukses tanpa error.
- [ ] Environment variables (jika ada) di-set di Vercel.
- [ ] Metadata & OG image di `app/layout.tsx`.
- [ ] Favicon ada di `app/favicon.ico`.
- [ ] Custom domain (jika ada) di-set.

### 17.3 Post-deploy
- [ ] Test live URL di mobile & desktop.
- [ ] Test semua CTA WhatsApp.
- [ ] Test kalkulator.
- [ ] Submit sitemap ke Google Search Console.

---

## 18. Do's and Don'ts

### ✅ Do's
- Bahasa Indonesia natural, conversational.
- Mobile-first, test di 360px dulu.
- Konsisten dengan design system.
- Animasi hanya jika menambah nilai.
- Transparan soal harga & fitur.
- Tulis komentar untuk logic kompleks.
- Gunakan TypeScript strict.
- Format harga dengan `Intl.NumberFormat('id-ID')`.

### ❌ Don'ts
- Jangan pakai bahasa Inggris di UI (kecuali istilah teknis).
- Jangan klaim fitur yang belum ada.
- Jangan buat testimoni/statistik fiktif.
- Jangan pakai dark mode toggle (v1).
- Jangan pakai glassmorphism berlebihan.
- Jangan scroll-jacking.
- Jangan custom cursor.
- Jangan sound design.
- Jangan command palette (v1).
- Jangan backend/CMS/auth (v1).
- Jangan hardcode data di component.
- Jangan animasi > 0.5s.
- Jangan parallax berlebihan.
- Jangan pakai stock photo generik.
- Jangan lupa `prefers-reduced-motion`.

---

## 19. Future Roadmap

### V1.1 — Price Simulator Enhancements
- Tambah variabel "Jenis Konten yang Dipilih Client" (misal: hero video, galeri interaktif, blog).
- Simpan preferensi di `localStorage`.
- Preview visual dari pilihan.

### V1.2 — Portfolio Real
- Ganti placeholder dengan screenshot proyek nyata.
- Tambah filter kategori.
- Tambah halaman detail per proyek.

### V1.3 — Multi-page (Company Profile)
- Route `/tentang`, `/layanan`, `/portofolio`, `/kontak`.
- Navigasi konsisten antar halaman.
- Breadcrumb.

### V1.4 — Analytics
- Integrasi Plausible / Umami.
- Track event: `whatsapp_click`, `package_select`, `estimate_submit`.

### V1.5 — Blog / Artikel
- SEO content untuk edukasi pasar.
- MDX-based.

### V1.6 — Client Dashboard (opsional)
- Hanya jika ada kebutuhan jelas.
- Auth + CMS.

---

## 20. Prompt Phase 1 — Siap Tempel

Copy blok di bawah ini ke Cursor / Claude / AI coding assistant untuk mulai Phase 1.

```
# PROMPT PHASE 1 — FOUNDATION

Baca README.md terlebih dahulu. Pahami design system, struktur project, dan aturan main.

Sekarang kerjakan Phase 1 — Foundation saja. Jangan lanjut ke Phase 2 sebelum saya konfirmasi.

## Task

### 1. Setup Project
- Next.js 14+ App Router, TypeScript strict, Tailwind CSS, ESLint.
- Install: framer-motion, lucide-react, clsx, tailwind-merge.
- Install dev: prettier, prettier-plugin-tailwindcss.

### 2. Konfigurasi tailwind.config.ts
- Colors: cream #F5F0E8, ink #1A1A1A, yellow #FFD23F, orange #FF6B35.
- FontFamily: display: ['var(--font-space-grotesk)'], sans: ['var(--font-inter)'].
- BorderRadius: card: '8px', pill: '999px'.
- BoxShadow: brutal: '6px 6px 0 #1A1A1A', brutal-sm: '2px 2px 0 #1A1A1A'.

### 3. Setup app/globals.css
- Import Tailwind.
- CSS variables untuk warna.
- @media (prefers-reduced-motion: reduce) untuk disable animasi.
- Base body: bg-cream text-ink font-sans antialiased.

### 4. Load Fonts via next/font
- Space_Grotesk (400, 500, 700, 800) → variable --font-space-grotesk.
- Inter (400, 500, 600, 700) → variable --font-inter.

### 5. app/layout.tsx
- Metadata dasar: title, description, OG image, favicon.
- html lang="id".
- Body dengan font className.

### 6. lib/constants.ts
Isi BRAND dan NAV_LINKS sesuai README Section 7.1.

### 7. lib/utils.ts
- cn() — helper gabung className.
- formatRupiah(n) — pakai Intl.NumberFormat('id-ID').

### 8. components/brand/Wordmark.tsx
- Teks "Tampilin.online" di Space Grotesk Bold.
- Terima prop className untuk sizing.

### 9. Base UI Components

Button.tsx
- Variants: primary (bg yellow, border 3px, shadow brutal), secondary (bg cream, border 2px, shadow brutal), ghost (no border/shadow).
- Sizes: sm, md, lg.
- Hover: translate(2px, 2px) + shadow mengecil.
- Support asChild (render sebagai <a>).
- Focus ring yellow.

Card.tsx
- Border 2px solid ink, radius card, shadow brutal.
- Padding default p-6.
- Support as prop.
- Hover state opsional via prop interactive.

Badge.tsx
- Pill shape (radius pill).
- Variants: yellow, orange, ink.

### 10. Test
- npm run dev — pastikan tidak ada error.
- Halaman test di app/page.tsx menampilkan semua komponen dengan semua variant.
- Test di 360px (mobile-first).
- Test prefers-reduced-motion.

## Rules
- Mobile-first — mulai dari 360px.
- TypeScript strict.
- Jangan buat section Hero, Navbar, Footer, dll. Itu Phase 2+.
- Jangan generate gambar — placeholder dulu.
- Konsisten dengan design system di README Section 2.
- Tulis komentar untuk logic non-obvious.
- Jangan install library di luar yang disebutkan.

## Deliverable
- Project Next.js berjalan tanpa error.
- Semua file di atas dibuat.
- Halaman test menampilkan komponen dasar dengan rapi di mobile.
- Konfirmasi siap lanjut Phase 2.

Setelah selesai, tunggu konfirmasi saya sebelum lanjut Phase 2.
```

---

## 21. Lampiran

### A. Referensi Cepat
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Squoosh (WebP converter)](https://squoosh.app)

### B. Kontak
- **WhatsApp:** 087716058371
- **Instagram:** [@anandcaprio](https://instagram.com/anandcaprio)

### C. Change Log
| Versi | Tanggal | Perubahan |
|-------|---------|-----------|
| 1.0.0 | — | Initial README |

---

**End of README.**

> *"Bukan cuma soal seberapa bagus usaha kita, tetapi juga seberapa mudah orang menemukan dan mengenal usaha kita."*
> — Tampilin.online