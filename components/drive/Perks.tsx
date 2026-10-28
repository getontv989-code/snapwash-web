import { Section, SectionHead, cx, tone, wrap } from "../ui";

const perk = "reveal rounded-card p-card flex flex-col gap-[10px] min-w-0 transition-[transform,translate,box-shadow] duration-500 ease-brand hover:-translate-y-1 hover:shadow-[0_0_0_1.5px_#0060F6] max-lg:col-span-full";
const card = "bg-night-2 shadow-[0_0_0_1px_var(--night-line)]";
const h3 = "text-xl leading-none tracking-display";
const body = "text-night-muted max-w-[40ch]";
const DAYS = [["Mon", true], ["Tue", false], ["Wed", true], ["Thu", false], ["Fri", true], ["Sat", false], ["Sun", false]] as const;

export default function Perks() {
  return (
    <Section className={cx("pt-0", tone.night)} aria-labelledby="perks-title">
      <div className={wrap}>
        <SectionHead kicker="Why drivers stay" title="Built for the person behind the wheel." titleId="perks-title" />
        <div className="grid grid-cols-12 gap-tile">
          <article className={cx(perk, card, "col-span-7")}>
            <h3 className={h3}>Your week, your call</h3>
            <p className={body}>No fixed shifts. Tap the days you want to drive.</p>
            {/* #week / #week-out: main.js toggles aria-pressed and rewrites the summary */}
            <div className="grid grid-cols-7 gap-1.5 mt-auto" id="week" role="group" aria-label="Pick your driving days">
              {DAYS.map(([d, on]) => (
                <button key={d} type="button" data-day={d} aria-pressed={on ? "true" : "false"} className={cx(
                  "aspect-square max-w-full py-px px-1.5 rounded-[12px] border-0 cursor-pointer bg-night text-night-muted shadow-[inset_0_0_0_1px_var(--night-line)]",
                  "font-body font-medium text-xs leading-none tracking-pill uppercase grid place-items-center",
                  "[transition:background-color_.3s_var(--ease),color_.3s,transform_.3s_var(--ease),translate_.3s_var(--ease)] hover:-translate-y-0.5 hover:text-night-fg",
                  "aria-pressed:bg-blue aria-pressed:text-white aria-pressed:shadow-none",
                )}>{d}</button>
              ))}
            </div>
            <p className={cx(body, "font-body font-medium text-sm leading-[1.4] min-h-[1.4em]")} id="week-out" aria-live="polite">You drive Mon, Wed, Fri. Change it any time.</p>
          </article>
          <article className={cx(perk, "col-span-5 bg-blue shadow-none [--rd:.08s]")}>
            <p className="max-w-[40ch] text-white/85 font-display font-extrabold text-stat leading-[.85] tracking-display"><span data-count="50" data-prefix="$">$50</span></p>
            <h3 className={h3}>For every driver you bring</h3>
            <p className="max-w-[40ch] text-white/85">Know someone who'd like flexible work? Refer them and earn $50.</p>
          </article>
          <article className={cx(perk, card, "col-span-4")}><h3 className={h3}>Navigation built in</h3><p className={body}>Turn-by-turn directions inside the driver app, from pickup to cleaner to door.</p></article>
          <article className={cx(perk, card, "col-span-4 [--rd:.08s]")}><h3 className={h3}>Chat on the job</h3><p className={body}>Message customers and cleaners directly. No personal numbers shared.</p></article>
          <article className={cx(perk, card, "col-span-4 [--rd:.16s]")}><h3 className={h3}>Payouts on time</h3><p className={body}>Customers pay up front, and your share lands in your account through the app.</p></article>
        </div>
      </div>
    </Section>
  );
}
