import { SitePage, SitePageH2, SitePageList } from "@/components/pages/SitePage";

/** Konten kebijakan privasi — jujur & sesuai kondisi situs saat ini. */
export function PrivacyContent() {
  return (
    <SitePage
      eyebrow="Informasi"
      title="Kebijakan Privasi"
      updated="18 Oktober 2026"
    >
      <p>
        Privasi Anda penting bagi kami. Kebijakan ini menjelaskan data apa yang
        (tidak) dikumpulkan situs Tampilin.online dan bagaimana data Anda
        diperlakukan.
      </p>

      <SitePageH2>1. Data yang dikumpulkan</SitePageH2>
      <p>
        Situs ini tidak menyediakan form yang menyimpan data pribadi, dan tidak
        menyimpan nama, nomor telepon, atau isi chat Anda. Satu-satunya
        interaksi data adalah ketika Anda menekan tombol kontak:
      </p>
      <SitePageList>
        <li>
          Tombol/klik <strong>&quot;Konsultasi via WhatsApp&quot;</strong> akan
          membuka aplikasi WhatsApp dengan pesan awal yang sudah disiapkan. Nama
          dan isi chat Anda selanjutnya berada di WhatsApp, bukan di situs ini.
        </li>
        <li>
          Klik pada tautan media sosial hanya membuka platform terkait
          (Instagram/TikTok) — situs ini tidak menerima data apa pun dari
          pihak tersebut.
        </li>
      </SitePageList>

      <SitePageH2>2. Cookies &amp; pelacakan</SitePageH2>
      <p>
        Situs ini tidak memasang cookie pelacakan dan (per tanggal pembaruan)
        belum menggunakan tool analitik pihak ketiga seperti Google Analytics.
        Jika kelak ada perubahan, bagian ini akan diperbarui sebelum tool
        aktif.
      </p>

      <SitePageH2>3. Layanan pihak ketiga</SitePageH2>
      <SitePageList>
        <li>
          <strong>Hosting:</strong> situs ini di-hosting di platform Vercel.
        </li>
        <li>
          <strong>Font:</strong> Google Fonts dimuat via Next.js dengan
          penyematan mandiri (self-hosted), bukan request langsung ke Google
          saat halaman dibuka pengunjung.
        </li>
        <li>
          <strong>WhatsApp:</strong> konsultasi dan komunikasi sepenuhnya
          berada di platform WhatsApp, dengan kebijakan privasinya masing-masing.
        </li>
      </SitePageList>

      <SitePageH2>4. Anak di bawah umur</SitePageH2>
      <p>
        Layanan kami ditujukan untuk pelaku usaha dan profesional. Kami tidak
        dengan sengaja mengumpulkan data anak di bawah umur.
      </p>

      <SitePageH2>5. Pertanyaan &amp; permintaan</SitePageH2>
      <p>
        Kebijakan ini dibuat manual dan bukan nasihat hukum. Jika Anda punya
        pertanyaan terkait privasi, hubungi kami langsung via WhatsApp
        (+62 877-1605-8371) — tanpa form, tanpa jembatan keledai.
      </p>
    </SitePage>
  );
}
