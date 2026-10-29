import { ArrowLink, Kicker, Section, cx, grid12, wrap } from "../site";
import { GarmentBox } from "./AppTour";
import { buttonVariants } from "@/components/ui/button";

/* public/main.js runs the demo on a loop: it toggles .is-scanning / .is-done on #scan-phone, .is-found on
   each .vf-box inside .viewfinder, and appends rows to #bag (row classes live in main.js). */
export default function ScanDemo() {
  return (
    <Section className="overflow-clip" id="scan" aria-labelledby="scan-title">
      <div className={cx(wrap, grid12, "gap-y-12 items-center")}>
        <div className="reveal col-[1/span_5] grid gap-6 content-start max-lg:col-span-full">
          <Kicker className="max-w-[40ch]">AI scanning</Kicker>
          <h2 id="scan-title" className="text-2xl leading-none tracking-display">Point. Snap. It's itemized.</h2>
          <p className="text-muted max-w-[40ch]">No dropdowns, no counting shirts on the floor. Snapwash recognizes each garment and its color, builds your bag and prices the order before the driver arrives.</p>
          <ArrowLink href="#pricing">See what it costs</ArrowLink>
        </div>
        <div className="reveal [--rd:.1s] col-[7/-1] p-4 max-lg:col-span-full">
          <div className="w-[min(100%,340px)] mx-auto max-w-full rounded-[44px] p-3 bg-navy shadow-[0_50px_80px_-40px_rgba(8,18,49,.55)]">
            <div className="group/scan rounded-[34px] bg-surface text-ink py-[22px] px-[18px] grid gap-[14px] min-h-0 content-start" id="scan-phone">
              <div className="flex justify-between items-center font-body font-medium text-xs leading-none tracking-label uppercase text-muted"><span>Scan your clothes</span><span>Bag · NY</span></div>
              <div className="viewfinder relative aspect-[763/616] rounded-[22px] bg-navy overflow-hidden">
                <img className="block w-full h-full object-cover" src="/app/scan-photo.webp" alt="A red dress, patterned pants and a black polo laid out on a table" width="763" height="616" loading="lazy" />
                {[0, 1, 2].map((i) => <GarmentBox key={i} i={i} className="vf-box [&.is-found]:animate-box-in" />)}
                <span className="absolute inset-x-0 h-[3px] bg-white shadow-[0_0_22px_6px_rgba(0,96,246,.75)] top-[4%] opacity-0 group-[.is-scanning]/scan:opacity-100 group-[.is-scanning]/scan:animate-[beam_1.3s_var(--ease-in-out)_both]"></span>
              </div>
              <p className="flex justify-between items-baseline font-body font-semibold text-sm leading-none" id="bag-total"><span>Your bag</span><b className="font-display font-extrabold text-lg leading-none text-brand">$0.00</b></p>
              <ul className="grid gap-0 content-start min-h-[168px]" id="bag"><li className="bag-empty block py-2 border-t border-t-line text-sm text-muted animate-rise">Your bag is empty.</li></ul>
              <div className={buttonVariants({ variant: "static" })} id="scan-btn" aria-hidden="true"><span>Scanning</span></div>
              <p className="font-body font-medium text-xs leading-[1.4] text-muted text-center tracking-note">Demo · items are examples</p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
