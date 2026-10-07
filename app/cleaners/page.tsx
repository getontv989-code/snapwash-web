import type { CSSProperties } from "react";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const description = "Partner with Snapwash to get pickup and delivery orders without running a fleet. Orders arrive itemized by AI, drivers handle the miles, payments split automatically. NY, NJ, CT.";

export const metadata: Metadata = {
  title: { absolute: "Snapwash for Dry Cleaners & Laundromats | Grow With Pickup and Delivery" },
  description,
  alternates: { canonical: "/cleaners" },
  openGraph: { url: "/cleaners", title: "Snapwash for cleaners | Grow your business", description },
  twitter: { title: "Snapwash for cleaners | Grow your business", description },
};

const jsonLd = {"@context": "https://schema.org", "@graph": [{"@type": "Organization", "@id": "https://snapwash.io/#org", "name": "Snapwash", "url": "https://snapwash.io/", "logo": "https://snapwash.io/assets/snapwash-logo.svg", "slogan": "Fresh clothes, zero effort.", "areaServed": ["New York", "New Jersey", "Connecticut"]}, {"@type": "WebPage", "@id": "https://snapwash.io/cleaners#page", "url": "https://snapwash.io/cleaners", "name": "Snapwash for Dry Cleaners and Laundromats", "isPartOf": {"@id": "https://snapwash.io/#website"}, "description": "Partner with Snapwash to get new pickup and delivery orders, an order dashboard and automatic payments, with no delivery fleet of your own."}, {"@type": "Service", "name": "Snapwash retailer partnership", "serviceType": "Delivery and order management for dry cleaners and laundromats", "provider": {"@id": "https://snapwash.io/#org"}, "audience": {"@type": "BusinessAudience", "name": "Dry cleaners and laundromats"}, "areaServed": ["New York", "New Jersey", "Connecticut"]}, {"@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://snapwash.io/"}, {"@type": "ListItem", "position": 2, "name": "Cleaners", "item": "https://snapwash.io/cleaners"}]}, {"@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": "How do Snapwash orders reach my shop?", "acceptedAnswer": {"@type": "Answer", "text": "Customers near you choose your shop in the Snapwash app and scan their items. The order arrives in your dashboard already itemized, and a Snapwash driver brings the bag to your counter."}}, {"@type": "Question", "name": "Do I need my own delivery drivers?", "acceptedAnswer": {"@type": "Answer", "text": "No. Snapwash drivers handle pickup from the customer and delivery back to them. You focus on cleaning."}}, {"@type": "Question", "name": "How do I manage orders?", "acceptedAnswer": {"@type": "Answer", "text": "Through the Snapwash retailer dashboard in your web browser. You see incoming orders, mark them as cleaning and ready, and chat with customers and drivers."}}, {"@type": "Question", "name": "How do I get paid?", "acceptedAnswer": {"@type": "Answer", "text": "The customer pays once when the order is placed. Snapwash splits that payment automatically between your shop, the driver and the platform, and sends your share to you."}}, {"@type": "Question", "name": "Where is Snapwash open to partners?", "acceptedAnswer": {"@type": "Answer", "text": "Snapwash works with dry cleaners and laundromats across New York, New Jersey and Connecticut."}}]}]};

