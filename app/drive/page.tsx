import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import StoreButtons from "@/components/StoreButtons";
import RouteCard from "@/components/drive/RouteCard";
import Perks from "@/components/drive/Perks";
import { Faq, Mark, Quotes, SwitchCards } from "@/components/sections";
import { Kicker, Section, SectionHead, cx, grid12, tone, wrap } from "@/components/site";
import { hero } from "@/components/hero";
import { PHOTOS, photoSet } from "@/components/home/photos";
import ApplyForm from "@/components/ApplyForm";

const description = "Drive for Snapwash in New York, New Jersey and Connecticut. Pick up and deliver laundry and dry cleaning on your own hours, with in-app navigation and on-time payouts.";

export const metadata: Metadata = {
  title: { absolute: "Drive with Snapwash | Flexible Laundry Delivery Driver Jobs" },
  description,
  alternates: { canonical: "/drive" },
  openGraph: { url: "/drive", title: "Drive with Snapwash | Earn on your schedule", description },
  twitter: { title: "Drive with Snapwash | Earn on your schedule", description },
};

const jsonLd = {"@context": "https://schema.org", "@graph": [{"@type": "Organization", "@id": "https://snapwash.io/#org", "name": "Snapwash", "url": "https://snapwash.io/", "logo": "https://snapwash.io/assets/snapwash-logo.svg", "slogan": "Fresh clothes, zero effort.", "areaServed": ["New York", "New Jersey", "Connecticut"]}, {"@type": "WebPage", "@id": "https://snapwash.io/drive#page", "url": "https://snapwash.io/drive", "name": "Drive with Snapwash", "isPartOf": {"@id": "https://snapwash.io/#website"}, "description": "Deliver laundry and dry cleaning with Snapwash. Pick your hours, navigate in-app, get paid on time."}, {"@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://snapwash.io/"}, {"@type": "ListItem", "position": 2, "name": "Drive", "item": "https://snapwash.io/drive"}]}, {"@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": "How do I start driving for Snapwash?", "acceptedAnswer": {"@type": "Answer", "text": "Download the Snapwash driver app from the App Store or Google Play and sign up there. The app walks you through everything you need to get on the road."}}, {"@type": "Question", "name": "Do I choose my own hours?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. You decide when you drive. Go online when it suits you and stay offline when it doesn't."}}, {"@type": "Question", "name": "How do I get paid?", "acceptedAnswer": {"@type": "Answer", "text": "Customers pay once when they place an order, and your share is paid out to you through the app. Drivers tell us payouts are always on time."}}, {"@type": "Question", "name": "Where can I drive?", "acceptedAnswer": {"@type": "Answer", "text": "Snapwash operates across New York, New Jersey and Connecticut."}}, {"@type": "Question", "name": "Is there a referral bonus?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. You earn $50 for every new driver you refer to Snapwash."}}]}]};

const LEGS = [
  { n: "Stop 01 · Pickup", photo: PHOTOS.pickup, pos: "object-[50%_50%]", title: "Collect the bag", body: "Head to the customer in their chosen window. They can see you coming, and you can message them if the buzzer's broken." },
  { n: "Stop 02 · Cleaner", photo: PHOTOS.dropoff, pos: "object-[40%_40%]", title: "Drop at the shop", body: "Hand the order to the dry cleaner or laundromat the customer picked. It's already itemized, so there's nothing to count." },
  { n: "Stop 03 · Delivery", photo: PHOTOS.handover, pos: "object-[50%_50%]", title: "Bring it home", body: "Pick up the finished order and deliver it. Snap the proof of delivery and you're done." },
];
const LEG_DELAY = ["", "[--rd:.08s]", "[--rd:.16s]"];

const FAQ = [
  { id: "dfaq-1", q: "How do I start driving for Snapwash?", a: "Download the Snapwash driver app from the App Store or Google Play and sign up there. The app walks you through everything you need to get on the road." },
  { id: "dfaq-2", q: "Do I choose my own hours?", a: "Yes. You decide when you drive. Go online when it suits you and stay offline when it doesn't." },
  { id: "dfaq-3", q: "How do I get paid?", a: "Customers pay once when they place an order, and your share is paid out to you through the app. Drivers tell us payouts are always on time." },
  { id: "dfaq-4", q: "Where can I drive?", a: "Snapwash operates across New York, New Jersey and Connecticut." },
  { id: "dfaq-5", q: "Is there a referral bonus?", a: "Yes. You earn $50 for every new driver you refer to Snapwash." },
];

