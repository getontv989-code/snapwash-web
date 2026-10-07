import type { CSSProperties } from "react";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const description = "Drive for Snapwash in New York, New Jersey and Connecticut. Pick up and deliver laundry and dry cleaning on your own hours, with in-app navigation and on-time payouts.";

export const metadata: Metadata = {
  title: { absolute: "Drive with Snapwash | Flexible Laundry Delivery Driver Jobs" },
  description,
  alternates: { canonical: "/drive" },
  openGraph: { url: "/drive", title: "Drive with Snapwash | Earn on your schedule", description },
  twitter: { title: "Drive with Snapwash | Earn on your schedule", description },
};

const jsonLd = {"@context": "https://schema.org", "@graph": [{"@type": "Organization", "@id": "https://snapwash.io/#org", "name": "Snapwash", "url": "https://snapwash.io/", "logo": "https://snapwash.io/assets/snapwash-logo.svg", "slogan": "Fresh clothes, zero effort.", "areaServed": ["New York", "New Jersey", "Connecticut"]}, {"@type": "WebPage", "@id": "https://snapwash.io/drive#page", "url": "https://snapwash.io/drive", "name": "Drive with Snapwash", "isPartOf": {"@id": "https://snapwash.io/#website"}, "description": "Deliver laundry and dry cleaning with Snapwash. Pick your hours, navigate in-app, get paid on time."}, {"@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://snapwash.io/"}, {"@type": "ListItem", "position": 2, "name": "Drive", "item": "https://snapwash.io/drive"}]}, {"@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": "How do I start driving for Snapwash?", "acceptedAnswer": {"@type": "Answer", "text": "Download the Snapwash driver app from the App Store or Google Play and sign up there. The app walks you through everything you need to get on the road."}}, {"@type": "Question", "name": "Do I choose my own hours?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. You decide when you drive. Go online when it suits you and stay offline when it doesn't."}}, {"@type": "Question", "name": "How do I get paid?", "acceptedAnswer": {"@type": "Answer", "text": "Customers pay once when they place an order, and your share is paid out to you through the app. Drivers tell us payouts are always on time."}}, {"@type": "Question", "name": "Where can I drive?", "acceptedAnswer": {"@type": "Answer", "text": "Snapwash operates across New York, New Jersey and Connecticut."}}, {"@type": "Question", "name": "Is there a referral bonus?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. You earn $50 for every new driver you refer to Snapwash."}}]}]};

