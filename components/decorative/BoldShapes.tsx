import { cn } from "@/lib/utils";

/**
 * BoldShapes (prompt bold-pastel v3.0 FASE 6) — dekorasi geometris ala
 * Gumroad: bintang burst, plus/cross, lingkaran solid, dan donat.
 * Pastel SOLID (tanpa opacity) dengan garis ink, diletakkan absolute di
 * background section.
 *
 * Wajib: pointer-events-none + select-none + aria-hidden; wrapper -z-10
 * (di belakang konten) + hidden lg:block → parent section harus punya
 * `relative isolate`, dan ukuran shape WAJIB menyertakan h-* dan w-*.
 */

type Tone = "yellow" | "blue" | "pink" | "mint" | "lavender" | "surface" | "red";

const FILL: Record<Tone, string> = {
  red: "var(--red)",
  yellow: "var(--yellow)",
  blue: "var(--blue)",
  pink: "var(--pink)",
  mint: "var(--mint)",
  lavender: "var(--lavender)",
  surface: "var(--surface)",
};

type StarOrCross = { kind: "star" | "cross"; tone: Tone; className: string };
type Circle = { kind: "circle"; tone: Tone; className: string };
type Ring = { kind: "ring"; className: string };
export type BoldShape = StarOrCross | Circle | Ring;

const BURST_POINTS =
  "98,50 67,60 74,92 50,70 26,92 33,60 2,50 33,40 26,8 50,30 74,8 67,40";

function ShapeNode({ shape }: { shape: BoldShape }) {
  if (shape.kind === "star" || shape.kind === "cross") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        className={cn("absolute", shape.className)}
      >
        {shape.kind === "star" ? (
          <polygon
            points={BURST_POINTS}
            fill={FILL[shape.tone]}
            stroke="var(--ink)"
            strokeWidth="6"
            strokeLinejoin="round"
          />
        ) : (
          <path
            d="M40 4 H60 V40 H96 V60 H60 V96 H40 V60 H4 V40 H40 Z"
            fill={FILL[shape.tone]}
            stroke="var(--ink)"
            strokeWidth="5"
            strokeLinejoin="round"
          />
        )}
      </svg>
    );
  }
  if (shape.kind === "circle") {
    return (
      <span
        aria-hidden="true"
        style={{ backgroundColor: FILL[shape.tone] }}
        className={cn("absolute rounded-full border-2 border-ink", shape.className)}
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className={cn("absolute rounded-full border-[6px] border-ink", shape.className)}
    />
  );
}

export function BoldShapes({ shapes }: { shapes: BoldShape[] }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 hidden select-none lg:block"
    >
      {shapes.map((shape, index) => (
        <ShapeNode key={index} shape={shape} />
      ))}
    </div>
  );
}
