import Link from "next/link";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Card } from "@/components/ui/Card";
import type { BlogPost } from "@/types";

/**
 * RelatedArticles — rekomendasi artikel lain (internal link graph ≥3 per
 * artikel telah dijamin oleh blok `links` di data, ini pelengkap).
 */
export function RelatedArticles({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;

  return (
    <ScrollReveal className="mt-12">
      <h2 className="font-display text-xl font-bold">
        Baca juga artikel lainnya.
      </h2>
      <ul className="mt-5 grid gap-4 md:grid-cols-2">
        {posts.map((post) => (
          <li key={post.slug}>
            <Card interactive className="h-full">
              <Link href={`/blog/${post.slug}`} className="flex h-full flex-col gap-2">
                <span className="text-sm text-ink/60">{post.readingMinutes} menit baca</span>
                <span className="font-display font-bold leading-snug">
                  {post.title}
                </span>
                <span className="text-sm text-ink/70">{post.excerpt}</span>
                <span className="mt-auto pt-3 font-display text-sm font-bold text-pink">
                  Baca artikel →
                </span>
              </Link>
            </Card>
          </li>
        ))}
      </ul>
    </ScrollReveal>
  );
}
