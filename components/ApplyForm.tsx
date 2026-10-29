"use client";

import { useState } from "react";
import { ArrowIcon, CheckIcon, Kicker, Section, btn, cx, wrap } from "./ui";

export type ApplyField = { name: string; label: string; type?: "text" | "email" | "tel"; autoComplete?: string };

const input = cx(
  "w-full min-h-[52px] px-[18px] rounded-[14px] bg-paper text-ink border border-line font-body text-base",
  "placeholder:text-muted transition-[border-color,box-shadow] duration-300 ease-brand",
  "hover:border-ink/30 focus:outline-none focus:border-brand focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--blue)_25%,transparent)]",
);

/** Partner / driver application section (#apply). Not wired to a backend yet: submitting only confirms on the page. */
export default function ApplyForm({ kicker, title, intro, fields, id = "apply" }: {
  kicker: string; title: string; intro: string; fields: ApplyField[]; id?: string;
}) {
  const [sent, setSent] = useState(false);
  const titleId = `${id}-title`;
  return (
    <Section id={id} className="scroll-mt-24" aria-labelledby={titleId}>
      <div className={cx(wrap, "grid grid-cols-12 gap-x-col gap-y-8 items-start *:min-w-0")}>
        <div className="reveal col-[1/span_5] grid gap-5 content-start max-lg:col-span-full">
          <Kicker>{kicker}</Kicker>
          <h2 id={titleId} className="text-2xl leading-none tracking-display font-bold text-balance">{title}</h2>
          <p className="text-muted max-w-[38ch]">{intro}</p>
        </div>
        <div className="reveal [--rd:.1s] col-[7/-1] rounded-card bg-surface shadow-[0_0_0_1px_var(--line)] p-card-lg max-lg:col-span-full">
          {sent ? (
            <div className="grid gap-4 justify-items-start" role="status">
              <span className="w-12 h-12 grid place-items-center rounded-[50%] bg-brand text-on-brand"><CheckIcon className="w-6 h-6" /></span>
              <p className="font-display font-extrabold text-xl leading-none tracking-display">Thanks, we have your details.</p>
              <p className="text-muted max-w-[40ch]">This form isn't connected yet, so nothing was sent. We'll switch it on before launch.</p>
            </div>
          ) : (
            <form className="grid gap-5" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
              {fields.map((f) => (
                <label key={f.name} className="grid gap-2">
                  <span className="font-body font-medium text-sm leading-none">{f.label}</span>
                  <input className={input} name={f.name} type={f.type ?? "text"} autoComplete={f.autoComplete} required />
                </label>
              ))}
              <label className="flex items-start gap-3 text-sm text-muted cursor-pointer">
                <input className="mt-0.5 w-[18px] h-[18px] flex-none accent-brand" type="checkbox" name="ack" required />
                I understand this form is not yet connected.
              </label>
              <button className={btn("primary", "justify-self-start")} type="submit">Review interest <ArrowIcon /></button>
            </form>
          )}
        </div>
      </div>
    </Section>
  );
}
