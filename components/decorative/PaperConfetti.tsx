/**
 * PaperConfetti — potongan kertas confetti bergaya kartunis, STATIS.
 *
 * Aturan (dari brief user):
 * - 100% STATIS: tanpa Framer Motion, tanpa useScroll, tanpa animasi CSS.
 * - Murni CSS/SVG inline: TIDAK ADA gambar eksternal.
 * - Warna 100% dari token pastel (pink, blue, mint, yellow, lavender) —
 *   dipakai lewat class `text-*` (fill/stroke = currentColor) dan
 *   `var(--ink)` untuk garis. TIDAK ADA hex di file ini.
 * - `pointer-events-none` + `select-none` + `aria-hidden` → dekorasi murni.
 * - Bentuk: kertas sobek (polygon bergerigi), pita zig-zag, bintang 4 sudut,
 *   squiggle gelombang, lingkaran & setengah lingkaran.
 * - Ukuran ekstrim campuran: sangat kecil (12px), sedang (24px), besar (64px).
 * - Garis ink 2px (non-scaling-stroke) + hard shadow (path salinan digeser).
 * - Area teks H1 & tombol CTA dibiarkan bersih: item duduk di margin kiri /
 *   kanan (<30% dan >70% lebar) atau di band atas/bawah.
 * - Mobile: ~70% item `hidden md:block`; sisanya (pojok) tetap tampil dengan
 *   ukuran lebih kecil → layar 360px tetap ringan & tanpa horizontal scroll.
 *
 * PENTING — TIDAK ADA BENTUK YANG TERGENCET:
 *   Ukuran ditulis sebagai LEBAR (px) saja. TINGGI dihitung dari rasio
 *   viewBox (width / ratio) sehingga proporsi tiap bentuk selalu terjaga
 *   (pita tidak jadi tipis, half-circle tidak gepeng).
 */

type PieceKind = "torn" | "ribbon" | "sparkle" | "squiggle" | "circle" | "half";

type Piece = {
  kind: PieceKind;
  /** Posisi + rotasi (class Tailwind literal) — TANPA ukuran. */
  className: string;
  /** Lebar dalam px; tinggi = w / RATIO[kind]. */
  w: number;
  /** Class warna token pastel (text-* → currentColor). */
  color: string;
  /** Path SVG sesuai jenis bentuk. */
  d: string;
  /** Squiggle = garis tanpa isian. */
  strokeOnly?: boolean;
  /** Hard shadow hanya untuk potongan besar. */
  shadow?: boolean;
};

/* ---------- Path SVG per jenis ---------- */
const TORN =
  "M2 12 L14 4 L28 10 L42 3 L56 11 L70 4 L84 12 L98 6 L100 34 L91 42 " +
  "L100 50 L87 58 L95 66 L79 72 L63 65 L49 74 L35 65 L19 73 L8 63 " +
  "L0 70 L4 52 L0 43 L7 33 Z";
const RIBBON =
  "M0 30 L20 8 L40 30 L60 8 L80 30 L100 8 L100 26 L80 48 L60 26 " +
  "L40 48 L20 26 L0 48 Z";
const SPARKLE = "M50 0 L58 42 L100 50 L58 58 L50 100 L42 58 L0 50 L42 42 Z";
const SQUIGGLE = "M4 32 Q 20 4 36 32 T 68 32 T 100 32";
const HALF = "M2 48 A48 48 0 0 1 98 48 Z";
const CIRCLE = "M50 4 A46 46 0 1 1 49.9 4 Z";

/* ---------- viewBox & rasio (tinggi dihitung dari sini) ---------- */
const VIEWBOX: Record<PieceKind, string> = {
  torn: "0 0 100 80",
  ribbon: "0 0 100 56",
  sparkle: "0 0 100 100",
  squiggle: "0 0 104 36",
  circle: "0 0 100 100",
  half: "0 0 100 48",
};

