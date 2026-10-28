import { ArrowIcon, Kicker, Section, btn, cx, tone, wrap } from "../ui";

/** Blue "get the app" band that closes blog pages. */
export default function AppBand() {
  return (
    <Section className={tone.blue} aria-labelledby="app-band-title">
      <div className={cx(wrap, "grid grid-cols-12 gap-x-col gap-y-8 items-end *:min-w-0")}>
        <div className="reveal col-[1/span_7] grid gap-5 max-lg:col-span-full">
          <Kicker tone="onBlueCopy">Snapwash app</Kicker>
          <h2 id="app-band-title" className="text-2xl leading-none tracking-display">Skip the trip to the cleaner.</h2>
          <p className="text-white/88 max-w-[44ch]">Scan your bag, pick a local cleaner, and a driver handles the rest. Serving New York, New Jersey and Connecticut.</p>
        </div>
        <div className="reveal [--rd:.1s] col-[9/-1] justify-self-end max-lg:col-span-full max-lg:justify-self-start">
          <a className={btn("inverse")} href="/#download" data-magnetic="">Get the app <ArrowIcon /></a>
        </div>
      </div>
    </Section>
  );
}
