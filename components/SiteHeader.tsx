import Logo from "./Logo";
import { btn, cx, wrap } from "./ui";

export const RETAILER_LOGIN_URL = "https://retailer.snapwash.io/sign-in?redirectUrl=/";

type Page = "index" | "drive" | "cleaners" | "locations";

const PAGES: { key: Page | "retailer"; href: string; label: string; external?: boolean }[] = [
  { key: "index", href: "/", label: "For you" },
  { key: "drive", href: "/drive", label: "Drive" },
  { key: "cleaners", href: "/cleaners", label: "Cleaners" },
  { key: "locations", href: "/laundry-service", label: "Locations" },
  { key: "retailer", href: RETAILER_LOGIN_URL, label: "Retailer login", external: true },
];

const CTA: Record<Page, { href: string; label: string }> = {
  index: { href: "#download", label: "Get the app" },
  drive: { href: "#apply", label: "Start driving" },
  cleaners: { href: "#apply", label: "List your shop" },
  locations: { href: "/#download", label: "Get the app" },
};

/* .site-header, .menu-btn, .theme-btn and #menu are hooks for public/main.js (scroll, menu, theme) */
const roundBtn = "py-px px-1.5 rounded-[50%] border-0 cursor-pointer bg-ink/6 text-ink flex-none";
const themeIcon = "[grid-area:1/1] w-5 h-5 max-lg:w-[18px] max-lg:h-[18px] [transition:transform_.5s_var(--ease),rotate_.5s_var(--ease),scale_.5s_var(--ease),opacity_.3s_var(--ease)]";
const burgerBar = "before:absolute before:left-0 before:w-[18px] before:h-0.5 before:bg-current before:transition-transform before:duration-400 before:ease-brand after:absolute after:left-0 after:w-[18px] after:h-0.5 after:bg-current after:transition-transform after:duration-400 after:ease-brand";

