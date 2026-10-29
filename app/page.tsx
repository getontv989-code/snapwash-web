import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import StoreButtons from "@/components/StoreButtons";
import AppTour from "@/components/home/AppTour";
import Marquee from "@/components/home/Marquee";
import HowItWorks from "@/components/home/HowItWorks";
import ScanDemo from "@/components/home/ScanDemo";
import Features from "@/components/home/Features";
import Pricing from "@/components/home/Pricing";
import DemoVideo from "@/components/home/DemoVideo";
import People from "@/components/home/People";
import { AVATARS } from "@/components/home/photos";
import { Faq, Mark, Quotes, SwitchCards } from "@/components/sections";
import { Kicker, cx, grid12, wrap } from "@/components/ui";
import { hero } from "@/components/hero";

const description = "Snapwash picks up your laundry and dry cleaning, takes it to a local cleaner you choose, and brings it back fresh. Scan clothes with AI, track your driver live. Unlimited delivery $14.99/mo.";

export const metadata: Metadata = {
  title: { absolute: "Snapwash | Laundry & Dry Cleaning Pickup and Delivery" },
  description,
  alternates: { canonical: "/" },
  openGraph: { url: "/", title: "Snapwash | Fresh clothes, zero effort", description },
  twitter: { title: "Snapwash | Fresh clothes, zero effort", description },
};

const jsonLd = {"@context": "https://schema.org", "@graph": [{"@type": "Organization", "@id": "https://snapwash.io/#org", "name": "Snapwash", "url": "https://snapwash.io/", "logo": "https://snapwash.io/assets/snapwash-logo.svg", "slogan": "Fresh clothes, zero effort.", "areaServed": ["New York", "New Jersey", "Connecticut"]}, {"@type": "WebSite", "@id": "https://snapwash.io/#website", "url": "https://snapwash.io/", "name": "Snapwash", "publisher": {"@id": "https://snapwash.io/#org"}, "inLanguage": "en-US"}, {"@type": "Service", "serviceType": "Laundry and dry cleaning pickup and delivery", "name": "Snapwash", "provider": {"@id": "https://snapwash.io/#org"}, "areaServed": ["New York", "New Jersey", "Connecticut"], "description": "Pickup and delivery from local dry cleaners and laundromats, with AI garment scanning, live driver tracking and proof of delivery.", "offers": [{"@type": "Offer", "name": "Pay As You Go", "price": "0", "priceCurrency": "USD", "description": "Free to join. Cleaning and a delivery fee are paid per order."}, {"@type": "Offer", "name": "Snapwash Unlimited", "price": "14.99", "priceCurrency": "USD", "description": "Free pickup and delivery on all orders, priority queue, exclusive discounts. Cancel anytime.", "priceSpecification": {"@type": "UnitPriceSpecification", "price": "14.99", "priceCurrency": "USD", "unitCode": "MON"}}]}, {"@type": "MobileApplication", "name": "Snapwash", "operatingSystem": "iOS, Android", "applicationCategory": "LifestyleApplication", "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD"}, "publisher": {"@id": "https://snapwash.io/#org"}}, {"@type": "HowTo", "name": "How to get laundry picked up with Snapwash", "step": [{"@type": "HowToStep", "position": 1, "name": "Choose your cleaner", "text": "Pick a dry cleaner or laundromat near you."}, {"@type": "HowToStep", "position": 2, "name": "Scan your clothes", "text": "Photograph each item; AI identifies it and prices the order."}, {"@type": "HowToStep", "position": 3, "name": "Book a pickup window", "text": "Place the order and choose when the driver comes."}, {"@type": "HowToStep", "position": 4, "name": "Track your driver", "text": "Follow the driver on a live map."}, {"@type": "HowToStep", "position": 5, "name": "Get the ready alert", "text": "Receive a notification when your order is clean."}, {"@type": "HowToStep", "position": 6, "name": "Get it delivered", "text": "Your clothes come back to your door with proof of delivery."}]}, {"@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": "Where is Snapwash available?", "acceptedAnswer": {"@type": "Answer", "text": "Snapwash runs on the US East Coast, with customers, drivers and partner cleaners across New York, New Jersey and Connecticut. Enter your address in the app to see the cleaners that serve your block."}}, {"@type": "Question", "name": "How much does Snapwash cost?", "acceptedAnswer": {"@type": "Answer", "text": "Joining is free. On Pay As You Go you pay your cleaner's price plus a delivery fee on each order. Snapwash Unlimited is $14.99 a month and covers pickup and delivery on every order, with priority queue and member discounts. Cancel anytime."}}, {"@type": "Question", "name": "How does the AI scan work?", "acceptedAnswer": {"@type": "Answer", "text": "Point your camera at each item. Snapwash recognizes the garment type and color, adds it to your bag and prices the order, so there is no form to fill in."}}, {"@type": "Question", "name": "How do I pay?", "acceptedAnswer": {"@type": "Answer", "text": "In the app, with Apple Pay, Google Pay or a card, processed by Stripe. You are charged once per order."}}, {"@type": "Question", "name": "How do I know my clothes arrived?", "acceptedAnswer": {"@type": "Answer", "text": "You can follow your driver on a live map, message your driver or cleaner in the app, and every drop-off comes with proof of delivery."}}]}]};

