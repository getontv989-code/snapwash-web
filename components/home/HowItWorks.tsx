import { Kicker, cx, wrap } from "../ui";

const STEPS = [
  { tag: "Step 1 · Choose", title: "Pick your cleaner", body: "Browse the dry cleaners and laundromats near you and choose the one you already trust." },
  { tag: "Step 2 · Scan", title: "Snap the bag", body: "Photograph each piece. The AI names it, notes the color and prices the order." },
  { tag: "Step 3 · Book", title: "Pick a window", body: "Place the order and choose when the driver should knock. Tonight works." },
  { tag: "Step 4 · Track", title: "Watch them arrive", body: "Follow your driver on a live map so you're at the door when they are." },
  { tag: "Step 5 · Ready", title: "Get the ping", body: "Your phone buzzes the moment your cleaner finishes." },
  { tag: "Step 6 · Done", title: "Open the door", body: "Fresh clothes come back to you, with photo proof they landed." },
];

/* Cards cycle white, blue, navy */
const CARD = [
  { card: "bg-surface shadow-[0_0_0_1px_var(--line)] hover:shadow-[0_0_0_1.5px_var(--blue),0_30px_50px_-30px_color-mix(in_srgb,var(--blue)_50%,transparent)]", body: "text-muted" },
  { card: "bg-brand text-on-brand shadow-none", body: "text-white/85" },
  { card: "bg-card text-card-fg shadow-none", body: "text-card-fg/75" },
];

/** Pinned section: main.js scrolls the track one card at a time (hooks: .hsteps, .hsteps-viewport, .hsteps-track, .hsteps-progress). */
export default function HowItWorks() {
  return (
    <section className="hsteps relative steps-static:h-auto!" id="how-it-works" aria-labelledby="steps-title">
      <div className="sticky top-0 h-svh overflow-hidden flex flex-col justify-center gap-[clamp(24px,4vh,40px)] steps-static:static steps-static:h-auto steps-static:py-section">
        <div className={cx(wrap, "flex justify-between items-end gap-6 flex-wrap")}>
          <div><Kicker className="mb-[18px]">How it works</Kicker><h2 id="steps-title" className="text-2xl leading-none tracking-display max-w-[16ch]">Hamper to hanger in six moves.</h2></div>
          <div className="hsteps-progress flex-[1_1_200px] max-w-[360px] h-[3px] bg-line rounded-[3px] overflow-hidden steps-static:hidden" aria-hidden="true">
            <span className="block h-full w-full bg-brand origin-left [transform:scaleX(var(--p,0))] transition-transform duration-700 ease-brand"></span>
          </div>
        </div>
        <div className={wrap}>
          <div className="hsteps-viewport overflow-hidden py-2 -my-2">
            <ol className="hsteps-track [--hgap:clamp(16px,2vw,28px)] flex gap-(--hgap) will-change-transform transition-transform duration-700 ease-brand steps-static:[transform:none]! steps-static:grid steps-static:w-full lg:steps-static:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
              {STEPS.map((s, i) => {
                const c = CARD[i % 3];
                return (
                  <li key={s.tag} className={cx(
                    "flex-[0_0_calc((100%-2*var(--hgap))/3)] min-h-[clamp(280px,40vh,360px)] rounded-card p-[clamp(22px,2vw,28px)] flex flex-col gap-3 relative overflow-hidden",
                    "[transition:transform_.5s_var(--ease),translate_.5s_var(--ease),box-shadow_.5s_var(--ease)] hover:-translate-y-1.5 steps-static:hover:translate-y-0 steps-static:min-h-0",
                    c.card,
                  )}>
                    <span className="font-body font-medium text-xs leading-none tracking-tag uppercase opacity-70">{s.tag}</span>
                    <h3 className="text-xl leading-none tracking-display">{s.title}</h3>
                    <p className={cx("max-w-[30ch]", c.body)}>{s.body}</p>
                    <span className="font-display font-extrabold text-[clamp(3rem,2rem+2.6vw,4.5rem)] leading-[.8] tracking-display mt-auto opacity-95 steps-static:mt-3" aria-hidden="true">0{i + 1}</span>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
