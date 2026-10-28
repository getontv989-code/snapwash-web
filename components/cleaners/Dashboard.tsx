import type { CSSProperties } from "react";
import { cx } from "../ui";

type State = "in" | "clean" | "ready";

const label = "font-body font-medium text-xs leading-none tracking-caps uppercase text-muted";

/* Keep "in" in sync with the pill main.js builds for incoming orders */
const PILL: Record<State, { cls: string; text: string }> = {
  in: { cls: "bg-wash text-brand", text: "Incoming" },
  clean: { cls: "bg-[color-mix(in_srgb,#C98A00_16%,transparent)] text-[#A06E00] dark:text-[#F2B92E]", text: "Cleaning" },
  ready: { cls: "bg-[color-mix(in_srgb,#12A150_16%,transparent)] text-[#0E8A44] dark:text-[#4FD58A]", text: "Ready" },
};

function Pill({ state }: { state: State }) {
  return (
    <span className={cx("inline-flex items-center gap-1.5 py-[5px] px-[10px] rounded-pill normal-nums font-body font-medium text-[11px] leading-none tracking-pill uppercase before:w-1.5 before:h-1.5 before:rounded-[50%] before:bg-current", PILL[state].cls)}>{PILL[state].text}</span>
  );
}

const ORDERS: [string, string, string, State][] = [
  ["#2418", "3 items · suit, shirt", "7:58 pm", "in"],
  ["#2415", "5 items · shirts", "6:40 pm", "clean"],
  ["#2412", "1 item · wool coat", "5:15 pm", "clean"],
  ["#2409", "9 items · wash & fold", "2:02 pm", "ready"],
  ["#2404", "2 items · dress, blouse", "11:30 am", "ready"],
];
const WEEK = [38, 52, 45, 60, 58, 74, 92];
const TABS: [string, string][] = [["all", "All"], ["in", "Incoming"], ["clean", "Cleaning"], ["ready", "Ready"]];

/** Example retailer dashboard. main.js filters rows via [data-filter] tabs and prepends incoming orders to #order-rows. */
export default function Dashboard() {
  return (
    <div className="reveal rounded-card bg-surface shadow-[0_0_0_1px_var(--line),0_50px_80px_-50px_rgba(8,18,49,.45)] overflow-hidden">
      <div className="flex items-center justify-between gap-4 flex-wrap py-4 px-[22px] border-b border-b-line">
        <div className="flex gap-1 p-1 rounded-pill bg-wash" role="tablist" aria-label="Filter orders">
          {TABS.map(([f, t], i) => (
            <button key={f} type="button" role="tab" data-filter={f} aria-selected={i === 0 ? "true" : "false"}
              className="border-0 bg-transparent cursor-pointer py-2 px-[14px] rounded-pill font-body font-medium text-sm leading-none text-muted [transition:background-color_.3s_var(--ease),color_.3s] hover:text-ink aria-selected:bg-brand aria-selected:text-on-brand">{t}</button>
          ))}
        </div>
        <span className={label}>Example data</span>
      </div>
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,260px)] max-lg:grid-cols-[minmax(0,1fr)]">
        <div className="overflow-x-auto">
          {/* Cell styles sit on the table so rows added by main.js pick them up */}
          <table className={cx(
            "w-full border-collapse min-w-[560px] text-sm",
            "[&_th]:text-left [&_th]:font-body [&_th]:font-medium [&_th]:text-xs [&_th]:leading-none [&_th]:tracking-caps [&_th]:uppercase [&_th]:text-muted [&_th]:py-[14px] [&_th]:px-[22px] [&_th]:border-b [&_th]:border-b-line",
            "[&_td]:py-[14px] [&_td]:px-[22px] [&_td]:border-b [&_td]:border-b-line [&_td]:tabular-nums",
            "[&_tbody_tr]:transition-[background-color] [&_tbody_tr]:duration-250 [&_tbody_tr:hover]:bg-wash [&_tr.is-new]:animate-[fadeUp_.6s_var(--ease)_both]",
          )}>
            <thead><tr><th scope="col">Order</th><th scope="col">Items</th><th scope="col">Arrived</th><th scope="col">Status</th></tr></thead>
            <tbody id="order-rows">
              {ORDERS.map(([id, items, at, state]) => (
                <tr key={id} data-state={state}><td>{id}</td><td>{items}</td><td>{at}</td><td><Pill state={state} /></td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <aside className="border-l border-l-line p-[22px] grid gap-5 content-start max-lg:border-l-0 max-lg:border-t max-lg:border-t-line" aria-label="Today at a glance">
          <div><p className={label}>Orders today</p><p className="font-display font-extrabold text-[2.5rem] leading-none tracking-tightest tabular-nums" id="today-count">14</p></div>
          <div>
            <p className={label}>This week</p>
            <div className="flex items-end gap-1.5 h-[90px]" aria-hidden="true">
              {WEEK.map((h, i) => (
                <span key={i} style={{ "--h": `${h}%`, "--i": String(i) } as CSSProperties}
                  className="flex-1 rounded-t-[6px] rounded-b-[2px] bg-wash last:bg-brand h-(--h) origin-bottom animate-[grow_1s_var(--ease)_calc(var(--i)_*_60ms_+_.3s)_both]"></span>
              ))}
            </div>
          </div>
          <div><p className={label}>Drivers en route</p><p className="font-display font-extrabold text-[2.5rem] leading-none tracking-tightest tabular-nums">3</p></div>
        </aside>
      </div>
    </div>
  );
}
