import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

/**
 * Shell halaman informatif (Privacy Policy / Terms of Use / Site Map):
 * lebar baca nyaman, struktur heading konsisten, tautan kembali ke beranda.
 */
export function SitePage({
  eyebrow,
  title,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <main id="konten" className="container py-12 md:py-16">
      <article className="mx-auto max-w-2xl">
        <Badge variant="orange">{eyebrow}</Badge>
        <h1 className="mt-4 font-display text-[clamp(1.75rem,6vw,2.5rem)] font-extrabold leading-tight tracking-tight">
          {title}
        </h1>
        <p className="mt-2 text-sm text-ink/60">
          Terakhir diperbarui: {updated}
        </p>

        <div className="mt-8 space-y-5 text-base leading-relaxed text-ink/80">
          {children}
        </div>

        <div className="mt-12 flex items-center justify-between border-t-2 border-dashed border-ink/15 pt-6">
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-card border-2 border-ink bg-cream px-4 py-2 font-display text-sm font-bold text-ink transition-transform hover:translate-x-[2px] hover:translate-y-[2px]"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            Kembali ke Beranda
          </a>
        </div>
      </article>
    </main>
  );
}

/** Sub-judul section di dalam halaman informasi. */
export function SitePageH2({ children }: { children: ReactNode }) {
  return (
    <h2 className="pt-2 font-display text-xl font-bold text-ink">{children}</h2>
  );
}

/** Daftar berbutir dengan penanda kuning ala design system. */
export function SitePageList({ children }: { children: ReactNode }) {
  return (
    <ul className="ml-1 list-outside list-disc space-y-2 pl-4">{children}</ul>
  );
}
