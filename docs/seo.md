# 📈 SEO — Tampilin.online

> Dokumen operasional SEO teknis (v1.0.0). Target: website siap diindeks Google,
> bukan sekadar meta tag tempelan. Semua config SEO terpusat di `lib/seo.ts`
> dan `lib/schema.ts` — jangan biarkan meta tag tersebar lintas file.

---

## 1. Tower of SEO On-Page (Status Saat Ini)

| Item | Status | Lokasi |
|---|---|---|
| `metadataBase` absolut | ✅ | `app/layout.tsx` |
| `title.default` + `title.template` | ✅ | `app/layout.tsx` |
| Meta description (Bahasa Indonesia) | ✅ | `lib/seo.ts` → layout |
| Meta keywords | ✅ | `DEFAULT_KEYWORDS` |
| Canonical absolut | ✅ | `alternates.canonical: "/"` |
| Open Graph (type, locale id_ID, url, site_name, image 1200×630) | ✅ | layout + `app/opengraph-image.tsx` |
| Twitter Card (`summary_large_image`, `@anandcaprio`) | ✅ | layout |
| robots meta (`index, follow`, `max-image-preview: large`) | ✅ | layout |
| `robots.txt` (AI crawlers eksplisit) | ✅ | `app/robots.ts` |
| `sitemap.xml` (tanpa anchor) | ✅ | `app/sitemap.ts` + `generateSitemapEntries()` |
| JSON-LD (Organization, WebSite, Service, FAQPage) | ✅ | `lib/schema.ts` → `components/seo/JsonLd.tsx` |
| Favicon (ico multi-size) + apple-touch-icon | ✅ | `public/brand/` |
| Security headers (`nosniff`, `DENY`, Referrer-Policy) | ✅ | `next.config.js` |
| `verification.google` | ⏳ placeholder — isi SETELAH verifikasi (lihat § 2) | `app/layout.tsx` (komentar) |

Prinsip yang dipegang:
- **Satu sumber kebenaran** — SEMUA nilai meta turunan dari `SITE`, bukan hard-code per file.
- **Ilustrasi flattening SEO di schema**: harga `Offer` diambil dari `lib/pricing.ts`
  — harga di schema = harga di UI, mustahil mismatch.
- **Tanpa `LocalBusiness`** (jasa online tanpa lokasi fisik), **tanpa** `aggregateRating`
  atau `review` palsu.
- **Anchor `#paket` TIDAK di sitemap** — Google tidak mengindeks fragment.

---

## 2. Verifikasi Google Search Console (MANUAL — wajib oleh pemilik domain)

