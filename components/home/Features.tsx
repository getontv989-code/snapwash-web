import { Section, SectionHead, cx, wrap } from "../ui";

const cell = "reveal relative rounded-card p-card flex flex-col gap-[10px] min-w-0 overflow-hidden transition-[transform,translate,box-shadow] duration-500 ease-brand hover:-translate-y-1 hover:shadow-[0_0_0_1.5px_var(--blue)] max-lg:col-span-full";
const plain = "bg-surface shadow-[0_0_0_1px_var(--line)]";
const h3 = "text-xl leading-none tracking-display";
const body = "max-w-[42ch]";

/** "In the app" bento grid. */
export default function Features() {
  return (
    <Section className="pt-0" id="features" aria-labelledby="feat-title">
      <div className={wrap}>
        <SectionHead kicker="In the app" title="You'll always know where your coat is." titleId="feat-title">
          Every order is visible from the moment it leaves your hands to the moment it's back on the hanger.
        </SectionHead>
        <div className="grid grid-cols-12 gap-tile">
          <article className={cx(cell, "col-span-7 bg-brand text-on-brand shadow-none")}>
            <h3 className={h3}>Live tracking</h3>
            <p className={cx(body, "text-white/85")}>Your driver on a map, in real time. No more waiting in the lobby.</p>
            <div className="mt-auto h-[120px] rounded-[18px] bg-white/12 relative overflow-hidden" aria-hidden="true">
              <svg className="w-full h-full" viewBox="0 0 400 140" preserveAspectRatio="xMidYMid slice">
                <path className="stroke-white/30 stroke-[10] fill-none stroke-cap-round" d="M-10 100 H140 Q170 100 170 70 V40 Q170 20 200 20 H420" />
                <path className="stroke-white/30 stroke-[10] fill-none stroke-cap-round" d="M260 -10 V160" />
                <path className="stroke-white stroke-3 fill-none [stroke-dasharray:6_8] stroke-cap-round animate-dash" d="M30 100 H140 Q170 100 170 70 V40 Q170 20 200 20 H330" />
                <circle className="fill-white" cx="330" cy="20" r="9" />
              </svg>
            </div>
          </article>
          <article className={cx(cell, plain, "col-span-5 [--rd:.08s]")}>
            <h3 className={h3}>Live chat</h3>
            <p className={cx(body, "text-muted")}>Message your driver or your cleaner without leaving the order.</p>
            <div className="mt-auto grid gap-2" aria-hidden="true">
              <p className="m-0 py-[10px] px-[14px] rounded-[18px] text-sm max-w-[85%] bg-wash text-ink rounded-bl-[6px]">Downstairs in 2. Buzzer 4B?</p>
              <p className="m-0 py-[10px] px-[14px] rounded-[18px] text-sm max-w-[85%] bg-brand text-on-brand justify-self-end rounded-br-[6px]">Yes! And there's wine on the left cuff 🙏</p>
            </div>
          </article>
          <article className={cx(cell, plain, "col-span-4")}>
            <h3 className={h3}>One tap to pay</h3>
            <p className={cx(body, "text-muted")}>Charged once per order, processed by Stripe.</p>
            <div className="mt-auto flex flex-wrap gap-2">
              {["Apple Pay", "Google Pay", "Card"].map((m) => <span key={m} className="py-2 px-3 rounded-pill shadow-[inset_0_0_0_1.5px_currentColor] font-body font-medium text-xs leading-none tracking-pill uppercase">{m}</span>)}
            </div>
          </article>
          <article className={cx(cell, "col-span-4 bg-card text-card-fg shadow-none [--rd:.08s]")}>
            <h3 className={h3}>Proof of delivery</h3>
            <p className={cx(body, "text-card-fg/75")}>Every drop-off is documented, so you know exactly where your bag was left.</p>
          </article>
          <article className={cx(cell, plain, "col-span-4 [--rd:.16s]")}>
            <p className={cx(body, "font-display font-extrabold text-stat leading-[.85] tracking-display text-brand")}><span data-count="10" data-prefix="$">$10</span></p>
            <h3 className={h3}>For every friend you bring</h3>
            <p className={cx(body, "text-muted")}>Share your code. When they place an order, you both feel cleaner.</p>
          </article>
        </div>
      </div>
    </Section>
  );
}
