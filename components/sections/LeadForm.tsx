"use client";

import { useMemo, useState } from "react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { packages } from "@/data/packages";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { SectionArt } from "@/components/decorative/SectionArt";
import { TapePair } from "@/components/decorative/TapePair";

/**
 * LeadForm — diversifikasi konversi (jangan 100% WhatsApp).
 * 3 langkah: identitas → kebutuhan → kontak & pesan.
 * - Jalankan utama: buka WhatsApp dengan pesan terstruktur (tanpa backend).
 * - Jalankan kedua (opsional): kirim via email.
 *   • NEXT_PUBLIC_FORMSPREE_ID → POST fetch ke Formspree.
 *   • NEXT_PUBLIC_CONTACT_EMAIL → mailto: fallback.
 *   Keduanya env-gated: TIDAK ada alamat email yang dikarang.
 */

const BUDGET_RANGES = [
  "Belum tahu — mohon bantu estimasi",
  "Di bawah Rp1.000.000",
  "Rp1.000.000 – Rp2.500.000",
  "Rp2.500.000 – Rp5.000.000",
  "Di atas Rp5.000.000",
] as const;

const STEPS = 3;

// Env READ-ONLY di sisi client — Next inline saat build, aman.
const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

type FormData = {
  nama: string;
  jenisBisnis: string;
  paket: string;
  budget: string;
  kontak: string;
  pesan: string;
};

const initialData: FormData = {
  nama: "",
  jenisBisnis: "",
  paket: "",
  budget: BUDGET_RANGES[0],
  kontak: "",
  pesan: "",
};

