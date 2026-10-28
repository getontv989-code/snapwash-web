import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Dashboard from "@/components/cleaners/Dashboard";
import { Faq, Mark, Quotes, SwitchCards } from "@/components/sections";
import { ArrowIcon, Kicker, Section, SectionHead, btn, cx, grid12, tone, wrap } from "@/components/ui";
import { hero } from "@/components/hero";

const description = "Partner with Snapwash to get pickup and delivery orders without running a fleet. Orders arrive itemized by AI, drivers handle the miles, payments split automatically. NY, NJ, CT.";

export const metadata: Metadata = {
  title: { absolute: "Snapwash for Dry Cleaners & Laundromats | Grow With Pickup and Delivery" },
  description,
  alternates: { canonical: "/cleaners" },
  openGraph: { url: "/cleaners", title: "Snapwash for cleaners | Grow your business", description },
  twitter: { title: "Snapwash for cleaners | Grow your business", description },
};

const jsonLd = {"@context": "https://schema.org", "@graph": [{"@type": "Organization", "@id": "https://snapwash.io/#org", "name": "Snapwash", "url": "https://snapwash.io/", "logo": "https://snapwash.io/assets/snapwash-logo.svg", "slogan": "Fresh clothes, zero effort.", "areaServed": ["New York", "New Jersey", "Connecticut"]}, {"@type": "WebPage", "@id": "https://snapwash.io/cleaners#page", "url": "https://snapwash.io/cleaners", "name": "Snapwash for Dry Cleaners and Laundromats", "isPartOf": {"@id": "https://snapwash.io/#website"}, "description": "Partner with Snapwash to get new pickup and delivery orders, an order dashboard and automatic payments, with no delivery fleet of your own."}, {"@type": "Service", "name": "Snapwash retailer partnership", "serviceType": "Delivery and order management for dry cleaners and laundromats", "provider": {"@id": "https://snapwash.io/#org"}, "audience": {"@type": "BusinessAudience", "name": "Dry cleaners and laundromats"}, "areaServed": ["New York", "New Jersey", "Connecticut"]}, {"@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://snapwash.io/"}, {"@type": "ListItem", "position": 2, "name": "Cleaners", "item": "https://snapwash.io/cleaners"}]}, {"@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": "How do Snapwash orders reach my shop?", "acceptedAnswer": {"@type": "Answer", "text": "Customers near you choose your shop in the Snapwash app and scan their items. The order arrives in your dashboard already itemized, and a Snapwash driver brings the bag to your counter."}}, {"@type": "Question", "name": "Do I need my own delivery drivers?", "acceptedAnswer": {"@type": "Answer", "text": "No. Snapwash drivers handle pickup from the customer and delivery back to them. You focus on cleaning."}}, {"@type": "Question", "name": "How do I manage orders?", "acceptedAnswer": {"@type": "Answer", "text": "Through the Snapwash retailer dashboard in your web browser. You see incoming orders, mark them as cleaning and ready, and chat with customers and drivers."}}, {"@type": "Question", "name": "How do I get paid?", "acceptedAnswer": {"@type": "Answer", "text": "The customer pays once when the order is placed. Snapwash splits that payment automatically between your shop, the driver and the platform, and sends your share to you."}}, {"@type": "Question", "name": "Where is Snapwash open to partners?", "acceptedAnswer": {"@type": "Answer", "text": "Snapwash works with dry cleaners and laundromats across New York, New Jersey and Connecticut."}}]}]};

const FLOW = [
  { title: "Customer picks your shop", body: "Nearby customers find you in the Snapwash app." },
  { title: "AI itemizes the bag", body: "Every garment is scanned, named and priced before pickup." },
  { title: "Driver brings it in", body: "A Snapwash driver collects the bag and delivers it to your counter." },
  { title: "You clean it", body: "Mark it ready in the dashboard when it's done.", you: true },
  { title: "Driver takes it home", body: "We deliver it back, with proof of delivery." },
];

