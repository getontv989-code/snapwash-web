import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* The site's pill call-to-action: an ink fill slides up from below on hover */
const pill = cn(
  "relative inline-flex items-center gap-3 min-h-[52px] py-2 pr-6 pl-5 rounded-pill border-0",
  "bg-(--bg) text-(--fg) no-underline font-body font-semibold text-base leading-none overflow-hidden isolate",
  "transition-[transform,box-shadow] duration-400 ease-brand will-change-transform",
  "before:absolute before:inset-0 before:-z-1 before:rounded-[inherit] before:bg-foreground",
  "before:[transform:translateY(101%)] before:transition-transform before:duration-500 before:ease-brand hover:before:[transform:none]",
  "hover:text-background active:[transform:scale(.97)] [&_svg]:w-5 [&_svg]:h-5 [&_svg]:flex-none",
);
const glow = "hover:shadow-[0_14px_30px_-14px_color-mix(in_srgb,var(--primary)_70%,transparent)]";

const buttonVariants = cva("", {
  variants: {
    variant: {
      /** Brand blue */
      default: cn(pill, "[--bg:var(--primary)] [--fg:var(--primary-foreground)] cursor-pointer", glow),
      /** Outline in the text colour */
      outline: cn(pill, "[--bg:transparent] [--fg:var(--foreground)] cursor-pointer shadow-[inset_0_0_0_1.5px_currentColor] hover:shadow-[inset_0_0_0_1.5px_var(--foreground)]"),
      /** White, for use on a blue card */
      inverse: cn(pill, "[--bg:#FFFFFF] [--fg:#0060F6] cursor-pointer hover:text-white", glow),
      /** Looks like a primary button but isn't interactive (demo screens) */
      static: cn(pill, "[--bg:var(--primary)] [--fg:var(--primary-foreground)] w-full justify-center pointer-events-none cursor-default"),
      /** Quiet round or pill control on a faint ink tint (header icons, pagination) */
      ghost: "border-0 cursor-pointer bg-secondary text-secondary-foreground",
    },
  },
  defaultVariants: { variant: "default" },
});

function Button({ className, variant, asChild = false, ...props }:
  React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return <Comp data-slot="button" className={cn(buttonVariants({ variant }), className)} {...props} />;
}

export { Button, buttonVariants };
