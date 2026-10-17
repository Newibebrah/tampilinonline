import { SITE, siteUrl } from "@/lib/seo";
import { BASE_PRICES, PACKAGE_NAMES } from "@/lib/pricing";

/**
 * JSON-LD schema builders — semua node pakai @id absolut dan saling mereferensikan
 * lewat @id supaya Google membaca satu knowledge graph yang konsisten.
 *
 * Catatan desain:
 * - Organization + Service, BUKAN LocalBusiness (jasa online tanpa lokasi fisik).
 * - TANPA aggregateRating/review — belum ada review nyata (jangan dipalsukan).
 * - Harga Offer diambil dari konstanta yang sama dengan UI → tak bisa beda.
 */

/** Node Organization — pusat identitas brand, dirujuk @id oleh schema lain. */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": SITE.brandId,
  name: SITE.name,
  url: SITE.url,
  logo: siteUrl("/brand/logo-horizontal.svg"),
  description: SITE.description,
  sameAs: [SITE.instagram, SITE.whatsapp],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+6287716058371",
    contactType: "customer service",
    availableLanguage: ["id"],
  },
} as const;

/** Node WebSite — publisher merujuk Organization via @id. */
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": SITE.websiteId,
  url: SITE.url,
  name: SITE.name,
  publisher: { "@id": SITE.brandId },
  inLanguage: "id-ID",
} as const;

/** Offer per paket — urutan mengikuti konstanta di lib/pricing.ts. */
const serviceOffers = (Object.keys(PACKAGE_NAMES) as Array<keyof typeof BASE_PRICES>).map(
  (id) => ({
    "@type": "Offer",
    name: PACKAGE_NAMES[id],
    price: BASE_PRICES[id].toString(), // harga tanpa titik/simbol: "499000"
    priceCurrency: "IDR",
  }),
);

/** Node Service — layanan inti + penawaran per paket (area: Indonesia). */
export const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Jasa Pembuatan Website",
  provider: { "@id": SITE.brandId },
  areaServed: "ID",
  description: SITE.description,
  offers: serviceOffers,
} as const;

/** FAQPage — dibangun dari data/faq.ts (sumber sama dengan UI → tak bisa mismatch). */
export function faqSchema(
  faqItems: ReadonlyArray<{ question: string; answer: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  } as const;
}
