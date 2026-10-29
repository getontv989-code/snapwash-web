"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cn } from "@/lib/utils";

function Accordion(props: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return <AccordionPrimitive.Item data-slot="accordion-item" className={cn("border-b border-b-border", className)} {...props} />;
}

/** The trigger sits in an h3 for screen readers; the h3 resets the heading type so the question keeps the body font. */
function AccordionTrigger({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex text-wrap">
      <AccordionPrimitive.Trigger data-slot="accordion-trigger" className={cn("w-full text-left cursor-pointer", className)} {...props}>
        {children}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

/** Answers stay in the HTML while closed (forceMount, hidden with CSS) so search engines still read them. */
function AccordionContent({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return <AccordionPrimitive.Content data-slot="accordion-content" forceMount className={cn("data-[state=closed]:hidden", className)} {...props} />;
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