export default function DrivePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader current="drive" />
      <main id="main">
        <section className={cx(hero.section, tone.night, "overflow-hidden min-h-0")} aria-labelledby="h1">
          <div className={cx(wrap, grid12, hero.grid)}>
            <div className={hero.title}>
              <Kicker className="animate-fade-up [--d:.05s] mb-7">Drive with Snapwash · NY · NJ · CT</Kicker>
              <h1 id="h1" className={hero.h1}>Earn on your <em className={hero.em}>schedule.</em></h1>
            </div>
            <div className={hero.copy}>
              <p className={cx(hero.lede, "animate-fade-up [--d:.55s]")}>Collect bags from customers, drop them at local cleaners, bring them home fresh. You pick the hours. The app handles the route.</p>
              <div className={cx(hero.ctas, "animate-fade-up [--d:.7s]")}><StoreButtons /></div>
              <Kicker className="animate-fade-up [--d:.85s]">Sign up in the driver app</Kicker>
            </div>
            <div className="col-[7/-1] row-[1/span_2] self-center max-lg:col-span-full max-lg:row-auto max-lg:mt-3 animate-fade-up [--d:.4s]">
              <RouteCard />
            </div>
          </div>
        </section>

        <Section className={cx(tone.night, "pt-[clamp(40px,6vw,80px)]")} aria-labelledby="legs-title">
          <div className={wrap}>
            <SectionHead kicker="The job" title="One run. Three stops." titleId="legs-title">
              Every Snapwash order is the same simple loop, and the app tells you where to go next.
            </SectionHead>
            <ol className="grid grid-cols-3 gap-0 border-t-[1.5px] border-t-night-fg max-lg:grid-cols-1">
              {LEGS.map((l, i) => (
                <li key={l.n} className={cx(
                  "reveal pt-7 pr-[clamp(0px,2vw,28px)] pb-8 grid gap-3 content-start border-b border-b-night-line", LEG_DELAY[i],
                  i === 0 ? "pl-0" : "pl-[clamp(0px,2vw,28px)] border-l border-l-night-line max-lg:border-l-0 max-lg:pl-0",
                )}>
                  <div className="relative mb-3 h-[clamp(220px,19vw,280px)] max-lg:h-auto max-lg:aspect-[16/10] rounded-card overflow-hidden isolate bg-night-2 group/leg">
                    <img {...photoSet(l.photo)} sizes="(max-width: 1024px) 100vw, 33vw" alt={l.photo.alt} loading="lazy" decoding="async"
                      className={cx("absolute inset-0 -z-1 w-full h-full object-cover transition-transform duration-[1.2s] ease-brand group-hover/leg:scale-[1.04]", l.pos)} />
                    <span className="absolute left-4 bottom-4 font-display font-extrabold text-[2.5rem] leading-none tracking-tightest text-white [text-shadow:0_2px_24px_rgba(0,0,0,.35)]" aria-hidden="true">0{i + 1}</span>
                  </div>
                  <span className="font-body font-medium text-xs leading-none tracking-kicker text-brand uppercase">{l.n}</span>
                  <h3 className="text-xl leading-none tracking-display">{l.title}</h3>
                  <p className="text-night-muted max-w-[34ch]">{l.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </Section>

        <Perks />

        <Quotes label="Driver review" solo className={cx("pt-0", tone.night)} items={[
          { text: <>“Driving for Snapwash is the most <Mark>flexible gig</Mark> I've had. The app is smooth and payouts are always on time.”</>, initial: "S", name: "Sarah R.", role: "Driver · New Jersey" },
          { text: <>“Since joining Snapwash, our order volume increased <Mark>40%</Mark>. The dashboard makes everything easy to manage.”</>, initial: "D", name: "David C.", role: "Partner cleaner · Connecticut" },
        ]} />

        <ApplyForm kicker="Drive with Snapwash" title="Apply to drive with Snapwash." intro="We review every application and reply within 48 hours." fields={[
          { name: "name", label: "Full name", autoComplete: "name" },
          { name: "email", label: "Email address", type: "email", autoComplete: "email" },
          { name: "area", label: "Area you drive in", autoComplete: "address-level2" },
        ]} />

        <Faq night kicker="Driver FAQ" title="Before your first run." items={FAQ} />

        <SwitchCards night items={[
          { href: "/", kicker: "For customers", title: "Get laundry picked up." },
          { href: "/cleaners", kicker: "For dry cleaners & laundromats", title: "Grow your shop." },
        ]} />
      </main>
      <SiteFooter />
    </>
  );
}
