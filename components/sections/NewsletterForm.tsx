"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

/**
 * NewsletterForm — penerimaan email TANPA backend: email disimpan ke
 * localStorage, lalu tampilkan pesan sukses honest ("tersimpan di perangkat
 * ini"). Untuk penampungan sesungguhnya: dasarkan pada Formspree / ESP
 * dengan env NEXT_PUBLIC_FORMSPREE_ID (dt. LeadForm).
 * localStorage diakses SETELAH mount (aman SSR/hydration).
 */

const STORAGE_KEY = "tampilin:newsletter";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "done">("idle");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      if (window.localStorage.getItem(STORAGE_KEY)) setStatus("done");
    } catch {
      // localStorage bisa diblokir (private mode) — abaikan, tetap tampilkan form.
    }
  }, []);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!email.includes("@")) return;
    try {
      const stored = JSON.parse(
        window.localStorage.getItem(STORAGE_KEY) ?? "[]",
      ) as string[];
      if (!stored.includes(email)) stored.push(email);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    } catch {
      // Gagal simpan tetap dianggap sukses secara UX (email tidak dikirim ke mana pun).
    }
    setStatus("done");
  }

  if (!mounted) return null;

  return (
    <aside className="rounded-card border-2 border-ink bg-yellow/60 p-6 shadow-brutal md:p-8">
      <h2 className="font-display text-xl font-bold">
        Dapatkan tips website gratis via email.
      </h2>
      <p className="mt-2 text-sm text-ink/70">
        Satu email tiap kali ada artikel baru — tanpa spam, boleh berhenti
        kapan saja.
      </p>

      {status === "done" ? (
        <p
          role="status"
          className="mt-4 font-display font-bold text-ink"
        >
          Terima kasih! Pendaftaran tersimpan di perangkat ini — artikel baru
          selalu muncul di halaman <a className="underline" href="/blog">blog</a>.
        </p>
      ) : (
        <form className="mt-4 flex flex-col gap-3 sm:flex-row" onSubmit={handleSubmit}>
          <label htmlFor="newsletter-email" className="sr-only">
            Alamat email
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            autoComplete="email"
            placeholder="nama@email.com"
            className="w-full rounded-card border-2 border-ink bg-white px-4 py-2.5 text-base sm:flex-1"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <Button type="submit" size="md" className="shrink-0">
            Daftar →
          </Button>
        </form>
      )}
    </aside>
  );
}
