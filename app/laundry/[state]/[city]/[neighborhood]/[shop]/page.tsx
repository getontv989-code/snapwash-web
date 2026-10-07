import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocationCloser, LocationFaq, LocationHero, LocationShell, HowItWorks, ShopCards, locationMeta } from "@/components/Locations";
import { BASE, getAllShops, getNeighborhood, getShop, prettyHours, shopLd } from "@/lib/locations";

type Params = { state: string; city: string; neighborhood: string; shop: string };
export const dynamicParams = false;
export const generateStaticParams = (): Params[] =>
  getAllShops().map((s) => ({ state: s.stateSlug, city: s.citySlug, neighborhood: s.neighborhoodSlug, shop: s.slug }));

function copy(p: Params) {
  const s = getShop(p.state, p.city, p.neighborhood, p.shop);
  if (!s) return undefined;
  const path = `${BASE}/${p.state}/${p.city}/${p.neighborhood}/${p.shop}`;
  const kind = s.services.some((v) => /dry/i.test(v)) ? "Dry Cleaning & Laundry" : "Laundry";
  const title = `${s.name}: ${kind} Pickup in ${s.neighborhood}, ${s.city} | Snapwash`;
  const services = s.services.map((v) => v.toLowerCase());
  const description = `Order ${services.length ? services.slice(0, 3).join(", ") : "laundry and dry cleaning"} from ${s.name} in ${s.neighborhood}, ${s.city}, ${s.stateCode} with pickup and delivery through Snapwash.`;
  return { s, path, title, description, services };
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const c = copy(await params);
  if (!c) return {};
  return locationMeta({ title: c.title, description: c.description, path: c.path, noindex: c.s.sample });
}

export default async function ShopPage({ params }: { params: Promise<Params> }) {
  const p = await params;
  const c = copy(p);
  if (!c) notFound();
  const { s, path, services } = c;
  const nb = getNeighborhood(p.state, p.city, p.neighborhood)!;
  const crumbs = [
    { name: "Home", path: "/" }, { name: "Locations", path: BASE },
    { name: s.state, path: `${BASE}/${s.stateSlug}` }, { name: s.city, path: `${BASE}/${s.stateSlug}/${s.citySlug}` },
    { name: s.neighborhood, path: nb.path }, { name: s.name, path },
  ];
  const others = nb.shops.filter((o) => o !== s);
  const fullAddress = [s.address, `${s.city}, ${s.stateCode} ${s.zip}`.trim()].filter(Boolean).join(", ");
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${s.name} ${fullAddress}`)}`;
  return (
    <LocationShell crumbs={crumbs} ld={[shopLd(s)]}>
      <LocationHero crumbs={crumbs} sample={s.sample} kicker={`${s.neighborhood} · ${s.city}, ${s.stateCode}`} title={<>{s.name}</>}
        lede={`Get ${services.length ? services.slice(0, 3).join(", ") : "laundry and dry cleaning"} from ${s.name} picked up and delivered with Snapwash. Scan your bag in the app and a driver takes it to ${s.neighborhood} and back.`} />
      <section className="section shop-facts" aria-labelledby="facts-title" style={{ paddingTop: "0" } as CSSProperties}>
        <div className="wrap grid">
          <h2 id="facts-title" className="sr-only">About {s.name}</h2>
          <dl className="facts reveal">
            {fullAddress && <div><dt>Address</dt><dd><a href={mapUrl} target="_blank" rel="noopener">{fullAddress}</a></dd></div>}
            {s.phone && <div><dt>Phone</dt><dd><a href={`tel:${s.phone.replace(/[^\d+]/g, "")}`}>{s.phone}</a></dd></div>}
            {s.hours.length > 0 && <div><dt>Hours</dt><dd><ul>{s.hours.map((h) => <li key={h}>{prettyHours(h)}</li>)}</ul></dd></div>}
            {s.services.length > 0 && <div><dt>Services</dt><dd><span className="tags">{s.services.map((v) => <span key={v}>{v}</span>)}</span></dd></div>}
          </dl>
          {s.description && <p className="about reveal">{s.description}</p>}
        </div>
      </section>
      <HowItWorks where={s.neighborhood} />
      {others.length > 0 && <ShopCards id="others-title" kicker={`More in ${s.neighborhood}`} title={`Other cleaners in ${s.neighborhood}.`} intro={`Compare ${s.name} with the rest of ${s.neighborhood}.`} shops={others} />}
      <LocationFaq items={[
        { q: `Does ${s.name} offer pickup and delivery?`, a: `Yes, through Snapwash. Choose ${s.name} in the app, scan your items and pick a window. A Snapwash driver handles both trips.` },
        { q: `What services does ${s.name} offer?`, a: services.length ? `${s.name} offers ${services.join(", ")}.` : `Open ${s.name} in the Snapwash app to see its services and prices.` },
        { q: `Where is ${s.name}?`, a: fullAddress ? `${s.name} is at ${fullAddress}, in ${s.neighborhood}.` : `${s.name} is in ${s.neighborhood}, ${s.city}.` },
      ]} />
      <LocationCloser where={s.neighborhood} />
    </LocationShell>
  );
}