export default function DrivePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader current="drive" night />
      <main id="main">
        <section className="hero drive-hero night" aria-labelledby="h1">
          <div className="wrap grid">
            <div className="title">
              <p className="kicker fade-up" style={{ "--d": ".05s", marginBottom: "28px" } as CSSProperties}>Drive with Snapwash · NY · NJ · CT</p>
              <h1 id="h1" className="split">Earn on your <em>schedule.</em></h1>
            </div>
            <div className="copy">
              <p className="hero-lede fade-up" style={{ "--d": ".55s" } as CSSProperties}>Collect bags from customers, drop them at local cleaners, bring them home fresh. You pick the hours. The app handles the route.</p>
              <div className="hero-ctas fade-up" id="apply" style={{ "--d": ".7s" } as CSSProperties}><a className="btn " href="https://apps.apple.com/us/search?term=snapwash" target="_blank" rel="noopener" data-magnetic><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.4 12.6c0-2.5 2-3.6 2.1-3.7-1.2-1.7-3-1.9-3.6-2-1.5-.2-3 .9-3.8.9-.8 0-2-.9-3.3-.9-1.7 0-3.3 1-4.2 2.5-1.8 3.1-.5 7.7 1.3 10.2.8 1.2 1.8 2.6 3.1 2.6 1.3-.1 1.7-.8 3.3-.8 1.5 0 1.9.8 3.3.8 1.4 0 2.2-1.2 3-2.5 1-1.4 1.4-2.8 1.4-2.9 0 0-2.6-1-2.6-4.2zM14 5.2c.7-.8 1.2-2 1-3.2-1 .1-2.2.7-3 1.5-.6.7-1.2 1.9-1 3.1 1.1.1 2.3-.6 3-1.4z" /></svg><span className="two"><small>Download on the</small>App Store</span></a><a className="btn btn--line" href="https://play.google.com/store/search?q=snapwash&c=apps" target="_blank" rel="noopener" data-magnetic><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3.6 2.2c-.3.3-.4.7-.4 1.2v17.2c0 .5.1.9.4 1.2l9.6-9.8-9.6-9.8zm10.7 10.9 2.6 2.7-11.2 6.4 8.6-9.1zm0-2.2L5.7 1.8l11.2 6.4-2.6 2.7zm3.9-1.9 3.1 1.8c.9.5.9 1.9 0 2.4l-3.1 1.8-2.8-3 2.8-3z" /></svg><span className="two"><small>Get it on</small>Google Play</span></a></div>
              <p className="kicker fade-up" style={{ "--d": ".85s" } as CSSProperties}>Sign up in the driver app</p>
            </div>
            <div className="route-col fade-up" style={{ "--d": ".4s" } as CSSProperties}>
              <div className="route-card">
                <svg viewBox="0 0 600 420" role="img" aria-labelledby="route-t">
        <title id="route-t">A delivery route from a customer's home to a dry cleaner and on to a drop-off</title>
        <g className="grid-lines"><path className="grid-line" d="M0 0V420" /><path className="grid-line" d="M60 0V420" /><path className="grid-line" d="M120 0V420" /><path className="grid-line" d="M180 0V420" /><path className="grid-line" d="M240 0V420" /><path className="grid-line" d="M300 0V420" /><path className="grid-line" d="M360 0V420" /><path className="grid-line" d="M420 0V420" /><path className="grid-line" d="M480 0V420" /><path className="grid-line" d="M540 0V420" /><path className="grid-line" d="M600 0V420" /><path className="grid-line" d="M0 0H600" /><path className="grid-line" d="M0 60H600" /><path className="grid-line" d="M0 120H600" /><path className="grid-line" d="M0 180H600" /><path className="grid-line" d="M0 240H600" /><path className="grid-line" d="M0 300H600" /><path className="grid-line" d="M0 360H600" /><path className="grid-line" d="M0 420H600" /></g>
        <rect className="block" x="70" y="40" width="160" height="110" rx="10" /><rect className="block" x="300" y="40" width="220" height="80" rx="10" />
        <rect className="block" x="70" y="230" width="120" height="140" rx="10" /><rect className="block" x="260" y="200" width="140" height="170" rx="10" /><rect className="block" x="460" y="190" width="100" height="180" rx="10" />
        <path className="street" d="M30 190 H580" /><path className="street" d="M250 0 V420" /><path className="street" d="M430 0 V420" /><path className="street" d="M30 0 V420" />
        <path className="leg-ghost" d="M90 190 H250 V100 Q250 80 270 80 H430 V300 Q430 320 450 320 H520" />
        <path className="leg" id="route-leg" d="M90 190 H250 V100 Q250 80 270 80 H430 V300 Q430 320 450 320 H520" />
        <g className="pin" transform="translate(90 190)"><circle r="14" /><circle className="core" r="6" /><text x="-14" y="-24">Pickup</text><text className="sub" x="-14" y="-40">STOP 1</text></g>
        <g className="pin" transform="translate(430 80)"><circle r="14" /><circle className="core" r="6" /><text x="20" y="-14">Cleaner</text><text className="sub" x="20" y="-30">STOP 2</text></g>
        <g className="pin" transform="translate(520 320)"><circle r="14" /><circle className="core" r="6" /><text x="-60" y="44">Drop-off</text><text className="sub" x="-60" y="28">STOP 3</text></g>
        <g id="route-car" transform="translate(90 190)"><circle className="vehicle" r="10" /><circle r="4" fill="#0060F6" /></g>
      </svg>
                <p className="route-legend"><span>Status · <b id="route-status" aria-live="off">Heading to pickup</b></span><span>Navigation · <b>in-app</b></span></p>
              </div>
            </div>
          </div>
        </section>
      
        <section className="section night" aria-labelledby="legs-title" style={{ paddingTop: "clamp(40px,6vw,80px)" } as CSSProperties}>
          <div className="wrap">
            <div className="section-head reveal">
              <p className="kicker">The job</p>
              <h2 id="legs-title">One run. Three stops.</h2>
              <p>Every Snapwash order is the same simple loop, and the app tells you where to go next.</p>
            </div>
            <ol className="legs">
              <li className="leg-item reveal"><span className="n">Stop 01 · Pickup</span><h3>Collect the bag</h3><p>Head to the customer in their chosen window. They can see you coming, and you can message them if the buzzer's broken.</p></li>
              <li className="leg-item reveal" style={{ "--rd": ".08s" } as CSSProperties}><span className="n">Stop 02 · Cleaner</span><h3>Drop at the shop</h3><p>Hand the order to the dry cleaner or laundromat the customer picked. It's already itemized, so there's nothing to count.</p></li>
              <li className="leg-item reveal" style={{ "--rd": ".16s" } as CSSProperties}><span className="n">Stop 03 · Delivery</span><h3>Bring it home</h3><p>Pick up the finished order and deliver it. Snap the proof of delivery and you're done.</p></li>
            </ol>
          </div>
        </section>
      
        <section className="section night" aria-labelledby="perks-title" style={{ paddingTop: "0" } as CSSProperties}>
          <div className="wrap">
            <div className="section-head reveal">
              <p className="kicker">Why drivers stay</p>
              <h2 id="perks-title">Built for the person behind the wheel.</h2>
            </div>
            <div className="perks">
              <article className="perk perk--wide reveal">
                <h3>Your week, your call</h3>
                <p>No fixed shifts. Tap the days you want to drive.</p>
                <div className="week" id="week" role="group" aria-label="Pick your driving days">
                  <button type="button" data-day="Mon" aria-pressed="true">Mon</button><button type="button" data-day="Tue" aria-pressed="false">Tue</button><button type="button" data-day="Wed" aria-pressed="true">Wed</button><button type="button" data-day="Thu" aria-pressed="false">Thu</button><button type="button" data-day="Fri" aria-pressed="true">Fri</button><button type="button" data-day="Sat" aria-pressed="false">Sat</button><button type="button" data-day="Sun" aria-pressed="false">Sun</button>
                </div>
                <p className="week-out" id="week-out" aria-live="polite">You drive Mon, Wed, Fri. Change it any time.</p>
              </article>
              <article className="perk perk--narrow perk--blue reveal" style={{ "--rd": ".08s" } as CSSProperties}>
                <p className="big"><span data-count="50" data-prefix="$">$50</span></p>
                <h3>For every driver you bring</h3>
                <p>Know someone who'd like flexible work? Refer them and earn $50.</p>
              </article>
              <article className="perk perk--third reveal"><h3>Navigation built in</h3><p>Turn-by-turn directions inside the driver app, from pickup to cleaner to door.</p></article>
              <article className="perk perk--third reveal" style={{ "--rd": ".08s" } as CSSProperties}><h3>Chat on the job</h3><p>Message customers and cleaners directly. No personal numbers shared.</p></article>
              <article className="perk perk--third reveal" style={{ "--rd": ".16s" } as CSSProperties}><h3>Payouts on time</h3><p>Customers pay up front, and your share lands in your account through the app.</p></article>
            </div>
          </div>
        </section>
      
        <section className="section quote-block night" aria-label="Driver review" style={{ paddingTop: "0" } as CSSProperties}>
          <div className="wrap grid reveal">
            <figure className="quote quote--solo">
              <blockquote><p>“Driving for Snapwash is the most <mark>flexible gig</mark> I've had. The app is smooth and payouts are always on time.”</p></blockquote>
              <figcaption className="who"><span className="avatar" aria-hidden="true">S</span><div><b>Sarah R.</b><span>Driver · New Jersey</span></div></figcaption>
            </figure>
          </div>
        </section>
      
        <section className="section faq night" aria-labelledby="faq-title" style={{ paddingTop: "0" } as CSSProperties}>
          <div className="wrap grid">
            <div className="faq-side"><p className="kicker" style={{ marginBottom: "18px" } as CSSProperties}>Driver FAQ</p><h2 id="faq-title">Before your first run.</h2></div>
            <div className="faq-list reveal"><details id="dfaq-1"><summary>How do I start driving for Snapwash?<span className="pm" aria-hidden="true"></span></summary><p className="a">Download the Snapwash driver app from the App Store or Google Play and sign up there. The app walks you through everything you need to get on the road.</p></details>
      <details id="dfaq-2"><summary>Do I choose my own hours?<span className="pm" aria-hidden="true"></span></summary><p className="a">Yes. You decide when you drive. Go online when it suits you and stay offline when it doesn't.</p></details>
      <details id="dfaq-3"><summary>How do I get paid?<span className="pm" aria-hidden="true"></span></summary><p className="a">Customers pay once when they place an order, and your share is paid out to you through the app. Drivers tell us payouts are always on time.</p></details>
      <details id="dfaq-4"><summary>Where can I drive?<span className="pm" aria-hidden="true"></span></summary><p className="a">Snapwash operates across New York, New Jersey and Connecticut.</p></details>
      <details id="dfaq-5"><summary>Is there a referral bonus?<span className="pm" aria-hidden="true"></span></summary><p className="a">Yes. You earn $50 for every new driver you refer to Snapwash.</p></details></div>
          </div>
        </section>
      
        <section className="section night" aria-label="More from Snapwash" style={{ paddingTop: "0" } as CSSProperties}><div className="wrap"><div className="switch"><a href="/" className="reveal"><span className="kicker">For customers</span><h3>Get laundry picked up.</h3><span className="go"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg></span></a><a href="/cleaners" className="reveal"><span className="kicker">For dry cleaners &amp; laundromats</span><h3>Grow your shop.</h3><span className="go"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg></span></a></div></div></section>
      </main>
      <SiteFooter />
    </>
  );
}