export function LeadForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(initialData);
  const [emailStatus, setEmailStatus] = useState<
    "idle" | "sending" | "sent" | "failed"
  >("idle");

  const set = (key: keyof FormData) => (value: string) =>
    setData((prev) => ({ ...prev, [key]: value }));

  const message = useMemo(() => {
    const lines = [
      "Halo Tampilin.online, saya mengisi formulir konsultasi:",
      "",
      `Nama: ${data.nama}`,
      `Jenis usaha/bisnis: ${data.jenisBisnis}`,
      `Paket yang menarik: ${data.paket || "Belum yakin — mohon rekomendasi"}`,
      `Perkiraan budget: ${data.budget}`,
      `Kontak saya: ${data.kontak}`,
    ];
    if (data.pesan.trim()) lines.push("", `Pesan: ${data.pesan.trim()}`);
    return lines.join("\n");
  }, [data]);

  const waUrl = buildWhatsAppUrl(message);

  const subject = `Konsultasi website — ${data.nama || "(tanpa nama)"}`;

  const canAdvance =
    (step === 1 && data.nama.trim() && data.jenisBisnis.trim()) ||
    (step === 2 && data.paket) ||
    (step === 3 && data.kontak.trim());

  async function sendViaFormspree() {
    if (!FORMSPREE_ID) return;
    setEmailStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _replyto: data.kontak.includes("@") ? data.kontak : undefined,
          nama: data.nama,
          jenisBisnis: data.jenisBisnis,
          paket: data.paket,
          budget: data.budget,
          kontak: data.kontak,
          pesan: data.pesan,
        }),
      });
      setEmailStatus(res.ok ? "sent" : "failed");
    } catch {
      setEmailStatus("failed");
    }
  }

  return (
    <section
      id="konsultasi-form"
      aria-labelledby="konsultasi-form-heading"
      className="container relative isolate bg-canvas py-16 md:py-24"
    >
      <SectionArt src="/asset_decor/asset_character_monster.png" className="rotate-3 bottom-0 right-4 w-44 sm:block lg:w-56" />
      <TapePair className="left-8 top-12" tone="bg-green" tone2="bg-pink" />
      <ScrollReveal>
        <SectionHeading
          id="konsultasi-form-heading"
          eyebrow="Isi Formulir"
          title="Ceritakan kebutuhanmu — 1 menit saja."
          description="Tiga langkah singkat. Hasilnya dikirim sebagai ringkasan rapi — pilih dikirim lewat WhatsApp, atau lewat email bila kamu lebih nyaman."
        />
      </ScrollReveal>

      <ScrollReveal className="mt-10 md:mt-14">
        <div className="mx-auto max-w-xl">
          {/* Indikator langkah a11y */}
          <p
            aria-live="polite"
            className="mb-4 font-display text-sm font-bold text-ink/70"
          >
            Langkah {step} dari {STEPS}
          </p>
          <div
            role="progressbar"
            aria-valuenow={step}
            aria-valuemin={1}
            aria-valuemax={STEPS}
            className="mb-6 h-2 w-full rounded-card border-2 border-ink bg-surface"
          >
            <div
              className="h-full rounded-card bg-mint transition-[width] duration-300"
              style={{ width: `${(step / STEPS) * 100}%` }}
            />
          </div>

          <form
            className="rounded-card border-2 border-ink bg-surface p-6 shadow-brutal md:p-8"
            onSubmit={(event) => {
              event.preventDefault();
              // Submit form tidak melakukan apapun selain CTA di bawah —
              // WhatsApp & email keduanya ikut aksi tombol (tanpa backend).
            }}
          >
            {step === 1 && (
              <fieldset className="flex flex-col gap-5" aria-label="Langkah 1 — identitas">
                <Input
                  id="lead-nama"
                  label="Nama"
                  autoComplete="name"
                  required
                  placeholder="cth. Rian Saputra"
                  value={data.nama}
                  onChange={(event) => set("nama")(event.target.value)}
                />
                <Input
                  id="lead-bisnis"
                  label="Jenis usaha / bisnis"
                  required
                  placeholder="cth. Warung kopi, jasa desain, sales asuransi…"
                  value={data.jenisBisnis}
                  onChange={(event) => set("jenisBisnis")(event.target.value)}
                />
              </fieldset>
            )}

            {step === 2 && (
              <fieldset className="flex flex-col gap-5" aria-label="Langkah 2 — kebutuhan">
                <Select
                  id="lead-paket"
                  label="Paket Layanan yang menarik"
                  required
                  value={data.paket}
                  onChange={(event) => set("paket")(event.target.value)}
                >
                  <option value="" disabled>
                    Pilih paket…
                  </option>
                  <option value="Belum yakin — mohon rekomendasi">
                    Belum yakin — mohon rekomendasi
                  </option>
                  {packages.map((pkg) => (
                    <option key={pkg.id} value={pkg.name}>
                      {pkg.name} — {pkg.priceLabel}
                    </option>
                  ))}
                </Select>
                <Select
                  id="lead-budget"
                  label="Perkiraan budget"
                  value={data.budget}
                  onChange={(event) => set("budget")(event.target.value)}
                >
                  {BUDGET_RANGES.map((range) => (
                    <option key={range} value={range}>
                      {range}
                    </option>
                  ))}
                </Select>
              </fieldset>
            )}

            {step === 3 && (
              <fieldset className="flex flex-col gap-5" aria-label="Langkah 3 — kontak">
                <Input
                  id="lead-kontak"
                  label="Nomor WhatsApp atau email kamu"
                  autoComplete="tel email"
                  required
                  placeholder="cth. 0812-xxxx-xxxx atau nama@email.com"
                  value={data.kontak}
                  onChange={(event) => set("kontak")(event.target.value)}
                />
                <label htmlFor="lead-pesan" className="flex flex-col gap-1.5">
                  <span className="font-display text-sm font-bold">
                    Pesan (opsional)
                  </span>
                  <textarea
                    id="lead-pesan"
                    rows={3}
                    className="w-full rounded-card border-2 border-ink bg-surface px-4 py-2.5 text-base"
                    placeholder="Kebutuhan khusus, deadline, atau pertanyaan lain…"
                    value={data.pesan}
                    onChange={(event) => set("pesan")(event.target.value)}
                  />
                </label>
              </fieldset>
            )}

            {/* Navigasi langkah */}
            <div className="mt-6 flex items-center justify-between gap-4">
              {step > 1 ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setStep((s) => Math.max(1, s - 1))}
                >
                  ← Kembali
                </Button>
              ) : (
                <span />
              )}

              {step < STEPS ? (
                <Button
                  type="button"
                  size="sm"
                  disabled={!canAdvance}
                  onClick={() => setStep((s) => Math.min(STEPS, s + 1))}
                >
                  Lanjut →
                </Button>
              ) : null}
            </div>

            {step === STEPS && (
              <div className="mt-6 border-t-2 border-dashed border-ink pt-6">
                <p className="text-sm text-ink/60">
                  Langkah terakhir — tombol kirim tampil di bawah setelah
                  navigasi ini.
                </p>
              </div>
            )}
          </form>

          {step === STEPS && (
            <div className="mt-6 flex flex-col gap-3">
              {/* Kirim via WhatsApp — jalankan utama */}
              <ButtonLink href={waUrl} size="lg">
                Kirim via WhatsApp →
              </ButtonLink>

              {/* Kirim via Email — hanya aktif jika env tersedia */}
              {FORMSPREE_ID ? (
                <Button
                  variant="secondary"
                  onClick={sendViaFormspree}
                  disabled={emailStatus === "sending"}
                >
                  {emailStatus === "sending"
                    ? "Mengirim…"
                    : emailStatus === "sent"
                      ? "Terkirim ✓ — cek balasan lewat email"
                      : emailStatus === "failed"
                        ? "Gagal — coba WhatsApp, atau ulangi"
                        : "Atau kirim lewat email"}
                </Button>
              ) : CONTACT_EMAIL ? (
                <ButtonLink
                  variant="secondary"
                  href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`}
                >
                  Atau kirim lewat email
                </ButtonLink>
              ) : null}
              <p className="text-sm text-ink/60">
                Dengan mengirim, kamu menyetujui dihubungi kembali untuk
                konsultasi. Lihat <a className="underline" href="/privacy">kebijakan privasi</a>.
              </p>
            </div>
          )}
        </div>
      </ScrollReveal>
    </section>
  );
}
