import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { Faq, SwitchCards } from "@/components/sections";
import { JsonLd, LocationHero, breadcrumbLd } from "@/components/locations/blocks";
import { ArrowIcon, CheckIcon, Kicker, Section, SectionHead, cx, grid12, wrap } from "@/components/site";
import { getAllPaths, getShop, paths } from "@/lib/locations";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
  const fullAddress = `${addr.street}, ${addr.city}, ${addr.region} ${addr.postalCode}`;
  const mapQuery = encodeURIComponent(fullAddress);
  const site = shop.website?.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
  const faq = (shop.faq ?? []).map((f, i) => ({ id: `shfaq-${i + 1}`, ...f }));

  return (
    <>
      <JsonLd graph={[
        {
          "@type": "DryCleaningOrLaundry",
          name: shop.name,
          description: shop.summary,
          url: `https://snapwash.io${paths.shop(state, city, area, shop)}`,
          ...(shop.phone ? { telephone: shop.phone } : {}),
          ...(shop.website ? { sameAs: [shop.website] } : {}),
          ...(shop.payments ? { paymentAccepted: shop.payments.join(", ") } : {}),
          hasMap: `https://www.google.com/maps/search/?api=1&query=${mapQuery}`,
          address: { "@type": "PostalAddress", streetAddress: addr.street, addressLocality: addr.city, addressRegion: addr.region, postalCode: addr.postalCode, addressCountry: "US" },
          areaServed: { "@type": "Place", name: `${area.name}, ${city.name}` },
          hasOfferCatalog: { "@type": "OfferCatalog", name: "Services", itemListElement: shop.services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s } })) },
        },
        breadcrumbLd(crumbs),
        ...(faq.length ? [{ "@type": "FAQPage", mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }] : []),
      ]} />
      <SiteHeader current="locations" />
      <main id="main">
        <LocationHero
          crumbs={crumbs}
          kicker={`${area.name}, ${city.name}`}
          title={shop.name}
          lede={shop.summary}
          aside={
            <Card className="grid gap-5 p-card-lg">
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
                    <dd><a className="no-underline font-semibold hover:text-brand transition-colors break-all" href={shop.website} target="_blank" rel="noopener">{site}</a></dd>
                  </div>
                )}
              </dl>
              <a className="inline-flex items-center gap-2 pt-5 border-t border-t-line no-underline font-semibold text-sm text-brand hover:gap-3 transition-[gap] duration-300 ease-brand"
                href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`} target="_blank" rel="noopener">Get directions <ArrowIcon className="w-4 h-4" /></a>
            </Card>
          }
        >
          <a className={buttonVariants()} href="/#download" data-magnetic>Book pickup in the app <ArrowIcon /></a>
          {shop.website && <a className={buttonVariants({ variant: "outline" })} href={shop.website} target="_blank" rel="noopener" data-magnetic>Visit website</a>}
          {shop.phone && <a className={cn(buttonVariants({ variant: "outline" }), "lg:hidden")} href={`tel:${tel}`}>Call the shop</a>}
        </LocationHero>

        {/* Key facts at a glance */}
        <section aria-label="At a glance" className="pb-[clamp(48px,6vw,88px)]">
          <div className={wrap}>
            <dl className="reveal grid grid-cols-4 border-y border-y-line max-lg:grid-cols-2">
              {[
                { k: "Services", v: `${shop.services.length} offered` },
                { k: "Fastest turnaround", v: shop.menu?.some((m) => m.turnaround === "Next day") ? "Next day" : "2 days" },
                { k: "Pickup & delivery", v: "With Snapwash" },
                { k: "Weekday hours", v: shop.hours[0]?.open.replace(" to ", "–") ?? "See below" },
              ].map((f, i) => (
                <div key={f.k} className={cx("grid gap-2 py-6 pr-4", i > 0 && "lg:pl-6 lg:border-l lg:border-l-line", i % 2 === 1 && "max-lg:pl-4 max-lg:border-l max-lg:border-l-line", i > 1 && "max-lg:border-t max-lg:border-t-line")}>
                  <dt className={label}>{f.k}</dt>
                  <dd className="font-display font-bold text-lg leading-[1.2] tracking-tight">{f.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

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
              <Table className="border-t-[1.5px] border-t-ink">
                <TableCaption>Opening hours for {shop.name}</TableCaption>
                <TableBody>
                  {shop.hours.map((h) => (
                    <TableRow key={h.days}>
                      <TableHead scope="row" className="py-4 pr-4 font-body font-semibold">{h.days}</TableHead>
                      <TableCell className={cx("py-4 text-right tabular-nums", h.open === "Closed" ? "text-muted" : "text-ink")}>{h.open}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <p className="mt-4 text-sm text-muted">Snapwash pickup windows run on their own schedule, so you can book a pickup even when the counter is closed.</p>
            </div>
          </div>
        </Section>

        {shop.menu && (
          <Section className="pt-0" aria-labelledby="menu-title">
            <div className={wrap}>
              <SectionHead kicker="Prices" title="Services and prices." titleId="menu-title">
                Typical prices at {shop.name}. The app prices your exact bag before you book, so the total is never a guess.
              </SectionHead>
              <Table className="reveal text-left border-t-[1.5px] border-t-ink">
                <TableCaption>Services and prices at {shop.name}</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className={cx(label, "py-4 pr-4")}>Service</TableHead>
                    <TableHead className={cx(label, "py-4 pr-4 max-sm:hidden")}>Turnaround</TableHead>
                    <TableHead className={cx(label, "py-4 text-right")}>Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {shop.menu.map((m) => (
                    <TableRow key={m.service}>
                      <TableHead scope="row" className="py-5 pr-4 font-body font-semibold align-middle">
                        {m.service}
                        <span className="sm:hidden block mt-1 font-normal text-sm text-muted">{m.turnaround}</span>
                      </TableHead>
                      <TableCell className="py-5 pr-4 text-muted max-sm:hidden">{m.turnaround}</TableCell>
                      <TableCell className="py-5 text-right font-display font-bold text-lg tracking-tight tabular-nums whitespace-nowrap">{m.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Section>
        )}

        {shop.highlights && (
          <Section className="pt-0" aria-labelledby="why-title">
            <div className={wrap}>
              <SectionHead kicker={`Why ${shop.name.split(" ")[0]}`} title="What regulars come back for." titleId="why-title" />
              <ul className="grid grid-cols-4 gap-tile max-xl:grid-cols-2 max-sm:grid-cols-1">
                {shop.highlights.map((h, i) => (
                  <Card as="li" key={h.title} className="reveal grid gap-3 content-start p-card" style={{ ["--rd" as string]: `${i * 0.08}s` }}>
                    <span className="w-10 h-10 rounded-[50%] grid place-items-center bg-wash text-brand"><CheckIcon className="w-5 h-5" /></span>
                    <h3 className="text-lg leading-[1.2] tracking-tight">{h.title}</h3>
                    <p className="text-muted text-sm">{h.body}</p>
                  </Card>
                ))}
              </ul>
            </div>
          </Section>
        )}

        <Section className="pt-0" aria-labelledby="where-title">
          <div className={cx(wrap, grid12, "gap-y-8 items-stretch")}>
            <div className="col-[1/span_4] grid gap-5 content-start max-lg:col-span-full">
              <Kicker>Location</Kicker>
              <h2 id="where-title" className="text-2xl leading-none tracking-display">Find the shop.</h2>
              <address className="not-italic text-lg leading-[1.5]">{addr.street}<br />{addr.city}, {addr.region} {addr.postalCode}</address>
              <p className="text-muted max-w-[40ch]">On the {area.name}, a short walk from Broadway. With Snapwash you never need to make the trip: a driver collects from your door.</p>
              {shop.payments && (
                <div className="grid gap-2">
                  <p className={label}>Payment</p>
                  <p>{shop.payments.join(" · ")}</p>
                </div>
              )}
              <div className="flex flex-wrap gap-3">
                <a className={buttonVariants({ variant: "outline" })} href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`} target="_blank" rel="noopener">Get directions</a>
                {shop.website && <a className={buttonVariants({ variant: "outline" })} href={shop.website} target="_blank" rel="noopener">{site}</a>}
              </div>
            </div>
            <div className="reveal relative col-[6/-1] min-h-[360px] rounded-card overflow-hidden shadow-[0_0_0_1px_var(--line)] bg-wash max-lg:col-span-full max-lg:min-h-[280px]">
              {/* Shows until the map loads, or if a browser blocks the embed */}
              <a className="absolute inset-0 grid place-items-center content-center gap-3 no-underline text-brand font-semibold" href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`} target="_blank" rel="noopener" tabIndex={-1} aria-hidden="true">
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
                Open in Google Maps
              </a>
              <iframe
                title={`Map showing ${shop.name}`}
                src={`https://maps.google.com/maps?q=${mapQuery}&z=16&output=embed`}
                className="relative w-full h-full min-h-[inherit] border-0 block"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
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
          {faq.length > 0 && <Faq kicker={`${shop.name} FAQ`} title="Questions about this shop." items={faq} />}
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