const FAQ = [
  { id: "sfaq-1", q: "How do Snapwash orders reach my shop?", a: "Customers near you choose your shop in the Snapwash app and scan their items. The order arrives in your dashboard already itemized, and a Snapwash driver brings the bag to your counter." },
  { id: "sfaq-2", q: "Do I need my own delivery drivers?", a: "No. Snapwash drivers handle pickup from the customer and delivery back to them. You focus on cleaning." },
  { id: "sfaq-3", q: "How do I manage orders?", a: "Through the Snapwash retailer dashboard in your web browser. You see incoming orders, mark them as cleaning and ready, and chat with customers and drivers." },
  { id: "sfaq-4", q: "How do I get paid?", a: "The customer pays once when the order is placed. Snapwash splits that payment automatically between your shop, the driver and the platform, and sends your share to you." },
  { id: "sfaq-5", q: "Where is Snapwash open to partners?", a: "Snapwash works with dry cleaners and laundromats across New York, New Jersey and Connecticut." },
];

const SHARES = [
  { key: "Your shop", bar: "flex-[6] bg-white", dot: "bg-white" },
  { key: "Driver", bar: "flex-[2.5] bg-white/55", dot: "bg-white/55" },
  { key: "Snapwash", bar: "flex-[1.5] bg-white/28", dot: "bg-white/28" },
];