/** Lebar : tinggi viewBox tiap bentuk. */
const RATIO: Record<PieceKind, number> = {
  torn: 100 / 80,
  ribbon: 100 / 56,
  sparkle: 1,
  squiggle: 104 / 36,
  circle: 1,
  half: 100 / 48,
};

/* ---------- Konfigurasi sebaran (organik, hindari zona tengah) ---------- */
const PIECES: Piece[] = [
  /* Band atas — pojok kiri & kanan, jauh dari H1 */
  {
    kind: "torn",
    className: "left-[2%] top-[15%] -rotate-[18deg]",
    w: 48,
    color: "text-pink",
    d: TORN,
    shadow: true,
  },
  {
    kind: "sparkle",
    className: "left-[12%] top-[3%] rotate-[15deg]",
    w: 24,
    color: "text-yellow",
    d: SPARKLE,
  },
  {
    kind: "circle",
    className: "left-[19%] top-[9%]",
    w: 12,
    color: "text-blue",
    d: CIRCLE,
  },
  {
    kind: "torn",
    className: "right-[4%] top-[7%] rotate-[12deg]",
    w: 56,
    color: "text-mint",
    d: TORN,
    shadow: true,
  },
  {
    kind: "ribbon",
    className: "right-[14%] top-[3%] -rotate-[8deg]",
    w: 64,
    color: "text-lavender",
    d: RIBBON,
    shadow: true,
  },
  {
    kind: "squiggle",
    className: "right-[24%] top-[11%] rotate-[6deg]",
    w: 48,
    color: "text-yellow",
    d: SQUIGGLE,
    strokeOnly: true,
  },

  /* Margin kiri — area tengah vertikal */
  {
    kind: "torn",
    className: "left-[5%] top-[26%] rotate-[9deg]",
    w: 64,
    color: "text-lavender",
    d: TORN,
    shadow: true,
  },
  {
    kind: "circle",
    className: "left-[11%] top-[38%]",
    w: 10,
    color: "text-pink",
    d: CIRCLE,
  },
  {
    kind: "ribbon",
    className: "left-[2%] top-[46%] rotate-[22deg]",
    w: 44,
    color: "text-blue",
    d: RIBBON,
  },
  {
    kind: "half",
    className: "left-[8%] top-[56%] -rotate-[12deg]",
    w: 40,
    color: "text-yellow",
    d: HALF,
  },
  {
    kind: "sparkle",
    className: "left-[15%] top-[64%] rotate-[30deg]",
    w: 20,
    color: "text-mint",
    d: SPARKLE,
  },
  {
    kind: "torn",
    className: "left-[3%] top-[72%] -rotate-[14deg]",
    w: 48,
    color: "text-blue",
    d: TORN,
  },

  /* Margin kanan — area tengah vertikal */
  {
    kind: "squiggle",
    className: "right-[3%] top-[28%] -rotate-[10deg]",
    w: 56,
    color: "text-pink",
    d: SQUIGGLE,
    strokeOnly: true,
  },
  {
    kind: "sparkle",
    className: "right-[9%] top-[40%] -rotate-[20deg]",
    w: 24,
    color: "text-lavender",
    d: SPARKLE,
  },
  {
    kind: "circle",
    className: "right-[4%] top-[50%]",
    w: 12,
    color: "text-mint",
    d: CIRCLE,
  },
  {
    kind: "torn",
    className: "right-[6%] top-[60%] rotate-[16deg]",
    w: 56,
    color: "text-yellow",
    d: TORN,
    shadow: true,
  },
  {
    kind: "ribbon",
    className: "right-[13%] top-[70%] -rotate-[24deg]",
    w: 52,
    color: "text-pink",
    d: RIBBON,
    shadow: true,
  },
  {
    kind: "half",
    className: "right-[2%] top-[78%] rotate-[14deg]",
    w: 34,
    color: "text-blue",
    d: HALF,
  },

  /* Merapat ke tengah (tapi tetap di luar kolom teks) */
  {
    kind: "torn",
    className: "left-[24%] top-[18%] rotate-[24deg]",
    w: 40,
    color: "text-mint",
    d: TORN,
  },
  {
    kind: "circle",
    className: "right-[26%] top-[22%]",
    w: 10,
    color: "text-lavender",
    d: CIRCLE,
  },
  {
    kind: "sparkle",
    className: "left-[22%] top-[84%] -rotate-[12deg]",
    w: 16,
    color: "text-pink",
    d: SPARKLE,
  },
  {
    kind: "sparkle",
    className: "right-[23%] top-[86%] rotate-[18deg]",
    w: 20,
    color: "text-blue",
    d: SPARKLE,
  },

  /* Band bawah — sudut, jauh dari ilustrasi karakter (tengah) */
  {
    kind: "torn",
    className: "left-[7%] bottom-[6%] -rotate-[10deg]",
    w: 40,
    color: "text-mint",
    d: TORN,
  },
  {
    kind: "ribbon",
    className: "left-[18%] bottom-[3%] rotate-[10deg]",
    w: 56,
    color: "text-lavender",
    d: RIBBON,
  },
  {
    kind: "torn",
    className: "right-[8%] bottom-[5%] rotate-[12deg]",
    w: 48,
    color: "text-pink",
    d: TORN,
  },
  {
    kind: "circle",
    className: "right-[17%] bottom-[8%]",
    w: 12,
    color: "text-yellow",
    d: CIRCLE,
  },
  {
    kind: "squiggle",
    className: "right-[4%] bottom-[2%] rotate-[8deg]",
    w: 48,
    color: "text-blue",
    d: SQUIGGLE,
    strokeOnly: true,
  },
  {
    kind: "circle",
    className: "left-[2%] bottom-[14%]",
    w: 10,
    color: "text-yellow",
    d: CIRCLE,
  },
];

