import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/* tailwind-merge only knows Tailwind's default scale. Teach it the site's custom tokens from
   app/globals.css, or it would read text-stat as a colour and drop it next to text-ink. */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["stat"],
      radius: ["pill", "card"],
      spacing: ["gutter", "section", "col", "tile", "card", "card-lg"],
      tracking: ["tightest", "display", "note", "pill", "label", "caps", "tag", "kicker"],
      font: ["display", "body"],
      ease: ["brand"],
    },
  },
});

/** shadcn/ui's class helper: joins class names and lets later Tailwind classes override earlier ones. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
