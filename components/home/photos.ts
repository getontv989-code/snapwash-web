/* Laundry photography, self-hosted in public/people. Pexels photos (Pexels License: free for commercial use,
   no attribution required), cropped and given one studio grade (neutral whites, lifted navy shadows). Two widths each. */

type Photo = { name: string; widths: [number, number]; alt: string };

/** Builds src/srcSet for a photo in public/people. */
export function photoSet(p: Photo) {
  const url = (w: number) => `/people/${p.name}-${w}.webp`;
  return { src: url(p.widths[0]), srcSet: p.widths.map((w) => `${url(w)} ${w}w`).join(", ") };
}

export const PHOTOS = {
  door: { name: "service", widths: [800, 1600], alt: "A laundry attendant in white gloves holding a stack of freshly folded towels" },
  van: { name: "shirt", widths: [600, 1200], alt: "A crisp white shirt on a hanger" },
  shop: { name: "facility", widths: [800, 1600], alt: "An attendant unloading fresh linens beside industrial washers" },
  fresh: { name: "folded", widths: [600, 1200], alt: "A stack of freshly folded shirts" },
  pickup: { name: "drive-pickup", widths: [600, 1200], alt: "Clean white shirts on hangers, ready to go" },
  dropoff: { name: "drive-dropoff", widths: [600, 1200], alt: "An industrial washer and a cart of fresh linens at a partner laundry" },
  handover: { name: "drive-handover", widths: [600, 1200], alt: "A stack of freshly folded clothes, ready to go home" },
  team: { name: "cleaners-team", widths: [800, 1600], alt: "Laundry bags being sorted at a commercial laundry" },
  label: { name: "cleaners-label", widths: [400, 560], alt: "A white shirt being steamed on a hanger" },
} satisfies Record<string, Photo>;

/** Small round portraits used as human touches around the page. */
export const AVATARS = { driver: "/people/driver.webp", cleaner: "/people/cleaner.webp" };
