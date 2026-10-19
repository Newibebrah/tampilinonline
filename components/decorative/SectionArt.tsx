import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * SectionArt (FASE 4 migrasi pastel v2.1) — ilustrasi kartun dekoratif
 * dari /public/asset_decor(_context), ditempel MELINGKAR section tanpa
 * mengubah layout (absolute, tidak ada elemen flow baru).
 *
 * Aturan wajib:
 * - pointer-events-none + select-none + aria-hidden → murni dekorasi.
 * - `hidden` di mobile (sm:block / lg:block) → layar 360px tetap bersih.
 * - Parent section wajib `relative isolate`; art memakai -z-10 → selalu
 *   DI BELAKANG kartu/teks (terlihat hanya di area kosong section).
 * - width/height eksplisit + w-[...] className → TIDAK pernah gepeng
 *   (aspect ratio terjaga; object-cover tidak dipakai).
 * - TANPA CSS filter apa pun (aturan prompt FASE 4).
 */
export function SectionArt({
  src,
  className,
  priority = false,
}: {
  src: string;
  /** Kelas posisi + ukuran: absolute koordinat + w-*. */
  className: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={src}
      alt=""
      aria-hidden="true"
      width={768}
      height={768}
      priority={priority}
      className={cn(
        "pointer-events-none absolute -z-10 hidden select-none",
        className,
      )}
    />
  );
}
