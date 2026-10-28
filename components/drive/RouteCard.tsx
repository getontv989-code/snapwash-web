/* Animated delivery route. public/main.js draws #route-leg, moves #route-car along it and updates #route-status. */
const LEG = "M90 190 H250 V100 Q250 80 270 80 H430 V300 Q430 320 450 320 H520";
const GRID = [
  ...[0, 60, 120, 180, 240, 300, 360, 420, 480, 540, 600].map((x) => `M${x} 0V420`),
  ...[0, 60, 120, 180, 240, 300, 360, 420].map((y) => `M0 ${y}H600`),
];
const PINS = [
  { at: "translate(90 190)", label: "Pickup", stop: "STOP 1", lx: -14, ly: -24, sy: -40 },
  { at: "translate(430 80)", label: "Cleaner", stop: "STOP 2", lx: 20, ly: -14, sy: -30 },
  { at: "translate(520 320)", label: "Drop-off", stop: "STOP 3", lx: -60, ly: 44, sy: 28 },
];

const leg = "stroke-blue stroke-4 fill-none stroke-round";

export default function RouteCard() {
  return (
    // The card is always dark, whatever the theme, so it pins its own night colours
    <div className="[--night-2:#0E1838] [--night-line:#1F2B52] [--night-fg:#EEF3FF] [--night-muted:#9AA8CC] relative rounded-card bg-night-2 p-[clamp(16px,2vw,24px)] shadow-[0_0_0_1px_var(--night-line)]">
      <svg className="w-full h-auto" viewBox="0 0 600 420" role="img" aria-labelledby="route-t">
        <title id="route-t">A delivery route from a customer's home to a dry cleaner and on to a drop-off</title>
        <g>{GRID.map((d) => <path key={d} className="stroke-night-line stroke-1" d={d} />)}</g>
        <rect className="fill-[#0A1430]" x="70" y="40" width="160" height="110" rx="10" /><rect className="fill-[#0A1430]" x="300" y="40" width="220" height="80" rx="10" />
        <rect className="fill-[#0A1430]" x="70" y="230" width="120" height="140" rx="10" /><rect className="fill-[#0A1430]" x="260" y="200" width="140" height="170" rx="10" /><rect className="fill-[#0A1430]" x="460" y="190" width="100" height="180" rx="10" />
        {["M30 190 H580", "M250 0 V420", "M430 0 V420", "M30 0 V420"].map((d) => <path key={d} className="stroke-[#1A2754] stroke-[14] fill-none stroke-cap-round" d={d} />)}
        <path className={`${leg} opacity-18`} d={LEG} />
        <path className={leg} id="route-leg" d={LEG} />
        {PINS.map((p) => (
          <g key={p.label} transform={p.at}>
            <circle className="fill-white" r="14" /><circle className="fill-blue" r="6" />
            <text className="fill-night-fg font-body font-semibold text-[13px] leading-[normal]" x={p.lx} y={p.ly}>{p.label}</text>
            <text className="fill-night-muted font-body font-medium text-[10px] leading-[normal] tracking-label" x={p.lx} y={p.sy}>{p.stop}</text>
          </g>
        ))}
        <g id="route-car" transform="translate(90 190)"><circle className="fill-white" r="10" /><circle r="4" fill="#0060F6" /></g>
      </svg>
      <p className="flex flex-wrap gap-x-5 gap-y-2 pt-[14px] px-1.5 pb-1 font-body font-medium text-xs leading-[1.3] tracking-label uppercase text-night-muted">
        <span>Status · <b className="text-night-fg font-medium" id="route-status" aria-live="off">Heading to pickup</b></span>
        <span>Navigation · <b className="text-night-fg font-medium">in-app</b></span>
      </p>
    </div>
  );
}
