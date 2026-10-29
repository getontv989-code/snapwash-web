import type { ReactNode } from "react";
import { Kicker, Section, SectionHead, cx, grid12, wrap } from "@/components/ui";
import { hero } from "@/components/hero";

const SITE = "https://snapwash.io";

export type Crumb = { name: string; href: string };

/** Breadcrumb trail above each location hero. The last crumb is the current page. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="animate-fade-up [--d:0s] mb-6">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-body font-medium text-sm text-muted">
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={c.href} className="inline-flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="text-ink">{c.name}</span>
              ) : (
                <a href={c.href} className="no-underline hover:text-brand transition-colors duration-200">{c.name}</a>
              )}
              {!last && <span aria-hidden="true" className="text-line">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function breadcrumbLd(items: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: `${SITE}${c.href}` })),
  };
}

export function JsonLd({ graph }: { graph: object[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }) }} />;
}

/** Hero shared by every location page: breadcrumbs, headline and lede on the left, a card on the right. */
export function LocationHero({ crumbs, kicker, title, accent, lede, children, aside }: {
  crumbs: Crumb[]; kicker: string; title: string; accent?: string; lede: ReactNode; children?: ReactNode; aside: ReactNode;
}) {
  return (
    <section className={hero.section} aria-labelledby="h1">
      <div className={cx(wrap, grid12, hero.grid)}>
        <div className="col-[1/span_7] row-1 self-end relative z-2 max-lg:col-span-full max-lg:row-auto">
          <Breadcrumbs items={crumbs} />
          <Kicker className="animate-fade-up [--d:.05s] mb-7">{kicker}</Kicker>
          {/* Deeper word masks than the shared hero so descenders (y, p, g) are not clipped */}
          <h1 id="h1" className={cx(hero.h1, "leading-[1.02] [&_.w]:pb-[.2em]! [&_.w]:-mb-[.2em]!", accent && "text-[clamp(2.25rem,1.2rem+3.4vw,4.5rem)]")}>
            {title}{accent && <> <em className={hero.em}>{accent}</em></>}
          </h1>
        </div>
        <div className={hero.copy}>
          <p className={cx(hero.lede, "animate-fade-up [--d:.55s]")}>{lede}</p>
          {children && <div className={cx(hero.ctas, "animate-fade-up [--d:.7s]")}>{children}</div>}
        </div>
        <div className="col-[9/-1] row-[1/span_2] self-center max-lg:col-span-full max-lg:row-auto animate-fade-up [--d:.6s]">
          {aside}
        </div>
      </div>
    </section>
  );
}

/** Card of big numbers or key facts, used as the hero aside. */
export function FactCard({ title, facts }: { title: string; facts: { value: ReactNode; label: string }[] }) {
  return (
    <div className="grid gap-5 p-card-lg rounded-card bg-surface shadow-[0_0_0_1px_var(--line)]">
      <p className="font-body font-medium text-xs leading-[1.2] tracking-kicker uppercase text-muted">{title}</p>
      <dl className="grid gap-4">
        {facts.map((f) => (
          <div key={f.label} className="flex items-baseline justify-between gap-4 pb-4 border-b border-b-line last:border-b-0 last:pb-0">
            <dt className="text-muted text-sm">{f.label}</dt>
            <dd className="font-display font-extrabold text-xl leading-none tracking-tighter text-brand tabular-nums text-right">{f.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

const STEPS = [
  { title: "Snap your clothes", body: "Scan each item with your camera. The app names it and prices the bag before anyone rings your bell." },
  { title: "Pick a local cleaner", body: "Compare the shops that serve your address by services, price and turnaround, then choose a pickup window." },
  { title: "Track it home", body: "Follow the driver to your door and back again, with proof of delivery when your clothes come home." },
];

/** The three-step explainer every location page shares. */
export function Steps({ place }: { place: string }) {
  return (
    <Section className="pt-0" aria-labelledby="steps-title">
      <div className={wrap}>
        <SectionHead kicker="How it works" title={`Laundry in ${place}, in three steps.`} titleId="steps-title" />
        <ol className="reveal grid grid-cols-3 gap-0 [counter-reset:f] border-t-[1.5px] border-t-ink max-lg:grid-cols-1">
          {STEPS.map((s) => (
            <li key={s.title} className={cx(
              "pt-7 pr-8 pb-9 grid gap-3 content-start border-b border-b-line",
              "before:[counter-increment:f] before:content-['0'_counter(f)] before:font-display before:font-extrabold before:text-[2.25rem] before:leading-none before:tracking-tightest before:text-brand",
            )}>
              <h3 className="text-lg leading-[1.15] tracking-tight">{s.title}</h3>
              <p className="text-muted text-sm max-w-[36ch]">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

/** Long-form local copy: heading on the left, short articles on the right. */
export function LocalCopy({ kicker, title, blocks }: { kicker: string; title: string; blocks: { h: string; p: ReactNode }[] }) {
  return (
    <Section className="pt-0" aria-labelledby="copy-title">
      <div className={cx(wrap, grid12, "gap-y-8")}>
        <div className="col-[1/span_5] max-lg:col-span-full">
          <Kicker className="mb-[18px]">{kicker}</Kicker>
          <h2 id="copy-title" className="text-2xl leading-none tracking-display">{title}</h2>
        </div>
        <div className="reveal col-[7/-1] grid gap-8 max-lg:col-span-full">
          {blocks.map((b) => (
            <article key={b.h} className="grid gap-3">
              <h3 className="text-lg leading-[1.2] tracking-tight">{b.h}</h3>
              <p className="text-muted max-w-[60ch]">{b.p}</p>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}

/** Section wrapper for a directory table. */
export function Directory({ kicker, title, intro, children }: { kicker: string; title: string; intro?: ReactNode; children: ReactNode }) {
  return (
    <Section className="pt-0" id="directory" aria-labelledby="dir-title">
      <div className={wrap}>
        <SectionHead kicker={kicker} title={title} titleId="dir-title">{intro}</SectionHead>
        <div className="reveal">{children}</div>
      </div>
    </Section>
  );
}
