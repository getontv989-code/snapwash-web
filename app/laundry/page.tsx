import type { Metadata } from "next";
import { LocationCloser, LocationFaq, LocationHero, LocationShell, HowItWorks, PlaceLinks, itemListLd, locationMeta, pageLd, shopsMeta } from "@/components/Locations";
import { BASE, getAllShops, getStates, isSampleOnly, plural } from "@/lib/locations";

const title = "Laundry & Dry Cleaning Pickup and Delivery Near You | Snapwash";
const description = "Find dry cleaners and laundromats near you with pickup and delivery through Snapwash. Browse by state, city and neighborhood across New York, New Jersey and Connecticut.";

export function generateMetadata(): Metadata {
  return locationMeta({ title, description, path: BASE, noindex: isSampleOnly(getAllShops()) });
}

export default function LaundryIndex() {
  const states = getStates();
  const crumbs = [{ name: "Home", path: "/" }, { name: "Locations", path: BASE }];
  const items = states.map((s) => ({ name: s.name, path: s.path, meta: `${plural(s.cities.length, "city", "cities")} · ${shopsMeta(s.shops.length)}` }));
  return (
    <LocationShell crumbs={crumbs} ld={[pageLd(BASE, "Snapwash locations", description), itemListLd("States", items)]}>
      <LocationHero crumbs={crumbs} sample={isSampleOnly(getAllShops())} kicker="Locations" title={<>Laundry pickup, <em>near</em> you.</>}
        lede="Snapwash picks up from your door and drops off at the dry cleaners and laundromats in your neighborhood. Find yours by state, city and neighborhood." />
      <PlaceLinks id="states-title" kicker="Browse by state" title="Where Snapwash picks up." intro="Choose a state to see the cities and neighborhoods we serve." items={items} />
      <HowItWorks where="your neighborhood" />
      <LocationFaq items={[
        { q: "Where is Snapwash available?", a: `Snapwash currently lists cleaners in ${states.map((s) => s.name).join(", ").replace(/, ([^,]*)$/, " and $1")}. New neighborhoods are added as cleaners join.` },
        { q: "How much does pickup and delivery cost?", a: "Joining is free. You pay your cleaner's price plus a delivery fee per order, or Snapwash Unlimited at $14.99 a month covers delivery on every order." },
      ]} />
      <LocationCloser where="your neighborhood" />
    </LocationShell>
  );
}
