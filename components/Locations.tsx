import type { CSSProperties, ReactNode } from "react";
import type { Metadata } from "next";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import StoreButtons from "./StoreButtons";
import { breadcrumbLd, plural, shopPath, SITE, type Crumb, type Shop } from "@/lib/locations";

const arrow = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;

export function locationMeta({ title, description, path, noindex }: { title: string; description: string; path: string; noindex: boolean }): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: { url: path, title, description },
    twitter: { title, description },
    ...(noindex && { robots: { index: false, follow: true } }),
  };
}

export function LocationShell({ crumbs, ld, children }: { crumbs: Crumb[]; ld: object[]; children: ReactNode }) {
  const jsonLd = { "@context": "https://schema.org", "@graph": [...ld, breadcrumbLd(crumbs)] };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader />
      <main id="main" className="loc">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}

export function Crumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav className="crumbs fade-up" aria-label="Breadcrumb" style={{ "--d": ".05s" } as CSSProperties}>
      <ol>
        {crumbs.map((c, i) => (
          <li key={c.path}>{i === crumbs.length - 1 ? <span aria-current="page">{c.name}</span> : <a href={c.path}>{c.name}</a>}</li>
        ))}
      </ol>
    </nav>
  );
}

export function LocationHero({ crumbs, kicker, title, lede, sample }: { crumbs: Crumb[]; kicker: string; title: ReactNode; lede: string; sample: boolean }) {
  return (
    <section className="hero loc-hero" aria-labelledby="h1">
      <div className="wrap grid">
        <div className="title">
          {sample && <p className="sample-note" role="note">Sample data. This page previews the layout with placeholder shops and stays hidden from search engines until real listings replace them.</p>}
          <Crumbs crumbs={crumbs} />
          <p className="kicker fade-up" style={{ "--d": ".1s" } as CSSProperties}>{kicker}</p>
          <h1 id="h1" className="split">{title}</h1>
        </div>
        <div className="copy">
          <p className="hero-lede fade-up" style={{ "--d": ".45s" } as CSSProperties}>{lede}</p>
          <div className="hero-ctas fade-up" id="download" style={{ "--d": ".6s" } as CSSProperties}><StoreButtons /></div>
        </div>
      </div>
    </section>
  );
}

export function PlaceLinks({ id, kicker, title, intro, items }: { id: string; kicker: string; title: string; intro: string; items: { name: string; path: string; meta: string }[] }) {
  return (
    <section className="section loc-list" aria-labelledby={id}>
      <div className="wrap">
        <div className="section-head reveal">
          <p className="kicker">{kicker}</p>
          <h2 id={id}>{title}</h2>
          <p>{intro}</p>
        </div>
        <ul className="place-grid">
          {items.map((it) => (
            <li key={it.path} className="reveal">
              <a href={it.path}><span><b>{it.name}</b><small>{it.meta}</small></span><span className="go">{arrow}</span></a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ShopCards({ id, kicker, title, intro, shops, showPlace = false }: { id: string; kicker: string; title: string; intro: string; shops: Shop[]; showPlace?: boolean }) {
  return (
    <section className="section loc-list" aria-labelledby={id}>
      <div className="wrap">
        <div className="section-head reveal">
          <p className="kicker">{kicker}</p>
          <h2 id={id}>{title}</h2>
          <p>{intro}</p>
        </div>
        <ul className="shop-grid">
          {shops.map((s) => (
            <li key={shopPath(s)} className="reveal">
              <a href={shopPath(s)}>
                <span className="shop-ic" aria-hidden="true">{initials(s.name)}</span>
                <b>{s.name}</b>
                <small>{showPlace ? `${s.neighborhood} · ` : ""}{s.address || s.city}</small>
                {s.services.length > 0 && <span className="tags">{s.services.slice(0, 3).map((v) => <span key={v}>{v}</span>)}</span>}
                <span className="more">View cleaner {arrow}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function LocationFaq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <section className="section faq" id="faq" aria-labelledby="faq-title" style={{ paddingTop: "0" } as CSSProperties}>
      <div className="wrap grid">
        <div className="faq-side"><p className="kicker" style={{ marginBottom: "18px" } as CSSProperties}>FAQ</p><h2 id="faq-title">Good to know.</h2></div>
        <div className="faq-list reveal">
          {items.map((f, i) => (
            <details key={i}><summary>{f.q}<span className="pm" aria-hidden="true"></span></summary><p className="a">{f.a}</p></details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HowItWorks({ where }: { where: string }) {
  const steps = [
    ["Choose", "Pick your cleaner", `Open Snapwash and choose a dry cleaner or laundromat in ${where}.`],
    ["Scan", "Snap the bag", "Photograph each piece. The app itemizes and prices the order for you."],
    ["Deliver", "We bring it back", "A driver collects your bag in the window you pick and returns it clean."],
  ];
  return (
    <section className="section loc-steps" aria-labelledby="how-title" style={{ paddingTop: "0" } as CSSProperties}>
      <div className="wrap">
        <div className="section-head reveal">
          <p className="kicker">How it works</p>
          <h2 id="how-title">Hamper to hanger in three moves.</h2>
          <p>Your cleaner sets the cleaning price. Delivery is a fee per order, or free on Snapwash Unlimited at $14.99 a month.</p>
        </div>
        <ol className="flow-3">
          {steps.map(([tag, h, p], i) => (
            <li key={tag} className="reveal" style={{ "--rd": `${i * 0.08}s` } as CSSProperties}><span className="tag">Step {i + 1} · {tag}</span><h3>{h}</h3><p>{p}</p></li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function LocationCloser({ where }: { where: string }) {
  return (
    <section className="closer" aria-labelledby="closer-title">
      <div className="wrap grid">
        <h2 id="closer-title">Clean clothes in {where}, zero effort.</h2>
        <div className="act"><p>Download Snapwash, scan your first bag tonight, and get your Sunday back.</p><div className="hero-ctas"><StoreButtons primaryClass="btn--white" /></div></div>
      </div>
    </section>
  );
}

export const itemListLd = (name: string, items: { name: string; path: string }[]) => ({
  "@type": "ItemList",
  name,
  numberOfItems: items.length,
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, url: `${SITE}${it.path}` })),
});

export const pageLd = (path: string, name: string, description: string) => ({
  "@type": "CollectionPage",
  "@id": `${SITE}${path}#page`,
  url: `${SITE}${path}`,
  name,
  description,
  isPartOf: { "@id": `${SITE}/#website` },
});

export const shopsMeta = (n: number) => plural(n, "cleaner");

function initials(name: string) {
  return name.split(/\s+/).filter((w) => /^[A-Za-z0-9]/.test(w)).slice(0, 2).map((w) => w[0].toUpperCase()).join("");
}
