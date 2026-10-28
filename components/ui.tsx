import type { CSSProperties, ReactNode } from "react";

/** Joins class names, skipping falsy values. */
export function cx(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

/* ---------- Layout ---------- */

/** Page column: centred, max 1360px, gutter on both sides. */
export const wrap = "w-full max-w-page mx-auto px-gutter";
/** The 12-column grid every section hangs off. */
export const grid12 = "grid grid-cols-12 gap-x-col *:min-w-0";

export const tone = {
  /** Drive page sections (follow the active theme like every other page) */
  night: "bg-night text-night-fg",
  /** Solid brand-blue band */
  blue: "bg-brand text-white",
};

export function Section({ className, children, ...rest }: { className?: string; children: ReactNode } & React.HTMLAttributes<HTMLElement>) {
  return <section className={cx("py-section", className)} {...rest}>{children}</section>;
}

/* ---------- Text ---------- */

const kickerTone = {
  default: "text-muted before:bg-brand",
  onBlue: "text-white/80 before:bg-white",
  /** Above body copy on a blue band, matching that copy's 88% white */
  onBlueCopy: "text-white/88 before:bg-white",
  /** Inside a page-switch card: turns white when the card is hovered */
  switch: "text-muted before:bg-brand group-hover/switch:text-white/80 group-hover/switch:before:bg-white",
};

/** Small uppercase label with a blue dot. */
export function Kicker({ as: Tag = "p", tone: t = "default", className, style, children }: {
  as?: "p" | "span"; tone?: keyof typeof kickerTone; className?: string; style?: CSSProperties; children: ReactNode;
}) {
  return (
    <Tag className={cx(
      "inline-flex items-center gap-[10px] font-body font-medium text-xs leading-[1.2] uppercase tracking-kicker",
      "before:w-2 before:h-2 before:rounded-[50%]",
      kickerTone[t], className,
    )} style={style}>{children}</Tag>
  );
}

/** Section heading row: kicker, headline on the left, an optional intro on the right. */
export function SectionHead({ kicker, title, titleId, children }: { kicker: ReactNode; title: ReactNode; titleId: string; children?: ReactNode }) {
  return (
    <div className="reveal grid grid-cols-12 gap-x-col gap-y-4 items-end mb-[clamp(32px,4vw,56px)] *:min-w-0">
      <Kicker className="col-span-full">{kicker}</Kicker>
      <h2 id={titleId} className="col-[1/span_7] text-2xl leading-none tracking-display font-bold max-lg:col-span-full max-lg:justify-self-start">{title}</h2>
      {children && <p className="col-[9/-1] text-muted max-w-[38ch] justify-self-end max-lg:col-span-full max-lg:justify-self-start">{children}</p>}
    </div>
  );
}

/* ---------- Buttons ---------- */

const btnBase = cx(
  "relative inline-flex items-center gap-3 min-h-[52px] py-2 pr-6 pl-5 rounded-pill border-0",
  "bg-(--bg) text-(--fg) no-underline font-body font-semibold text-base leading-none overflow-hidden isolate",
  "transition-[transform,box-shadow] duration-400 ease-brand will-change-transform",
  // The ink fill slides up from below on hover
  "before:absolute before:inset-0 before:-z-1 before:rounded-[inherit] before:bg-ink",
  "before:[transform:translateY(101%)] before:transition-transform before:duration-500 before:ease-brand hover:before:[transform:none]",
  "hover:text-paper active:[transform:scale(.97)] [&_svg]:w-5 [&_svg]:h-5 [&_svg]:flex-none",
);
const btnGlow = "hover:shadow-[0_14px_30px_-14px_color-mix(in_srgb,var(--blue)_70%,transparent)]";

const btnVariant = {
  /** Brand blue */
  primary: cx("[--bg:var(--blue)] [--fg:var(--on-blue)] cursor-pointer", btnGlow),
  /** Outline in the text colour */
  line: "[--bg:transparent] [--fg:var(--ink)] cursor-pointer shadow-[inset_0_0_0_1.5px_currentColor] hover:shadow-[inset_0_0_0_1.5px_var(--ink)]",
  /** White, for use on a blue card */
  inverse: cx("[--bg:#FFFFFF] [--fg:#0060F6] cursor-pointer hover:text-white", btnGlow),
  /** Looks like a primary button but isn't interactive (demo screens) */
  static: "[--bg:var(--blue)] [--fg:var(--on-blue)] w-full justify-center pointer-events-none cursor-default",
};
export type ButtonVariant = keyof typeof btnVariant;

export function btn(variant: ButtonVariant = "primary", className?: string) {
  return cx(btnBase, btnVariant[variant], className);
}

/* ---------- Icons ---------- */

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
  );
}

export function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
  );
}

/** Underlined text link with an arrow that opens up on hover. */
export function ArrowLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a className="inline-flex items-center gap-[10px] no-underline font-semibold py-1 border-b-[1.5px] border-b-current [transition:gap_.35s_var(--ease),color_.25s_var(--ease)] hover:gap-4 hover:text-brand" href={href}>
      {children} <ArrowIcon className="w-4 h-4 transition-transform duration-[350ms] ease-brand" />
    </a>
  );
}
