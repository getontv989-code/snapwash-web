"use client";

import { useState } from "react";
import { Kicker, cx, wrap } from "../ui";
import { PHOTOS, photoSet } from "./photos";

/** Drop the film in public/video/ (or any mp4 URL) and set it here. Until then the poster shows "Coming soon". */
const VIDEO_SRC = "";

/** Product film right under the hero: poster with a play button that swaps in the video. */
export default function DemoVideo() {
  const [playing, setPlaying] = useState(false);
  const ready = Boolean(VIDEO_SRC);

  return (
    <section className="pb-section" id="watch" aria-labelledby="watch-title">
      <div className={wrap}>
        <div className="reveal relative rounded-card overflow-hidden isolate bg-card aspect-video max-md:aspect-[4/5]">
          {playing ? (
            <video className="absolute inset-0 w-full h-full object-cover bg-navy" src={VIDEO_SRC} controls autoPlay playsInline />
          ) : (
            <>
              <img {...photoSet(PHOTOS.cleaner, [800, 1200, 1600, 2400])} sizes="(max-width: 1360px) 100vw, 1360px" alt="" loading="lazy" decoding="async"
                className="absolute inset-0 -z-2 w-full h-full object-cover" />
              <span className="absolute inset-0 -z-1 bg-linear-to-tr from-navy/90 via-navy/45 to-blue/25" aria-hidden="true"></span>

              <button type="button" disabled={!ready} onClick={() => setPlaying(true)}
                aria-label={ready ? "Play the Snapwash film" : "Snapwash film coming soon"}
                className={cx(
                  "group/play absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[clamp(76px,9vw,116px)] aspect-square rounded-[50%] border-0 grid place-items-center",
                  "bg-white text-blue shadow-[0_24px_60px_-20px_rgba(0,0,0,.6)] transition-transform duration-500 ease-brand",
                  ready && "before:absolute before:inset-0 before:rounded-[inherit] before:bg-white/30 before:animate-ping before:-z-1 motion-reduce:before:hidden",
                  ready ? "cursor-pointer hover:scale-110" : "cursor-default",
                )}>
                <svg className="w-[34%] h-[34%] translate-x-[8%]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5z" /></svg>
              </button>

              <div className="absolute inset-x-0 bottom-0 p-card-lg flex items-end justify-between gap-6 flex-wrap text-white pointer-events-none">
                <div className="grid gap-3">
                  <Kicker tone="onBlue">Watch · 60 seconds</Kicker>
                  <h2 id="watch-title" className="text-2xl leading-none tracking-display max-w-[14ch]">See a bag go round trip.</h2>
                </div>
                {!ready && <span className="font-body font-medium text-xs leading-none tracking-tag uppercase py-2 px-3 rounded-pill bg-white/18 backdrop-blur-sm">Film coming soon</span>}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
