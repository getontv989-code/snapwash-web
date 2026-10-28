/* Shared hero layout: headline top-left, copy under it, a visual on the right spanning both rows.
   On mobile everything stacks in source order. */
export const hero = {
  section: "relative pt-[calc(env(safe-area-inset-top,0px)+clamp(104px,10vw,148px))] pb-[clamp(56px,8vw,112px)]",
  grid: "gap-y-7 grid-rows-[auto_auto]",
  title: "col-[1/span_6] row-1 self-end relative z-2 max-lg:col-span-full max-lg:row-auto",
  copy: "col-[1/span_5] row-2 grid gap-6 content-start max-lg:col-span-full max-lg:row-auto",
  aside: "col-[7/-1] row-[1/span_2] self-center relative max-lg:col-span-full max-lg:row-auto max-lg:mt-3",
  /** .split: main.js wraps each word so they rise in one by one */
  h1: "split text-3xl leading-[.98] tracking-display font-extrabold",
  em: "not-italic text-brand",
  lede: "text-lg leading-[1.55] m-0 text-muted max-w-[40ch]",
  ctas: "flex flex-wrap gap-3",
};
