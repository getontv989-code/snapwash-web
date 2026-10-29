import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import StoreButtons from "@/components/StoreButtons";
import { Faq, SwitchCards } from "@/components/sections";
import { Directory, FactCard, JsonLd, LocalCopy, LocationHero, Steps, breadcrumbLd } from "@/components/locations/blocks";
import { DirectoryTable } from "@/components/locations/DirectoryTable";
import { countShops, getAllPaths, getCity, paths } from "@/lib/locations";

type Params = { state: string; city: string };

export async function generateStaticParams() {
  return (await getAllPaths()).filter((p) => p.city && !p.area).map((p) => ({ state: p.state, city: p.city! }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const p = await params;
  const found = await getCity(p.state, p.city);
  if (!found) return {};
  const { state, city } = found;
  const title = `Laundry Pickup & Delivery in ${city.name}, ${state.code.toUpperCase()} | Snapwash`;
  const description = `Laundry and dry cleaning pickup and delivery in ${city.name}. Browse neighborhoods, compare local cleaners and book a driver in the Snapwash app.`;
  const url = paths.city(state, city);
  return { title: { absolute: title }, description, alternates: { canonical: url }, openGraph: { url, title, description }, twitter: { title, description } };
}

export default async function CityPage({ params }: { params: Promise<Params> }) {
  const p = await params;
  const found = await getCity(p.state, p.city);
  if (!found) notFound();
  const { state, city } = found;

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Laundry service", href: paths.hub() },
    { name: state.name, href: paths.state(state) },
    { name: city.name, href: paths.city(state, city) },
  ];
  const listed = city.areas.filter((a) => a.listed);
  const districts = new Set(city.areas.map((a) => a.district).filter(Boolean));
  const rows = [...city.areas]
    .sort((a, b) => Number(b.listed) - Number(a.listed) || a.name.localeCompare(b.name))
    .map((a) => ({
      id: a.slug,
      name: a.name,
      href: a.listed ? paths.area(state, city, a) : undefined,
      cells: [a.district ?? "", a.listed ? `${a.shops.length} shop${a.shops.length === 1 ? "" : "s"}` : "None yet"],
    }));

  const faq = [
    { id: "cfaq-1", q: `Which ${city.name} neighborhoods does Snapwash cover?`, a: `You can browse ${city.areas.length} ${city.name} neighborhoods above, and new local cleaners join every month. The quickest check is to enter your address in the app.` },
    { id: "cfaq-2", q: "How fast is pickup?", a: "You choose a pickup window when you book, often the same day. Turnaround depends on the cleaner and the service, and the app shows it before you confirm." },
    { id: "cfaq-3", q: "Can I use the cleaner I already go to?", a: "If your usual shop is on Snapwash, yes. Pick it in the app and a driver takes your bag there. If it isn't yet, let them know they can list their shop for free." },
  ];

  return (
    <>
      <JsonLd graph={[
        { "@type": "Service", name: `Laundry pickup and delivery in ${city.name}`, serviceType: "Laundry and dry cleaning pickup and delivery", provider: { "@id": "https://snapwash.io/#org" }, areaServed: { "@type": "City", name: city.name, containedInPlace: { "@type": "State", name: state.name } } },
        breadcrumbLd(crumbs),
        { "@type": "FAQPage", mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
      ]} />
      <SiteHeader current="locations" />
      <main id="main">
        <LocationHero
          crumbs={crumbs}
          kicker="City guide"
          title={`Laundry pickup and delivery in`}
          accent={`${city.name}.`}
          lede={city.intro ?? `Find local cleaners across ${city.name} and book pickup in the app.`}
          aside={<FactCard title={`Snapwash in ${city.name}`} facts={[
            { value: city.areas.length, label: "Neighborhoods" },
            { value: districts.size, label: city.slug === "new-york-city" ? "Boroughs" : "Districts" },
            { value: countShops(city), label: "Shops listed" },
          ]} />}
        >
          <StoreButtons />
        </LocationHero>

        <Directory kicker="Neighborhood directory" title={`${city.areas.length} ${city.name} neighborhoods.`} intro="Choose a neighborhood to see the local cleaners there. Search by name or borough.">
          <DirectoryTable caption={`${city.name} neighborhoods`} columns={["Neighborhood", city.slug === "new-york-city" ? "Borough" : "District", "Shops"]} rows={rows} searchable searchLabel="Search neighborhoods" />
        </Directory>

        <Steps place={city.name} />

        <LocalCopy kicker={`Laundry service in ${city.name}`} title="A simpler way to handle laundry and dry cleaning." blocks={[
          { h: `Choosing a local cleaner in ${city.name}`, p: `Every neighborhood has its own shops, and they don't all do the same things. Some specialize in shirts and suits, others in wash and fold or bulky bedding. The guides below list what each ${city.name} cleaner offers so you can pick the right one for the job.` },
          { h: "From a photo to your closet", p: "Scan your clothes in the app, choose a cleaner and a pickup window, and a driver collects the bag from your door. You can follow it to the shop and back, and you get a photo when it is delivered." },
          { h: "What to expect", p: `Availability, prices and pickup areas vary by shop. Listings show ${listed.length ? "the details each cleaner has confirmed" : "details as cleaners confirm them"}, and the app always shows the final price before you book.` },
        ]} />

        <Faq kicker={`${city.name} FAQ`} title="Common questions." items={faq} />

        <SwitchCards items={[
          { href: paths.state(state), kicker: state.name, title: `More cities in ${state.name}.` },
          { href: "/cleaners", kicker: "Own a laundry?", title: "List your shop on Snapwash." },
        ]} />
      </main>
      <SiteFooter />
    </>
  );
}
