import Logo from "./Logo";

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

export default function SiteHeader({ current, night = false }: { current: Page; night?: boolean }) {
  const cta = CTA[current];
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
          <button className="theme-btn" type="button" data-theme-toggle="" aria-label="Switch to dark mode" aria-pressed="false">
            <svg className="i-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7Z" /></svg>
            <svg className="i-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.2" /><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" /></svg>
          </button>
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
        <button className="menu-theme" type="button" data-theme-toggle="" aria-pressed="false">
          <span>Dark mode</span>
          <span className="switch-ui" aria-hidden="true"><i></i></span>
        </button>
      </div>
    </>
  );
}
