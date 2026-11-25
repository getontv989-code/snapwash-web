/* Laundry photography, self-hosted in public/people. Delivery and pickup slots show packed, folded clean laundry
   (Pexels photos 4440574, 6466228, 8346226, 7310204, 9185814); the rest are stills from Pexels photos and 4K Pexels
   footage of a busy professional laundry. All Pexels License, free for commercial use, cropped and given one studio
   grade (neutral whites, lifted navy shadows). Two widths each. */

type Photo = { name: string; widths: [number, number]; alt: string };

/** Builds src/srcSet for a photo in public/people. */
export function photoSet(p: Photo) {
  const url = (w: number) => `/people/${p.name}-${w}.webp`;
  return { src: url(p.widths[0]), srcSet: p.widths.map((w) => `${url(w)} ${w}w`).join(", ") };
}

export const PHOTOS = {
  door: { name: "packed-door", widths: [800, 1600], alt: "A neat stack of freshly folded shirts, packed and ready to hand over" },
  van: { name: "packed-road", widths: [600, 1200], alt: "A laundry pro carrying a tall stack of crisp folded white towels" },
  shop: { name: "team-unload", widths: [800, 1600], alt: "Two laundry pros unloading fresh linens from an industrial washer" },
  fresh: { name: "packed-proof", widths: [600, 1200], alt: "A delivered order of folded clean clothes, stacked and ready" },
  pickup: { name: "packed-pickup", widths: [600, 1200], alt: "Hands smoothing a stack of folded clean T-shirts" },
  dropoff: { name: "drive-dropoff", widths: [600, 1200], alt: "A loaded industrial washer at a partner laundry" },
  handover: { name: "packed-handover", widths: [600, 1200], alt: "Hands passing over a stack of freshly folded laundry" },
  team: { name: "cleaners-team", widths: [800, 1600], alt: "Rows of industrial washers and laundry carts at a partner laundry" },
  label: { name: "cleaners-label", widths: [400, 560], alt: "A laundry pro loading an industrial dryer" },
} satisfies Record<string, Photo>;

/** Small round portraits used as human touches around the page. */
export const AVATARS = { driver: "/people/driver.webp", cleaner: "/people/cleaner.webp" };
