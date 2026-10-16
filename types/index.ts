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

/** Langkah proses kerja timeline. */
export type ProcessStep = {
  step: number;
  title: string;
  desc: string;
};
