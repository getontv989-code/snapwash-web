import type { ReactNode } from "react";
import { cx } from "../ui";
import { AVATARS } from "./photos";

/* Hero phone that walks through the app. public/main.js cycles the steps: it sets data-step on #tour,
   moves .is-active between the .app-view screens and fills each .bar. Everything inside a screen
   animates in via `in-[.is-active]:` so the choreography restarts whenever its screen becomes active. */

const ico = "fill-none stroke-current stroke-round"; // add a stroke width: stroke-[1.8] is the default
const card = "bg-white shadow-[0_0_0_1px_#E1E7F5]";
/* Entrance for a screen's rows, keyed by delay (full class names so Tailwind can see them) */
const rise = {
  "0": "in-[.is-active]:animate-[fadeUp_.5s_var(--ease)_both]",
  ".1s": "in-[.is-active]:animate-[fadeUp_.5s_var(--ease)_.1s_both]",
  ".2s": "in-[.is-active]:animate-[fadeUp_.5s_var(--ease)_.2s_both]",
  ".35s": "in-[.is-active]:animate-[fadeUp_.5s_var(--ease)_.35s_both]",
  "1.6s": "in-[.is-active]:animate-[fadeUp_.5s_var(--ease)_1.6s_both]",
  "1.8s": "in-[.is-active]:animate-[fadeUp_.5s_var(--ease)_1.8s_both]",
  "2s": "in-[.is-active]:animate-[fadeUp_.5s_var(--ease)_2s_both]",
};

const STEPS = ["Scan your clothes", "Choose your cleaner", "Schedule a pickup", "Review your order", "Track your driver"];

const ITEMS = [
  { img: "/app/dress.webp", name: "Dress", detail: "Press", price: "$3.00" },
  { img: "/app/pants.webp", name: "Pants", detail: "Dry cleaning + Press", price: "$8.00" },
  { img: "/app/polo.webp", name: "T-Shirt / Polo", detail: "Dry cleaning + Press", price: "$6.00" },
];

const CAR = "M5 16v2M19 16v2M4 16h16v-4l-2-5H6l-2 5zM4 12h16M8 14h.01M16 14h.01";
const TICK = "M6 12.5l4 4 8-9";
const SHOP = "M4 9l1.5-4h13L20 9M4 9v10h16V9M4 9h16M10 19v-5h4v5";

function AppView({ id, label, active, className, children }: { id: string; label: string; active?: boolean; className: string; children: ReactNode }) {
  return (
    <section id={id} role="tabpanel" aria-label={label} className={cx(
      "app-view absolute inset-0 flex flex-col opacity-0 translate-x-6 pointer-events-none",
      "[transition:opacity_.55s_var(--ease),translate_.7s_var(--ease)]",
      "[&.is-active:not(.is-leaving)]:opacity-100 [&.is-active:not(.is-leaving)]:translate-x-0 [&.is-active:not(.is-leaving)]:pointer-events-auto [&.is-leaving]:-translate-x-6",
      active && "is-active", className,
    )}>{children}</section>
  );
}

function AppTitle({ children }: { children: ReactNode }) {
  return <h3 className="font-display font-extrabold text-[1.3rem] leading-[1.1] tracking-tighter text-navy">{children}</h3>;
}

function AppCta({ className, children }: { className?: string; children: ReactNode }) {
  return <span className={cx("block text-center p-[14px] rounded-[16px] bg-blue text-white font-body font-semibold text-[13px] leading-none in-[.is-active]:animate-[ctaPulse_2.4s_var(--ease)_2.6s_both]", className ?? "mt-auto")}>{children}</span>;
}

function Car({ small }: { small?: boolean }) {
  return (
    <span className={cx("rounded-[50%] grid place-items-center bg-white text-blue flex-none", small ? "w-[34px] h-[34px]" : "w-10 h-10")}>
      <svg className={cx(ico, "stroke-[1.8]", small ? "w-[19px] h-[19px]" : "w-[22px] h-[22px]")} viewBox="0 0 24 24" aria-hidden="true"><path d={CAR} /></svg>
    </span>
  );
}

