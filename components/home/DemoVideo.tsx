"use client";

import { useState } from "react";
import { Kicker, cx, wrap } from "../ui";

/* The film is 60s, 1280x720, H.264. Nothing but the poster downloads until the visitor presses play. */
const VIDEO = { src: "/video/snapwash-how-it-works.mp4", poster: "/video/snapwash-how-it-works.webp" };

/** Product film right under the hero: a still poster with a play button that swaps in the video. */
export default function DemoVideo() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="pb-section" id="watch" aria-labelledby="watch-title">
      <div className={wrap}>
        <div className="reveal flex justify-between items-end gap-x-6 gap-y-3 flex-wrap mb-[clamp(20px,2.4vw,32px)]">
          <div>
            <Kicker className="mb-[14px]">Watch · 1 minute</Kicker>
            <h2 id="watch-title" className="text-2xl leading-none tracking-display">See a bag go round trip.</h2>
          </div>
          <p className="text-muted max-w-[34ch]">From the scan to the knock at your door, the whole Snapwash loop in sixty seconds.</p>
        </div>

        <div className="reveal [--rd:.08s] relative rounded-card overflow-hidden isolate bg-card aspect-video shadow-[0_0_0_1px_var(--line),0_40px_80px_-50px_color-mix(in_srgb,var(--ink)_60%,transparent)]">
          {playing ? (
            <video className="absolute inset-0 w-full h-full bg-paper" src={VIDEO.src} poster={VIDEO.poster} controls autoPlay playsInline preload="none" />
          ) : (
            <button type="button" onClick={() => setPlaying(true)} aria-label="Play the Snapwash film, 1 minute"
              className="group/play absolute inset-0 w-full h-full border-0 p-0 cursor-pointer bg-transparent">
              <img src={VIDEO.poster} alt="" width="1280" height="720" loading="lazy" decoding="async" className="absolute inset-0 -z-1 w-full h-full object-cover" />
              <span className="absolute inset-0 -z-1 bg-navy/0 transition-colors duration-500 group-hover/play:bg-navy/10" aria-hidden="true"></span>
              <span className={cx(
                "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[clamp(64px,8vw,104px)] aspect-square rounded-[50%] grid place-items-center",
                "bg-blue text-white shadow-[0_24px_50px_-16px_rgba(0,96,246,.75)] transition-transform duration-500 ease-brand group-hover/play:scale-110",
                "before:absolute before:inset-0 before:rounded-[inherit] before:bg-blue/35 before:animate-ping before:-z-1 motion-reduce:before:hidden",
              )} aria-hidden="true">
                <svg className="w-[36%] h-[36%] translate-x-[8%]" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5z" /></svg>
              </span>
              <span className="absolute right-[clamp(12px,1.6vw,24px)] bottom-[clamp(12px,1.6vw,24px)] font-body font-semibold text-xs leading-none tracking-pill py-2 px-3 rounded-pill bg-navy/80 text-white tabular-nums" aria-hidden="true">1:00</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
