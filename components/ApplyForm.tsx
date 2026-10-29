"use client";

import { useState } from "react";
import { ArrowIcon, CheckIcon, Kicker, Section, cx, wrap } from "./site";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type ApplyField = { name: string; label: string; type?: "text" | "email" | "tel"; autoComplete?: string };

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
        <Card className="reveal [--rd:.1s] col-[7/-1] p-card-lg max-lg:col-span-full">
          {sent ? (
            <div className="grid gap-4 justify-items-start" role="status">
              <span className="w-12 h-12 grid place-items-center rounded-[50%] bg-brand text-on-brand"><CheckIcon className="w-6 h-6" /></span>
              <p className="font-display font-extrabold text-xl leading-none tracking-display">Thanks, we have your details.</p>
              <p className="text-muted max-w-[40ch]">This form isn't connected yet, so nothing was sent. We'll switch it on before launch.</p>
            </div>
          ) : (
            <form className="grid gap-5" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
              {fields.map((f) => (
                <div key={f.name} className="grid gap-2">
                  <Label htmlFor={`${id}-${f.name}`}>{f.label}</Label>
                  <Input id={`${id}-${f.name}`} name={f.name} type={f.type ?? "text"} autoComplete={f.autoComplete} required />
                </div>
              ))}
              <label className="flex items-start gap-3 text-sm text-muted cursor-pointer">
                <input className="mt-0.5 w-[18px] h-[18px] flex-none accent-brand" type="checkbox" name="ack" required />
                I understand this form is not yet connected.
              </label>
              <Button className="justify-self-start" type="submit">Review interest <ArrowIcon /></Button>
            </form>
          )}
        </Card>
      </div>
    </Section>
  );
}
