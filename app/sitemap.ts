import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://snapwash.io";
  return [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/drive`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/cleaners`, changeFrequency: "monthly", priority: 0.8 },
  ];
}
