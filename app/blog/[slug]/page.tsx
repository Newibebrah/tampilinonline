import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/shared/JsonLd";
import { NewsletterForm } from "@/components/sections/NewsletterForm";
import { RelatedArticles } from "@/components/sections/RelatedArticles";
import { getBlogPost, getRelatedPosts, blogPosts } from "@/data/blogPosts";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import type { BlogBlock } from "@/types";

/** Resolve path detail artikel — aman dari slug storage. */
function postPath(slug: string) {
  return `/blog/${slug}`;
}

/** generateStaticParams — dari sumber data; artikel baru otomatis SSG. */
export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return {
    title: { absolute: post.metaTitle },
    description: post.metaDescription,
    alternates: {
      canonical: postPath(post.slug),
    },
  };
}

/* --- Renderer blok konten (server, tanpa dangerouslySetInnerHTML) --- */

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="mt-10 font-display font-bold text-ink text-[1.4rem] md:text-[1.6rem]">
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="mt-8 font-display font-bold text-ink text-lg">
          {block.text}
        </h3>
      );
    case "p":
      return <p className="text-ink/80 leading-relaxed">{block.text}</p>;
    case "list": {
      const Tag = block.ordered ? "ol" : "ul";
      return (
        <Tag
          className={`flex flex-col gap-2 pl-5 text-ink/80 ${
            block.ordered ? "list-decimal" : "list-disc"
          }`}
        >
          {block.items.map((item, index) => (
            <li key={index} className="leading-relaxed">
              {item}
            </li>
          ))}
        </Tag>
      );
    }
    case "links":
      return (
        <nav
          aria-label="Tautan terkait"
          className="rounded-card border-2 border-ink bg-lavender/30 p-5"
        >
          <p className="mb-3 font-display text-sm font-bold uppercase tracking-wide">
            Tautan penting
          </p>
          <ul className="flex flex-col gap-2">
            {block.items.map((item) => (
              <li key={`${item.label}-${item.href}`}>
                <Link href={item.href} className="underline decoration-2 underline-offset-4 hover:text-pink">
                  {item.label} →
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      );
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug);
  const dateLabel = (iso: string) =>
    new Date(iso).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <>
      <JsonLd
        data={articleSchema({
          headline: post.title,
          description: post.metaDescription,
          datePublished: post.datePublished,
          dateModified: post.dateModified,
          path: postPath(post.slug),
          image: post.image,
          authorName: "Ananta",
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Blog", path: "/blog" },
          { name: post.title, path: postPath(post.slug) },
        ])}
      />

      <main id="konten" className="bg-canvas">
        <article className="container max-w-3xl py-16 md:py-20">
          {/* Breadcrumb visual */}
          <nav aria-label="Breadcrumb" className="text-sm text-ink/60">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="underline-offset-4 hover:underline">
                  Beranda
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/blog" className="underline-offset-4 hover:underline">
                  Blog
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-ink">
                {post.title}
              </li>
            </ol>
          </nav>

          <header className="mt-6">
            <h1 className="font-display text-[clamp(1.6rem,5vw,2.5rem)] font-bold leading-tight text-ink">
              {post.title}
            </h1>
            <p className="mt-3 text-sm text-ink/60">
              {dateLabel(post.datePublished)} · {post.readingMinutes} menit baca
              · Diperbarui {dateLabel(post.dateModified)}
            </p>
          </header>

          <Image
            src={post.image}
            alt={post.imageAlt}
            width={1200}
            height={630}
            priority
            className="mt-6 w-full rounded-card border-2 border-ink shadow-brutal"
          />

          {/* Jawaban atomik 40–60 kata untuk featured snippet / AI */}
          <div className="mt-8 rounded-card border-2 border-ink bg-lavender/30 p-6">
            <h2 className="font-display text-base font-bold uppercase tracking-wide">
              Jawaban singkat
            </h2>
            <p className="mt-2 leading-relaxed text-ink/80">{post.tldr}</p>
          </div>

          <div className="mt-6 flex flex-col gap-4">
            {post.content.map((block, index) => (
              <Block key={index} block={block} />
            ))}
          </div>

          <RelatedArticles posts={related} />

          <div className="mt-12">
            <NewsletterForm />
          </div>
        </article>
      </main>
    </>
  );
}
