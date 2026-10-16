/**
 * Konstanta kalkulator harga — README Section 13.
 * Disensor ke satu file supaya perubahan harga tidak menyentuh komponen.
 */
export const BASE_PRICES = {
  sales: 499000,
  portfolio: 499000,
  umkm: 899000,
  company: 1699000,
  catalog: 1999000,
  ecommerce: 3499000,
} as const;

export type PackageId = keyof typeof BASE_PRICES;

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

/** Kuota produk yang SUDAH termasuk pada paket katalog / e-commerce. */
export const INCLUDED_PRODUCTS = {
  catalog: 20,
  ecommerce: 20,
} as const;

/** Paket yang by-design hanya 1 halaman (tidak bisa tambah halaman). */
export const SINGLE_PAGE_PACKAGES: PackageId[] = ["sales", "portfolio"];

/** Nama tampilan untuk pesan WhatsApp & opsi select. */
export const PACKAGE_NAMES: Record<PackageId, string> = {
  sales: "Sales Landing Page",
  portfolio: "Portofolio Personal",
  umkm: "Website UMKM",
  company: "Company Profile",
  catalog: "Katalog Online",
  ecommerce: "E-Commerce Template",
};

/** Label harga ringkas per paket untuk opsi select di simulator. */
export const PACKAGE_BASE_LABEL: Record<PackageId, string> = {
  sales: "Rp499.000",
  portfolio: "Rp499.000",
  umkm: "Rp899.000",
  company: "Rp1.699.000",
  catalog: "Rp1.999.000",
  ecommerce: "Rp3.499.000",
};
