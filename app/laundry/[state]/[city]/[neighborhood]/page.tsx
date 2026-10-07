import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocationCloser, LocationFaq, LocationHero, LocationShell, HowItWorks, PlaceLinks, ShopCards, itemListLd, locationMeta, pageLd, shopsMeta } from "@/components/Locations";
import { BASE, getCity, getNeighborhood, getStates, isSampleOnly, serviceSummary, shopPath } from "@/lib/locations";

type Params = { state: string; city: string; neighborhood: string };
export const dynamicParams = false;
export const generateStaticParams = (): Params[] =>
  getStates().flatMap((s) => s.cities.flatMap((c) => c.neighborhoods.map((n) => ({ state: s.slug, city: c.slug, neighborhood: n.slug }))));

function copy({ state, city, neighborhood }: Params) {
  const nb = getNeighborhood(state, city, neighborhood);
  if (!nb) return undefined;
  const code = nb.shops[0].stateCode;
  const services = serviceSummary(nb.shops).map((s) => s.toLowerCase());
  const title = `Laundry Pickup & Delivery in ${nb.name}, ${nb.city} | Snapwash`;
  const description = `${shopsMeta(nb.shops.length)} in ${nb.name}, ${nb.city}, ${code} with pickup and delivery through Snapwash${services.length ? `: ${services.slice(0, 3).join(", ")}` : ""}. Scan your bag and track your driver in the app.`;
  return { nb, code, services, title, description };
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const c = copy(await params);
  if (!c) return {};
  return locationMeta({ title: c.title, description: c.description, path: c.nb.path, noindex: isSampleOnly(c.nb.shops) });
}

export default async function NeighborhoodPage({ params }: { params: Promise<Params> }) {
  const p = await params;
  const c = copy(p);
  if (!c) notFound();
  const { nb, code, services, description } = c;
  const cityPath = `${BASE}/${nb.stateSlug}/${nb.citySlug}`;
  const crumbs = [{ name: "Home", path: "/" }, { name: "Locations", path: BASE }, { name: nb.state, path: `${BASE}/${nb.stateSlug}` }, { name: nb.city, path: cityPath }, { name: nb.name, path: nb.path }];
  const nearby = (getCity(p.state, p.city)?.neighborhoods ?? []).filter((n) => n.slug !== nb.slug).map((n) => ({ name: n.name, path: n.path, meta: shopsMeta(n.shops.length) }));
  return (
    <LocationShell crumbs={crumbs}
      ld={[pageLd(nb.path, `Laundry pickup in ${nb.name}, ${nb.city}`, description), itemListLd(`Cleaners in ${nb.name}`, nb.shops.map((s) => ({ name: s.name, path: shopPath(s) })))]}>
      <LocationHero crumbs={crumbs} sample={isSampleOnly(nb.shops)} kicker={`${nb.city}, ${code} · Laundry & dry cleaning pickup`} title={<>Laundry pickup in <em>{nb.name}</em>.</>}
        lede={`${shopsMeta(nb.shops.length)} in ${nb.name} you can book without leaving home. Pick a cleaner, scan your bag, and choose a pickup window that suits you.`} />
      <ShopCards id="shops-title" kicker={`Cleaners in ${nb.name}`} title={`Cleaners in ${nb.name}.`} intro={services.length ? `Between them: ${services.join(", ")}.` : `Dry cleaners and laundromats in ${nb.name}.`} shops={nb.shops} />
      <HowItWorks where={nb.name} />
      {nearby.length > 0 && <PlaceLinks id="nearby-title" kicker={`More of ${nb.city}`} title={`Nearby neighborhoods.`} intro={`Other parts of ${nb.city} with cleaners on Snapwash.`} items={nearby} />}
      <LocationFaq items={[
        { q: `Does Snapwash pick up in ${nb.name}?`, a: `Yes. Snapwash drivers collect from addresses in ${nb.name} and deliver to ${nb.shops.length === 1 ? nb.shops[0].name : `the ${shopsMeta(nb.shops.length)} listed here`}.` },
        { q: `What can I get cleaned in ${nb.name}?`, a: services.length ? `Cleaners in ${nb.name} offer ${services.join(", ")}.` : "Each cleaner's page lists exactly what they do." },
        { q: "How much does pickup and delivery cost?", a: "Joining is free. You pay your cleaner's price plus a delivery fee per order, or Snapwash Unlimited at $14.99 a month covers delivery on every order." },
      ]} />
      <LocationCloser where={nb.name} />
    </LocationShell>
  );
}
