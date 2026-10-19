import type { Metadata } from "next";
import { AboutGame } from "@/components/about/AboutGame";
import { JsonLd } from "@/components/shared/JsonLd";
import { personSchema } from "@/lib/schema";

// Metadata page-level: title + description + canonical. Description unik
// 155 karakter. JANGAN set openGraph parsial di sini (object page menggantikan
// object layout — lihat docs/seo.md).
export const metadata: Metadata = {
  title: { absolute: "Kenalan Sama Ananta — Orang di Balik Tampilin.online" },
  description:
    "Perjalanan Ananta membuat Tampilin.online: dari belajar koding sampai melayani UMKM, sales, dan freelancer — diceritakan sebagai visual novel interaktif.",
  alternates: {
    canonical: "/about",
  },
};

/**
 * Halaman /about — visual novel interaktif. HANYA compose; seluruh logic
 * game ada di components/about/AboutGame.tsx.
 *
 * Person schema (E-E-A-T): jobTitle "Web Developer" faktual. alumniOf dan
 * LinkedIn sengaja TIDAK diisi sampai data verifikasi tersedia dari pemilik
 * (aturan: jangan memalsukan kredensial) — isi nanti di lib/schema.ts.
 * knowsAbout menyusul daftar teknologi pada narasi gamenya.
 */
export default function AboutPage() {
  return (
    <main id="konten" className="bg-cream">
      <JsonLd
        data={personSchema({
          name: "Ananta",
          jobTitle: "Web Developer — Tampilin.online",
          bio: "Pembuat Tampilin.online, jasa pembuatan website untuk UMKM, sales, freelancer, dan bisnis.",
          knowsAbout: [
            "pembuatan website UMKM",
            "landing page",
            "Next.js",
            "React",
            "Python",
            "C++",
            "PHP",
          ],
          image: "/images/aboutme_pixel/profile.png",
        })}
      />
      <AboutGame />
    </main>
  );
}