const FAQ = [
  { id: "faq-1", q: "Where is Snapwash available?", a: "Snapwash runs on the US East Coast, with customers, drivers and partner cleaners across New York, New Jersey and Connecticut. Enter your address in the app to see the cleaners that serve your block." },
  { id: "faq-2", q: "How much does Snapwash cost?", a: "Joining is free. On Pay As You Go you pay your cleaner's price plus a delivery fee on each order. Snapwash Unlimited is $14.99 a month and covers pickup and delivery on every order, with priority queue and member discounts. Cancel anytime." },
  { id: "faq-3", q: "How does the AI scan work?", a: "Point your camera at each item. Snapwash recognizes the garment type and color, adds it to your bag and prices the order, so there is no form to fill in." },
  { id: "faq-4", q: "How do I pay?", a: "In the app, with Apple Pay, Google Pay or a card, processed by Stripe. You are charged once per order." },
  { id: "faq-5", q: "How do I know my clothes arrived?", a: "You can follow your driver on a live map, message your driver or cleaner in the app, and every drop-off comes with proof of delivery." },
];

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader current="index" />
      <main id="main">
        <section className={hero.section} aria-labelledby="h1">
          <div className={cx(wrap, grid12, hero.grid)}>
            <div className={hero.title}>
              <Kicker className="animate-fade-up [--d:.05s] mb-7">Laundry &amp; dry cleaning pickup · NY · NJ · CT</Kicker>
              <h1 id="h1" className={hero.h1}>Fresh clothes. <em className={hero.em}>Zero</em> effort.</h1>
            </div>
            <div className={hero.copy}>
              <p className={cx(hero.lede, "animate-fade-up [--d:.55s]")}>Snapwash connects you with the dry cleaners and laundromats already on your block, then sends a driver to collect your bag and bring it back clean, in the window you pick.</p>
              <div className={cx(hero.ctas, "animate-fade-up [--d:.7s]")} id="download"><StoreButtons /></div>
              <Kicker className="animate-fade-up [--d:.85s]">Free to join · Unlimited delivery $14.99/mo</Kicker>
            </div>
            <div className={hero.aside}>
              <AppTour />
            </div>
          </div>
        </section>

        <DemoVideo />
        <Marquee />
        <HowItWorks />
        <People />
        <ScanDemo />
        <Features />
        <Pricing />

        <Quotes label="Reviews" className="pt-0" items={[
          { text: <>“I haven't been to a laundromat in months. Snapwash picks up <Mark>Monday</Mark>, delivers <Mark>Wednesday</Mark>. It just works.”</>, initial: "J", name: "James M.", role: "Customer · New York" },
          { text: <>“Driving for Snapwash is the most <Mark>flexible</Mark> gig I've had. The app is smooth and payouts are always <Mark>on time</Mark>.”</>, initial: "S", name: "Sarah R.", role: "Driver · New Jersey" },
        ]} />

        <SwitchCards items={[
          { href: "/drive", kicker: "Drive with Snapwash", title: "Earn on your schedule.", avatar: AVATARS.driver },
          { href: "/cleaners", kicker: "For dry cleaners & laundromats", title: "Grow your shop.", avatar: AVATARS.cleaner },
        ]} />

        <Faq id="faq" kicker="FAQ" title="Before you hand over the good shirt." items={FAQ} />
      </main>
      <SiteFooter />
    </>
  );
}
