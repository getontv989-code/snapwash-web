import type { MetadataRoute } from "next";
import { getAllPaths, paths } from "@/lib/locations";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://snapwash.io";
  const locations = await getAllPaths();
  return [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/drive`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/cleaners`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}${paths.hub()}`, changeFrequency: "weekly", priority: 0.8 },
    ...locations.map((l) => ({ url: `${base}${l.path}`, changeFrequency: "weekly" as const, priority: l.shop ? 0.5 : 0.7 })),
  ];
}
