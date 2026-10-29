import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import StoreButtons from "@/components/StoreButtons";
import { Faq, SwitchCards } from "@/components/sections";
import { Directory, FactCard, JsonLd, LocalCopy, LocationHero, Steps, breadcrumbLd } from "@/components/locations/blocks";
import { DirectoryTable } from "@/components/locations/DirectoryTable";
import { countShops, getAllPaths, getState, paths } from "@/lib/locations";

type Params = { state: string };

export async function generateStaticParams() {
  return (await getAllPaths()).filter((p) => !p.city).map((p) => ({ state: p.state }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const state = await getState((await params).state);
  if (!state) return {};
  const title = `Laundry Service in ${state.name} | Pickup & Delivery | Snapwash`;
  const description = `Laundry and dry cleaning pickup and delivery in ${state.name}. Browse Snapwash by city, compare local cleaners and book in the app.`;
  const url = paths.state(state);
  return { title: { absolute: title }, description, alternates: { canonical: url }, openGraph: { url, title, description }, twitter: { title, description } };
}

export default async function StatePage({ params }: { params: Promise<Params> }) {
  const state = await getState((await params).state);
  if (!state) notFound();

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Laundry service", href: paths.hub() },
    { name: state.name, href: paths.state(state) },
  ];
  const listed = state.cities.filter((c) => c.listed);
  const rows = [...state.cities]
    .sort((a, b) => Number(b.listed) - Number(a.listed) || a.name.localeCompare(b.name))
    .map((c) => ({
      id: c.slug,
      name: c.name,
      href: c.listed ? paths.city(state, c) : undefined,
      cells: [c.region ?? "", c.listed ? `${c.areas.filter((a) => a.listed).length} neighborhood guide${c.areas.filter((a) => a.listed).length === 1 ? "" : "s"}` : "None yet"],
    }));

  const faq = [
    { id: "sfaq-1", q: `Where in ${state.name} does Snapwash pick up?`, a: `Snapwash is live in ${listed.map((c) => c.name).join(", ")}, with more of ${state.name} on the way. Enter your address in the app to see the cleaners that serve your block.` },
    { id: "sfaq-2", q: `What does laundry service cost in ${state.name}?`, a: "Each cleaner sets its own prices. Wash and fold is charged by the pound and dry cleaning by the piece, and you see the full price in the app before you book. Snapwash Unlimited covers delivery on every order for $14.99 a month." },
    { id: "sfaq-3", q: "Which services can I book?", a: "Wash and fold, dry cleaning, pressing, shirt care, alterations and household items such as comforters and duvets, depending on the cleaner you choose." },
  ];

  return (
    <>
      <JsonLd graph={[
        { "@type": "Service", name: `Laundry pickup and delivery in ${state.name}`, serviceType: "Laundry and dry cleaning pickup and delivery", provider: { "@id": "https://snapwash.io/#org" }, areaServed: { "@type": "State", name: state.name } },
        breadcrumbLd(crumbs),
        { "@type": "FAQPage", mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
      ]} />
      <SiteHeader />
      <main id="main">
        <LocationHero
          crumbs={crumbs}
          kicker="State guide"
          title={`Laundry service in ${state.name},`}
          accent="picked up and delivered."
          lede={state.intro ?? `Find local cleaners across ${state.name} and book pickup in the app.`}
          aside={<FactCard title={`Snapwash in ${state.name}`} facts={[
            { value: listed.length, label: "Cities live" },
            { value: listed.reduce((n, c) => n + c.areas.filter((a) => a.listed).length, 0), label: "Neighborhood guides" },
            { value: listed.reduce((n, c) => n + countShops(c), 0), label: "Shops listed" },
          ]} />}
        >
          <StoreButtons />
        </LocationHero>

        <Directory kicker="Laundry service by city" title={`Cities in ${state.name}.`} intro="Open a city to see its neighborhoods and the local cleaners in each one.">
          <DirectoryTable caption={`Cities in ${state.name}`} columns={["City", "Region", "Guides"]} rows={rows} searchLabel="Search cities" />
        </Directory>

        <Steps place={state.name} />

        <LocalCopy kicker={`Laundry service in ${state.name}`} title="Laundry and dry cleaning, without the trip." blocks={[
          { h: `Where Snapwash picks up in ${state.name}`, p: `Pickup is live in ${listed.map((c) => c.name).join(" and ")}. ${state.cities.filter((c) => !c.listed).map((c) => c.name).join(", ")} are next, and each gets its own guide here when local cleaners join.` },
          { h: `What laundry service costs in ${state.name}`, p: "Wash and fold is priced by the pound and dry cleaning by the item, at the cleaner's own rates. You see the exact total in the app before you confirm, with delivery included on Snapwash Unlimited." },
          { h: "Services you can book", p: "Wash and fold, dry cleaning, pressing and shirt care, alterations, and bulky household items like comforters, duvets and bedding." },
        ]} />

        <Faq kicker={`${state.name} FAQ`} title="Common questions." items={faq} />

        <SwitchCards items={[
          { href: paths.hub(), kicker: "All locations", title: "Browse every state." },
          { href: "/cleaners", kicker: "Own a laundry?", title: "List your shop on Snapwash." },
        ]} />
      </main>
      <SiteFooter />
    </>
  );
}
