import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo";

/**
 * robots.txt — global rules + explicit group untuk AI crawlers
 * (visibilitas di AI search: ChatGPT, Claude, Perplexity, Google AI Overviews).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    host: SITE.url,
    sitemap: `${SITE.url}/sitemap.xml`,
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/"],
      },
      {
        // Grup terpisah: beberapa AI crawler punya interpretasi rules sendiri,
        // jadi sebutkan eksplisit dengan rules yang sama.
        userAgent: ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended"],
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/"],
      },
    ],
  };
}