/** Garment rows, as in the scan and review screens */
function ItemList({ review }: { review?: boolean }) {
  const delays = (review ? ["0", ".1s", ".2s"] : ["1.6s", "1.8s", "2s"]) as (keyof typeof rise)[];
  return (
    <ul className={cx("grid gap-1.5", review ? "p-0" : "pt-3 px-3 pb-0")}>
      {ITEMS.map((it, i) => (
        <li key={it.name} className={cx("grid grid-cols-[34px_1fr_auto] gap-[10px] items-center pr-[10px] pl-1.5 rounded-[12px] text-[12px]", card, review ? "py-[5px]" : "py-1.5", rise[delays[i]])}>
          <img className="w-[34px] h-[34px] rounded-[8px] object-cover bg-app-photo" src={it.img} alt="" width="160" height="160" />
          <span><b className="block font-bold">{it.name}</b>{!review && <small className="block text-app-muted text-[10.5px]">{it.detail}</small>}</span>
          <span className="font-bold">{it.price}</span>
        </li>
      ))}
    </ul>
  );
}

const box = "absolute border-2 border-white rounded-[10px] shadow-[0_0_0_1px_rgba(0,96,246,.55),inset_0_0_0_1px_rgba(0,96,246,.25)] opacity-0";
const boxLabel = "absolute top-[-11px] left-1.5 py-1 px-[7px] rounded-pill bg-blue text-white font-body font-semibold text-[9.5px] leading-none not-italic whitespace-nowrap";
/** Where each garment sits in the scan photo (shared with the scan demo) */
export const GARMENT_BOXES = [
  { label: "Dress · Red", pos: "left-[1%] top-[17%] w-[36%] h-[77%]" },
  { label: "Pants · Patterned", pos: "left-[29%] top-[22%] w-[33%] h-[76%]" },
  { label: "Polo · Black", pos: "left-[61%] top-[32%] w-[37%] h-[63%]" },
];
export function GarmentBox({ i, className }: { i: number; className?: string }) {
  const b = GARMENT_BOXES[i];
  return <span className={cx(box, b.pos, className)}><em className={boxLabel}>{b.label}</em></span>;
}

const SHOPS = [
  { name: "Clean Avenue", detail: "Dry cleaning · Wash & Fold", dist: "0.3 mi away", icon: <path d={SHOP} /> },
  { name: "Gino's Dry Cleaning", detail: "Wash & Fold", dist: "0.6 mi away", icon: <><rect x="5" y="3.5" width="14" height="17" rx="2" /><circle cx="12" cy="13" r="4" /><path d="M8 7h2" /></> },
  { name: "Parkway Cleaners", detail: "Dry cleaning", dist: "0.9 mi away", icon: <path d="M12 7a2 2 0 1 1 2 2c-1 0-2 .6-2 2M12 11l-8 6h16z" /> },
];

/* Each field lights up, its placeholder drops out and the value types in, one after another */
const FIELDS = [
  { label: "Pickup address", ph: "Enter address", val: "Upper West Side, NY",
    focus: "in-[.is-active]:animate-[fieldFocus_1s_.8s_both]", out: "in-[.is-active]:animate-[fadeOut_.1s_linear_.9s_forwards]", type: "in-[.is-active]:animate-[typeIn_.7s_steps(19)_.9s_both]" },
  { label: "Pickup date", ph: "Select date", val: "Tomorrow",
    focus: "in-[.is-active]:animate-[fieldFocus_.7s_1.7s_both]", out: "in-[.is-active]:animate-[fadeOut_.1s_linear_1.8s_forwards]", type: "in-[.is-active]:animate-[typeIn_.3s_steps(8)_1.8s_both]" },
  { label: "Pickup time", ph: "Select time", val: "6 – 8 pm",
    focus: "in-[.is-active]:animate-[fieldFocus_.7s_2.3s_both]", out: "in-[.is-active]:animate-[fadeOut_.1s_linear_2.4s_forwards]", type: "in-[.is-active]:animate-[typeIn_.3s_steps(8)_2.4s_both]" },
  { label: "Driver instructions", ph: "Add instructions", val: "Leave with the doorman",
    focus: "in-[.is-active]:animate-[fieldFocus_1s_2.9s_both]", out: "in-[.is-active]:animate-[fadeOut_.1s_linear_3s_forwards]", type: "in-[.is-active]:animate-[typeIn_.8s_steps(22)_3s_both]" },
];