### Opsi A — DNS TXT Record (Direkomendasikan)
1. Buka [Google Search Console](https://search.google.com/search-console) → **Add Property** → **Domain** (bukan URL-prefix).
2. Masukkan `tampilin.online`.
3. Salin TXT record yang diberikan: `google-site-verification=...`
4. Tambahkan TXT record di penyedia DNS domain (di mana domain dibeli) — host `@`, TTL default.
5. Tunggu propagasi (5 menit – 24 jam), klik **Verify**.
6. **Tidak perlu ubah kode apa pun** — verifikasi di level DNS.

### Opsi B — HTML Meta Tag (Fallback)
Setelah mendapat kode verifikasi, buka `app/layout.tsx` lalu isi baris komentar:
```typescript
verification: { google: "kode-dari-search-console" },
```
Deploy ulang → klik Verify di GSC. (Kurang direkomendasikan karena terikat deploy.)

---

## 3. Submit Sitemap ke Google
1. Setelah properti verified di GSC → menu **Sitemaps**.
2. Masukkan `sitemap.xml` → Submit.
3. Status akan Listed ("Success"); halaman baru biasanya diindeks dalam **3–14 hari**.
4. Pantau **Coverage** report — halaman satu pun harus "Indexed".

Bisa juga prioritas ping: `https://www.google.com/ping?sitemap=https://tampilin.online/sitemap.xml`

---

## 4. Validasi JSON-LD
1. Buka `https://validator.schema.org` → pilih tab **Raw Input**.
2. Copy isi salah satu `<script type="application/json-ld">` dari view-source
   `https://tampilin.online`.
3. Paste → Validate — semuanya harus **0 errors**; warning minor boleh.
4. Alt tool visual: [Google Rich Results Test](https://search.google.com/test/rich-results) —
   untuk FAQPage strip rich-result snippet mungkin tidak diberikan (batas Google 2026),
   tapi schema tetap valid & membantu pemahaman mesin.

Lokasi schema di kode: `lib/schema.ts`. Semua node `@id` absolut + referensi
`/#organization` agar terbaca sebagai satu knowledge graph.

---

## 5. Test OG Image & Sharing
- **Facebook/LinkedIn**: https://developers.facebook.com/tools/debug/ → paste URL →
  Scrape Again (untuk purge cache).
- **Twitter/X**: gunakan `curl -A "Twitterbot" https://tampilin.online` atau
  Post Inspector LinkedIn.
- OG dinamis di-build otomatis: `app/opengraph-image.tsx` (1200×630 PNG saat build).
- **Copy statis** di `public/images/og/og-image.png` — di-refresh dari hasil dynamic
  route saat build; perintah manual:
  ```bash
  curl -s https://tampilin.online/opengraph-image -o public/images/og/og-image.png
  ```
  Berguna untuk LinkedIn/testing yang tak menghormati dynamic routes atau embed
  langsung file statis. Referensi config: `SITE.ogImage` di `lib/seo.ts`.

---

## 6. Checklist Pre-Deploy SEO (run manual tiap rilis besar)
- [ ] `npm run build` sukses tanpa error.
- [ ] `https://tampilin.online/sitemap.xml` — hanya URL halaman indexable.
- [ ] `https://tampilin.online/robots.txt` — Host + Sitemap + AI crawlers eksplisit.
- [ ] View-source: canonical, og:*, twitter:* lengkap; **4 JSON-LD**; tanpa duplikat.
- [ ] Keempat JSON-LD lolos validator.schema.org.
- [ ] OG image tampil 1200×630 via Sharing Debugger.
- [ ] Lighthouse SEO ≥ 95 (Chrome DevTools → Lighthouse → Category SEO).
- [ ] Mobile 360px — tanpa horizontal scroll (UI tidak diubah by design).

---

## 7. Catatan Realistis
- **SEO bukan magic**: indeks first-page biasanya **3–14 hari** setelah sitemap
  disubmit; ranking kompetitif (`jasa pembuatan website`) butuh **berbulan-bulan**
  content + backlink.
- Sinyal ranking utama v1: page speed, semantik heading, schema, CTA WhatsApp
  (user signal), dan kejelasan billing — jangan sempalkan keyword di semua tempat
  (justru over-optimization).

## 8. Roadmap
| Fase | Item | Catatan README |
|---|---|---|
| v1.1.1 | Analytics Plausible/Umami + event `whatsapp_click`, `package_select`, `estimate_submit` | V1.4 |
| v1.2 | Blog / artikel edukasi (MDX) — konten keyword habitat UMKM | V1.5 |
| v1.3 | Halaman detail portofolio — masing-masing `metadata` sepage per URL + breadcrumb schema | V1.2 |
| v1.4 | Backlink: Google Business Profile (jasa), directory, media lokal | — |
| v1.5 | Multi-page company profile (`/tentang`, `/layanan`, `/kontak`) — tiap halaman punya canonical sendiri; update `generateSitemapEntries()` | V1.3 |
| v2 | hreflang jika nanti ada bahasa Inggris (iklan luar negeri) | — |

---

## 9. File SEO lalu Apa Artinya
| File | Fungsi |
|---|---|
| `lib/seo.ts` | `SITE`, `DEFAULT_KEYWORDS`, `siteUrl()`, `generateSitemapEntries()` |
| `lib/schema.ts` | builders `organizationSchema`, `websiteSchema`, `serviceSchema`, `faqSchema()` |
| `components/seo/JsonLd.tsx` | renderer `<script type="application/ld+json">` native |
| `app/layout.tsx` | root metadata + `viewport` terpisah |
| `app/page.tsx` | metadata page-level (title/canonical saja — jangan set key parsial openGraph di sini!) |
| `app/robots.ts` | robots.txt + AI crawlers |
| `app/sitemap.ts` | generator sitemap via helper |
| `app/opengraph-image.tsx` | OG image dinamis (1200×630, satori) |
| `next.config.js` | security headers global |
| `public/brand/` | `favicon.ico` (16/32/48), `apple-touch-icon.png` (180), `logo-horizontal.svg` |

> **⚠️ Pitfall tercatat:** field meta bersifat **replace-whole-object** antara layout
> & page. Page `openGraph: { url }` menghapus `type/locale/siteName/title` dari
> layout — jadi di `app/page.tsx` hanya set `title` + `alternates.canonical`.
