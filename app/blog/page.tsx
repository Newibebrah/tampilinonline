import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/shared/JsonLd";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Card } from "@/components/ui/Card";
import { blogIndexSchema, breadcrumbSchema } from "@/lib/schema";
import { getSortedPosts } from "@/data/blogPosts";
import { SectionArt } from "@/components/decorative/SectionArt";

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
        <section className="container relative isolate py-16 md:py-24">
        <SectionArt src="/asset_decor_context/asset_blog.png" className="top-0 right-0 w-28 lg:block lg:w-36" />
          <ScrollReveal>
            <p className="font-display text-sm font-bold uppercase tracking-wide text-pink">
              Blog
            </p>
            <h1 className="mt-3 max-w-2xl font-display text-[clamp(1.75rem,5vw,2.75rem)] font-bold leading-tight text-ink">
              Panduan Website untuk UMKM, Sales, dan Bisnis.
            </h1>
            <p className="mt-4 max-w-xl text-lg text-ink/70">
              Jawaban langsung dari pertanyaan yang paling sering masuk:
              berapa biayanya, mulai dari mana, dan cara memilih jasa yang aman.
            </p>
          </ScrollReveal>

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
