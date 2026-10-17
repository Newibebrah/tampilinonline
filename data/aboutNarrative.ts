/**
 * Narasi visual novel halaman /about.
 * Format highlight custom (aman kena typewriter, TANPA HTML mentah):
 * - **teks**  → highlight KUNING (render: bg-yellow, font-bold)
 * - *teks*    → highlight ORANYE (render: text-orange, font-bold)
 */

export type AboutScene = {
  id: number;
  image: string;
  text: string;
};

export const aboutScenes: AboutScene[] = [
  {
    id: 1,
    image: "/images/aboutme_pixel/1-wave.png",
    text: "**Halo semuanya!** Senang sekali rasanya bisa bertemu kalian di sini. Kenalin, aku **Ananta**, orang di balik brand ini. Sebenarnya, nggak banyak hal yang bisa aku ceritakan tentang diriku, tapi rasanya menyenangkan punya kesempatan untuk menyapa kalian secara langsung. Anggap saja ini tempat kecil untuk mengenal orang di balik layar, baris-baris **kode**, dan website yang kalian lihat. Hehe!",
  },
  {
    id: 2,
    image: "/images/aboutme_pixel/2-thumbsup.png",
    text: "Aku berasal dari **Surakarta** dan sekarang sedang menjalani kehidupan sebagai mahasiswa rantau yang menempuh studi **S1 Teknik Informatika**. Seperti kebanyakan mahasiswa rantau lainnya, ada banyak hal yang harus dipikirkan: tugas kuliah, kebutuhan sehari-hari, biaya hidup, sampai urusan **jajan** yang ternyata nggak bisa dianggap sepele. Dari situlah muncul keinginanku untuk mencari **penghasilan tambahan**. Tapi, aku juga nggak ingin sekadar mendapatkan uang. Aku ingin mencoba menerapkan apa yang kupelajari di bangku kuliah ke dalam sesuatu yang benar-benar bisa digunakan orang lain.",
  },
  {
    id: 3,
    image: "/images/aboutme_pixel/3-stressed-laptop.png",
    text: "Lucunya, perjalanan ini cukup jauh dari bayanganku sendiri. Bayangkan saja, aku yang dulunya menghabiskan masa SMA sebagai **anak IPS** dan merasa cukup dekat dengan dunia sosial, tiba-tiba harus berhadapan dengan **syntax**, logika pemrograman, **error** yang entah datang dari mana, dan kode yang rasanya sudah benar, tetapi ternyata masih salah. Kadang bikin frustrasi, kadang bikin **ingin menutup laptop saja**.",
  },
  {
    id: 4,
    image: "/images/aboutme_pixel/4-eureka.png",
    text: "Tapi, justru dari situ aku mulai belajar sesuatu: memahami teknologi bukan cuma soal menghafal syntax atau membuat program berjalan. Ada proses berpikir, kesabaran, kreativitas, dan keberanian untuk terus mencoba meskipun berkali-kali gagal. Perlahan, aku mulai menemukan bagian yang paling menarik bagiku, yaitu **web development**. Aku senang ketika sesuatu yang awalnya hanya berupa ide bisa diubah menjadi **website yang nyata**, punya fungsi, dan membantu orang lain.",
  },
  {
    id: 5,
    image: "/images/aboutme_pixel/5-stressed-books.png",
    text: "Untuk sekarang, beberapa bahasa pemrograman yang mulai kupelajari dan kuakrabi adalah **Python, C++, dan PHP**. Sementara untuk pengembangan website, aku terbiasa menggunakan **React dan Next.js**. Tentu saja, perjalananku masih panjang. Aku masih belajar, masih sering mencari referensi, dan masih punya banyak hal yang ingin kupahami. Bagiku, menjadi developer bukan tentang harus tahu segalanya, melainkan tentang kemauan untuk **terus berkembang** dan menemukan solusi.",
  },
  {
    id: 6,
    image: "/images/aboutme_pixel/6-headphone.png",
    text: "Oh iya, kalau sedang mulai **burnout** karena terlalu lama menatap layar, biasanya musik jadi jalan ninjaku untuk menenangkan pikiran. Ada yang suka mendengarkan **Hindia** juga di sini? Kalau iya, sepertinya kita punya satu topik obrolan tambahan, nih. Hehe.",
  },
  {
    id: 7,
    image: "/images/aboutme_pixel/7-reachout.png",
    text: "Pada akhirnya, aku membangun brand ini bukan hanya untuk mencari penghasilan tambahan, tetapi juga sebagai **ruang untuk bertumbuh**, mengasah kemampuan, dan membuktikan bahwa ilmu yang sedang kupelajari bisa memberi manfaat di dunia nyata. Aku mungkin belum menjadi developer yang hebat, tetapi aku selalu berusaha memberikan perhatian, usaha, dan pelayanan terbaik dalam setiap pekerjaan yang kuambil. Terima kasih sudah meluangkan waktu untuk membaca cerita kecilku sampai akhir. **Salam kenal, dan semoga kita bisa menciptakan sesuatu yang hebat bersama!**",
  },
];

/* ---------------- Parser highlight ---------------- */

export type HighlightStyle = "none" | "yellow" | "orange";

export type HighlightToken = {
  text: string;
  style: HighlightStyle;
};

/**
 * Ubah string berformat **kuning** / *oranye* menjadi token berurutan.
 * Aman untuk teks "setengah diketik": marker yang belum ditutup
 * (mis. "**Halo sedang ngetik") tetap dianggap styled sampai akhir —
 * supaya efek typewriter tidak pernah menampilkan asterisk mentah.
 */
export function parseHighlightTokens(text: string): HighlightToken[] {
  const tokens: HighlightToken[] = [];
  const marker = /\*\*([^*]+)\*\*|\*([^*]+)\*/g;
  let last = 0;
  let match: RegExpExecArray | null;

  while ((match = marker.exec(text)) !== null) {
    if (match.index > last) {
      tokens.push({ text: text.slice(last, match.index), style: "none" });
    }
    tokens.push({
      text: match[1] ?? match[2],
      style: match[1] ? "yellow" : "orange",
    });
    last = match.index + match[0].length;
  }

  // Sisa teks — bisa mengandung marker BELUM ditutup (khas typewriter).
  const remainder = text.slice(last);
  if (remainder) {
    const doubleIdx = remainder.indexOf("**");
    const singleIdx = remainder.indexOf("*");
    if (doubleIdx !== -1) {
      tokens.push({
        text: remainder.slice(0, doubleIdx),
        style: "none",
      });
      tokens.push({ text: remainder.slice(doubleIdx + 2), style: "yellow" });
    } else if (singleIdx !== -1) {
      tokens.push({
        text: remainder.slice(0, singleIdx),
        style: "none",
      });
      tokens.push({ text: remainder.slice(singleIdx + 1), style: "orange" });
    } else {
      tokens.push({ text: remainder, style: "none" });
    }
  }

  return tokens;
}
