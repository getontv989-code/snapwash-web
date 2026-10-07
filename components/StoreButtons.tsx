const APP_STORE_URL = "https://apps.apple.com/us/search?term=snapwash";
const GOOGLE_PLAY_URL = "https://play.google.com/store/search?q=snapwash&c=apps";

export default function StoreButtons({ primaryClass = "", magnetic = true }: { primaryClass?: string; magnetic?: boolean }) {
  const mag = magnetic ? { "data-magnetic": "" } : {};
  return (
    <>
      <a className={`btn ${primaryClass}`.trim()} href={APP_STORE_URL} target="_blank" rel="noopener" {...mag}>
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.4 12.6c0-2.5 2-3.6 2.1-3.7-1.2-1.7-3-1.9-3.6-2-1.5-.2-3 .9-3.8.9-.8 0-2-.9-3.3-.9-1.7 0-3.3 1-4.2 2.5-1.8 3.1-.5 7.7 1.3 10.2.8 1.2 1.8 2.6 3.1 2.6 1.3-.1 1.7-.8 3.3-.8 1.5 0 1.9.8 3.3.8 1.4 0 2.2-1.2 3-2.5 1-1.4 1.4-2.8 1.4-2.9 0 0-2.6-1-2.6-4.2zM14 5.2c.7-.8 1.2-2 1-3.2-1 .1-2.2.7-3 1.5-.6.7-1.2 1.9-1 3.1 1.1.1 2.3-.6 3-1.4z" /></svg>
        <span className="two"><small>Download on the</small>App Store</span>
      </a>
      <a className="btn btn--line" href={GOOGLE_PLAY_URL} target="_blank" rel="noopener" {...mag}>
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3.6 2.2c-.3.3-.4.7-.4 1.2v17.2c0 .5.1.9.4 1.2l9.6-9.8-9.6-9.8zm10.7 10.9 2.6 2.7-11.2 6.4 8.6-9.1zm0-2.2L5.7 1.8l11.2 6.4-2.6 2.7zm3.9-1.9 3.1 1.8c.9.5.9 1.9 0 2.4l-3.1 1.8-2.8-3 2.8-3z" /></svg>
        <span className="two"><small>Get it on</small>Google Play</span>
      </a>
    </>
  );
}
