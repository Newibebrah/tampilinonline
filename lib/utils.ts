import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Gabung className dengan tailwind-merge (class konflik otomatis dirapikan). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format angka ke Rupiah: 899000 → "Rp899.000" (tanpa spasi, konsisten dgn label harga). */
export function formatRupiah(value: number): string {
  const formatted = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
  // Intl "id-ID" output "Rp 899.000" → rapatkan ke "Rp899.000".
  return formatted.replace(/^Rp\s+/, "Rp");
}