/** `current` is left out on pages outside the main nav (e.g. the blog). */
export default function SiteHeader({ current }: { current?: Page }) {
  const cta = current ? CTA[current] : { href: "/#download", label: "Get the app" };
  return (
    <>
      <a className="fixed left-gutter top-[-80px] z-100 py-[10px] px-4 rounded-pill bg-brand text-on-brand font-semibold no-underline transition-[top] duration-300 ease-brand focus:top-[calc(env(safe-area-inset-top,0px)+12px)]" href="#main">Skip to content</a>
      <header className={cx(
        "site-header fixed inset-x-0 top-0 z-40 pt-[env(safe-area-inset-top,0px)]",
        "[transition:transform_.5s_var(--ease),translate_.5s_var(--ease),background-color_.4s_var(--ease),box-shadow_.4s_var(--ease)]",
        "[&.is-solid]:bg-paper/82 [&.is-solid]:backdrop-blur-[14px] [&.is-solid]:backdrop-saturate-150 [&.is-solid]:shadow-[0_1px_0_var(--line)]",
        "lg:[&.is-hidden]:-translate-y-[110%]",
      )}>
        <div className={cx(wrap, "flex items-center gap-6 min-h-[76px] max-lg:min-h-[50px] max-lg:gap-2")}>
          <a className="group/logo inline-flex items-center gap-[10px] no-underline font-display font-extrabold text-[1.375rem] leading-[0] tracking-tighter text-brand" href="/" aria-label="Snapwash home">
            <Logo />
            <span className="sr-only">Snapwash</span>
          </a>
          <nav className="ml-auto flex gap-1 p-1 rounded-pill bg-ink/6 max-lg:hidden" aria-label="Pages">
            {PAGES.map((p) => (
              <a key={p.key} href={p.href} aria-current={p.key === current ? "page" : undefined} {...(p.external ? { rel: "noopener" } : {})}
                className="relative py-[9px] px-4 rounded-pill no-underline font-medium text-sm transition-[background-color,color] duration-300 ease-brand hover:bg-ink/8 aria-[current=page]:bg-brand aria-[current=page]:text-on-brand">{p.label}</a>
            ))}
          </nav>
          <button className={cx("theme-btn group/theme w-11 h-11 inline-grid place-items-center touch-manipulation [-webkit-tap-highlight-color:transparent] transition-[background-color,scale] duration-300 ease-brand hover:bg-ink/12 active:scale-92 max-lg:ml-auto max-lg:w-10 max-lg:h-10", roundBtn)}
            type="button" data-theme-toggle="" aria-label="Switch to dark mode" aria-pressed="false">
            <svg className={cx(themeIcon, "fill-current stroke-none stroke-[1.8] stroke-round dark:opacity-0 dark:rotate-90 dark:scale-50")} viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7Z" /></svg>
            <svg className={cx(themeIcon, "fill-none stroke-current stroke-[1.8] stroke-round opacity-0 -rotate-90 scale-50 dark:opacity-100 dark:rotate-0 dark:scale-100")} viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.2" /><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" /></svg>
          </button>
          <a className={btn("primary", "flex-none max-lg:hidden")} href={cta.href} data-magnetic="">{cta.label}</a>
          <a className={btn("primary", "lg:hidden max-lg:min-h-10 max-lg:py-0 max-lg:pl-4 max-lg:pr-4 max-lg:text-sm flex-none")} href={current === "index" ? "#download" : "/#download"}>Get app</a>
          <button className={cx("menu-btn hidden max-lg:inline-grid place-items-center w-10 h-10 transition-transform duration-300 ease-brand active:scale-94", roundBtn)}
            type="button" aria-expanded="false" aria-controls="menu" aria-label="Open menu">
            <span className={cx("block w-[18px] h-0.5 bg-current relative transition-[background-color] duration-200 in-[.menu-open]:bg-transparent", burgerBar,
              "before:-translate-y-1.5 after:translate-y-1.5 in-[.menu-open]:before:translate-y-0 in-[.menu-open]:before:rotate-45 in-[.menu-open]:after:translate-y-0 in-[.menu-open]:after:-rotate-45")}></span>
          </button>
        </div>
      </header>
      <div className={cx(
        "fixed z-35 left-gutter right-gutter top-[calc(env(safe-area-inset-top,0px)+58px)] p-2 rounded-[20px] bg-surface text-ink lg:hidden",
        "shadow-[0_0_0_1px_var(--line),0_24px_48px_-24px_rgba(8,18,49,.35)]",
        "opacity-0 -translate-y-2 invisible pointer-events-none [transition:opacity_.25s_var(--ease),translate_.25s_var(--ease),visibility_0s_linear_.25s]",
        "in-[.menu-open]:opacity-100 in-[.menu-open]:translate-y-0 in-[.menu-open]:visible in-[.menu-open]:pointer-events-auto in-[.menu-open]:[transition:opacity_.25s_var(--ease),translate_.25s_var(--ease)]",
      )} id="menu" aria-hidden="true">
        <nav aria-label="Pages">
          <ul className="grid gap-0.5">
            {PAGES.map((p, i) => (
              <li key={p.key}>
                <a href={p.href} aria-current={p.key === current ? "page" : undefined} {...(p.external ? { rel: "noopener" } : {})}
                  className="block py-[14px] px-4 rounded-[12px] no-underline font-body font-semibold text-lg leading-[1.2] transition-[background-color,color] duration-200 ease-brand hover:bg-wash aria-[current=page]:bg-brand aria-[current=page]:text-on-brand"><small className="hidden">0{i + 1}</small>{p.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <button className="w-full flex items-center justify-between gap-4 mt-1.5 py-[14px] px-4 border-t border-t-line rounded-b-[12px] bg-transparent text-ink cursor-pointer font-body font-semibold text-lg leading-[1.2] text-left touch-manipulation [-webkit-tap-highlight-color:transparent]"
          type="button" data-theme-toggle="" aria-pressed="false">
          <span>Dark mode</span>
          <span className="relative w-12 h-7 rounded-pill bg-line transition-[background-color] duration-300 ease-brand flex-none dark:bg-brand" aria-hidden="true">
            <i className="absolute top-[3px] left-[3px] w-[22px] h-[22px] rounded-[50%] bg-white shadow-[0_1px_3px_rgba(8,18,49,.3)] transition-[translate] duration-300 ease-brand dark:translate-x-5"></i>
          </span>
        </button>
      </div>
    </>
  );
}
