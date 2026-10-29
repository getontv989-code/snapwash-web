import Logo from "./Logo";
import { RETAILER_LOGIN_URL } from "./SiteHeader";
import { cx, wrap } from "./ui";

const COLUMNS: { id: string; title: string; links: { href: string; label: string; external?: boolean }[] }[] = [
  { id: "f1", title: "Snapwash", links: [
    { href: "/", label: "For customers" },
    { href: "/drive", label: "Drive with us" },
    { href: "/cleaners", label: "For cleaners" },
    { href: RETAILER_LOGIN_URL, label: "Retailer login" },
    { href: "/laundry-service", label: "Locations" },
    { href: "/#pricing", label: "Pricing" },
  ] },
  { id: "f2", title: "Company", links: [
    { href: "/about", label: "About" },
    { href: "/careers", label: "Careers" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ] },
  { id: "f3", title: "Get the app", links: [
    { href: "https://apps.apple.com/us/search?term=snapwash", label: "App Store", external: true },
    { href: "https://play.google.com/store/search?q=snapwash&c=apps", label: "Google Play", external: true },
  ] },
];

const legalLink = "no-underline opacity-85 hover:opacity-100 hover:underline";

export default function SiteFooter() {
  return (
    <footer className="bg-blue text-white pt-[clamp(48px,6vw,72px)] pb-[calc(env(safe-area-inset-bottom,0px)+24px)] overflow-hidden">
      <div className={wrap}>
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-5 pb-8 border-b border-b-white/25">
          {/* .foot-logo: main.js re-swings the hanger when it scrolls into view */}
          <a className="foot-logo group/logo inline-block items-center gap-[10px] no-underline font-display font-extrabold text-[1.375rem] leading-[0] tracking-tighter text-white" href="/" aria-label="Snapwash home">
            <Logo className="h-[clamp(64px,6vw,84px)]" />
            <span className="sr-only">Snapwash</span>
          </a>
          <p className="max-w-[44ch] opacity-90">Laundry and dry cleaning pickup and delivery from the cleaners in your neighborhood. Serving New York, New Jersey and Connecticut.</p>
        </div>
        <div className="grid grid-cols-3 gap-8 py-8 max-sm:grid-cols-2">
          {COLUMNS.map((col) => (
            <nav key={col.id} aria-labelledby={col.id}>
              <h2 id={col.id} className="font-body font-medium text-xs leading-none tracking-kicker uppercase opacity-70 mb-4">{col.title}</h2>
              <ul className="grid gap-[10px]">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a className="no-underline inline-block [transition:transform_.35s_var(--ease),translate_.35s_var(--ease),opacity_.25s] hover:translate-x-1.5 hover:opacity-75"
                      href={l.href} {...(l.external ? { target: "_blank", rel: "noopener" } : {})}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className={cx("flex justify-between flex-wrap gap-3 pt-[22px] border-t border-t-white/25", "font-body font-normal text-xs leading-[1.4] tracking-note")}>
          <span>© {new Date().getFullYear()} Snapwash. All rights reserved.</span>
          <span><a className={legalLink} href="/privacy">Privacy</a> · <a className={legalLink} href="/terms">Terms</a> · <a className={legalLink} href="/cookies">Cookies</a></span>
        </div>
      </div>
    </footer>
  );
}
