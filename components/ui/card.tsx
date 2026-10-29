import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva("rounded-card", {
  variants: {
    variant: {
      /** White card with a hairline ring */
      default: "bg-surface shadow-[0_0_0_1px_var(--border)]",
      /** Drive page card, on the night section palette */
      night: "bg-night-2 shadow-[0_0_0_1px_var(--night-line)]",
      /** Shape only; the caller sets the fill */
      plain: "",
    },
  },
  defaultVariants: { variant: "default" },
});

/** `as` swaps the element when the card is an article or a list item. */
function Card({ className, variant, as = "div", ...props }:
  React.HTMLAttributes<HTMLElement> & VariantProps<typeof cardVariants> & { as?: "div" | "article" | "li" }) {
  const Comp = as as "div";
  return <Comp data-slot="card" className={cn(cardVariants({ variant }), className)} {...props} />;
}

export { Card, cardVariants };
