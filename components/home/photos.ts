/* Photos served from Unsplash's CDN (Unsplash License: free for commercial use, no attribution required).
   Swap a URL here to change the image everywhere it's used. */

type Photo = { src: string; alt: string; credit: string };

const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=75`;

/** Builds src/srcSet for an Unsplash photo at the given widths. */
export function photoSet(p: Photo, widths = [480, 800, 1200, 1600]) {
  return {
    src: `${p.src}&w=${widths[1]}`,
    srcSet: widths.map((w) => `${p.src}&w=${w} ${w}w`).join(", "),
  };
}

export const PHOTOS = {
  /* unsplash.com/photos/couple-signing-for-a-package-delivery-at-the-door-Kd27X69pYyo */
  door: { src: unsplash("1758523670564-d1d6a734dc0b"), alt: "A couple at their front door signing for an order from a delivery driver", credit: "Vitaly Gariev" },
  /* Unsplash: "Man driving a white van gives a thumbs up" */
  van: { src: unsplash("1762095996527-126e49ef9d72"), alt: "A driver behind the wheel of a white delivery van giving a thumbs up", credit: "Polina Kuzovkova" },
  /* unsplash.com/photos/person-and-worker-in-dry-cleaner-KI43UjIInTA */
  counter: { src: unsplash("1788905761561-d47d8df41edf"), alt: "A customer and a worker at the counter of a neighborhood dry cleaner", credit: "Mlook 124" },
} satisfies Record<string, Photo>;