/* 6 item sisakan untuk mobile (pojok, diperkecil); sisanya hidden md:block */
const MOBILE_VISIBLE = new Set([0, 1, 3, 4, 16, 18]);
/** Poin mobile dikecilkan ~60% agar layar 360px tetap lapang. */
const MOBILE_SCALE = 0.6;

function PieceNode({ piece, index }: { piece: Piece; index: number }) {
  const mobile = MOBILE_VISIBLE.has(index);
  const width = mobile ? Math.round(piece.w * MOBILE_SCALE) : piece.w;
  const height = Math.round(width / RATIO[piece.kind]);
  const strokeWidth = piece.strokeOnly ? 9 : 2;

  return (
    <svg
      viewBox={VIEWBOX[piece.kind]}
      aria-hidden="true"
      // Lebar & tinggi eksplisit (px) → proporsi viewBox terjaga, tidak
      // pernah tergencet/terpres.
      style={{ width, height }}
      className={[
        "pointer-events-none absolute select-none",
        piece.color,
        mobile ? "" : "hidden md:block",
        piece.className,
      ].join(" ")}
    >
      {/* Hard shadow — salinan path digeser 4px, warna ink (potongan besar) */}
      {piece.shadow ? (
        piece.strokeOnly ? (
          <path
            d={piece.d}
            fill="none"
            stroke="var(--ink)"
            strokeWidth={strokeWidth + 5}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            transform="translate(4 4)"
          />
        ) : (
          <path
            d={piece.d}
            fill="var(--ink)"
            transform="translate(4 4)"
          />
        )
      ) : null}

      {/* Bentuk utama */}
      {piece.strokeOnly ? (
        <path
          d={piece.d}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      ) : (
        <path
          d={piece.d}
          fill="currentColor"
          stroke="var(--ink)"
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      )}
    </svg>
  );
}

export function PaperConfetti() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden"
    >
      {PIECES.map((piece, index) => (
        <PieceNode key={index} piece={piece} index={index} />
      ))}
    </div>
  );
}
