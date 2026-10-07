import type { CSSProperties } from "react";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const description = "Snapwash picks up your laundry and dry cleaning, takes it to a local cleaner you choose, and brings it back fresh. Scan clothes with AI, track your driver live. Unlimited delivery $14.99/mo.";

export const metadata: Metadata = {
  title: { absolute: "Snapwash | Laundry & Dry Cleaning Pickup and Delivery" },
  description,
  alternates: { canonical: "/" },
  openGraph: { url: "/", title: "Snapwash | Fresh clothes, zero effort", description },
  twitter: { title: "Snapwash | Fresh clothes, zero effort", description },
};

const jsonLd = {"@context": "https://schema.org", "@graph": [{"@type": "Organization", "@id": "https://snapwash.io/#org", "name": "Snapwash", "url": "https://snapwash.io/", "logo": "https://snapwash.io/assets/snapwash-logo.svg", "slogan": "Fresh clothes, zero effort.", "areaServed": ["New York", "New Jersey", "Connecticut"]}, {"@type": "WebSite", "@id": "https://snapwash.io/#website", "url": "https://snapwash.io/", "name": "Snapwash", "publisher": {"@id": "https://snapwash.io/#org"}, "inLanguage": "en-US"}, {"@type": "Service", "serviceType": "Laundry and dry cleaning pickup and delivery", "name": "Snapwash", "provider": {"@id": "https://snapwash.io/#org"}, "areaServed": ["New York", "New Jersey", "Connecticut"], "description": "Pickup and delivery from local dry cleaners and laundromats, with AI garment scanning, live driver tracking and proof of delivery.", "offers": [{"@type": "Offer", "name": "Pay As You Go", "price": "0", "priceCurrency": "USD", "description": "Free to join. Cleaning and a delivery fee are paid per order."}, {"@type": "Offer", "name": "Snapwash Unlimited", "price": "14.99", "priceCurrency": "USD", "description": "Free pickup and delivery on all orders, priority queue, exclusive discounts. Cancel anytime.", "priceSpecification": {"@type": "UnitPriceSpecification", "price": "14.99", "priceCurrency": "USD", "unitCode": "MON"}}]}, {"@type": "MobileApplication", "name": "Snapwash", "operatingSystem": "iOS, Android", "applicationCategory": "LifestyleApplication", "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD"}, "publisher": {"@id": "https://snapwash.io/#org"}}, {"@type": "HowTo", "name": "How to get laundry picked up with Snapwash", "step": [{"@type": "HowToStep", "position": 1, "name": "Choose your cleaner", "text": "Pick a dry cleaner or laundromat near you."}, {"@type": "HowToStep", "position": 2, "name": "Scan your clothes", "text": "Photograph each item; AI identifies it and prices the order."}, {"@type": "HowToStep", "position": 3, "name": "Book a pickup window", "text": "Place the order and choose when the driver comes."}, {"@type": "HowToStep", "position": 4, "name": "Track your driver", "text": "Follow the driver on a live map."}, {"@type": "HowToStep", "position": 5, "name": "Get the ready alert", "text": "Receive a notification when your order is clean."}, {"@type": "HowToStep", "position": 6, "name": "Get it delivered", "text": "Your clothes come back to your door with proof of delivery."}]}, {"@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": "Where is Snapwash available?", "acceptedAnswer": {"@type": "Answer", "text": "Snapwash runs on the US East Coast, with customers, drivers and partner cleaners across New York, New Jersey and Connecticut. Enter your address in the app to see the cleaners that serve your block."}}, {"@type": "Question", "name": "How much does Snapwash cost?", "acceptedAnswer": {"@type": "Answer", "text": "Joining is free. On Pay As You Go you pay your cleaner's price plus a delivery fee on each order. Snapwash Unlimited is $14.99 a month and covers pickup and delivery on every order, with priority queue and member discounts. Cancel anytime."}}, {"@type": "Question", "name": "How does the AI scan work?", "acceptedAnswer": {"@type": "Answer", "text": "Point your camera at each item. Snapwash recognizes the garment type and color, adds it to your bag and prices the order, so there is no form to fill in."}}, {"@type": "Question", "name": "How do I pay?", "acceptedAnswer": {"@type": "Answer", "text": "In the app, with Apple Pay, Google Pay or a card, processed by Stripe. You are charged once per order."}}, {"@type": "Question", "name": "How do I know my clothes arrived?", "acceptedAnswer": {"@type": "Answer", "text": "You can follow your driver on a live map, message your driver or cleaner in the app, and every drop-off comes with proof of delivery."}}]}]};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader current="index" />
      <main id="main">
        <section className="hero home-hero" aria-labelledby="h1">
          <div className="wrap grid">
            <div className="title">
              <p className="kicker fade-up" style={{ "--d": ".05s", marginBottom: "28px" } as CSSProperties}>Laundry &amp; dry cleaning pickup · NY · NJ · CT</p>
              <h1 id="h1" className="split">Fresh clothes. <em>Zero</em> effort.</h1>
            </div>
            <div className="copy">
              <p className="hero-lede fade-up" style={{ "--d": ".55s" } as CSSProperties}>Snapwash connects you with the dry cleaners and laundromats already on your block, then sends a driver to collect your bag and bring it back clean, in the window you pick.</p>
              <div className="hero-ctas fade-up" id="download" style={{ "--d": ".7s" } as CSSProperties}><a className="btn " href="https://apps.apple.com/us/search?term=snapwash" target="_blank" rel="noopener" data-magnetic><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.4 12.6c0-2.5 2-3.6 2.1-3.7-1.2-1.7-3-1.9-3.6-2-1.5-.2-3 .9-3.8.9-.8 0-2-.9-3.3-.9-1.7 0-3.3 1-4.2 2.5-1.8 3.1-.5 7.7 1.3 10.2.8 1.2 1.8 2.6 3.1 2.6 1.3-.1 1.7-.8 3.3-.8 1.5 0 1.9.8 3.3.8 1.4 0 2.2-1.2 3-2.5 1-1.4 1.4-2.8 1.4-2.9 0 0-2.6-1-2.6-4.2zM14 5.2c.7-.8 1.2-2 1-3.2-1 .1-2.2.7-3 1.5-.6.7-1.2 1.9-1 3.1 1.1.1 2.3-.6 3-1.4z" /></svg><span className="two"><small>Download on the</small>App Store</span></a><a className="btn btn--line" href="https://play.google.com/store/search?q=snapwash&c=apps" target="_blank" rel="noopener" data-magnetic><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3.6 2.2c-.3.3-.4.7-.4 1.2v17.2c0 .5.1.9.4 1.2l9.6-9.8-9.6-9.8zm10.7 10.9 2.6 2.7-11.2 6.4 8.6-9.1zm0-2.2L5.7 1.8l11.2 6.4-2.6 2.7zm3.9-1.9 3.1 1.8c.9.5.9 1.9 0 2.4l-3.1 1.8-2.8-3 2.8-3z" /></svg><span className="two"><small>Get it on</small>Google Play</span></a></div>
              <p className="kicker fade-up" style={{ "--d": ".85s" } as CSSProperties}>Free to join · Unlimited delivery $14.99/mo</p>
            </div>
            <div className="drum-col">
              <div className="tour" id="tour" data-step="0" aria-label="A tour of the Snapwash app">
                <ol className="tour-rail" role="tablist" aria-label="App tour steps">
                  <li><button type="button" role="tab" aria-selected="true" aria-controls="ts-1" data-step="0"><span className="bar"><i></i></span>Scan your clothes</button></li>
                  <li><button type="button" role="tab" aria-selected="false" aria-controls="ts-2" data-step="1"><span className="bar"><i></i></span>Choose your cleaner</button></li>
                  <li><button type="button" role="tab" aria-selected="false" aria-controls="ts-3" data-step="2"><span className="bar"><i></i></span>Schedule a pickup</button></li>
                  <li><button type="button" role="tab" aria-selected="false" aria-controls="ts-4" data-step="3"><span className="bar"><i></i></span>Review your order</button></li>
                  <li><button type="button" role="tab" aria-selected="false" aria-controls="ts-5" data-step="4"><span className="bar"><i></i></span>Track your driver</button></li>
                </ol>
                <div className="tour-phone">
                  <div className="tour-screen">
                    <div className="app-status" aria-hidden="true"><span>9:41</span><span className="notch"></span><span>5G</span></div>

                    <section className="app-view av-scan is-active" id="ts-1" role="tabpanel" aria-label="Scan your clothes">
                      <div className="a-head"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>Scan your clothes</div>
                      <div className="a-cam">
                        <img src="/app/scan-photo.webp" alt="A red dress, patterned pants and a black polo laid out on a table" width="763" height="616" />
                        <span className="a-sweep"></span>
                        <span className="a-box bx-1"><em>Dress · Red</em></span>
                        <span className="a-box bx-2"><em>Pants · Patterned</em></span>
                        <span className="a-box bx-3"><em>Polo · Black</em></span>
                        <span className="a-shutter"></span>
                      </div>
                      <ul className="a-items">
                        <li><img src="/app/dress.webp" alt="" width="160" height="160" /><span><b>Dress</b><small>Press</small></span><span className="pr">$3.00</span></li>
                        <li><img src="/app/pants.webp" alt="" width="160" height="160" /><span><b>Pants</b><small>Dry cleaning + Press</small></span><span className="pr">$8.00</span></li>
                        <li><img src="/app/polo.webp" alt="" width="160" height="160" /><span><b>T-Shirt / Polo</b><small>Dry cleaning + Press</small></span><span className="pr">$6.00</span></li>
                      </ul>
                      <span className="app-cta">Choose a cleaner</span>
                    </section>

                    <section className="app-view" id="ts-2" role="tabpanel" aria-label="Choose your cleaner">
                      <h3 className="app-title">Choose your cleaner</h3>
                      <div className="a-search"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5" /><path d="M16 16l4 4" /></svg>Search cleaners</div>
                      <ul className="a-shops">
                        <li className="is-pick"><span className="a-ic"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9l1.5-4h13L20 9M4 9v10h16V9M4 9h16M10 19v-5h4v5" /></svg></span><span><b>Clean Avenue</b><small>Dry cleaning · Wash &amp; Fold</small><small className="mi">0.3 mi away</small></span><span className="a-radio"></span></li>
                        <li><span className="a-ic"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="3.5" width="14" height="17" rx="2" /><circle cx="12" cy="13" r="4" /><path d="M8 7h2" /></svg></span><span><b>Gino&apos;s Dry Cleaning</b><small>Wash &amp; Fold</small><small className="mi">0.6 mi away</small></span><span className="a-radio"></span></li>
                        <li><span className="a-ic"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 7a2 2 0 1 1 2 2c-1 0-2 .6-2 2M12 11l-8 6h16z" /></svg></span><span><b>Parkway Cleaners</b><small>Dry cleaning</small><small className="mi">0.9 mi away</small></span><span className="a-radio"></span></li>
                      </ul>
                      <span className="app-cta">Continue</span>
                    </section>

                    <section className="app-view" id="ts-3" role="tabpanel" aria-label="Schedule a pickup">
                      <h3 className="app-title">Schedule pickup</h3>
                      <div className="a-mode"><span className="a-car"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 16v2M19 16v2M4 16h16v-4l-2-5H6l-2 5zM4 12h16M8 14h.01M16 14h.01" /></svg></span><span><b>Driver pickup</b><small>Collected from your door</small></span><span className="a-ok"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 12.5l4 4 8-9" /></svg></span></div>
                      <div className="a-fields">
                        <p className="a-field f-1"><span>Pickup address</span><i><em className="ph">Enter address</em><em className="val">Upper West Side, NY</em></i></p>
                        <p className="a-field f-2"><span>Pickup date</span><i><em className="ph">Select date</em><em className="val">Tomorrow</em></i></p>
                        <p className="a-field f-3"><span>Pickup time</span><i><em className="ph">Select time</em><em className="val">6 – 8 pm</em></i></p>
                        <p className="a-field f-4"><span>Driver instructions</span><i><em className="ph">Add instructions</em><em className="val">Leave with the doorman</em></i></p>
                      </div>
                      <span className="app-cta">Continue</span>
                    </section>

                    <section className="app-view" id="ts-4" role="tabpanel" aria-label="Review your order">
                      <h3 className="app-title">Review your order</h3>
                      <div className="a-shop"><span className="a-hang"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 8a2 2 0 1 1 2 2c-1 0-2 .6-2 2M12 12l-8 6h16z" /></svg></span><span><b>Clean Avenue</b><small>Dry cleaning · Wash &amp; Fold</small></span></div>
                      <p className="a-sub"><span>Your items</span><span>Edit</span></p>
                      <ul className="a-items a-items--rev">
                        <li><img src="/app/dress.webp" alt="" width="160" height="160" /><span><b>Dress</b></span><span className="pr">$3.00</span></li>
                        <li><img src="/app/pants.webp" alt="" width="160" height="160" /><span><b>Pants</b></span><span className="pr">$8.00</span></li>
                        <li><img src="/app/polo.webp" alt="" width="160" height="160" /><span><b>T-Shirt / Polo</b></span><span className="pr">$6.00</span></li>
                      </ul>
                      <div className="a-pick"><span className="a-car"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 16v2M19 16v2M4 16h16v-4l-2-5H6l-2 5zM4 12h16M8 14h.01M16 14h.01" /></svg></span><span><b>Driver pickup</b><small>We&apos;ll collect from your address</small></span></div>
                      <span className="app-cta">Continue to checkout</span>
                    </section>

                    <section className="app-view" id="ts-5" role="tabpanel" aria-label="Track your driver">
                      <div className="app-map">
                        <svg viewBox="0 0 300 330" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                          <rect className="m-bg" width="300" height="330" />
                          <rect className="m-blk" x="20" y="20" width="110" height="90" rx="8" /><rect className="m-blk" x="170" y="20" width="110" height="130" rx="8" />
                          <rect className="m-blk" x="20" y="150" width="110" height="160" rx="8" /><rect className="m-blk" x="170" y="190" width="110" height="120" rx="8" />
                          <path className="m-road" d="M0 130H300M150 0V330M0 170H130" />
                          <path className="m-route" id="m-route" d="M60 300V170H150V40H230" />
                          <circle className="m-home" cx="230" cy="40" r="9" />
                          <g className="m-car"><circle r="10" /><circle r="4" className="m-car-core" />
                            <animateMotion dur="5s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear"><mpath href="#m-route" /></animateMotion></g>
                        </svg>
                      </div>
                      <div className="sheet">
                        <div className="sheet-row"><span className="drv">MR</span><span><b>Driver on the way</b><small>Arriving in about 4 min</small></span></div>
                        <div className="sheet-actions"><span>Message</span><span>Share ETA</span></div>
                      </div>
                    </section>
                  </div>
                  <div className="tour-floats" aria-hidden="true">
                    <div className="fl fl-0"><span className="fl-ic"><svg viewBox="0 0 24 24"><path d="M9 4l-5 3 2 4 2-1v10h8V10l2 1 2-4-5-3c-.5 1.5-1.7 2.3-3 2.3S9.5 5.5 9 4z" /></svg></span><span><b>3 items identified</b><small>Estimated total <strong>$17.00</strong></small></span></div>
                    <div className="fl fl-1"><span className="fl-ic"><svg viewBox="0 0 24 24"><path d="M4 9l1.5-4h13L20 9M4 9v10h16V9M4 9h16M10 19v-5h4v5" /></svg></span><span><b>Clean Avenue</b><small className="blue">Selected cleaner</small></span><span className="fl-ok"><svg viewBox="0 0 24 24"><path d="M6 12.5l4 4 8-9" /></svg></span></div>
                    <div className="fl fl-2"><span className="fl-ic solid"><svg viewBox="0 0 24 24"><path d="M5 16v2M19 16v2M4 16h16v-4l-2-5H6l-2 5zM4 12h16M8 14h.01M16 14h.01" /></svg></span><span><b>Driver pickup</b><small>Tomorrow · 6 – 8 pm</small></span></div>
                    <div className="fl fl-3"><span className="fl-ic"><svg viewBox="0 0 24 24"><path d="M6 8h12l-1 12H7zM9 8a3 3 0 0 1 6 0" /></svg></span><span><small>3 items</small><b>Subtotal</b></span><strong className="fl-amt">$17.00</strong></div>
                    <div className="fl fl-4"><span className="fl-ic solid"><svg viewBox="0 0 24 24"><path d="M6 12.5l4 4 8-9" /></svg></span><span><b>Order confirmed</b><small>3 items · Clean Avenue</small></span></div>
                  </div>
                </div>
                <p className="tour-note">Example screens</p>
              </div>
            </div>
          </div>
        </section>
      
        <div className="marquee" aria-hidden="true"><div className="marquee-track">
          <span>Upper West Side <i></i> Williamsburg <i></i> Astoria <i></i> Harlem <i></i> Park Slope <i></i> Chelsea <i></i> Long Island City <i></i> Tribeca <i></i> Bushwick <i></i> Upper East Side <i></i> Greenpoint <i></i> East Village <i></i></span>
          <span>Upper West Side <i></i> Williamsburg <i></i> Astoria <i></i> Harlem <i></i> Park Slope <i></i> Chelsea <i></i> Long Island City <i></i> Tribeca <i></i> Bushwick <i></i> Upper East Side <i></i> Greenpoint <i></i> East Village <i></i></span>
        </div></div>
      
        <section className="hsteps" id="how-it-works" aria-labelledby="steps-title">
          <div className="hsteps-pin">
            <div className="wrap hsteps-head">
              <div><p className="kicker" style={{ marginBottom: "18px" } as CSSProperties}>How it works</p><h2 id="steps-title">Hamper to hanger in six moves.</h2></div>
              <div className="hsteps-progress" aria-hidden="true"><span></span></div>
            </div>
            <div className="wrap"><div className="hsteps-viewport"><ol className="hsteps-track"><li className="hstep"><span className="tag">Step 1 · Choose</span><h3>Pick your cleaner</h3><p>Browse the dry cleaners and laundromats near you and choose the one you already trust.</p><span className="n" aria-hidden="true">01</span></li><li className="hstep"><span className="tag">Step 2 · Scan</span><h3>Snap the bag</h3><p>Photograph each piece. The AI names it, notes the color and prices the order.</p><span className="n" aria-hidden="true">02</span></li><li className="hstep"><span className="tag">Step 3 · Book</span><h3>Pick a window</h3><p>Place the order and choose when the driver should knock. Tonight works.</p><span className="n" aria-hidden="true">03</span></li><li className="hstep"><span className="tag">Step 4 · Track</span><h3>Watch them arrive</h3><p>Follow your driver on a live map so you're at the door when they are.</p><span className="n" aria-hidden="true">04</span></li><li className="hstep"><span className="tag">Step 5 · Ready</span><h3>Get the ping</h3><p>Your phone buzzes the moment your cleaner finishes.</p><span className="n" aria-hidden="true">05</span></li><li className="hstep"><span className="tag">Step 6 · Done</span><h3>Open the door</h3><p>Fresh clothes come back to you, with photo proof they landed.</p><span className="n" aria-hidden="true">06</span></li></ol></div></div>
          </div>
        </section>
      
        <section className="section scan-demo" id="scan" aria-labelledby="scan-title">
          <div className="wrap grid">
            <div className="scan-copy reveal">
              <p className="kicker">AI scanning</p>
              <h2 id="scan-title">Point. Snap. It's itemized.</h2>
              <p>No dropdowns, no counting shirts on the floor. Snapwash recognizes each garment and its color, builds your bag and prices the order before the driver arrives.</p>
              <a className="arrow-link" href="#pricing">See what it costs <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a>
            </div>
            <div className="scan-stage reveal" style={{ "--rd": ".1s" } as CSSProperties}>
              <div className="phone">
                <div className="screen" id="scan-phone">
                  <div className="screen-top"><span>Scan your clothes</span><span>Bag · NY</span></div>
                  <div className="viewfinder">
                    <img src="/app/scan-photo.webp" alt="A red dress, patterned pants and a black polo laid out on a table" width="763" height="616" loading="lazy" />
                    <span className="vf-box vb-0"><em>Dress · Red</em></span>
                    <span className="vf-box vb-1"><em>Pants · Patterned</em></span>
                    <span className="vf-box vb-2"><em>Polo · Black</em></span>
                    <span className="beam"></span>
                  </div>
                  <p className="bag-total" id="bag-total"><span>Your bag</span><b>$0.00</b></p>
                  <ul className="bag" id="bag"><li className="bag-empty">Your bag is empty.</li></ul>
                  <div className="btn scan-btn" id="scan-btn" aria-hidden="true"><span>Scanning</span></div>
                  <p className="scan-note">Demo · items are examples</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      
        <section className="section" id="features" aria-labelledby="feat-title" style={{ paddingTop: "0" } as CSSProperties}>
          <div className="wrap">
            <div className="section-head reveal">
              <p className="kicker">In the app</p>
              <h2 id="feat-title">You'll always know where your coat is.</h2>
              <p>Every order is visible from the moment it leaves your hands to the moment it's back on the hanger.</p>
            </div>
            <div className="bento">
              <article className="cell cell--a reveal">
                <h3>Live tracking</h3>
                <p>Your driver on a map, in real time. No more waiting in the lobby.</p>
                <div className="mini-map" aria-hidden="true">
                  <svg viewBox="0 0 400 140" preserveAspectRatio="xMidYMid slice"><path className="road" d="M-10 100 H140 Q170 100 170 70 V40 Q170 20 200 20 H420" /><path className="road" d="M260 -10 V160" /><path className="route" d="M30 100 H140 Q170 100 170 70 V40 Q170 20 200 20 H330" /><circle className="car" cx="330" cy="20" r="9" /></svg>
                </div>
              </article>
              <article className="cell cell--b reveal" style={{ "--rd": ".08s" } as CSSProperties}>
                <h3>Live chat</h3>
                <p>Message your driver or your cleaner without leaving the order.</p>
                <div className="chat" aria-hidden="true"><p className="them">Downstairs in 2. Buzzer 4B?</p><p className="me">Yes! And there's wine on the left cuff 🙏</p></div>
              </article>
              <article className="cell cell--c reveal">
                <h3>One tap to pay</h3>
                <p>Charged once per order, processed by Stripe.</p>
                <div className="pay-row"><span>Apple Pay</span><span>Google Pay</span><span>Card</span></div>
              </article>
              <article className="cell cell--d reveal" style={{ "--rd": ".08s" } as CSSProperties}>
                <h3>Proof of delivery</h3>
                <p>Every drop-off is documented, so you know exactly where your bag was left.</p>
              </article>
              <article className="cell cell--e reveal" style={{ "--rd": ".16s" } as CSSProperties}>
                <p className="big"><span data-count="10" data-prefix="$">$10</span></p>
                <h3>For every friend you bring</h3>
                <p>Share your code. When they place an order, you both feel cleaner.</p>
              </article>
            </div>
          </div>
        </section>
      
        <section className="section" id="pricing" aria-labelledby="price-title" style={{ paddingTop: "0" } as CSSProperties}>
          <div className="wrap">
            <div className="section-head reveal">
              <p className="kicker">Pricing</p>
              <h2 id="price-title">Pay per trip, or never pay for one again.</h2>
              <p>Your cleaner sets the cleaning price. Snapwash only decides how you pay for the ride there and back.</p>
            </div>
            <div className="plans">
              <article className="plan plan--free reveal">
                <p className="name">Pay As You Go</p>
                <p className="price"><span className="amt">$0</span><span className="per">to join</span></p>
                <ul>
                  <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg><span>Pay for cleaning per order</span></li>
                  <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg><span>Delivery fee on each order</span></li>
                  <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg><span>Scanning, tracking, chat and proof of delivery included</span></li>
                </ul>
                <a className="btn btn--line" href="#download" data-magnetic>Start free</a>
              </article>
              <article className="plan plan--unl reveal" style={{ "--rd": ".1s" } as CSSProperties}>
                <span className="ribbon">Cancel anytime</span>
                <p className="name">Snapwash Unlimited</p>
                <p className="price"><span className="amt">$14.99</span><span className="per">/ month</span></p>
                <ul>
                  <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg><span>Free pickup and delivery on every order</span></li>
                  <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg><span>Priority queue at your cleaner</span></li>
                  <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg><span>Exclusive member discounts</span></li>
                </ul>
                <a className="btn" href="#download" data-magnetic>Go Unlimited</a>
              </article>
            </div>
          </div>
        </section>
      
        <section className="section quote-block" aria-label="Reviews" style={{ paddingTop: "0" } as CSSProperties}>
          <div className="wrap grid reveal">
            <figure className="quote">
              <blockquote><p>“I haven't been to a laundromat in months. Snapwash picks up <mark>Monday</mark>, delivers <mark>Wednesday</mark>. It just works.”</p></blockquote>
              <figcaption className="who"><span className="avatar" aria-hidden="true">J</span><div><b>James M.</b><span>Customer · New York</span></div></figcaption>
            </figure>
            <figure className="quote quote--2">
              <blockquote><p>“Driving for Snapwash is the most <mark>flexible</mark> gig I've had. The app is smooth and payouts are always <mark>on time</mark>.”</p></blockquote>
              <figcaption className="who"><span className="avatar" aria-hidden="true">S</span><div><b>Sarah R.</b><span>Driver · New Jersey</span></div></figcaption>
            </figure>
          </div>
        </section>
      
        <section className="section" aria-label="More from Snapwash" style={{ paddingTop: "0" } as CSSProperties}><div className="wrap"><div className="switch"><a href="/drive" className="reveal"><span className="kicker">Drive with Snapwash</span><h3>Earn on your schedule.</h3><span className="go"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg></span></a><a href="/cleaners" className="reveal"><span className="kicker">For dry cleaners &amp; laundromats</span><h3>Grow your shop.</h3><span className="go"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg></span></a></div></div></section>
      
        <section className="section faq" id="faq" aria-labelledby="faq-title" style={{ paddingTop: "0" } as CSSProperties}>
          <div className="wrap grid">
            <div className="faq-side"><p className="kicker" style={{ marginBottom: "18px" } as CSSProperties}>FAQ</p><h2 id="faq-title">Before you hand over the good shirt.</h2></div>
            <div className="faq-list reveal"><details id="faq-1"><summary>Where is Snapwash available?<span className="pm" aria-hidden="true"></span></summary><p className="a">Snapwash runs on the US East Coast, with customers, drivers and partner cleaners across New York, New Jersey and Connecticut. Enter your address in the app to see the cleaners that serve your block.</p></details>
      <details id="faq-2"><summary>How much does Snapwash cost?<span className="pm" aria-hidden="true"></span></summary><p className="a">Joining is free. On Pay As You Go you pay your cleaner's price plus a delivery fee on each order. Snapwash Unlimited is $14.99 a month and covers pickup and delivery on every order, with priority queue and member discounts. Cancel anytime.</p></details>
      <details id="faq-3"><summary>How does the AI scan work?<span className="pm" aria-hidden="true"></span></summary><p className="a">Point your camera at each item. Snapwash recognizes the garment type and color, adds it to your bag and prices the order, so there is no form to fill in.</p></details>
      <details id="faq-4"><summary>How do I pay?<span className="pm" aria-hidden="true"></span></summary><p className="a">In the app, with Apple Pay, Google Pay or a card, processed by Stripe. You are charged once per order.</p></details>
      <details id="faq-5"><summary>How do I know my clothes arrived?<span className="pm" aria-hidden="true"></span></summary><p className="a">You can follow your driver on a live map, message your driver or cleaner in the app, and every drop-off comes with proof of delivery.</p></details></div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
