"use client";

import { Package, Plus } from "lucide-react";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { usePriceCalculator } from "@/hooks/usePriceCalculator";
import {
  ADDON_PRICES,
  PACKAGE_BASE_LABEL,
  PACKAGE_NAMES,
  SINGLE_PAGE_PACKAGES,
} from "@/lib/pricing";
import { estimateMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import { formatRupiah, cn } from "@/lib/utils";

/**
 * Simulator harga (README Phase 7):
 * form interaktif → hitung real-time → CTA kirim estimasi ke WhatsApp dengan
 * rincian lengkap (format README 13.4).
 *
 * REVISI: section ini kini halaman sendiri /harga (dipindah dari homepage).
 * `headingAs="h1"` dipakai page /harga agar H1 halaman = judul simulator.
 */
export function PriceSimulator({
  headingAs = "h2",
  showHeading = true,
}: {
  headingAs?: "h1" | "h2";
  /** false = heading H1 dirender PageHero terpisah (halaman /harga). */
  showHeading?: boolean;
}) {
  const { state, update, result, includedProducts } = usePriceCalculator();

  const isSinglePage = SINGLE_PAGE_PACKAGES.includes(state.packageId);
  const hasProductQuota =
    state.packageId === "catalog" || state.packageId === "ecommerce";

  const waMessage = estimateMessage({
    packageId: state.packageId,
    packageName: PACKAGE_NAMES[state.packageId],
    additionalPages: isSinglePage ? 0 : state.additionalPages,
    additionalProducts: hasProductQuota ? state.additionalProducts : 0,
    copywriting: state.copywriting,
    seoAdvanced: state.seoAdvanced,
    customIntegration: state.customIntegration,
    maintenance: state.maintenance,
    domainHosting: state.domainHosting,
    urgency: state.urgency,
    subtotal: result.subtotal,
    maintenanceMonthly: result.maintenanceMonthly,
    total: result.total,
  });

  return (
    <section
      id="simulasi"
      aria-labelledby="simulasi-heading"
      className={
        showHeading
          ? "container relative isolate py-16 md:py-24"
          : "container relative isolate pb-16 pt-6 md:pb-24 md:pt-10"
      }
    >
      {!showHeading ? null : (
        <ScrollReveal>
          <SectionHeading
            id="simulasi-heading"
            eyebrow="Simulasi Harga"
            title="Coba hitung sendiri, realtime."
            description="Geser pilihan dan centang kebutuhan — estimasinya langsung muncul. Harga final ditetapkan setelah kebutuhan diperiksa saat konsultasi."
            titleAs={headingAs}
          />
        </ScrollReveal>
      )}

      <div className="mt-10 grid gap-8 md:mt-14 lg:grid-cols-5">
        {/* Form */}
        <ScrollReveal className="lg:col-span-3">
          <form
            aria-label="Kalkulator estimasi harga"
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-5 rounded-card border-2 border-ink bg-surface p-6 shadow-brutal"
          >
            <div className="flex items-center gap-2">
              <Package aria-hidden="true" className="h-5 w-5" />
              <h3 className="font-display text-lg font-bold">Paket Layanan &amp; Tambahkan</h3>
            </div>

            <Select
              id="sim-paket"
              label="Paket Layanan utama"
              value={state.packageId}
              onChange={(e) =>
                update("packageId", e.target.value as typeof state.packageId)
              }
            >
              {(Object.keys(PACKAGE_NAMES) as (keyof typeof PACKAGE_NAMES)[]).map(
                (id) => (
                  <option key={id} value={id}>
                    {PACKAGE_NAMES[id]} — Mulai {PACKAGE_BASE_LABEL[id]}
                  </option>
                ),
              )}
            </Select>

            <Input
              id="sim-pages"
              type="number"
              inputMode="numeric"
              min={0}
              max={10}
              label="Halaman tambahan"
              disabled={isSinglePage}
              value={isSinglePage ? 0 : state.additionalPages}
              onChange={(e) => update("additionalPages", Number(e.target.value))}
              hint={
                isSinglePage
                  ? "Paket ini sudah 1 halaman penuh — tidak dapat ditambah."
                  : `+${formatRupiah(ADDON_PRICES.additionalPage)} / halaman`
              }
            />

            {hasProductQuota ? (
              <Input
                id="sim-products"
                type="number"
                inputMode="numeric"
                min={0}
                max={200}
                label="Produk tambahan"
                value={state.additionalProducts}
                onChange={(e) => update("additionalProducts", Number(e.target.value))}
                hint={`${includedProducts} produk pertama sudah termasuk — selisihnya +${formatRupiah(ADDON_PRICES.additionalProduct)} / produk`}
              />
            ) : null}

            <fieldset className="mt-2 flex flex-col gap-2.5">
              <legend className="mb-2 font-display text-sm font-bold">
                Tambah &amp; layanan
              </legend>

              <Checkbox
                id="sim-copywriting"
                label="Copywriting — teks persuasif dari kami"
                hint={`+${formatRupiah(ADDON_PRICES.copywriting)}`}
                checked={state.copywriting}
                onChange={(e) => update("copywriting", e.target.checked)}
              />
              <Checkbox
                id="sim-seo"
                label="SEO lanjutan — riset kata kunci &amp; optimasi on-page"
                hint={`+${formatRupiah(ADDON_PRICES.seoAdvanced)}`}
                checked={state.seoAdvanced}
                onChange={(e) => update("seoAdvanced", e.target.checked)}
              />
              <Checkbox
                id="sim-integration"
                label="Integrasi kustom — Maps, form, widget, dll."
                hint={`+${formatRupiah(ADDON_PRICES.customIntegration)}`}
                checked={state.customIntegration}
                onChange={(e) => update("customIntegration", e.target.checked)}
              />
              <Checkbox
                id="sim-hosting"
                label="Domain &amp; hosting — kami bantu urus 1 tahun"
                hint={`+${formatRupiah(ADDON_PRICES.domainHosting)} / tahun`}
                checked={state.domainHosting}
                onChange={(e) => update("domainHosting", e.target.checked)}
              />
              <Checkbox
                id="sim-urgency"
                label="Urgensi — pengerjaan prioritas"
                hint={`+${ADDON_PRICES.urgencyMultiplier * 100}% dari subtotal`}
                checked={state.urgency}
                onChange={(e) => update("urgency", e.target.checked)}
              />
              <Checkbox
                id="sim-maintenance"
                label="Maintenance — update konten ringan tiap bulan"
                hint={`+${formatRupiah(ADDON_PRICES.maintenance)} / bulan`}
                checked={state.maintenance}
                onChange={(e) => update("maintenance", e.target.checked)}
              />
            </fieldset>
          </form>
        </ScrollReveal>

        {/* Hasil real-time */}
        <ScrollReveal delay={0.1} className="lg:col-span-2">
          <aside
            aria-label="Estimasi biaya"
            className="lg:sticky lg:top-28 rounded-card border-2 border-ink bg-mint p-6 shadow-brutal"
          >
            <h3 className="font-display text-lg font-bold">Estimasi biaya</h3>

            <dl className="mt-4 flex flex-col gap-2 text-sm">
              <Row label={`Paket ${PACKAGE_NAMES[state.packageId]}`} value={result.base} />
              {result.pagesCost > 0 ? (
                <Row label={`Halaman tambahan ×${state.additionalPages}`} value={result.pagesCost} />
              ) : null}
              {result.productsCost > 0 ? (
                <Row label={`Produk tambahan ×${state.additionalProducts}`} value={result.productsCost} />
              ) : null}
              {state.copywriting ? <Row label="Copywriting" value={ADDON_PRICES.copywriting} /> : null}
              {state.seoAdvanced ? <Row label="SEO lanjutan" value={ADDON_PRICES.seoAdvanced} /> : null}
              {state.customIntegration ? <Row label="Integrasi kustom" value={ADDON_PRICES.customIntegration} /> : null}
            </dl>

            <div className="my-3 border-t-2 border-dashed border-ink" />

            <dl className="flex flex-col gap-2 text-sm">
              <Row label="Subtotal" value={result.subtotal} bold />
              {result.urgencyFee > 0 ? (
                <Row label={`Urgensi (+25%)`} value={Math.round(result.urgencyFee)} />
              ) : null}
              {result.domainHostingFee > 0 ? (
                <Row label="Domain &amp; hosting (1 tahun)" value={result.domainHostingFee} />
              ) : null}
            </dl>

            <p className="mt-5 font-display text-sm font-bold">Total estimasi:</p>
            <p className="mt-1 inline-block bg-red px-2 font-display text-3xl font-extrabold text-ink tracking-tight">
              {formatRupiah(result.total)}
            </p>

            {result.maintenanceMonthly > 0 ? (
              <p className="mt-3 text-ink/70">
                + Biaya berulang:{" "}
                <b>{formatRupiah(result.maintenanceMonthly)}/bulan</b> (maintenance,
                dibayar terpisah)
              </p>
            ) : null}

            <p className="mt-4 text-xs text-ink/50">
              Estimasi bersifat indikatif. Harga final ditetapkan saat konsultasi
              setelah kebutuhan benar-benar sudah dipahami.
            </p>

            <a
              href={buildWhatsAppUrl(waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-card border-[3px] border-ink bg-red px-4 py-3 font-display font-bold shadow-brutal transition-transform hover:translate-x-[2px] hover:translate-y-[2px]"
            >
              <Plus aria-hidden="true" className="h-5 w-5" />
              Kirim Estimasi ke WhatsApp
            </a>
          </aside>
        </ScrollReveal>
      </div>
    </section>
  );
}

function Row({
  label,
  value,
  bold = false,
}: {
  label: string;
  value: number;
  bold?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-baseline justify-between gap-4",
        bold && "font-bold",
      )}
    >
      <dt className={cn("text-ink/70", bold && "text-ink")}>{label}</dt>
      <dd
        className={cn(
          "tabular-nums",
          bold ? "font-display font-bold" : "font-medium",
        )}
      >
        {formatRupiah(value)}
      </dd>
    </div>
  );
}
