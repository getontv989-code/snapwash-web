import * as React from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./button";

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return <nav data-slot="pagination" className={className} {...props} />;
}

function PaginationContent({ className, ...props }: React.ComponentProps<"ul">) {
  return <ul data-slot="pagination-content" className={cn("flex flex-wrap items-center gap-2", className)} {...props} />;
}

function PaginationItem(props: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

/* The directory pages client-side, so its page links are buttons rather than anchors */
function PaginationButton({ className, isActive, ...props }: React.ComponentProps<"button"> & { isActive?: boolean }) {
  return (
    <button type="button" data-slot="pagination-link" aria-current={isActive ? "page" : undefined}
      className={cn(
        buttonVariants({ variant: "ghost" }),
        "min-w-11 h-11 px-3 inline-grid place-items-center rounded-pill font-body font-semibold text-sm tabular-nums",
        "transition-[background-color,color,opacity] duration-300 ease-brand",
        isActive ? "bg-primary text-primary-foreground" : "hover:bg-ink/12",
        "disabled:opacity-35 disabled:cursor-default disabled:hover:bg-secondary",
        className,
      )} {...props} />
  );
}

export { Pagination, PaginationContent, PaginationItem, PaginationButton };
