import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import StoreButtons from "@/components/StoreButtons";
import { Faq, SwitchCards } from "@/components/sections";
import { Directory, FactCard, JsonLd, LocalCopy, LocationHero, Steps, breadcrumbLd } from "@/components/locations/blocks";
import { DirectoryTable } from "@/components/locations/DirectoryTable";
import { getStates, paths } from "@/lib/locations";

const description = "Find laundry and dry cleaning pickup and delivery near you. Browse Snapwash by state, city and neighborhood, then book a local cleaner in the app.";

export const metadata: Metadata = {
  title: { absolute: "Laundry Service Near You | Pickup & Delivery Locations | Snapwash" },
  description,
  alternates: { canonical: paths.hub() },
  openGraph: { url: paths.hub(), title: "Snapwash laundry service locations", description },
  twitter: { title: "Snapwash laundry service locations", description },
};

const FAQ = [
  { id: "lfaq-1", q: "Where does Snapwash pick up laundry?", a: "Snapwash runs across New York, New Jersey and Connecticut today. Open a state above to see the cities and neighborhoods with local cleaners you can book in the app." },
  { id: "lfaq-2", q: "Is my state on the list?", a: "Every state is in the table so you can check quickly. If yours says coming soon, download the app and enter your address: we let you know as soon as a cleaner near you joins." },
  { id: "lfaq-3", q: "Do I have to use the cleaner closest to me?", a: "No. The app shows every partner cleaner that serves your address, with services, prices and turnaround, and you choose the one you like." },
];

export default async function LaundryServiceHub() {
  const states = await getStates();
  const crumbs = [{ name: "Home", href: "/" }, { name: "Laundry service", href: paths.hub() }];
  const order = (s: (typeof states)[number]) => (s.listed ? 0 : s.status === "live" ? 1 : 2);
  const rows = [...states]
    .sort((a, b) => order(a) - order(b) || a.name.localeCompare(b.name))
    .map((s) => ({
      id: s.code,
      name: s.name,
      href: s.listed ? paths.state(s) : undefined,
      status: s.status === "live" ? "Coming soon" : "Planned",
      cells: [s.code.toUpperCase(), s.listed ? `${s.cities.filter((c) => c.listed).length} city guide${s.cities.filter((c) => c.listed).length === 1 ? "" : "s"}` : "None yet"],
    }));
  const live = states.filter((s) => s.status === "live").length;

  return (
    <>
      <JsonLd graph={[
        { "@type": "CollectionPage", name: "Snapwash laundry service locations", url: `https://snapwash.io${paths.hub()}`, description },
        breadcrumbLd(crumbs),
      ]} />
      <SiteHeader current="locations" />
      <main id="main">
        <LocationHero
          crumbs={crumbs}
          kicker="Laundry service locations"
          title="Laundry pickup,"
          accent="near you."
          lede="Find the cleaners Snapwash works with in your state, city and neighborhood. Every guide lists local shops, the services they offer and how pickup works on your block."
          aside={<FactCard title="Snapwash today" facts={[
            { value: live, label: "States with pickup" },
            { value: states.filter((s) => s.listed).length, label: "State guides" },
            { value: "NY", label: "Where we started" },
          ]} />}
        >
          <StoreButtons />
        </LocationHero>

        <Directory kicker="Browse by state" title="Pick your state." intro="Search for a state or page through the list. States marked coming soon are next on the map.">
          <DirectoryTable caption="States" columns={["State", "Code", "Guides"]} rows={rows} searchable searchLabel="Search states" />
        </Directory>

        <Steps place="your neighborhood" />

        <LocalCopy kicker="Why local" title="Your cleaner, without the trip." blocks={[
          { h: "Neighborhood shops, not a warehouse", p: "Snapwash doesn't run a central plant. Your clothes go to a dry cleaner or laundromat near you, the kind of shop that has looked after the block for years, and a driver handles the back and forth." },
          { h: "Prices before pickup", p: "Scan your items and the app prices the bag before you book. Wash and fold is charged by the pound and dry cleaning by the piece, at the cleaner's own rates." },
          { h: "New places every month", p: "We add a city when enough local cleaners join to give you a real choice. Each new guide shows up here, sorted by state." },
        ]} />

        <Faq kicker="Locations FAQ" title="Before you book." items={FAQ} />

        <SwitchCards items={[
          { href: "/cleaners", kicker: "Own a laundry?", title: "List your shop on Snapwash." },
          { href: "/drive", kicker: "Drive with Snapwash", title: "Earn on your schedule." },
        ]} />
      </main>
      <SiteFooter />
    </>
  );
}
