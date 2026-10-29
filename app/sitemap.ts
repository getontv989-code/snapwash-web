import type { MetadataRoute } from "next";
import { getAllPaths, paths } from "@/lib/locations";
import { getPosts } from "@/lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://snapwash.io";
  const locations = await getAllPaths();
  return [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/drive`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/cleaners`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}${paths.hub()}`, changeFrequency: "weekly", priority: 0.8 },
    ...locations.map((l) => ({ url: `${base}${l.path}`, changeFrequency: "weekly" as const, priority: l.shop ? 0.5 : 0.7 })),
    { url: `${base}/blog`, changeFrequency: "weekly", priority: 0.7 },
    ...getPosts().map((p) => ({ url: `${base}/blog/${p.slug}`, lastModified: p.updated ?? p.date, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
