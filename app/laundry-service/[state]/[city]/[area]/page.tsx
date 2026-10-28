import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import StoreButtons from "@/components/StoreButtons";
import { Faq, SwitchCards } from "@/components/sections";
import { Directory, FactCard, JsonLd, LocalCopy, LocationHero, Steps, breadcrumbLd } from "@/components/locations/blocks";
import { DirectoryTable } from "@/components/locations/DirectoryTable";
import { getAllPaths, getArea, paths } from "@/lib/locations";

type Params = { state: string; city: string; area: string };

export async function generateStaticParams() {
  return (await getAllPaths()).filter((p) => p.area && !p.shop).map((p) => ({ state: p.state, city: p.city!, area: p.area! }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const p = await params;
  const found = await getArea(p.state, p.city, p.area);
  if (!found) return {};
  const { state, city, area } = found;
  const title = `Laundry Service in ${area.name}, ${city.name} | Pickup & Delivery | Snapwash`;
  const description = `Compare laundries and dry cleaners in ${area.name}, ${city.name}. See services and hours, then book pickup and delivery in the Snapwash app.`;
  const url = paths.area(state, city, area);
  return { title: { absolute: title }, description, alternates: { canonical: url }, openGraph: { url, title, description }, twitter: { title, description } };
}

export default async function AreaPage({ params }: { params: Promise<Params> }) {
  const p = await params;
  const found = await getArea(p.state, p.city, p.area);
  if (!found) notFound();
  const { state, city, area } = found;

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Laundry service", href: paths.hub() },
    { name: state.name, href: paths.state(state) },
    { name: city.name, href: paths.city(state, city) },
    { name: area.name, href: paths.area(state, city, area) },
  ];
  const rows = [...area.shops]
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((s) => ({
      id: s.slug,
      name: s.name,
      href: paths.shop(state, city, area, s),
      cells: [s.services.slice(0, 3).join(", "), s.address.street],
    }));
  const services = new Set(area.shops.flatMap((s) => s.services));

  const faq = [
    { id: "afaq-1", q: `Can I compare ${area.name} laundries here?`, a: `Yes. The table above lists the ${area.name} cleaners on Snapwash with the services each one offers. Open a shop to see its hours, address and full service list.` },
    { id: "afaq-2", q: "Do these laundries offer pickup and delivery?", a: "Through Snapwash, yes. You book in the app, a Snapwash driver collects your bag and takes it to the shop you chose, then brings it back when it's ready." },
    { id: "afaq-3", q: `How do I book a cleaner in ${area.name}?`, a: "Download the app, enter your address and scan your clothes. Pick a shop from the list, choose a pickup window and pay in the app." },
  ];

  return (
    <>
      <JsonLd graph={[
        { "@type": "ItemList", name: `Laundries in ${area.name}, ${city.name}`, itemListElement: area.shops.map((s, i) => ({ "@type": "ListItem", position: i + 1, name: s.name, url: `https://snapwash.io${paths.shop(state, city, area, s)}` })) },
        breadcrumbLd(crumbs),
        { "@type": "FAQPage", mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
      ]} />
      <SiteHeader />
      <main id="main">
        <LocationHero
          crumbs={crumbs}
          kicker={`${area.district ? `${area.district} · ` : ""}${city.name}`}
          title={`Laundry service in ${area.name},`}
          accent="picked up and delivered."
          lede={area.intro ?? `Find the local cleaners in ${area.name} and book pickup in the app.`}
          aside={<FactCard title={area.name} facts={[
            { value: area.shops.length, label: "Shops listed" },
            { value: services.size, label: "Services offered" },
            { value: area.district ?? city.name, label: city.slug === "new-york-city" ? "Borough" : "District" },
          ]} />}
        >
          <StoreButtons />
        </LocationHero>

        <Directory kicker="Shop directory" title={`Laundries in ${area.name}.`} intro="Open a shop to see its services, hours and address, then book it in the app.">
          <DirectoryTable caption={`Laundries in ${area.name}`} columns={["Shop", "Services", "Address"]} rows={rows} searchLabel="Search shops or services" />
        </Directory>

        <Steps place={area.name} />

        <LocalCopy kicker={`Laundry service in ${area.name}`} title="Local garment care, without another trip." blocks={[
          { h: `Finding a laundry in ${area.name}`, p: `Start with what you need cleaned. Shirts and suits want a dry cleaner with a good press, a week of towels and gym clothes wants wash and fold, and a down comforter needs a shop with large machines. The ${area.name} listings show which shop does what.` },
          { h: "Clear information before pickup", p: "Each shop page lists its services, hours and address. In the app you also see the price for your exact bag and the turnaround before you book, so nothing is a surprise at the door." },
        ]} />

        <Faq kicker={`${area.name} FAQ`} title={`${area.name} laundry questions.`} items={faq} />

        <SwitchCards items={[
          { href: paths.city(state, city), kicker: city.name, title: `More ${city.name} neighborhoods.` },
          { href: "/cleaners", kicker: "Own a laundry?", title: "List your shop on Snapwash." },
        ]} />
      </main>
      <SiteFooter />
    </>
  );
}
