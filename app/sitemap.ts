import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://snapwash.io";
  return [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/drive`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/cleaners`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/blog`, changeFrequency: "weekly", priority: 0.7 },
    ...getPosts().map((p) => ({ url: `${base}/blog/${p.slug}`, lastModified: p.updated ?? p.date, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
