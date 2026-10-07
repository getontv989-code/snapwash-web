import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocationCloser, LocationFaq, LocationHero, LocationShell, HowItWorks, PlaceLinks, itemListLd, locationMeta, pageLd, shopsMeta } from "@/components/Locations";
import { BASE, getState, getStates, isSampleOnly, plural, serviceSummary } from "@/lib/locations";

type Params = { state: string };
export const dynamicParams = false;
export const generateStaticParams = (): Params[] => getStates().map((s) => ({ state: s.slug }));

function copy(state: string) {
  const st = getState(state);
  if (!st) return undefined;
  const title = `Laundry & Dry Cleaning Pickup and Delivery in ${st.name} | Snapwash`;
  const cities = st.cities.map((c) => c.name);
  const description = `Dry cleaning and laundry pickup and delivery in ${st.name} from ${shopsMeta(st.shops.length)} in ${cities.slice(0, 4).join(", ")}${cities.length > 4 ? " and more" : ""}. Book in the Snapwash app.`;
  return { st, title, description };
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const c = copy((await params).state);
  if (!c) return {};
  return locationMeta({ title: c.title, description: c.description, path: c.st.path, noindex: isSampleOnly(c.st.shops) });
}

export default async function StatePage({ params }: { params: Promise<Params> }) {
  const c = copy((await params).state);
  if (!c) notFound();
  const { st, description } = c;
  const crumbs = [{ name: "Home", path: "/" }, { name: "Locations", path: BASE }, { name: st.name, path: st.path }];
  const items = st.cities.map((ci) => ({ name: ci.name, path: ci.path, meta: `${plural(ci.neighborhoods.length, "neighborhood")} · ${shopsMeta(ci.shops.length)}` }));
  const services = serviceSummary(st.shops).slice(0, 4).map((s) => s.toLowerCase());
  return (
    <LocationShell crumbs={crumbs} ld={[pageLd(st.path, `Laundry pickup in ${st.name}`, description), itemListLd(`Cities in ${st.name}`, items)]}>
      <LocationHero crumbs={crumbs} sample={isSampleOnly(st.shops)} kicker={`Laundry & dry cleaning pickup · ${st.code}`} title={<>Laundry pickup in <em>{st.name}</em>.</>}
        lede={`Snapwash works with ${shopsMeta(st.shops.length)} across ${plural(st.cities.length, "city", "cities")} in ${st.name}. Pick one, scan your bag, and a driver handles the trip both ways.`} />
      <PlaceLinks id="cities-title" kicker={`Cities in ${st.name}`} title={`Choose your city in ${st.name}.`} intro={`Every city page lists its neighborhoods and the cleaners that serve them.`} items={items} />
      <HowItWorks where={st.name} />
      <LocationFaq items={[
        { q: `Which cities in ${st.name} does Snapwash cover?`, a: `Snapwash lists cleaners in ${st.cities.map((ci) => ci.name).join(", ")}, with more added as cleaners join.` },
        { q: `What services can I order in ${st.name}?`, a: services.length ? `Cleaners here offer ${services.join(", ")}. Each cleaner's page lists exactly what they do.` : "Each cleaner's page lists exactly what they do." },
        { q: "How much does pickup and delivery cost?", a: "Joining is free. You pay your cleaner's price plus a delivery fee per order, or Snapwash Unlimited at $14.99 a month covers delivery on every order." },
      ]} />
      <LocationCloser where={st.name} />
    </LocationShell>
  );
}