export default function CleanersPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader current="cleaners" />
      <main id="main">
        <section className={hero.section} aria-labelledby="h1">
          <div className={cx(wrap, grid12, hero.grid)}>
            <div className="col-[1/span_7] row-1 self-end max-lg:col-span-full max-lg:row-auto">
              <Kicker className="animate-fade-up [--d:.05s] mb-7">For dry cleaners &amp; laundromats</Kicker>
              <h1 id="h1" className={hero.h1}>More orders. <em className={hero.em}>No delivery van.</em></h1>
            </div>
            <div className="col-[9/-1] row-[1/span_2] self-center grid gap-[14px] p-card-lg rounded-card bg-surface shadow-[0_0_0_1px_var(--line)] max-lg:col-span-full max-lg:row-auto animate-fade-up [--d:.6s]">
              <p className="font-display font-extrabold text-[clamp(3.5rem,2.2rem+3.6vw,6rem)] leading-[.85] tracking-tightest text-brand tabular-nums"><span data-count="40" data-prefix="+" data-suffix="%">+40%</span></p>
              <p className="font-body font-medium text-xs leading-[1.4] tracking-caps uppercase text-muted max-w-[36ch]">Order volume increase at a Connecticut partner after joining Snapwash</p>
            </div>
            <div className="col-[1/span_6] row-2 grid gap-6 content-start max-lg:col-span-full max-lg:row-auto">
              <p className={cx(hero.lede, "animate-fade-up [--d:.7s]")}>Snapwash puts your shop in front of customers who'd rather not carry a bag across town. They scan, our drivers deliver, you clean. Everything runs from one dashboard.</p>
              <div className={cx(hero.ctas, "animate-fade-up [--d:.85s]")} id="list">
                <a className={btn("primary")} href="/contact" data-magnetic>List your shop <ArrowIcon /></a>
                <a className={btn("line")} href="#dashboard" data-magnetic>See the dashboard</a>
              </div>
            </div>
          </div>
        </section>

        <Section className="pt-[clamp(24px,4vw,56px)]" id="dashboard" aria-labelledby="dash-title">
          <div className={wrap}>
            <SectionHead kicker="The retailer dashboard" title="Your whole counter on one screen." titleId="dash-title">
              Orders show up itemized by the AI scan, so nobody re-counts shirts at the counter. Move each one from incoming to ready with a click.
            </SectionHead>
            <Dashboard />
          </div>
        </Section>

        <Section className="pt-0" aria-labelledby="flow-title">
          <div className={wrap}>
            <SectionHead kicker="How an order moves" title="You do one step. We do four." titleId="flow-title" />
            <ol className="reveal grid grid-cols-5 gap-0 [counter-reset:f] border-t-[1.5px] border-t-ink max-xl:grid-cols-2 max-sm:grid-cols-1">
              {FLOW.map((f) => (
                <li key={f.title} className={cx(
                  "pt-7 pr-5 pb-9 pl-0 grid gap-3 content-start border-b border-b-line relative",
                  "before:[counter-increment:f] before:content-['0'_counter(f)] before:font-display before:font-extrabold before:text-[2.25rem] before:leading-none before:tracking-tightest before:text-brand",
                  f.you && "after:content-['You'] after:absolute after:top-[34px] after:right-5 after:py-[5px] after:px-[10px] after:rounded-pill after:bg-ink after:text-paper after:font-body after:font-medium after:text-[10px] after:leading-none after:tracking-tag after:uppercase",
                )}>
                  <h3 className="text-lg leading-[1.15] tracking-tight">{f.title}</h3>
                  <p className="text-muted text-sm max-w-[30ch]">{f.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </Section>

        <Section className={tone.blue} aria-labelledby="money-title">
          <div className={cx(wrap, "grid grid-cols-12 gap-tile items-stretch")}>
            <div className="reveal col-[1/span_5] grid gap-5 content-start max-lg:col-span-full">
              <Kicker tone="onBlueCopy" className="max-w-[40ch]">Payments</Kicker>
              <h2 id="money-title" className="text-2xl leading-none tracking-display">One charge. Split for you.</h2>
              <p className="text-white/88 max-w-[40ch]">The customer pays once, by Apple Pay, Google Pay or card through Stripe, when they place the order. Snapwash divides it between your shop, the driver and the platform automatically. No invoices, no chasing.</p>
            </div>
            <div className="reveal [--rd:.1s] col-[7/-1] grid gap-[14px] content-center max-lg:col-span-full">
              <div className="rounded-card bg-white/12 p-[22px] grid gap-[14px]" role="img" aria-label="Diagram: one customer payment divided between the shop, the driver and Snapwash">
                <div className="flex justify-between gap-3 font-body font-medium text-sm leading-[1.3] tracking-note"><span>Customer pays</span><span>Order #2418</span></div>
                <div className="flex h-[18px] rounded-pill overflow-hidden gap-[3px]">{SHARES.map((s) => <span key={s.key} className={cx("block h-full", s.bar)}></span>)}</div>
                <div className="flex flex-wrap gap-x-[18px] gap-y-2 font-body font-medium text-xs leading-[1.3] tracking-label uppercase">
                  {SHARES.map((s) => <span key={s.key}><i className={cx("inline-block w-[10px] h-[10px] rounded-[3px] mr-1.5 align-[-1px]", s.dot)}></i>{s.key}</span>)}
                </div>
                <p className="text-xs opacity-75">Shares shown for illustration only.</p>
              </div>
            </div>
          </div>
        </Section>

        <Quotes label="Partner review" solo items={[
          { text: <>“Since joining Snapwash, our order volume increased <Mark>40%</Mark>. The dashboard makes everything easy to manage.”</>, initial: "D", name: "David C.", role: "Partner cleaner · Connecticut" },
          { text: <>“I haven't been to a laundromat in months. Snapwash picks up <Mark>Monday</Mark>, delivers <Mark>Wednesday</Mark>. It just works.”</>, initial: "J", name: "James M.", role: "Customer · New York" },
        ]} />

        <Faq kicker="Partner FAQ" title="What shop owners ask first." items={FAQ} />

        <SwitchCards items={[
          { href: "/", kicker: "For customers", title: "Get laundry picked up." },
          { href: "/drive", kicker: "Drive with Snapwash", title: "Earn on your schedule." },
        ]} />
      </main>
      <SiteFooter />
    </>
  );
}
