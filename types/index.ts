/** Tipe & interface bersama untuk semua komponen. */

/** Tipe paket (stabil, dipakai oleh data & bento grid). */
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

/** Item FAQ untuk accordion. */
export type FAQItem = {
  question: string;
  answer: string;
};

/** Item portofolio (placeholder "Demo Concept" untuk v1). */
export type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  label: string;
  image: string;
  alt: string;
};

/* ---------------- Blog ---------------- */

/**
 * Blok konten artikel — renderer murni server, TANPA HTML mentah dari data
 * (aman dari injeksi: semuanya dirender sebagai teks React).
 */
export type BlogBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  /** Block tautan internal — WAJIB: minimal 3 internal link per artikel. */
  | { type: "links"; items: Array<{ label: string; href: string }> };

export type BlogPost = {
  slug: string;
  /** Judul H1 artikel. */
  title: string;
  /** Meta title absolut — target 50–60 karakter (cek scripts/check-meta.mjs). */
  metaTitle: string;
  /** Meta description unik — target 150–160 karakter. */
  metaDescription: string;
  /** Cuplikan card index. */
  excerpt: string;
  /** Jawaban atomik 40–60 kata untuk cuplikan AI / featured snippet. */
  tldr: string;
  keywords: string[];
  /** ISO 8601. */
  datePublished: string;
  /** ISO 8601 — update saat revisi artikel. */
  dateModified: string;
  readingMinutes: number;
  /** Thumbnail artikel — WAJIB dari asset yang sudah ada di public/. */
  image: string;
  imageAlt: string;
  content: BlogBlock[];
};

/* ---------------- Studi kasus ---------------- */

export type CaseStudyResult = {
  label: string;
  /** Target yang diukur — WAJIB berlabel demo selama belum ada klien nyata. */
  value: string;
  demo: boolean;
};

export type CaseStudy = {
  slug: string;
  title: string;
  category: string;
  /** Meta title absolut — target 50–60 karakter. */
  metaTitle: string;
  /** Meta description unik — target 150–160 karakter. */
  metaDescription: string;
  summary: string;
  image: string;
  imageAlt: string;
  /** ISO 8601. */
  datePublished: string;
  problem: string[];
  solution: string[];
  results: CaseStudyResult[];
};

/* ---------------- Testimoni ---------------- */

/**
 * Testimoni berlabel demo — JANGAN memalsukan nama/foto (aturan konten jujur).
 * Baru diganti testimoni nyata setelah klien pertama menyetujui publikasi.
 */
export type Testimonial = {
  id: string;
  quote: string;
  authorRole: string;
  /** true = tampilkan label "Demo" di UI. */
  demo: boolean;
};
