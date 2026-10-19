import { SitePage, SitePageH2, SitePageList } from "@/components/pages/SitePage";

/** Konten syarat & ketentuan — singkat & sesuai layanan yang benar-benar ada. */
export function TermsContent() {
  return (
    <SitePage
      eyebrow="Informasi"
      title="Syarat & Ketentuan"
      updated="18 Oktober 2026"
    >
      <p>
        Ketentuan ini berlaku untuk penggunaan situs Tampilin.online dan
        menjadi dasar pemahaman atas layanan pembuatan website yang kami
        tawarkan.
      </p>

      <SitePageH2>1. Penggunaan situs</SitePageH2>
      <p>
        Seluruh konten di situs ini (teks, gambar, contoh &quot;Demo Concept&quot;)
        bersifat informatif dan mayoritas merupakan konsep desain — bukan
        portofolio klien yang sebenarnya. Anda tidak diperkenankan mengambil
        atau menggunakan ulang konten dan desain situs ini untuk keperluan
        komersial tanpa izin tertulis.
      </p>

      <SitePageH2>2. Harga &amp; lingkup layanan</SitePageH2>
      <SitePageList>
        <li>
          Harga paket yang tertera adalah <strong>harga awal</strong> (mulai
          dari). Harga final ditetapkan setelah kebutuhan diperiksa saat
          konsultasi.
        </li>
        <li>
          Domain &amp; hosting dihitung terpisah; copywriting tersedia sebagai
          layanan tambahan (add-on).
        </li>
        <li>
          Fitur, jumlah item (produk/galeri), dan jumlah revisi mengikuti
          lingkup paket yang disepakati — didokumentasikan di dalam penawaran
          sebelum pengerjaan dimulai.
        </li>
        <li>
          Biaya tambahan apa pun selalu dikonfirmasi lebih dulu sebelum
          dikerjakan — tidak ada biaya tersembunyi di tengah jalan.
        </li>
      </SitePageList>

      <SitePageH2>3. Materi dari pelanggan</SitePageH2>
      <p>
        Logo, foto, teks, dan materi lain yang Anda kirimkan adalah milik
        Anda. Anda menjamin bahwa Anda berhak menggunakan materi tersebut, dan
        kami hanya memakainya untuk membangun website Anda.
      </p>

      <SitePageH2>4. Hasil akhir &amp; serah terima</SitePageH2>
      <p>
        Setelah peluncuran, Anda menerima akses, kredensial, dan panduan
        singkat. Website menjadi tanggung jawab penuh Anda; dukungan lanjutan
        tersedia melalui paket maintenance opsional.
      </p>

      <SitePageH2>5. Tautan pihak ketiga</SitePageH2>
      <p>
        Situs ini memakai tautan ke WhatsApp, Instagram, dan TikTok. Setiap
        platform memiliki ketentuan penggunaan sendiri, yang tidak kami
        kendalikan.
      </p>

      <SitePageH2>6. Perubahan ketentuan</SitePageH2>
      <p>
        Ketentuan ini dapat diperbarui sewaktu-waktu. Versi terbaru selalu
        tersedia di halaman ini dengan tanggal pembaruan yang tertera di atas.
      </p>

      <SitePageH2>7. Kontak</SitePageH2>
      <p>
        Ada pertanyaan soal ketentuan ini? Diskusikan langsung via WhatsApp
        (+62 877-1605-8371) sebelum menyepakati paket.
      </p>
    </SitePage>
  );
}
