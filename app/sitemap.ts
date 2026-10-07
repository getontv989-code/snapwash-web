import type { MetadataRoute } from "next";
import { BASE, getAllShops, getStates, isSampleOnly, shopPath } from "@/lib/locations";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://snapwash.io";
  const pages: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/drive`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/cleaners`, changeFrequency: "monthly", priority: 0.8 },
  ];
  // Location pages; pages holding only sample shops are noindex, so they stay out
  const loc = (path: string, priority: number) => ({ url: `${base}${path}`, changeFrequency: "weekly" as const, priority });
  if (!isSampleOnly(getAllShops())) pages.push(loc(BASE, 0.8));
  for (const st of getStates()) {
    if (!isSampleOnly(st.shops)) pages.push(loc(st.path, 0.7));
    for (const ci of st.cities) {
      if (!isSampleOnly(ci.shops)) pages.push(loc(ci.path, 0.7));
      for (const nb of ci.neighborhoods) {
        if (!isSampleOnly(nb.shops)) pages.push(loc(nb.path, 0.6));
        for (const s of nb.shops) if (!s.sample) pages.push(loc(shopPath(s), 0.5));
      }
    }
  }
  return pages;
}
