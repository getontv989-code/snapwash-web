import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocationCloser, LocationFaq, LocationHero, LocationShell, HowItWorks, PlaceLinks, ShopCards, itemListLd, locationMeta, pageLd, shopsMeta } from "@/components/Locations";
import { BASE, getCity, getStates, isSampleOnly, plural, serviceSummary, shopPath } from "@/lib/locations";

type Params = { state: string; city: string };
export const dynamicParams = false;
export const generateStaticParams = (): Params[] => getStates().flatMap((s) => s.cities.map((c) => ({ state: s.slug, city: c.slug })));

function copy({ state, city }: Params) {
  const ci = getCity(state, city);
  if (!ci) return undefined;
  const code = ci.shops[0].stateCode;
  const title = `Laundry & Dry Cleaning Pickup in ${ci.name}, ${code} | Snapwash`;
  const nbs = ci.neighborhoods.map((n) => n.name);
  const description = `Laundry and dry cleaning pickup and delivery in ${ci.name}, ${ci.state}. ${shopsMeta(ci.shops.length)} in ${nbs.slice(0, 3).join(", ")}${nbs.length > 3 ? " and more" : ""}, booked and tracked in the Snapwash app.`;
  return { ci, code, title, description };
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const c = copy(await params);
  if (!c) return {};
  return locationMeta({ title: c.title, description: c.description, path: c.ci.path, noindex: isSampleOnly(c.ci.shops) });
}

export default async function CityPage({ params }: { params: Promise<Params> }) {
  const c = copy(await params);
  if (!c) notFound();
  const { ci, code, description } = c;
  const crumbs = [{ name: "Home", path: "/" }, { name: "Locations", path: BASE }, { name: ci.state, path: `${BASE}/${ci.stateSlug}` }, { name: ci.name, path: ci.path }];
  const items = ci.neighborhoods.map((n) => ({ name: n.name, path: n.path, meta: shopsMeta(n.shops.length) }));
  const services = serviceSummary(ci.shops).slice(0, 4).map((s) => s.toLowerCase());
  return (
    <LocationShell crumbs={crumbs}
      ld={[pageLd(ci.path, `Laundry pickup in ${ci.name}, ${code}`, description), itemListLd(`Neighborhoods in ${ci.name}`, items), itemListLd(`Cleaners in ${ci.name}`, ci.shops.map((s) => ({ name: s.name, path: shopPath(s) })))]}>
      <LocationHero crumbs={crumbs} sample={isSampleOnly(ci.shops)} kicker={`Laundry & dry cleaning pickup · ${ci.name}, ${code}`} title={<>Laundry pickup in <em>{ci.name}</em>.</>}
        lede={`Choose from ${shopsMeta(ci.shops.length)} in ${plural(ci.neighborhoods.length, "neighborhood")} across ${ci.name}. Snapwash collects your bag, takes it to the cleaner you picked, and brings it back.`} />
      <PlaceLinks id="nb-title" kicker={`Neighborhoods in ${ci.name}`} title={`Find your neighborhood.`} intro={`Pick the part of ${ci.name} you live in to see the cleaners closest to you.`} items={items} />
      <ShopCards id="shops-title" kicker={`Cleaners in ${ci.name}`} title={`Every cleaner in ${ci.name}.`} intro="Dry cleaners and laundromats you can book for pickup and delivery." shops={ci.shops} showPlace />
      <HowItWorks where={ci.name} />
      <LocationFaq items={[
        { q: `Which neighborhoods in ${ci.name} does Snapwash serve?`, a: `Snapwash lists cleaners in ${ci.neighborhoods.map((n) => n.name).join(", ")}.` },
        { q: `What can I get cleaned in ${ci.name}?`, a: services.length ? `Cleaners in ${ci.name} offer ${services.join(", ")}.` : "Each cleaner's page lists exactly what they do." },
        { q: "How much does pickup and delivery cost?", a: "Joining is free. You pay your cleaner's price plus a delivery fee per order, or Snapwash Unlimited at $14.99 a month covers delivery on every order." },
      ]} />
      <LocationCloser where={ci.name} />
    </LocationShell>
  );
}