/* Floating cards that pop out of the phone, one per step */
const float = cx(
  "absolute -left-9 flex items-center gap-[10px] py-[10px] pr-[14px] pl-[10px] rounded-[18px] bg-white text-navy whitespace-nowrap opacity-0",
  "shadow-[0_22px_44px_-18px_rgba(8,18,49,.5),0_0_0_1px_rgba(8,18,49,.06)] font-body font-normal text-[11px] leading-[1.3]",
);
const floatIcon = "w-9 h-9 grid place-items-center flex-none";
const floatIconSoft = cx(floatIcon, "rounded-[12px] bg-app-tint text-blue");
const floatIconSolid = cx(floatIcon, "rounded-[50%] bg-blue text-white");
const floatSvg = "w-5 h-5 fill-none stroke-current stroke-2 stroke-round";
const fb = "block text-[13px] font-bold";
const fsmall = "block text-app-muted text-[11px]";

export default function AppTour() {
  return (
    <div className="group/tour grid grid-cols-[minmax(0,1fr)_minmax(0,300px)] gap-[clamp(16px,3vw,40px)] items-center relative z-1 max-lg:grid-cols-[minmax(0,1fr)] max-lg:justify-items-center"
      id="tour" data-step="0" aria-label="A tour of the Snapwash app">
      <ol className="grid gap-1 self-center max-lg:grid-flow-col max-lg:auto-cols-[minmax(0,1fr)] max-lg:w-full max-lg:max-w-[420px] max-lg:pb-0" role="tablist" aria-label="App tour steps">
        {STEPS.map((s, i) => (
          <li key={s}>
            <button type="button" role="tab" aria-selected={i === 0 ? "true" : "false"} aria-controls={`ts-${i + 1}`} data-step={i}
              className={cx(
                "group/rail w-full grid gap-[10px] text-left cursor-pointer py-3 px-0 border-0 bg-transparent text-muted font-body font-semibold text-base leading-[1.2]",
                "[transition:color_.3s_var(--ease),transform_.4s_var(--ease),translate_.4s_var(--ease)] hover:text-ink lg:hover:translate-x-1 aria-selected:text-ink",
                "max-lg:text-[0px] max-lg:gap-0 max-lg:py-[10px]",
              )}>
              <span className="bar block h-[3px] rounded-[3px] bg-line overflow-hidden">
                <i className="block h-full bg-brand origin-left [transform:scaleX(0)] group-aria-selected/rail:animate-[tourBar_var(--tour-ms,3600ms)_linear_forwards] group-[.is-done]/rail:[transform:scaleX(1)]"></i>
              </span>{s}
            </button>
          </li>
        ))}
      </ol>
      <div className={cx(
        "relative w-full max-w-[300px] justify-self-end rounded-[48px] p-[11px] bg-navy",
        "shadow-[0_0_0_1.5px_#1F2B52,0_60px_90px_-45px_color-mix(in_srgb,var(--blue)_70%,transparent)]",
        "animate-[phoneIn_1.3s_var(--ease)_.25s_both] motion-reduce:animate-none max-lg:justify-self-center max-lg:-order-1",
      )}>
        <div className="absolute z-6 left-0 bottom-[14%] -translate-x-[58%] flex items-center gap-3 py-2 pl-2 pr-4 rounded-pill bg-surface text-ink shadow-[0_0_0_1px_var(--line),0_24px_44px_-20px_color-mix(in_srgb,var(--ink)_45%,transparent)] animate-[fadeUp_.8s_var(--ease)_1.8s_both] motion-reduce:animate-none max-lg:-translate-x-[8%] max-lg:bottom-[8%]" aria-hidden="true">
          <img src={AVATARS.driver} alt="" width="44" height="44" className="w-11 h-11 rounded-[50%] object-cover flex-none" />
          <span className="leading-[1.25]"><b className="block font-body font-semibold text-sm">Marcus is on his way</b><small className="block text-muted text-xs">Your driver · 4 min</small></span>
          <i className="w-2 h-2 rounded-[50%] bg-brand animate-pulse" />
        </div>
        <div className="relative aspect-[9/19] max-w-full rounded-[38px] overflow-hidden bg-app-bg text-navy">
          <div className="absolute inset-x-0 top-0 z-5 h-11 flex justify-between items-center px-[26px] font-body font-semibold text-[12px] leading-none transition-[color] duration-400 ease-brand group-data-[step=0]/tour:text-white" aria-hidden="true">
            <span>9:41</span><span className="w-[84px] h-6 rounded-pill bg-navy"></span><span>5G</span>
          </div>

          <AppView id="ts-1" label="Scan your clothes" active className="p-0 pb-[18px] gap-0">
            <div className="flex items-center gap-1 pt-[52px] px-3 pb-[14px] bg-blue text-white font-display font-extrabold text-[16px] leading-none tracking-tight">
              <svg className={cx(ico, "w-5 h-5 stroke-[2.4]")} viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>Scan your clothes
            </div>
            <div className="relative overflow-hidden rounded-b-[22px] bg-navy">
              <img className="block w-full h-auto" src="/app/scan-photo.webp" alt="A red dress, patterned pants and a black polo laid out on a table" width="763" height="616" />
              <span className="absolute inset-x-0 top-0 h-[34%] bg-[linear-gradient(to_bottom,rgba(0,96,246,0),rgba(0,96,246,.38))] border-b-2 border-b-white shadow-[0_8px_18px_-4px_rgba(0,96,246,.7)] [transform:translateY(-100%)] opacity-0 in-[.is-active]:animate-[sweep_1.3s_var(--ease-in-out)_.25s_both]"></span>
              <GarmentBox i={0} className="in-[.is-active]:animate-[boxIn_.45s_var(--ease)_1s_both]" />
              <GarmentBox i={1} className="in-[.is-active]:animate-[boxIn_.45s_var(--ease)_1.25s_both]" />
              <GarmentBox i={2} className="in-[.is-active]:animate-[boxIn_.45s_var(--ease)_1.5s_both]" />
              <span className="absolute left-1/2 bottom-[10px] w-[38px] h-[38px] -ml-[19px] rounded-[50%] border-[3px] border-white bg-white/30 in-[.is-active]:animate-[shutter_.5s_var(--ease)_.1s_both]"></span>
            </div>
            <ItemList />
            <AppCta className="mt-auto mx-3 mb-0">Choose a cleaner</AppCta>
          </AppView>

          <AppView id="ts-2" label="Choose your cleaner" className="pt-[58px] px-[18px] pb-5 gap-3">
            <AppTitle>Choose your cleaner</AppTitle>
            <div className={cx("flex items-center gap-2 py-[11px] px-3 rounded-[14px] text-app-hint text-[13px]", card)}>
              <svg className={cx(ico, "w-4 h-4 stroke-2 text-navy")} viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5" /><path d="M16 16l4 4" /></svg>Search cleaners
            </div>
            <ul className="grid gap-2">
              {SHOPS.map((s, i) => (
                <li key={s.name} className={cx(
                  "grid grid-cols-[40px_1fr_22px] gap-[10px] items-center p-[11px] rounded-[16px] text-[13px]", card,
                  i === 0 ? "in-[.is-active]:animate-[fadeUp_.5s_var(--ease)_both,pickRing_.45s_var(--ease)_1.2s_forwards]" : rise[i === 1 ? ".1s" : ".2s"],
                )}>
                  <span className="w-10 h-10 rounded-[12px] grid place-items-center bg-app-tint text-navy">
                    <svg className={cx(ico, "w-[22px] h-[22px] stroke-[1.8]")} viewBox="0 0 24 24" aria-hidden="true">{s.icon}</svg>
                  </span>
                  <span><b className="block font-bold">{s.name}</b><small className="block text-app-muted text-[11px]">{s.detail}</small><small className="block text-blue font-semibold text-[11px]">{s.dist}</small></span>
                  <span className={cx(
                    "relative w-[22px] h-[22px] rounded-[50%] border-2 border-app-radio",
                    "after:absolute after:left-1.5 after:top-0.5 after:w-[5px] after:h-[10px] after:border-white after:border-r-2 after:border-b-2 after:[transform:rotate(45deg)] after:opacity-0",
                    i === 0 && "in-[.is-active]:animate-[radioOn_.3s_var(--ease)_1.25s_forwards] in-[.is-active]:after:animate-[tickIn_.3s_var(--ease)_1.4s_forwards]",
                  )}></span>
                </li>
              ))}
            </ul>
            <AppCta>Continue</AppCta>
          </AppView>

          <AppView id="ts-3" label="Schedule a pickup" className="pt-[58px] px-[18px] pb-5 gap-3">
            <AppTitle>Schedule pickup</AppTitle>
            <div className="flex items-center gap-3 p-3 rounded-[18px] bg-blue text-white text-[11px] in-[.is-active]:animate-[fadeUp_.5s_var(--ease)_.1s_both]">
              <Car />
              <span className="flex-1"><b className="block text-[14px]">Driver pickup</b><small className="opacity-85">Collected from your door</small></span>
              <span className="w-6 h-6 rounded-[50%] grid place-items-center bg-white text-blue in-[.is-active]:animate-[boxIn_.4s_var(--ease)_.6s_both]">
                <svg className={cx(ico, "w-[15px] h-[15px] stroke-3")} viewBox="0 0 24 24" aria-hidden="true"><path d={TICK} /></svg>
              </span>
            </div>
            <div className="grid gap-[9px]">
              {FIELDS.map((f) => (
                <p key={f.label} className="grid gap-[5px]">
                  <span className="font-body font-bold text-[11px] leading-none text-navy">{f.label}</span>
                  <i className={cx("grid py-[10px] px-3 rounded-[12px] not-italic text-[12.5px]", card, f.focus)}>
                    <em className={cx("[grid-area:1/1] not-italic whitespace-nowrap overflow-hidden text-app-hint", f.out)}>{f.ph}</em>
                    <em className={cx("[grid-area:1/1] not-italic whitespace-nowrap overflow-hidden text-navy font-semibold opacity-0", f.type)}>{f.val}</em>
                  </i>
                </p>
              ))}
            </div>
            <AppCta>Continue</AppCta>
          </AppView>

          <AppView id="ts-4" label="Review your order" className="pt-[58px] px-[18px] pb-5 gap-[10px]">
            <AppTitle>Review your order</AppTitle>
            <div className={cx("flex items-center gap-3 p-3 rounded-[18px] bg-app-tint text-[11px] text-app-muted", rise["0"])}>
              <span className="w-[42px] h-[42px] rounded-[50%] grid place-items-center bg-blue text-white flex-none">
                <svg className={cx(ico, "w-6 h-6 stroke-2")} viewBox="0 0 24 24" aria-hidden="true"><path d="M12 8a2 2 0 1 1 2 2c-1 0-2 .6-2 2M12 12l-8 6h16z" /></svg>
              </span>
              <span><b className="block text-[14px] text-navy">Clean Avenue</b><small>Dry cleaning · Wash &amp; Fold</small></span>
            </div>
            <p className="flex justify-between items-baseline font-body font-bold text-[13px] leading-none"><span>Your items</span><span className="text-blue text-[12px]">Edit</span></p>
            <ItemList review />
            <div className={cx("flex items-center gap-[10px] py-[10px] px-3 rounded-[16px] bg-app-tint text-[11px] text-app-muted", rise[".35s"])}>
              <Car small />
              <span><b className="block text-navy text-[12.5px]">Driver pickup</b><small>We&apos;ll collect from your address</small></span>
            </div>
            <AppCta>Continue to checkout</AppCta>
          </AppView>

          <AppView id="ts-5" label="Track your driver" className="p-0 gap-3">
            <div className="absolute inset-0">
              <svg className="w-full h-full [fill:initial] stroke-none stroke-[1.8] stroke-round" viewBox="0 0 300 330" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                <rect className="fill-[#E9EEF8]" width="300" height="330" />
                <rect className="fill-[#DCE3F2]" x="20" y="20" width="110" height="90" rx="8" /><rect className="fill-[#DCE3F2]" x="170" y="20" width="110" height="130" rx="8" />
                <rect className="fill-[#DCE3F2]" x="20" y="150" width="110" height="160" rx="8" /><rect className="fill-[#DCE3F2]" x="170" y="190" width="110" height="120" rx="8" />
                <path className="stroke-white stroke-[14] fill-none" d="M0 130H300M150 0V330M0 170H130" />
                <path className="stroke-blue stroke-4 fill-none stroke-round [stroke-dasharray:2_8]" id="m-route" d="M60 300V170H150V40H230" />
                <circle className="fill-navy stroke-white stroke-3" cx="230" cy="40" r="9" />
                <g><circle className="fill-blue stroke-white stroke-3" r="10" /><circle r="4" className="fill-white stroke-none stroke-3" />
                  <animateMotion dur="5s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear"><mpath href="#m-route" /></animateMotion></g>
              </svg>
            </div>
            <div className="absolute left-[10px] right-[10px] bottom-[10px] p-4 rounded-[26px] bg-white shadow-[0_20px_40px_-20px_rgba(8,18,49,.45)] grid gap-3 in-[.is-active]:animate-[fadeUp_.6s_var(--ease)_.2s_both]">
              <div className="flex gap-3 items-center text-[13px]">
                <span className="w-10 h-10 rounded-[50%] grid place-items-center bg-navy text-white font-display font-extrabold text-[12px] leading-none flex-none">MR</span>
                <span><b className="block font-bold">Driver on the way</b><small className="text-app-muted">Arriving in about 4 min</small></span>
              </div>
              <div className="grid grid-cols-[1fr_1fr] gap-2">
                {["Message", "Share ETA"].map((a) => <span key={a} className="text-center p-[11px] rounded-[14px] bg-app-tint-2 text-blue font-body font-semibold text-[12px] leading-none">{a}</span>)}
              </div>
            </div>
          </AppView>
        </div>
        <div className="absolute inset-0 z-6 pointer-events-none" aria-hidden="true">
          <div className={cx(float, "top-[49%] group-data-[step=0]/tour:animate-[flIn_.6s_var(--ease)_2.2s_both]")}>
            <span className={floatIconSoft}><svg className={floatSvg} viewBox="0 0 24 24"><path d="M9 4l-5 3 2 4 2-1v10h8V10l2 1 2-4-5-3c-.5 1.5-1.7 2.3-3 2.3S9.5 5.5 9 4z" /></svg></span>
            <span><b className={fb}>3 items identified</b><small className={fsmall}>Estimated total <strong className="text-blue text-[13px] ml-1">$17.00</strong></small></span>
          </div>
          <div className={cx(float, "top-[70%] group-data-[step=1]/tour:animate-[flIn_.6s_var(--ease)_1.6s_both]")}>
            <span className={floatIconSoft}><svg className={floatSvg} viewBox="0 0 24 24"><path d={SHOP} /></svg></span>
            <span><b className={fb}>Clean Avenue</b><small className="block text-blue font-semibold text-[11px]">Selected cleaner</small></span>
            <span className="w-[26px] h-[26px] rounded-[50%] grid place-items-center bg-blue text-white ml-1.5"><svg className="w-[15px] h-[15px] fill-none stroke-current stroke-3 stroke-round" viewBox="0 0 24 24"><path d={TICK} /></svg></span>
          </div>
          <div className={cx(float, "top-[40%] group-data-[step=2]/tour:animate-[flIn_.6s_var(--ease)_.8s_both]")}>
            <span className={floatIconSolid}><svg className={floatSvg} viewBox="0 0 24 24"><path d={CAR} /></svg></span>
            <span><b className={fb}>Driver pickup</b><small className={fsmall}>Tomorrow · 6 – 8 pm</small></span>
          </div>
          <div className={cx(float, "top-[66%] group-data-[step=3]/tour:animate-[flIn_.6s_var(--ease)_1s_both]")}>
            <span className={floatIconSoft}><svg className={floatSvg} viewBox="0 0 24 24"><path d="M6 8h12l-1 12H7zM9 8a3 3 0 0 1 6 0" /></svg></span>
            <span><small className={fsmall}>3 items</small><b className={fb}>Subtotal</b></span>
            <strong className="font-display font-extrabold text-[20px] leading-none tracking-tight ml-[14px]">$17.00</strong>
          </div>
          <div className={cx(float, "top-[24%] group-data-[step=4]/tour:animate-[flIn_.6s_var(--ease)_1.2s_both]")}>
            <span className={floatIconSolid}><svg className={floatSvg} viewBox="0 0 24 24"><path d={TICK} /></svg></span>
            <span><b className={fb}>Order confirmed</b><small className={fsmall}>3 items · Clean Avenue</small></span>
          </div>
        </div>
      </div>
      <p className="absolute right-0 -bottom-7 font-body font-medium text-xs leading-none tracking-tag uppercase text-muted max-lg:static">Example screens</p>
    </div>
  );
}
