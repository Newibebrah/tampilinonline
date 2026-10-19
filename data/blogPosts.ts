import type { BlogPost } from "@/types";

/**
 * Blog — sumber kebenaran artikel. Setiap artikel:
 * - metaTitle absolut 50–60 karakter & metaDescription unik 150–160 (cek scripts/check-meta.mjs).
 * - Punya jawaban atomik `tldr` (40–60 kata) untuk cuplikan AI/search.
 * - H2/H3 berbasis pertanyaan (question-based) — sesuai cara orang mencari.
 * - Wajib minimal 3 tautan internal (blok `links`).
 * - SEMUA klaim harus fakta internal situs (harga, lama kerja, revisi) —
 *   tidak ada statistik fiktif.
 */

export const blogPosts: BlogPost[] = [
  {
    slug: "cara-memilih-jasa-website-umkm",
    title: "Cara Memilih Jasa Pembuatan Website untuk UMKM",
    metaTitle: "Cara Memilih Jasa Pembuatan Website untuk UMKM (2026)",
    metaDescription:
      "Cara memilih jasa pembuatan website UMKM: pertanyaan penting sebelum DP, ciri penawaran profesional, jebakan harga murah, dan yang disiapkan sebelum produksi.",
    excerpt:
      "Jangan bayar DP sebelum membaca ini: 7 pertanyaan untuk jasa pembuatan website UMKM, ciri penawaran profesional, dan jebakan harga termurah.",
    tldr:
      "Pilih jasa pembuatan website yang memberi penawaran tertulis berisi lingkup kerja, harga, timeline, dan aturan revisi. Pastikan Anda mendapat kendali penuh atas domain, hosting, dan kode website. Minta preview sebelum launch, dan minimal dua putaran revisi. Hindari penawaran yang hanya bicara harga tetapi tidak bisa menjelaskan isi pekerjaan per tahap.",
    keywords: [
      "jasa pembuatan website umkm",
      "cara memilih jasa website",
      "website umkm murah",
      "penawaran jasa website",
    ],
    datePublished: "2026-10-01",
    dateModified: "2026-10-15",
    readingMinutes: 6,
    image: "/images/portfolio/portfolio-umkm.svg",
    imageAlt:
      "Ilustrasi contoh website UMKM dengan katalog produk dan tombol pesan",
    content: [
      {
        type: "p",
        text: "Banyak pemilik usaha sudah lancar di media sosial, tetapi kotak website-nya terus tertunda karena satu hal: bingung memilih jasa pembuatan yang aman. Kekhawatirannya wajar — memesan website mirip memilih kontraktor. Kalau Anda membayar dulu dan baru menilai belakangan, yang menyesal adalah pemilik usahanya. Panduan ini menyusun pertanyaan-pertanyaan yang harus dijawab jelas oleh siapapun yang Anda pertimbangkan, supaya keputusan Anda berdasar penawaran, bukan rayuan harga.",
      },
      {
        type: "h2",
        text: "Kenapa UMKM masih butuh website sendiri?",
      },
      {
        type: "p",
        text: "Media sosial sudah membantu banyak UMKM memasarkan dagangan, tetapi seluruh aktivitas penjualan tumpang tindih di satu tempat yang tidak Anda kendalikan: chat tertimbun, katalog tersebar per unggahan, calon pembeli harus menggulir balik untuk mencari harga. Website menggantikan itu semua dengan loket resmi yang Anda penguasai: katalog tetap rapi, jam operasional, lokasi, dan tombol pesan yang tidak pernah hilang digeser unggahan baru. Ketika orang mencari nama usaha Anda, hasil resmi Anda yang muncul — bukan profil yang dimodifikasi orang lain.",
      },
      {
        type: "p",
        text: "Bagi banyak UMKM, satu link website juga berfungsi sebagai sumber informasi tunggal yang dibagikan ke WhatsApp Business, bio Instagram, invoice digital, dan label kemasan. Satu tempat merujuk semuanya — pelanggan tidak perlu menunggu balasan chat hanya untuk tahu harga dan jam buka.",
      },
      {
        type: "h2",
        text: "Pertanyaan apa saja yang harus Anda tanyakan sebelum setuju?",
      },
      {
        type: "p",
        text: "Sebelum menyetujui apapun — apalagi DP — ajukan daftar berikut. Penyedia yang ramah tetapi mengambang menjawabnya sudah cukup jadi pertimbangan; penyedia profesional menjawab dengan lingkup tertulis, bukan kalimat manis.",
      },
      {
        type: "list",
        items: [
          "Apa saja yang termasuk dalam harga — dan apa saja yang tidak (domain, hosting, foto, copywriting)?",
          "Berapa banyak putaran revisi yang termasuk, dan bagaimana jika butuh lebih?",
          "Apakah saya yang memegang kendali domain, hosting, dan kode?",
          "Berapa lama timeline pengerjaan, dan apa saja fase-nya?",
          "Setelah website live, lewat apa saya menghubungi kalian jika ada masalah?",
          "Apakah ada contoh pekerjaan — termasuk konsep desain — yang bisa saya nilai dulu?",
          "Apakah website akan dites di layar ponsel kecil? Mayoritas pelanggan UMKM datang dari WhatsApp dan media sosial, bukan dari layar besar.",
        ],
      },
      {
        type: "h3",
        text: "Apakah harga termurah selalu paling hemat?",
      },
      {
        type: "p",
        text: "Tidak selalu. Harga rendah tanpa lingkup yang jelas biasanya berujung dua jalur yang sama-sama mahal: mendasar dicoret diam-diam dari pengerjaan (responsif berantakan, struktur konten acak), atau biaya tambahan muncul belakangan setelah website sudah setengah jadi. Ukurannya bukan harga termurah, melainkan harga yang masuk akal karena rinciannya jelas. Penawaran yang baik berani menyebut apa yang TIDAK termasuk, karena itu artinya mereka tahu ada bagian yang harus dihitung terpisah."
      },
      {
        type: "h3",
        text: "Bagaimana ciri penawaran yang profesional?",
      },
      {
        type: "list",
        items: [
          "Lingkup kerja dipecah per deliverable: desain, konten, integrasi WhatsApp, deployment",
          "Timeline per fase — misalnya landing page 3–5 hari kerja",
          "Aturan revisi ditulis tegas, misalnya maksimal dua putaran",
          "Syarat pembayaran jelas — umumnya DP 50%, sisanya setelah disetujui",
          "Kepemilikan asset ditegaskan: domain, hosting, konten, dan kode milik Anda",
        ],
      },
      {
        type: "h2",
        text: "Berapa lama proses pembuatannya?",
      },
      {
        type: "p",
        text: "Untuk kebutuhan UMKM umumnya cukup skala kecil: landing page selesai 3–5 hari kerja, company profile 1–2 minggu, e-commerce 2–4 minggu. Timeline pendek bisa bertahan kalau materi sudah ada sejak awal — foto produk, deskripsi dagangan, logo, dan info kontak. Penundaan paling umum justru menunggu konten dari pemilik usaha. Siapkan materi sejak sebelum negosiasi, dan Anda menghemat beberapa hari kerja sekaligus.",
      },
      {
        type: "h2",
        text: "Bagaimana kalau saya belum punya logo dan konten?",
      },
      {
        type: "p",
        text: "Banyak UMKM mulai dari kondisi belum lengkap — itu wajar. Penyedia yang baik membantu menata materi yang sudah Anda punya: foto handphone pun cukup untuk awal, teks draf Anda dirapikan, struktur halaman disiapkan dari daftar produk Anda. Tetapi bedakan yang termasuk dan yang tidak: menata konten berbeda dengan membuatnya dari nol (desain logo baru, penulisan marketing, fotografi profesional). Jangan mengira semuanya sudah otomatis mencakup — tanyakan lebih dulu supaya tidak ada biaya kejut di kemudian hari.",
      },
      {
        type: "h2",
        text: "Bagaimana membandingkan penawaran dengan cepat?",
      },
      {
        type: "p",
        text: "Letakkan penawaran bersebelahan, lalu bandingkan baris demi baris: lingkup, timeline, revisi, kepemilikan akun, dan cara komunikasi setelah launch. Penawaran mana pun yang tidak bisa menjelaskan tiga hal itu layak Anda coret dari daftar kandidat. Setelah bandingkan, uji transaksinya: ajak kandidat terpilih menjelaskan fase pengerjaan dari hari pertama sampai website live — jika penjelasan lancar, kemungkinan besar pengerjaannya rapi juga.",
      },
      {
        type: "h2",
        text: "Bagaimana memulainya di Tampilin.online?",
      },
      {
        type: "p",
        text: "Jika sedang membandingkan kandidat, mulai dari halaman paket untuk melihat lingkup tiap tingkat, lalu gunakan simulator harga untuk menghitung perkiraan biaya sesuai kebutuhan. Setelah itu baca ringkasan langkah pengerjaan per fase supaya Anda tahu apa yang terjadi sejak penawaran disetujui sampai website live di ponsel pelanggan.",
      },
      {
        type: "h2",
        text: "Kesimpulan singkat memilih jasa website UMKM",
      },
      {
        type: "p",
        text: "Memilih jasa pembuatan website untuk UMKM bukan soal menemukan penawaran termurah, melainkan soal menemukan lingkup yang jelas: apa yang dibuat, kapan selesai, sampai berapa kali boleh revisi, dan siapa yang memegang akunnya. Kalau semua itu tertulis rapi sebelum DP dibayar, risiko Anda sudah turun drastis. Sisanya menilai cara komunikasi: penyedia yang menjawab pertanyaan teknis dengan tenang biasanya mengerjakan pekerjaan dengan tenang juga.",
      },
      {
        type: "links",
        items: [
          { label: "Lihat rincian paket dan harganya", href: "/#paket" },
          { label: "Simulator perkiraan harga website", href: "/#simulasi" },
          {
            label: "Panduan biaya membuat website di 2026",
            href: "/blog/biaya-membuat-website-2026",
          },
          {
            label: "Perbedaan landing page, company profile, dan e-commerce",
            href: "/blog/landing-page-company-profile-ecommerce",
          },
          {
            label: "Studi kasus website katalog online (demo)",
            href: "/portofolio/katalog-online",
          },
        ],
      },
    ],
  },
  {
    slug: "biaya-membuat-website-2026",
    title: "Berapa Biaya Membuat Website di 2026?",
    metaTitle: "Berapa Biaya Membuat Website di 2026? Panduan Lengkap",
    metaDescription:
      "Biaya membuat website 2026: harga paket mulai Rp499.000, domain & hosting terpisah, maintenance opsional Rp150.000 per bulan, dan biaya konten pendukung.",
    excerpt:
      "Rincian biaya membuat website di 2026: harga paket, domain & hosting, maintenance opsional, biaya konten — plus cara menghitung budget tahun pertama.",
    tldr:
      "Biaya membuat website di 2026 terbagi empat: harga paket jasa (mulai Rp499.000 untuk landing page), langganan domain dan hosting tahunan yang diketahui terpisah, biaya konten pendukung seperti foto dan teks bila dibutuhkan, serta maintenance opsional. Hitung semua sebagai pengeluaran tahun pertama, bukan pilih-pilih harga DP sederhana.",
    keywords: [
      "biaya membuat website 2026",
      "biaya buat website",
      "harga jasa website",
      "biaya domain hosting",
    ],
    datePublished: "2026-10-05",
    dateModified: "2026-10-16",
    readingMinutes: 6,
    image: "/images/solution/solution-illustration.svg",
    imageAlt:
      "Ilustrasi website sebagai kantor digital bisnis yang selalu terhubung dengan pelanggan",
    content: [
      {
        type: "p",
        text: "Pertanyaan \"berapa biaya buat website?\" terdengar sederhana, tetapi jawabannya selalu membawa satu persoalan: orang membandingkan harga dari dua penawaran isi berbeda. Satu sudah menghitung domain dan hosting, satunya belum; satu menawarkan foto profesional, satunya menaruh konten dari foto handphone. Artikel ini memecah semua komponen biaya membuat website di 2026 supaya Anda bisa membandingkan penawaran dengan takaran yang sama. Yang dijual jujur bukan angka termurah, tetapi angka yang bisa dipertanggungjawabkan.",
      },
      {
        type: "h2",
        text: "Berapa rentang harga jasa pembuatan website saat ini?",
      },
      {
        type: "p",
        text: "Komponen terbesar adalah harga paket jasa. Untuk kebutuhan personal dan UMKM kecil, landing page satu halaman biasanya paling termurah — contohnya mulai Rp499.000. Makin besar lingkupnya, makin naik harganya: company profile multi-halaman dan e-commerce dengan fitur khusus menuntut waktu pengerjaan lebih lama. Yang perlu Anda cari bukan harga terendah, melainkan harga yang disertai penjelasan: jumlah halaman, integrasi yang ada, standar responsivitas, dan dukungan setelah launch.",
      },
      {
        type: "h2",
        text: "Biaya apa saja yang tidak termasuk di harga paket?",
      },
      {
        type: "p",
        text: "Ini bagian yang paling sering membuat kejutan setelah launch, dan pertanyaan ini wajib ditanyakan duluan. Pada umumnya harga paket adalah bayaran untuk pembuatan, sedangkan biaya-biaya berikut dihitung terpisah karena beroperasi di layanan ketiga:",
      },
      {
        type: "list",
        items: [
          "Domain: dibayar tahunan ke registrar, harga sesuai ekstensi dan promo penyedia",
          "Hosting: langganan tahunan sesuai kapasitas dan penyedia yang dipilih",
          "Foto produk profesional: opsional, tapi menaikkan kualitas visual secara signifikan",
          "Revisi di atas kuota yang disepakati — umumnya maksimal dua putaran included",
          "Fitur khusus di luar lingkup: payment gateway, login member, sistem reservasi, dan perpanjangan",
        ],
      },
      {
        type: "h3",
        text: "Apakah domain dan hosting bisa sekalian disiapkan?",
      },
      {
        type: "p",
        text: "Bisa — malah itu cara yang sehat, tapi syaratnya domain dan hosting harus masuk penawaran sebagai rincian pembiayaan terpisah, hitaman. Yang lebih penting dari angkanya adalah kepemilikan akunnya: pastikan domain dan hosting terdaftar atas nama atau bisnis Anda sendiri. Dengan begitu, jika kelak Anda pindah penyedia, website yang meraih identitas suasana bagin ikut pindah penuh — bukan terkunci orang lain tangan.",
      },
      {
        type: "h2",
        text: "Berapa biaya maintenance per bulan?",
      },
      {
        type: "p",
        text: "Setelah launch, maintenance biasanya opsional dan dihitung bulanan. Intensitasnya tergantung seberapa sering website Anda diubah: ganti harga, tambah produk baru, unggah foto kampanye. Sebagai ukuran konteks di pasaran: maintenance opsional mulai sekitar Rp150.000 per bulan untuk update konten ringan dan pemantauan. Tanpa maintenance website tetap bisa hidup, hanya saja Anda menjadi lebih proaktif mengelola update sendiri atau memanfaatkan jasa lain yang penawarannya jelas.",
      },
      {
        type: "h2",
        text: "Bagaimana cara menghitung total budget tahun pertama?",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Tetapkan paket sesuai lingkup kebutuhan (landing page, company profile, atau e-commerce)",
          "Tambahkan estimasi domain + hosting tahunan dari penawaran Anda",
          "Masukkan biaya konten: foto produk, teks promosi, logo — jika belum punya",
          "Cadangkan biaya maintenance hanya jika konten akan sering berubah",
          "Periksakan aturan revisi — tidak biaya kejut di akhir proyek",
        ],
      },
      {
        type: "p",
        text: "Dengan menghitung mulai dari sisi \"tahun pertama utuh\", penawaran yang tampak murah bisa ternyata mahal, dan yang tampak mahal bisa ternyata hemat. Perbandingan ini jauh lebih adil daripada mengedepankan satu angka di awal.",
      },
      {
        type: "h2",
        text: "Bagaimana memakai simulator untuk menghitung kebutuhan sendiri?",
      },
      {
        type: "p",
        text: "Daripada menebak, gunakan simulator harga yang menghitung langsung dari jawaban Anda: jenis halaman, fitur yang dibutuhkan, dan tingkat konten. Hasilnya berupa rentang perkiraan — bukan angka final — tetapi cukup tajam untuk menyaring penawaran yang masuk akal sebelum Anda berbicara dengan penyedia apa pun. Setelah itu baca FAQ rings untuk pertanyaan umum soal timeline, revisi, dan pembayaran.",
      },
      {
        type: "h2",
        text: "Apakah harga bisa berubah setelah penawaran disetujui?",
      },
      {
        type: "p",
        text: "Bisa, asal lingkupnya yang berubah — dan itu wajar selama batasnya tertulis sejak awal. Aturan umum yang sehat: revisi maksimal dua putaran dalam lingkup yang disepakati, sementara fitur di luar lingkup (halaman baru, integrasi tambahan, penataan konten ekstra) selalu disertai angka baru yang jelas. Yang tidak sehat justru penawaran yang tidak punya aturan revisi sama sekali, karena biaya kejut hanya menunggu waktu. Ajukan pertanyaan miring itu sebelum menyetujui penawaran pertama.",
      },
      {
        type: "h3",
        text: "Bagaimana menekan biaya tanpa menurunkan kualitas?",
      },
      {
        type: "p",
        text: "Cara paling aman menghemat biaya membuat website di 2026 adalah memangkas lingkup, bukan memangkas kualitas pembuatnya: mulai dari satu halaman yang mengerjakan tugas paling penting, lalu bangun perlahan saat anggaran dan data cukup. Foto pun belum harus foto studio — cahaya jendela dan latar polos sudah cukup untuk menjual. Teks yang jujur dari pemilik usaha jauh lebih kuat daripada halaman kosong yang berbunyi indah: satu halaman jujur mengalahkan lima halaman kosong.",
      },
      {
        type: "list",
        items: [
          "Mulai dari satu halaman yang menjual, bukan fitur yang belum ada penawarannya",
          "Gunakan foto HP dengan cahaya baik — upgrade belakangan",
          "Siapkan draf teks sendiri sejauh mungkin, biarkan penyedia menata",
          "Tunda fitur khusus (payment gateway, reservasi) sampai ada permintaan nyata",
        ],
      },
      {
        type: "links",
        items: [
          { label: "Simulator harga — hitung sendiri dalam 1 menit", href: "/#simulasi" },
          {
            label: "Cara memilih jasa pembuatan website untuk UMKM",
            href: "/blog/cara-memilih-jasa-website-umkm",
          },
          {
            label: "Perbedaan landing page, company profile, dan e-commerce",
            href: "/blog/landing-page-company-profile-ecommerce",
          },
          { label: "FAQ — revisi, timeline, dan pembayaran", href: "/#faq" },
          { label: "Paket & harga lengkap", href: "/#paket" },
        ],
      },
    ],
  },
  {
    slug: "landing-page-company-profile-ecommerce",
    title: "Landing Page, Company Profile, dan E-Commerce: Bedanya",
    metaTitle: "Landing Page, Company Profile, E-Commerce: Bedanya",
    metaDescription:
      "Bedanya landing page, company profile, dan e-commerce: fungsi, kapan yang cocok untuk sales atau UMKM, dan cara memilih mulai dari satu halaman ke toko online.",
    excerpt:
      "Landing page, company profile, atau e-commerce? Panduan memilih jenis website sesuai tujuan: menjual satu hal, membangun kepercayaan, atau menerima pesanan.",
    tldr:
      "Landing page adalah satu halaman dengan satu tujuan: menutup satu penawaran. Company profile adalah kumpulan halaman untuk membangun kepercayaan bisnis. E-commerce adalah toko online dengan keranjang dan checkout. Pilih landing page untuk jalur penjualan sederhana, company profile untuk kredibilitas perusahaan, dan e-commerce bila Anda siap mengelola pesanan online.",
    keywords: [
      "perbedaan landing page company profile ecommerce",
      "landing page untuk sales",
      "company profile perusahaan",
      "kapan butuh ecommerce",
    ],
    datePublished: "2026-10-08",
    dateModified: "2026-10-17",
    readingMinutes: 6,
    image: "/images/portfolio/portfolio-ecommerce.svg",
    imageAlt:
      "Ilustrasi contoh website e-commerce dengan keranjang belanja dan alur checkout",
    content: [
      {
        type: "p",
        text: "Tiga istilah yang paling sering muncul saat orang mulai memesan website adalah landing page, company profile, dan e-commerce — tetapi banyak penawar menjelaskannya dengan sangat abstrak. Akibatnya, pemilik usaha bisa membeli paket besar untuk kebutuhan kecil, atau mengambil paket kecil padahal proses penjualannya butuh sistem. Artikel ini mengupas bedanya dari sisi penggunaan, bukan sekadar definisi kamus.",
      },
      {
        type: "h2",
        text: "Apa itu landing page dan siapa yang paling cocok?",
      },
      {
        type: "p",
        text: "Landing page adalah satu halaman dengan satu misi: membawa pengunjung melakukan satu tindakan — memesan, menghubungi, atau mengisi formulir. Semua bagiannya bekerja linear ke satu arah: headline yang jelas, penjelasan manfaat, contoh produk, FAQ singkat, dan tombol WhatsApp besar. Karena itu jenis ini sangat cocok untuk sales yang mempromosikan satu produk, afiliator dengan penawaran khusus, atau usaha dengan satu layanan utama.",
      },
      {
        type: "p",
        text: "Kelebihannya jelas: cepat jadi (umumnya 3–5 hari kerja), lebih hemat, dan mudah diukur — satu halaman, satu indikator keberhasilan. Batasnya juga jelas: landing page tidak dirancang menampung banyak topik. Jika usaha Anda punya banyak produk, banyak layanan, dan banyak cerita, satu halaman akan penuh sesak — saat itu saudara halaman lanjutan dan parent company profile yang Anda perlukan.",
      },
      {
        type: "h2",
        text: "Kapan company profile lebih tepat?",
      },
      {
        type: "p",
        text: "Company profile adalah website multi-halaman yang menyajikan bisnis sebagai satu cerita utuh: siapa Anda, sejarah singkat, daftar layanan atau produk, contoh pekerjaan, dan cara menghubungi. Pengunanya berbeda: rekan bisnis, korporasi, vendor besar, dan calon klien yang menilai kredibilitas sebelum berbelanja. Untuk kontraktor, konsultan, distributor, dan pebisnis proyek yang memenag kerja lewat faktor lain matte daftar price, jenis website ini adalah etalase kredibilitas utamanya — link resmi sering diperlukan saat berlibu dokumen penawaran.",
      },
      {
        type: "p",
        text: "Biaya dan waktu pembuatan lebih tinggi daripada landing page — company profile umumnya 1–2 minggu karena terdiri dari beberapa halaman yang harus konsisten desainnya. Beale, halaman intinya biasanya sederhana: Beranda, Tentang, Layanan, Preview Hasil Kerja, Kontak. Yang memakan waktu bukan banyaknya halaman, melainkan menata isi agar membangun kepercayaan tapi mastré tinggal manfaat sejak pasang first screen.",
      },
      {
        type: "h3",
        text: "Apakah katalog online cukup tanpa keranjang?",
      },
      {
        type: "p",
        text: "Menariknya, banyak toko kecil tidak butuh checkout penuh di tahap awal. Katalog online — website yang menampilkan produk dengan deskripsi, harga, dan tombol pesan WhatsApp — sering sudah cukup kuat, karena proses negosiasi dan pengiriman memang berlangsung di WhatsApp. Keranjang belanja dan pembayaran online baru jadi nilai tambah ketika volume pesanan mulai membuat pengelolaan manual terasa menghambat laju jualan.",
      },
      {
        type: "h2",
        text: "Kapan waktu yang tepat naik ke e-commerce?",
      },
      {
        type: "p",
        text: "E-commerce adalah tingkat paling kompleks: keranjang, checkout, biaya kirim, pengiriman, dan pembayaran online. Modalnya bukan hanya biaya dan waktu pembuatan (umumnya 2–4 minggu), tetapi juga kesiapan operasional: siapa yang mengelola stok, siapa yang memproses pesanan, siapa yang merespons pengembalian. Kalau pesanan Anda masih puluhan per hari via chat, katalog online dengan tombol WhatsApp biasanya lebih praktis. Naik kelas ke e-commerce saat data operasional sudah menunjukkan bahwa jalan manual mulai terbendung.",
      },
      {
        type: "h2",
        text: "Bagaimana aturan praktis memilih mulai dari mana?",
      },
      {
        type: "list",
        items: [
          "Satu produk atau layanan, satu target tindakan → landing page",
          "Banyak layanan, membutuhkan kepercayaan dari pihak resmi → company profile",
          "Produk banyak, butuh katalog dan pencarian produk → katalog online",
          "Pesanan online tinggi, perlu checkout dan pembayaran → e-commerce",
        ],
      },
      {
        type: "p",
        text: "Praktisnya, banyak bisnis memulai dari landing page atau katalog, lalu naik kelas saat kebutuhan dan datanya cukup. Yang penting dipilih dari awal adalah penyedia yang mengerjakan berlimpah per fase — supaya upgrade tidak berarti membangun semua dari nol.",
      },
      {
        type: "h2",
        text: "Berapa biaya dan lama pengerjaan tiap jenis website?",
      },
      {
        type: "p",
        text: "Biaya mengikuti ukuran pekerjaannya: landing page paling murah dan tercepat karena cuma satu halaman dengan satu tujuan, sementara company profile dan e-commerce menuntut lebih banyak halaman, lebih banyak integrasi, dan kesiapan konten yang lebih lengkap. Sebagai contoh jarak waktu: landing page selesai 3–5 hari kerja, company profile 1–2 minggu, dan e-commerce 2–4 minggu. Yang menentukan bukan hanya kapasitas teknis, tetapi juga seberapa banyak keputusan yang harus disepakati sebelum desain mulai digarap.",
      },
      {
        type: "p",
        text: "Biar mudah membandingkan penawaran sebelum bicara harga, perhatikan dua penanda saja: jumlah halaman dan jumlah fitur yang disebut. Penyedia yang tidak sanggup menyebut berapa halaman yang akan dibuat biasanya akan sulit memegang batas waktu juga — penanda kecil yang cukup jujur untuk menilai keseriusan sebuah penawaran website.",
      },
      {
        type: "p",
        text: "Satu catatan praktis: jenis website yang dipilih bukan komitmen seumur hidup. Banyak usaha memulai dari bentuk yang kecil semisal landing page, lalu menambah halaman katalog saat kebutuhan dan pelanggannya tumbuh. Yang menentukan keberhasilan relasi jangka panjang biasanya bukan jenis website awal itu sendiri, melainkan apakah penyedia yang dipilih mampu mengembangkan website secara bertahap tanpa membangun ulang dari nol setiap kali kebutuhan berubah.",
      },
      {
        type: "links",
        items: [
          { label: "Lihat contoh konsep tiap jenis website", href: "/#portofolio" },
          {
            label: "Panduan biaya membuat website 2026",
            href: "/blog/biaya-membuat-website-2026",
          },
          {
            label: "Cara memilih jasa pembuatan website UMKM",
            href: "/blog/cara-memilih-jasa-website-umkm",
          },
          { label: "Bandingkan paket dan harga lengkap", href: "/#paket" },
          {
            label: "Studi kasus katalog online (demo)",
            href: "/portofolio/katalog-online",
          },
        ],
      },
    ],
  },
];

/** Ambil satu post; undefined saat slug tidak ada (page merespons dengan notFound). */
export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

/** Artikel terkait untuk RelatedArticles (maksimal 2). */
export function getRelatedPosts(currentSlug: string, limit = 2): BlogPost[] {
  return blogPosts.filter((post) => post.slug !== currentSlug).slice(0, limit);
}

/** Index blog — artikel terbaru dulu. */
export function getSortedPosts(): BlogPost[] {
  return [...blogPosts].sort(
    (a, b) =>
      new Date(b.dateModified).getTime() - new Date(a.dateModified).getTime(),
  );
}
