import Logo from "./Logo";
import StoreButtons from "./StoreButtons";

type Page = "index" | "drive" | "cleaners";

const PAGES: { key: Page; href: string; label: string }[] = [
  { key: "index", href: "/", label: "For you" },
  { key: "drive", href: "/drive", label: "Drive" },
  { key: "cleaners", href: "/cleaners", label: "Cleaners" },
];

const CTA: Record<Page, { href: string; label: string }> = {
  index: { href: "#download", label: "Get the app" },
  drive: { href: "#apply", label: "Start driving" },
  cleaners: { href: "#list", label: "List your shop" },
};

export default function SiteHeader({ current, night = false }: { current?: Page; night?: boolean }) {
  const cta = CTA[current ?? "index"];
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className={`site-header${night ? " on-night" : ""}`}>
        <div className="wrap">
          <a className="logo" href="/" aria-label="Snapwash home">
            <Logo />
            <span className="sr-only">Snapwash</span>
          </a>
          <nav className="pages" aria-label="Pages">
            {PAGES.map((p) => (
              <a key={p.key} href={p.href} aria-current={p.key === current ? "page" : undefined}>{p.label}</a>
            ))}
          </nav>
          <a className="btn header-cta" href={cta.href} data-magnetic="">{cta.label}</a>
          <button className="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Open menu"><span></span></button>
        </div>
      </header>
      <div className="menu" id="menu" aria-hidden="true">
        <nav aria-label="Pages">
          <ul>
            {PAGES.map((p, i) => (
              <li key={p.key}>
                <a href={p.href} aria-current={p.key === current ? "page" : undefined}><small>0{i + 1}</small>{p.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="hero-ctas"><StoreButtons primaryClass="btn--white" magnetic={false} /></div>
      </div>
    </>
  );
}
