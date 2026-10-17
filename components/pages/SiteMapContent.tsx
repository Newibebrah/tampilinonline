import { SitePage, SitePageH2, SitePageList, } from "@/components/pages/SitePage";

/** Site Map (page HTML) — daftar semua halaman & bagian situs. */
export function SiteMapContent() {
  return (
    <SitePage eyebrow="Informasi" title="Site Map" updated="18 Oktober 2026">
      <p>
        Struktur lengkap Tampilin.online — semua halaman dan bagian dalam satu
        halaman awal (one-page website).
      </p>

      <SitePageH2>Halaman</SitePageH2>
      <SitePageList>
        <li>
          <a href="/" className="underline-offset-4 hover:underline">
            Beranda
          </a>{" "}
          — halaman utama, semua informasi layanan
        </li>
        <li>
          <a href="/privacy" className="underline-offset-4 hover:underline">
            Privacy Policy
          </a>
        </li>
        <li>
          <a href="/terms" className="underline-offset-4 hover:underline">
            Terms of Use
          </a>
        </li>
        <li>
          Site Map — halaman ini
        </li>
        <li>
          Sitemap XML (untuk mesin pencari):{" "}
          <a
            href="/sitemap.xml"
            className="underline-offset-4 hover:underline"
          >
            tampilin.online/sitemap.xml
          </a>
        </li>
      </SitePageList>

      <SitePageH2>Bagian di halaman Beranda</SitePageH2>
      <SitePageList>
        <li>
          <a href="/#paket" className="underline-offset-4 hover:underline">
            Paket &amp; Harga
          </a>{" "}
          — 6 paket layanan dari Rp499.000
        </li>
        <li>
          <a href="/#proses" className="underline-offset-4 hover:underline">
            Proses Kerja
          </a>{" "}
          — 8 langkah dari konsultasi sampai serah terima
        </li>
        <li>
          <a href="/#portofolio" className="underline-offset-4 hover:underline">
            Portofolio
          </a>{" "}
          — contoh konsep desain (Demo Concept)
        </li>
        <li>
          <a href="/#simulasi" className="underline-offset-4 hover:underline">
            Simulasi Harga
          </a>{" "}
          — hitung estimasi sendiri secara realtime
        </li>
        <li>
          <a href="/#faq" className="underline-offset-4 hover:underline">
            FAQ
          </a>{" "}
          — pertanyaan yang sering ditanyakan
        </li>
        <li>
          <a href="/#masalah" className="underline-offset-4 hover:underline">
            Masalah
          </a>{" "}
          — kenapa usaha butuh website
        </li>
        <li>
          <a href="/#solusi" className="underline-offset-4 hover:underline">
            Solusi
          </a>{" "}
          — 4 keunggulan website buatan Tampilin.online
        </li>
      </SitePageList>
    </SitePage>
  );
}
