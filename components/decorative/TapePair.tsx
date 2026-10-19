import { cn } from "@/lib/utils";

/**
 * TapePair (revisi user) — sepasang selotip kertas WARNA sebagai dekorasi
 * section, melempaui motif "stiker" yang biasanya hanya ada di hero/FinalCTA.
 *
 * Asal-usul: user meminta 2 shape putih (selotip di atas stiker) diberi
 * warna, lalu dipasang sepasang di setiap section.
 *
 * Aturan wajib (tetap sama seperti dekorasi lain):
 * - Murni dekorasi: pointer-events-none + select-none + aria-hidden.
 * - Absolute → TIDAK pernah mengubah layout (aman untuk layout lock).
 * - `-z-10` → selalu di belakang konten, hanya terlihat di area kosong.
 * - `hidden lg:block` → layar 360px tetap bersih & ringan.
 * - Warna lewat token Tailwind (tidak ada hex di komponen).
 */
export function TapePair({
  className,
  tone = "bg-yellow",
  tone2 = "bg-pink",
}: {
  /** Kelas posisi: absolute + koordinat (mis. "left-6 top-6"). */
  className?: string;
  /** Warna selotip pertama. */
  tone?: string;
  /** Warna selotip kedua. */
  tone2?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute -z-10 hidden select-none lg:block",
        className,
      )}
    >
      <span
        className={cn(
          "block h-4 w-14 -rotate-12 border-2 border-ink",
          tone,
        )}
      />
      <span
        className={cn(
          "mt-1.5 ml-10 block h-4 w-9 rotate-12 border-2 border-ink",
          tone2,
        )}
      />
    </div>
  );
}
