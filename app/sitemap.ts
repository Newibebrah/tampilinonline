import type { MetadataRoute } from "next";

/** Sitemap sederhana — satu halaman v1. Submit ke Google Search Console post-deploy. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://tampilin.online",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
