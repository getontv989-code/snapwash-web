/* People photography, self-hosted in public/people. Stills come from licensed Pexels footage (free for
   commercial use), reframed and graded to the Snapwash palette. Each photo ships at two widths. */

type Photo = { name: string; widths: [number, number]; alt: string };

/** Builds src/srcSet for a photo in public/people. */
export function photoSet(p: Photo) {
  const url = (w: number) => `/people/${p.name}-${w}.webp`;
  return { src: url(p.widths[0]), srcSet: p.widths.map((w) => `${url(w)} ${w}w`).join(", ") };
}

export const PHOTOS = {
  door: { name: "door", widths: [800, 1600], alt: "A Snapwash driver in a blue cap handing an order to a customer at her front door" },
  van: { name: "van", widths: [600, 1080], alt: "A driver loading orders into his van outside a customer's home" },
  shop: { name: "shop", widths: [800, 1600], alt: "Two cleaners sorting freshly washed linens beside an industrial washer" },
  pickup: { name: "drive-pickup", widths: [600, 1080], alt: "A Snapwash driver in a branded vest loading orders into the van" },
  dropoff: { name: "drive-dropoff", widths: [600, 1200], alt: "Cleaners in Snapwash tees loading a washer at a partner shop" },
  handover: { name: "drive-handover", widths: [600, 1200], alt: "A Snapwash driver handing a branded box to a customer at her door" },
  team: { name: "cleaners-team", widths: [800, 1600], alt: "Two cleaners at a Snapwash partner shop unloading fresh linens from an industrial washer" },
  label: { name: "cleaners-label", widths: [400, 560], alt: "A pressed shirt on a hanger with a Snapwash label at the collar" },
} satisfies Record<string, Photo>;

/** Small round portraits used as human touches around the page. */
export const AVATARS = { driver: "/people/driver.webp", cleaner: "/people/cleaner.webp" };
