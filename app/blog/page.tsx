import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/shared/JsonLd";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { PageHero } from "@/components/shared/PageHero";
import { Card } from "@/components/ui/Card";
import { blogIndexSchema, breadcrumbSchema } from "@/lib/schema";
import { getSortedPosts } from "@/data/blogPosts";

/** Metadata /blog — title absolut (metaTitle target 50–60) + description unik. */
export const metadata: Metadata = {
  title: { absolute: "Blog Tips Website UMKM, Sales, & Bisnis — Tampilin" },
  description:
    "Artikel praktis: memilih jasa website UMKM, rincian biaya membuat website 2026, dan menentukan landing page, company profile, atau e-commerce untuk usahamu.",
};

/** Format tanggal Indonesia konsisten untuk UI (data tetap ISO 8601). */
const dateLabel = (iso: string) =>
  new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export default function BlogIndexPage() {
  const posts = getSortedPosts();

  return (
    <>
      <JsonLd data={blogIndexSchema(posts.length)} />
      <JsonLd
        data={breadcrumbSchema([{ name: "Blog", path: "/blog" }])}
      />
      <main id="konten" className="bg-canvas">
        <section className="container relative isolate pb-16 pt-12 md:pb-24 md:pt-16">
          {/* Header Blog & ilustrasi satu kesatuan — style sama persis
              dengan halaman /harga (revisi user). */}
          <PageHero
            eyebrow="Blog"
            title="Panduan Website untuk UMKM, Sales, dan Bisnis."
            description="Jawaban langsung dari pertanyaan yang paling sering masuk: berapa biayanya, mulai dari mana, dan cara memilih jasa yang aman."
            artSrc="/asset_decor_context/asset_blog.png"
            artAlt="Ilustrasi gaya kartun: panduan website untuk pebisnis"
            stickers={[
              { text: "Panduan", tone: "red", rotate: 7, className: "hidden md:block -left-10 top-12" },
              { text: "Terbaru", tone: "surface", rotate: -6, className: "hidden md:block -right-10 bottom-16", floatDelay: 1.1 },
            ]}
          />

          <ScrollReveal className="mt-10 md:mt-14">
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Card
                    as="article"
                    interactive
                    className="flex h-full flex-col overflow-hidden p-0"
                  >
                    <Link
                      href={`/blog/${post.slug}`}
                      className="flex h-full flex-col"
                      aria-label={post.title}
                    >
                      <div className="border-b-2 border-ink bg-canvas">
                        {/* SVG lokal kecil — width/height eksplisit, tanpa CLS */}
                        <Image
                          src={post.image}
                          alt={post.imageAlt}
                          width={640}
                          height={360}
                          className="h-auto w-full"
                          sizes="(min-width: 1024px) 384px, 100vw"
                        />
                      </div>
                      <div className="flex flex-1 flex-col gap-3 p-6">
                        <p className="text-sm text-ink/60">
                          {dateLabel(post.datePublished)} · {post.readingMinutes} menit baca
                        </p>
                        <h2 className="font-display text-lg font-bold leading-snug">
                          {post.title}
                        </h2>
                        <p className="text-sm text-ink/70">{post.excerpt}</p>
                      </div>
                    </Link>
                  </Card>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </section>
      </main>
    </>
  );
}
