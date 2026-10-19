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
          <a href="/about" className="underline-offset-4 hover:underline">
            Tentang Ananta
          </a>{" "}
          — cerita visual novel pembuat Tampilin.online
        </li>
        <li>
          <a href="/blog" className="underline-offset-4 hover:underline">
            Blog
          </a>{" "}
          — panduan website untuk UMKM, sales, dan bisnis
        </li>
        <li>
          <a href="/blog/cara-memilih-jasa-website-umkm" className="underline-offset-4 hover:underline">
            Cara Memilih Jasa Pembuatan Website untuk UMKM (2026)
          </a>
        </li>
        <li>
          <a href="/blog/biaya-membuat-website-2026" className="underline-offset-4 hover:underline">
            Berapa Biaya Membuat Website di 2026?
          </a>
        </li>
        <li>
          <a href="/blog/landing-page-company-profile-ecommerce" className="underline-offset-4 hover:underline">
            Landing Page, Company Profile, dan E-Commerce: Bedanya
          </a>
        </li>
        <li>
          <a href="/harga" className="underline-offset-4 hover:underline">
            Simulasi Harga — hitung estimasi sendiri secara realtime
          </a>
        </li>
        <li>
          <a href="/portofolio/katalog-online" className="underline-offset-4 hover:underline">
            Studi Kasus (Demo) — Website Katalog Online untuk UMKM
          </a>
        </li>
        <li>
          <a href="/privacy" className="underline-offset-4 hover:underline">
            Kebijakan Privasi
          </a>
        </li>
        <li>
          <a href="/terms" className="underline-offset-4 hover:underline">
            Syarat &amp; Ketentuan
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
            Paket Layanan
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
            Preview
          </a>{" "}
          — contoh konsep desain (Demo Concept)
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
