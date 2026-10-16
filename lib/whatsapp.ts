import { formatRupiah } from "@/lib/utils";

/** URL builder untuk semua CTA WhatsApp + pesan pre-filled. */

const WA_BASE = "https://wa.me/6287716058371";

/** Bangun URL wa.me dengan pesan ter-encode. */
export function buildWhatsAppUrl(message: string): string {
  return `${WA_BASE}?text=${encodeURIComponent(message)}`;
}

// Pesan default sesuai README 14.2 — WAJIB selalu encodeURIComponent di builder.
export const DEFAULT_WA_MESSAGE =
  "Halo Tampilin.online, saya tertarik membuat website untuk bisnis saya. Saya ingin berkonsultasi mengenai paket yang paling sesuai.";

export const FOOTER_WA_MESSAGE =
  "Halo Tampilin.online, saya ingin bertanya tentang layanan Anda.";

/** Pesan saat user klik salah satu paket di Bento Grid. */
export function packageMessage(packageName: string): string {
  return `Halo Tampilin.online, saya tertarik dengan paket ${packageName}. Bisa dijelaskan lebih detail?`;
}

/** Input minimal kalkulator untuk menyusun pesan estimasi. */
type EstimateInput = {
  packageId: string;
  packageName: string;
  additionalPages: number;
  additionalProducts: number;
  copywriting: boolean;
  seoAdvanced: boolean;
  customIntegration: boolean;
  maintenance: boolean;
  domainHosting: boolean;
  urgency: boolean;
  subtotal: number;
  maintenanceMonthly: number;
  total: number;
};

/** Konversi boolean ke jawaban "Ya"/"Tidak" untuk baris pesan WA. */
function yaTidak(value: boolean): string {
  return value ? "Ya" : "Tidak";
}

/** Pesan estimasi dinamis dari kalkulator harga — format README 13.4. */
export function estimateMessage(input: EstimateInput): string {
  const domainHosting = input.domainHosting
    ? `Ya — 1 tahun, ${formatRupiah(300000)}`
    : "Tidak";

  const lines = [
    "Halo Tampilin.online, saya ingin estimasi untuk:",
    "",
    `Paket: ${input.packageName}`,
    `Halaman tambahan: ${input.additionalPages}`,
    `Produk tambahan: ${input.additionalProducts}`,
    `Copywriting: ${yaTidak(input.copywriting)}`,
    `SEO Lanjutan: ${yaTidak(input.seoAdvanced)}`,
    `Integrasi Kustom: ${yaTidak(input.customIntegration)}`,
    `Domain & Hosting: ${domainHosting}`,
    `Urgensi: ${yaTidak(input.urgency)}`,
    "",
    `Subtotal: ${formatRupiah(input.subtotal)}`,
  ];

  if (input.maintenanceMonthly > 0) {
    lines.push(
      `Biaya Berulang: ${formatRupiah(input.maintenanceMonthly)}/bulan (maintenance)`,
    );
  }

  lines.push(
    "",
    `Total Estimasi: ${formatRupiah(input.total)}`,
    "",
    "Mohon info lebih lanjut.",
  );

  return lines.join("\n");
}
