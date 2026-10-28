import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import StoreButtons from "@/components/StoreButtons";
import { SwitchCards } from "@/components/sections";
import { JsonLd, LocationHero, breadcrumbLd } from "@/components/locations/blocks";
import { CheckIcon, Kicker, Section, cx, grid12, wrap } from "@/components/ui";
import { getAllPaths, getShop, paths } from "@/lib/locations";

type Params = { state: string; city: string; area: string; shop: string };

export async function generateStaticParams() {
  return (await getAllPaths()).filter((p) => p.shop).map((p) => ({ state: p.state, city: p.city!, area: p.area!, shop: p.shop! }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const p = await params;
  const found = await getShop(p.state, p.city, p.area, p.shop);
  if (!found) return {};
  const { state, city, area, shop } = found;
  const title = `${shop.name} | ${area.name}, ${city.name} | Snapwash`;
  const description = `${shop.summary} Services, hours and address for ${shop.name} in ${area.name}. Book pickup and delivery in the Snapwash app.`;
  const url = paths.shop(state, city, area, shop);
  return { title: { absolute: title }, description, alternates: { canonical: url }, openGraph: { url, title, description }, twitter: { title, description } };
}

const CHECKS = [
  "The shop handles your garment type, from silk and wool to leather and bedding.",
  "Snapwash pickup covers your address. The app tells you as soon as you enter it.",
  "The turnaround fits your plans. It shows next to each service before you book.",
  "Anything special is noted on the order: stains, delicate trims, missing buttons or items of value.",
];

const label = "font-body font-medium text-xs leading-[1.2] tracking-kicker uppercase text-muted";

export default async function ShopPage({ params }: { params: Promise<Params> }) {
  const p = await params;
  const found = await getShop(p.state, p.city, p.area, p.shop);
  if (!found) notFound();
  const { state, city, area, shop } = found;

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Laundry service", href: paths.hub() },
    { name: state.name, href: paths.state(state) },
    { name: city.name, href: paths.city(state, city) },
    { name: area.name, href: paths.area(state, city, area) },
    { name: shop.name, href: paths.shop(state, city, area, shop) },
  ];
  const addr = shop.address;
  const tel = shop.phone?.replace(/[^0-9+]/g, "");

  return (
    <>
      <JsonLd graph={[
        {
          "@type": "DryCleaningOrLaundry",
          name: shop.name,
          description: shop.summary,
          url: `https://snapwash.io${paths.shop(state, city, area, shop)}`,
          ...(shop.phone ? { telephone: shop.phone } : {}),
          address: { "@type": "PostalAddress", streetAddress: addr.street, addressLocality: addr.city, addressRegion: addr.region, postalCode: addr.postalCode, addressCountry: "US" },
          areaServed: { "@type": "Place", name: `${area.name}, ${city.name}` },
          hasOfferCatalog: { "@type": "OfferCatalog", name: "Services", itemListElement: shop.services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s } })) },
        },
        breadcrumbLd(crumbs),
      ]} />
      <SiteHeader />
      <main id="main">
        <LocationHero
          crumbs={crumbs}
          kicker={`${area.name}, ${city.name}`}
          title={shop.name}
          lede={shop.summary}
          aside={
            <div className="grid gap-5 p-card-lg rounded-card bg-surface shadow-[0_0_0_1px_var(--line)]">
              <div className="flex items-center gap-4">
                <span className="w-14 h-14 rounded-[16px] grid place-items-center bg-brand text-on-brand font-display font-extrabold text-2xl leading-none flex-none" aria-hidden="true">{shop.name.charAt(0)}</span>
                <div>
                  <p className="font-display font-bold text-lg leading-[1.2] tracking-tight">{shop.name}</p>
                  <p className="text-sm text-muted">{area.district ? `${area.name}, ${area.district}` : area.name}</p>
                </div>
              </div>
              <dl className="grid gap-4 pt-5 border-t border-t-line">
                <div className="grid gap-1">
                  <dt className={label}>Address</dt>
                  <dd><address className="not-italic">{addr.street}<br />{addr.city}, {addr.region} {addr.postalCode}</address></dd>
                </div>
                {shop.phone && (
                  <div className="grid gap-1">
                    <dt className={label}>Phone</dt>
                    <dd><a className="no-underline font-semibold hover:text-brand transition-colors" href={`tel:${tel}`}>{shop.phone}</a></dd>
                  </div>
                )}
                {shop.website && (
                  <div className="grid gap-1">
                    <dt className={label}>Website</dt>
                    <dd><a className="no-underline font-semibold hover:text-brand transition-colors break-all" href={shop.website} target="_blank" rel="noopener">{shop.website.replace(/^https?:\/\//, "")}</a></dd>
                  </div>
                )}
              </dl>
            </div>
          }
        >
          <StoreButtons />
        </LocationHero>

        <Section className="pt-0" aria-labelledby="about-title">
          <div className={cx(wrap, grid12, "gap-y-10")}>
            <div className="col-[1/span_6] grid gap-6 content-start max-lg:col-span-full">
              <Kicker>About the shop</Kicker>
              <h2 id="about-title" className="text-2xl leading-none tracking-display">Neighborhood garment care, booked from your phone.</h2>
              {shop.about.map((t, i) => <p key={i} className="text-muted max-w-[60ch]">{t}</p>)}
              <ul className="flex flex-wrap gap-2" aria-label="Services">
                {shop.services.map((s) => (
                  <li key={s} className="rounded-pill py-2 px-4 bg-wash text-ink font-body font-medium text-sm leading-none">{s}</li>
                ))}
              </ul>
            </div>
            <div className="reveal col-[8/-1] max-lg:col-span-full">
              <h3 className={cx(label, "mb-4")}>Opening hours</h3>
              <table className="w-full border-collapse border-t-[1.5px] border-t-ink">
                <caption className="sr-only">Opening hours for {shop.name}</caption>
                <tbody>
                  {shop.hours.map((h) => (
                    <tr key={h.days} className="border-b border-b-line">
                      <th scope="row" className="py-4 pr-4 text-left font-body font-semibold">{h.days}</th>
                      <td className={cx("py-4 text-right tabular-nums", h.open === "Closed" ? "text-muted" : "text-ink")}>{h.open}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-4 text-sm text-muted">Snapwash pickup windows run on their own schedule, so you can book a pickup even when the counter is closed.</p>
            </div>
          </div>
        </Section>

        <Section className="bg-brand text-white" aria-labelledby="check-title">
          <div className={cx(wrap, grid12, "gap-y-8")}>
            <div className="col-[1/span_5] grid gap-5 content-start max-lg:col-span-full">
              <Kicker tone="onBlueCopy">Before you book</Kicker>
              <h2 id="check-title" className="text-2xl leading-none tracking-display">What to check first.</h2>
              <p className="text-white/88 max-w-[40ch]">A few quick checks make sure {shop.name} is the right fit for this order.</p>
            </div>
            <ul className="reveal col-[7/-1] grid gap-0 border-t border-t-white/30 max-lg:col-span-full">
              {CHECKS.map((c) => (
                <li key={c} className="flex gap-4 py-5 border-b border-b-white/30">
                  <span className="w-8 h-8 rounded-[50%] grid place-items-center bg-white text-blue flex-none"><CheckIcon className="w-4 h-4" /></span>
                  <span className="text-white/92">{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        <div className="pt-section">
          <SwitchCards items={[
            { href: paths.area(state, city, area), kicker: area.name, title: `Back to ${area.name} laundries.` },
            { href: "/cleaners", kicker: "Own a laundry?", title: "List your shop on Snapwash." },
          ]} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
