import type { ReactNode } from "react";
import { ArrowIcon, Kicker, Section, cx, grid12, tone, wrap } from "./ui";

/* ---------- FAQ ---------- */

export type FaqItem = { id: string; q: string; a: ReactNode };

/** Sticky title on the left, accordion on the right. */
export function Faq({ id, kicker, title, items, night = false }: { id?: string; kicker: string; title: ReactNode; items: FaqItem[]; night?: boolean }) {
  return (
    <Section id={id} className={cx("pt-0", night && tone.night)} aria-labelledby="faq-title">
      <div className={cx(wrap, grid12, "gap-y-8")}>
        <div className="col-[1/span_4] max-lg:col-span-full">
          <Kicker className="mb-[18px]">{kicker}</Kicker>
          <h2 id="faq-title" className="text-2xl leading-none tracking-display sticky top-[120px] max-lg:static">{title}</h2>
        </div>
        <div className="reveal col-[6/-1] border-t-[1.5px] border-t-current max-lg:col-span-full">
          {items.map((it) => (
            <details key={it.id} id={it.id} className="group/faq border-b border-b-line">
              <summary className="list-none list-outside [&::-webkit-details-marker]:hidden cursor-pointer grid grid-cols-[1fr_36px] gap-5 items-center py-5 font-body font-semibold text-lg leading-[1.3] [transition:color_.25s_var(--ease),padding_.4s_var(--ease)] hover:text-brand hover:pl-2">
                {it.q}
                <span className={cx(
                  "w-9 h-9 rounded-[50%] relative [transition:transform_.5s_var(--ease),rotate_.5s_var(--ease),background-color_.3s]",
                  night ? "bg-night-2" : "bg-wash",
                  "before:absolute before:left-1/2 before:top-1/2 before:w-[14px] before:h-0.5 before:rounded-[2px] before:bg-current before:[transform:translate(-50%,-50%)] before:transition-transform before:duration-500 before:ease-brand",
                  "after:absolute after:left-1/2 after:top-1/2 after:w-[14px] after:h-0.5 after:rounded-[2px] after:bg-current after:[transform:translate(-50%,-50%)_rotate(90deg)] after:transition-transform after:duration-500 after:ease-brand",
                  "group-open/faq:bg-brand group-open/faq:text-on-brand group-open/faq:rotate-180 group-open/faq:after:[transform:translate(-50%,-50%)_rotate(0)]",
                )} aria-hidden="true"></span>
              </summary>
              <p className="pb-[22px] max-w-[60ch] text-muted group-open/faq:animate-[fadeUp_.5s_var(--ease)]">{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------- Testimonials ---------- */

export type QuoteItem = { text: ReactNode; initial: string; name: string; role: string };

/** Highlighted words inside a quote. */
export function Mark({ children }: { children: ReactNode }) {
  return <mark className="bg-transparent text-brand">{children}</mark>;
}

function Quote({ q, second, solo }: { q: QuoteItem; second?: boolean; solo?: boolean }) {
  return (
    <figure className={cx("m-0 grid grid-rows-[1fr_auto] gap-6 max-lg:col-span-full", second ? "col-[7/-1] max-lg:hidden" : "col-[1/span_6]")}>
      <blockquote className="m-0"><p className={cx("font-display font-bold text-xl leading-[1.15] max-w-[22ch] tracking-display text-balance", solo && "max-lg:max-w-[30ch]")}>{q.text}</p></blockquote>
      <figcaption className="flex items-center gap-[14px]">
        <span className="w-12 h-12 rounded-[50%] grid place-items-center bg-brand text-on-brand font-display font-bold text-base leading-none flex-none" aria-hidden="true">{q.initial}</span>
        <div><b className="block font-semibold">{q.name}</b><span className="font-body font-medium text-xs leading-[1.3] tracking-caps uppercase text-muted">{q.role}</span></div>
      </figcaption>
    </figure>
  );
}

/** Two quotes side by side on desktop; only the first shows on mobile (`solo` lets it run wider there). */
export function Quotes({ items, label, solo = false, className }: { items: [QuoteItem, QuoteItem]; label: string; solo?: boolean; className?: string }) {
  return (
    <Section className={className} aria-label={label}>
      <div className={cx(wrap, grid12, "reveal gap-y-6 items-stretch")}>
        <Quote q={items[0]} solo={solo} />
        <Quote q={items[1]} second />
      </div>
    </Section>
  );
}

/* ---------- Links to the other pages ---------- */

export type SwitchItem = { href: string; kicker: string; title: string; avatar?: string };

export function SwitchCards({ items, night = false }: { items: SwitchItem[]; night?: boolean }) {
  return (
    <Section className={cx("pt-0", night && tone.night)} aria-label="More from Snapwash">
      <div className={wrap}>
        <div className="grid grid-cols-2 gap-tile max-md:grid-cols-1">
          {items.map((it) => (
            <a key={it.href} href={it.href} className={cx(
              "reveal group/switch relative rounded-card p-card-lg min-h-0 no-underline grid grid-cols-[minmax(0,1fr)_auto] items-end gap-x-6 gap-y-4 overflow-hidden",
              "[transition:transform_.6s_var(--ease),translate_.6s_var(--ease),background-color_.5s_var(--ease),color_.5s_var(--ease)] hover:-translate-y-1.5",
              // On the Drive page the card keeps its colours on hover; only the arrow and label react
              night ? "bg-night-2 text-night-fg shadow-[0_0_0_1px_var(--night-line)]" : "bg-surface shadow-[0_0_0_1px_var(--line)] hover:bg-brand hover:text-on-brand hover:shadow-none",
            )}>
              <span className="col-span-full flex items-center gap-3">
                {it.avatar && <img src={it.avatar} alt="" width="40" height="40" loading="lazy" className="w-10 h-10 rounded-[50%] object-cover shadow-[0_0_0_2px_var(--surface)] transition-shadow duration-500 group-hover/switch:shadow-[0_0_0_2px_#fff]" />}
                <Kicker as="span" tone="switch">{it.kicker}</Kicker>
              </span>
              <h3 className="text-xl leading-[1.05] tracking-display">{it.title}</h3>
              <span className="w-[52px] h-[52px] rounded-[50%] grid place-items-center bg-brand text-on-brand self-end [transition:transform_.6s_var(--ease),rotate_.6s_var(--ease),background-color_.4s] group-hover/switch:-rotate-45 group-hover/switch:bg-white group-hover/switch:text-blue">
                <ArrowIcon className="w-[22px] h-[22px]" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
}
