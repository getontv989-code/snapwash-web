"use client";

import { useState } from "react";
import { Kicker, cx, wrap } from "../site";
import StoreButtons from "../StoreButtons";

/* The film is 60s of H.264: 1080p (6.7 MB) for larger screens, 720p (4 MB) for phones.
   Nothing but the poster downloads until the visitor presses play. */
const VIDEO = { hd: "/video/snapwash-how-it-works.mp4", sd: "/video/snapwash-how-it-works-720.mp4", poster: "/video/snapwash-how-it-works.webp" };

/** Product film right under the hero: a still poster with a play button that swaps in the video. */
export default function DemoVideo() {
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);

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
            <video className="absolute inset-0 w-full h-full bg-paper" poster={VIDEO.poster} controls={!ended} autoPlay playsInline preload="none"
              onEnded={() => setEnded(true)} onPlay={() => setEnded(false)}>
              <source src={VIDEO.sd} type="video/mp4" media="(max-width: 760px)" />
              <source src={VIDEO.hd} type="video/mp4" />
            </video>
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
          {ended && (
            <div className="absolute z-1 inset-x-0 top-[71%] flex justify-center gap-3 animate-fade-up [--d:.1s] max-sm:hidden">
              <StoreButtons onBlue magnetic={false} className="max-lg:min-h-11 max-lg:text-sm max-lg:[&_svg]:w-4 max-lg:[&_svg]:h-4" />
            </div>
          )}
          {ended && (
            <button type="button" onClick={(e) => { const v = e.currentTarget.parentElement?.querySelector("video"); if (v) { v.currentTime = 0; v.play(); } }}
              className="absolute right-[clamp(12px,1.6vw,24px)] bottom-[clamp(12px,1.6vw,24px)] inline-flex items-center gap-2 border-0 cursor-pointer font-body font-semibold text-xs leading-none tracking-pill py-2 px-3 rounded-pill bg-navy/80 text-white transition-colors duration-300 hover:bg-navy">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5" /></svg>
              Watch again
            </button>
          )}
        </div>
        {ended && (
          <div className="flex flex-wrap gap-3 mt-4 animate-fade-up [--d:.1s] sm:hidden">
            <StoreButtons magnetic={false} />
          </div>
        )}
      </div>
    </section>
  );
}