export default function CleanersPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader current="cleaners" />
      <main id="main">
        <section className="hero shop-hero" aria-labelledby="h1">
          <div className="wrap grid">
            <div className="title">
              <p className="kicker fade-up" style={{ "--d": ".05s", marginBottom: "28px" } as CSSProperties}>For dry cleaners &amp; laundromats</p>
              <h1 id="h1" className="split">More orders. <em>No delivery van.</em></h1>
            </div>
            <div className="stat fade-up" style={{ "--d": ".6s" } as CSSProperties}>
              <p className="num"><span data-count="40" data-prefix="+" data-suffix="%">+40%</span></p>
              <p className="cap">Order volume increase at a Connecticut partner after joining Snapwash</p>
            </div>
            <div className="copy">
              <p className="hero-lede fade-up" style={{ "--d": ".7s" } as CSSProperties}>Snapwash puts your shop in front of customers who'd rather not carry a bag across town. They scan, our drivers deliver, you clean. Everything runs from one dashboard.</p>
              <div className="hero-ctas fade-up" id="list" style={{ "--d": ".85s" } as CSSProperties}><a className="btn" href="/contact" data-magnetic>List your shop <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a><a className="btn btn--line" href="#dashboard" data-magnetic>See the dashboard</a></div>
            </div>
          </div>
        </section>
      
        <section className="section" id="dashboard" aria-labelledby="dash-title" style={{ paddingTop: "clamp(24px,4vw,56px)" } as CSSProperties}>
          <div className="wrap">
            <div className="section-head reveal">
              <p className="kicker">The retailer dashboard</p>
              <h2 id="dash-title">Your whole counter on one screen.</h2>
              <p>Orders show up itemized by the AI scan, so nobody re-counts shirts at the counter. Move each one from incoming to ready with a click.</p>
            </div>
            <div className="dash reveal">
              <div className="dash-bar">
                <div className="tabs" role="tablist" aria-label="Filter orders">
                  <button type="button" role="tab" data-filter="all" aria-selected="true">All</button>
                  <button type="button" role="tab" data-filter="in" aria-selected="false">Incoming</button>
                  <button type="button" role="tab" data-filter="clean" aria-selected="false">Cleaning</button>
                  <button type="button" role="tab" data-filter="ready" aria-selected="false">Ready</button>
                </div>
                <span className="example">Example data</span>
              </div>
              <div className="dash-body">
                <div className="orders">
                  <table>
                    <thead><tr><th scope="col">Order</th><th scope="col">Items</th><th scope="col">Arrived</th><th scope="col">Status</th></tr></thead>
                    <tbody id="order-rows">
                      <tr data-state="in"><td>#2418</td><td>3 items · suit, shirt</td><td>7:58 pm</td><td><span className="pill pill--in">Incoming</span></td></tr>
                      <tr data-state="clean"><td>#2415</td><td>5 items · shirts</td><td>6:40 pm</td><td><span className="pill pill--clean">Cleaning</span></td></tr>
                      <tr data-state="clean"><td>#2412</td><td>1 item · wool coat</td><td>5:15 pm</td><td><span className="pill pill--clean">Cleaning</span></td></tr>
                      <tr data-state="ready"><td>#2409</td><td>9 items · wash &amp; fold</td><td>2:02 pm</td><td><span className="pill pill--ready">Ready</span></td></tr>
                      <tr data-state="ready"><td>#2404</td><td>2 items · dress, blouse</td><td>11:30 am</td><td><span className="pill pill--ready">Ready</span></td></tr>
                    </tbody>
                  </table>
                </div>
                <aside className="dash-side" aria-label="Today at a glance">
                  <div><p className="k">Orders today</p><p className="v" id="today-count">14</p></div>
                  <div><p className="k">This week</p><div className="bars" aria-hidden="true"><span style={{ "--h": "38%", "--i": "0" } as CSSProperties}></span><span style={{ "--h": "52%", "--i": "1" } as CSSProperties}></span><span style={{ "--h": "45%", "--i": "2" } as CSSProperties}></span><span style={{ "--h": "60%", "--i": "3" } as CSSProperties}></span><span style={{ "--h": "58%", "--i": "4" } as CSSProperties}></span><span style={{ "--h": "74%", "--i": "5" } as CSSProperties}></span><span style={{ "--h": "92%", "--i": "6" } as CSSProperties}></span></div></div>
                  <div><p className="k">Drivers en route</p><p className="v">3</p></div>
                </aside>
              </div>
            </div>
          </div>
        </section>
      
        <section className="section" aria-labelledby="flow-title" style={{ paddingTop: "0" } as CSSProperties}>
          <div className="wrap">
            <div className="section-head reveal">
              <p className="kicker">How an order moves</p>
              <h2 id="flow-title">You do one step. We do four.</h2>
            </div>
            <ol className="flow reveal">
              <li><h3>Customer picks your shop</h3><p>Nearby customers find you in the Snapwash app.</p></li>
              <li><h3>AI itemizes the bag</h3><p>Every garment is scanned, named and priced before pickup.</p></li>
              <li><h3>Driver brings it in</h3><p>A Snapwash driver collects the bag and delivers it to your counter.</p></li>
              <li className="you"><h3>You clean it</h3><p>Mark it ready in the dashboard when it's done.</p></li>
              <li><h3>Driver takes it home</h3><p>We deliver it back, with proof of delivery.</p></li>
            </ol>
          </div>
        </section>
      
        <section className="section blue-band" aria-labelledby="money-title">
          <div className="wrap split-money">
            <div className="explain reveal">
              <p className="kicker">Payments</p>
              <h2 id="money-title">One charge. Split for you.</h2>
              <p>The customer pays once, by Apple Pay, Google Pay or card through Stripe, when they place the order. Snapwash divides it between your shop, the driver and the platform automatically. No invoices, no chasing.</p>
            </div>
            <div className="viz reveal" style={{ "--rd": ".1s" } as CSSProperties}>
              <div className="charge" role="img" aria-label="Diagram: one customer payment divided between the shop, the driver and Snapwash">
                <div className="row"><span>Customer pays</span><span>Order #2418</span></div>
                <div className="stack"><span className="s1"></span><span className="s2"></span><span className="s3"></span></div>
                <div className="keys"><span><i style={{ background: "#FFFFFF" } as CSSProperties}></i>Your shop</span><span><i style={{ background: "rgba(255,255,255,.55)" } as CSSProperties}></i>Driver</span><span><i style={{ background: "rgba(255,255,255,.28)" } as CSSProperties}></i>Snapwash</span></div>
                <p className="note">Shares shown for illustration only.</p>
              </div>
            </div>
          </div>
        </section>
      
        <section className="section quote-block" aria-label="Partner review">
          <div className="wrap grid reveal">
            <blockquote><p>“Since joining Snapwash, our order volume increased <mark>40%</mark>. The dashboard makes everything easy to manage.”</p></blockquote>
            <div className="who"><span className="avatar" aria-hidden="true">D</span><div><b>David C.</b><span>Partner cleaner · Connecticut</span></div></div>
          </div>
        </section>
      
        <section className="section faq" aria-labelledby="faq-title" style={{ paddingTop: "0" } as CSSProperties}>
          <div className="wrap grid">
            <div className="faq-side"><p className="kicker" style={{ marginBottom: "18px" } as CSSProperties}>Partner FAQ</p><h2 id="faq-title">What shop owners ask first.</h2></div>
            <div className="faq-list reveal"><details id="sfaq-1"><summary>How do Snapwash orders reach my shop?<span className="pm" aria-hidden="true"></span></summary><p className="a">Customers near you choose your shop in the Snapwash app and scan their items. The order arrives in your dashboard already itemized, and a Snapwash driver brings the bag to your counter.</p></details>
      <details id="sfaq-2"><summary>Do I need my own delivery drivers?<span className="pm" aria-hidden="true"></span></summary><p className="a">No. Snapwash drivers handle pickup from the customer and delivery back to them. You focus on cleaning.</p></details>
      <details id="sfaq-3"><summary>How do I manage orders?<span className="pm" aria-hidden="true"></span></summary><p className="a">Through the Snapwash retailer dashboard in your web browser. You see incoming orders, mark them as cleaning and ready, and chat with customers and drivers.</p></details>
      <details id="sfaq-4"><summary>How do I get paid?<span className="pm" aria-hidden="true"></span></summary><p className="a">The customer pays once when the order is placed. Snapwash splits that payment automatically between your shop, the driver and the platform, and sends your share to you.</p></details>
      <details id="sfaq-5"><summary>Where is Snapwash open to partners?<span className="pm" aria-hidden="true"></span></summary><p className="a">Snapwash works with dry cleaners and laundromats across New York, New Jersey and Connecticut.</p></details></div>
          </div>
        </section>
      
        <section className="section" aria-label="More from Snapwash" style={{ paddingTop: "0" } as CSSProperties}><div className="wrap"><div className="switch"><a href="/" className="reveal"><span className="kicker">For customers</span><h3>Get laundry picked up.</h3><span className="go"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg></span></a><a href="/drive" className="reveal"><span className="kicker">Drive with Snapwash</span><h3>Earn on your schedule.</h3><span className="go"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg></span></a></div></div></section>
      </main>
      <SiteFooter />
    </>
  );
}
