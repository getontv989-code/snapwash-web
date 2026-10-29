import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva("w-full min-h-[52px] text-foreground font-body text-base placeholder:text-muted-foreground focus:outline-none", {
  variants: {
    variant: {
      /** Form field */
      default: cn(
        "px-[18px] rounded-[14px] bg-background border border-input",
        "transition-[border-color,box-shadow] duration-300 ease-brand",
        "hover:border-ink/30 focus:border-ring focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--ring)_25%,transparent)]",
      ),
      /** Pill search box; leave room on the left for an icon */
      search: "rounded-pill border-0 bg-surface pl-[50px] pr-5 shadow-[inset_0_0_0_1.5px_var(--input)] transition-shadow duration-300 focus:shadow-[inset_0_0_0_2px_var(--ring)]",
    },
  },
  defaultVariants: { variant: "default" },
});

function Input({ className, variant, ...props }: React.ComponentProps<"input"> & VariantProps<typeof inputVariants>) {
  return <input data-slot="input" className={cn(inputVariants({ variant }), className)} {...props} />;
}

export { Input, inputVariants };
