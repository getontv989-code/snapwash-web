import { Fragment } from "react";

const NEIGHBORHOODS = ["Upper West Side", "Williamsburg", "Astoria", "Harlem", "Park Slope", "Chelsea", "Long Island City", "Tribeca", "Bushwick", "Upper East Side", "Greenpoint", "East Village"];

/** Neighborhood ticker. The list is rendered twice so the -50% loop is seamless; hover pauses it. */
export default function Marquee() {
  const run = (
    <span className="inline-flex items-center gap-9 pr-9 whitespace-nowrap font-display font-bold text-[clamp(1.5rem,1rem+2vw,2.75rem)] leading-none tracking-tighter">
      {NEIGHBORHOODS.map((n) => <Fragment key={n}>{n} <i className="w-[18px] h-[18px] rounded-[50%] border-4 border-brand flex-none"></i> </Fragment>)}
    </span>
  );
  return (
    <div className="group/marquee overflow-hidden border-y-[1.5px] border-y-ink py-[18px]" aria-hidden="true">
      <div className="flex w-max animate-marquee group-hover/marquee:[animation-play-state:paused] motion-reduce:animate-none!">
        {run}
        {run}
      </div>
    </div>
  );
}
