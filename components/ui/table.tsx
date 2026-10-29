import * as React from "react";
import { cn } from "@/lib/utils";

/* Unlike stock shadcn, the table isn't wrapped in an overflow container: callers add one where it
   should scroll, and a wrapper would clip the scroll-reveal slide on tables that animate in. */
function Table({ className, ...props }: React.ComponentProps<"table">) {
  return <table data-slot="table" className={cn("w-full border-collapse", className)} {...props} />;
}

function TableHeader(props: React.ComponentProps<"thead">) {
  return <thead data-slot="table-header" {...props} />;
}

function TableBody(props: React.ComponentProps<"tbody">) {
  return <tbody data-slot="table-body" {...props} />;
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return <tr data-slot="table-row" className={cn("border-b border-b-border", className)} {...props} />;
}

/** Column or row header cell. Defaults to scope="col". */
function TableHead({ className, scope = "col", ...props }: React.ComponentProps<"th">) {
  return <th data-slot="table-head" scope={scope} className={cn("text-left", className)} {...props} />;
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return <td data-slot="table-cell" className={cn("align-middle", className)} {...props} />;
}

function TableCaption({ className, ...props }: React.ComponentProps<"caption">) {
  return <caption data-slot="table-caption" className={cn("sr-only", className)} {...props} />;
}

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption };
