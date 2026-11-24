/* Laundry photography, self-hosted in public/people. Pexels photos (Pexels License: free for commercial use,
   no attribution required), cropped and given one studio grade (neutral whites, lifted navy shadows). Two widths each. */

type Photo = { name: string; widths: [number, number]; alt: string };

/** Builds src/srcSet for a photo in public/people. */
export function photoSet(p: Photo) {
  const url = (w: number) => `/people/${p.name}-${w}.webp`;
  return { src: url(p.widths[0]), srcSet: p.widths.map((w) => `${url(w)} ${w}w`).join(", ") };
}

export const PHOTOS = {
  door: { name: "doorstep", widths: [800, 1600], alt: "A customer at her front door with a bag of laundry ready for pickup" },
  van: { name: "basket", widths: [600, 1200], alt: "Hands lifting fresh white laundry from a woven basket" },
  shop: { name: "laundromat", widths: [800, 1600], alt: "A smiling laundromat attendant loading a basket of clothes beside the washers" },
  fresh: { name: "folded", widths: [600, 1200], alt: "A stack of freshly folded shirts" },
  pickup: { name: "drive-pickup", widths: [600, 1200], alt: "A basket of laundry ready to be collected" },
  dropoff: { name: "drive-dropoff", widths: [600, 1200], alt: "An attendant unpacking a laundry bag at a partner laundromat" },
  handover: { name: "drive-handover", widths: [600, 1200], alt: "A stack of freshly folded clothes, ready to go home" },
  team: { name: "cleaners-team", widths: [800, 1600], alt: "Laundry bags being sorted at a commercial laundry" },
  label: { name: "cleaners-label", widths: [400, 560], alt: "A white shirt being steamed on a hanger" },
} satisfies Record<string, Photo>;

/** Small round portraits used as human touches around the page. */
export const AVATARS = { driver: "/people/driver.webp", cleaner: "/people/cleaner.webp" };
