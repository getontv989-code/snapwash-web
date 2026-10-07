import fs from "node:fs";
import path from "node:path";

/* Location pages are built from one spreadsheet: data/shops.csv.
   Each row is a laundry shop; states, cities and neighborhoods are derived from the rows,
   so adding a row with a new city or neighborhood creates those pages on the next build. */

export const SITE = "https://snapwash.io";
export const BASE = "/laundry";

export type Shop = {
  name: string;
  slug: string;
  state: string;
  stateCode: string;
  stateSlug: string;
  city: string;
  citySlug: string;
  neighborhood: string;
  neighborhoodSlug: string;
  address: string;
  zip: string;
  phone: string;
  services: string[];
  hours: string[];
  lat?: number;
  lng?: number;
  description: string;
  sample: boolean;
};

export type Place = { name: string; slug: string; path: string; shops: Shop[] };
export type Neighborhood = Place & { city: string; citySlug: string; state: string; stateSlug: string };
export type City = Place & { state: string; stateSlug: string; neighborhoods: Neighborhood[] };
export type State = Place & { code: string; cities: City[] };

const STATE_CODES: Record<string, string> = {
  Alabama: "AL", Alaska: "AK", Arizona: "AZ", Arkansas: "AR", California: "CA", Colorado: "CO", Connecticut: "CT",
  Delaware: "DE", "District of Columbia": "DC", Florida: "FL", Georgia: "GA", Hawaii: "HI", Idaho: "ID", Illinois: "IL",
  Indiana: "IN", Iowa: "IA", Kansas: "KS", Kentucky: "KY", Louisiana: "LA", Maine: "ME", Maryland: "MD",
  Massachusetts: "MA", Michigan: "MI", Minnesota: "MN", Mississippi: "MS", Missouri: "MO", Montana: "MT",
  Nebraska: "NE", Nevada: "NV", "New Hampshire": "NH", "New Jersey": "NJ", "New Mexico": "NM", "New York": "NY",
  "North Carolina": "NC", "North Dakota": "ND", Ohio: "OH", Oklahoma: "OK", Oregon: "OR", Pennsylvania: "PA",
  "Rhode Island": "RI", "South Carolina": "SC", "South Dakota": "SD", Tennessee: "TN", Texas: "TX", Utah: "UT",
  Vermont: "VT", Virginia: "VA", Washington: "WA", "West Virginia": "WV", Wisconsin: "WI", Wyoming: "WY",
};

const DAYS: Record<string, string> = { Mo: "Mon", Tu: "Tue", We: "Wed", Th: "Thu", Fr: "Fri", Sa: "Sat", Su: "Sun" };

export function slugify(s: string): string {
  return s.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase()
    .replace(/&/g, " and ").replace(/['’]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

/* Minimal RFC 4180 parser: commas, quoted fields, doubled quotes, CRLF */
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') quoted = false;
      else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field); field = "";
      if (row.some((f) => f.trim() !== "")) rows.push(row);
      row = [];
    } else field += c;
  }
  row.push(field);
  if (row.some((f) => f.trim() !== "")) rows.push(row);
  return rows;
}

const list = (s: string) => s.split(";").map((x) => x.trim()).filter(Boolean);
const num = (s: string) => (s.trim() === "" || isNaN(Number(s)) ? undefined : Number(s));

function loadShops(): Shop[] {
  const file = path.join(process.cwd(), "data", "shops.csv");
  const [header, ...rows] = parseCsv(fs.readFileSync(file, "utf8").replace(/^﻿/, ""));
  const cols = header.map((h) => h.trim().toLowerCase());
  const seen = new Set<string>();
  return rows.map((r, i) => {
    const get = (k: string) => (r[cols.indexOf(k)] ?? "").trim();
    const line = i + 2;
    const name = get("name"), state = get("state"), city = get("city"), neighborhood = get("neighborhood");
    if (!name || !state || !city || !neighborhood) throw new Error(`data/shops.csv line ${line}: name, state, city and neighborhood are required`);
    const stateCode = STATE_CODES[state];
    if (!stateCode) throw new Error(`data/shops.csv line ${line}: unknown state "${state}" (use the full name, e.g. New York)`);
    const shop: Shop = {
      name, state, stateCode, stateSlug: slugify(state),
      city, citySlug: slugify(city),
      neighborhood, neighborhoodSlug: slugify(neighborhood),
      slug: slugify(name),
      address: get("address"), zip: get("zip"), phone: get("phone"),
      services: list(get("services")), hours: list(get("hours")),
      lat: num(get("lat")), lng: num(get("lng")),
      description: get("description"),
      sample: /^(yes|true|1)$/i.test(get("sample")),
    };
    // Two shops with the same name in one neighborhood get the street address added to the URL
    const key = () => `${shop.stateSlug}/${shop.citySlug}/${shop.neighborhoodSlug}/${shop.slug}`;
    if (seen.has(key())) shop.slug = slugify(`${name} ${shop.address}`);
    if (seen.has(key())) throw new Error(`data/shops.csv line ${line}: duplicate shop "${name}" at the same address`);
    seen.add(key());
    return shop;
  });
}

function build() {
  const shops = loadShops();
  const states = new Map<string, State>();
  for (const s of shops) {
    let st = states.get(s.stateSlug);
    if (!st) states.set(s.stateSlug, (st = { name: s.state, slug: s.stateSlug, code: s.stateCode, path: `${BASE}/${s.stateSlug}`, shops: [], cities: [] }));
    let ci = st.cities.find((c) => c.slug === s.citySlug);
    if (!ci) st.cities.push((ci = { name: s.city, slug: s.citySlug, path: `${st.path}/${s.citySlug}`, state: st.name, stateSlug: st.slug, shops: [], neighborhoods: [] }));
    let nb = ci.neighborhoods.find((n) => n.slug === s.neighborhoodSlug);
    if (!nb) ci.neighborhoods.push((nb = { name: s.neighborhood, slug: s.neighborhoodSlug, path: `${ci.path}/${s.neighborhoodSlug}`, city: ci.name, citySlug: ci.slug, state: st.name, stateSlug: st.slug, shops: [] }));
    st.shops.push(s); ci.shops.push(s); nb.shops.push(s);
  }
  const byName = <T extends { name: string }>(a: T, b: T) => a.name.localeCompare(b.name);
  const all = [...states.values()].sort(byName);
  for (const st of all) {
    st.cities.sort(byName);
    for (const ci of st.cities) {
      ci.neighborhoods.sort(byName);
      for (const nb of ci.neighborhoods) nb.shops.sort(byName);
    }
  }
  return { shops, states: all };
}

let cache: ReturnType<typeof build> | undefined;
const data = () => (cache ??= build());

export const getStates = () => data().states;
export const getAllShops = () => data().shops;
export const getState = (st: string) => getStates().find((s) => s.slug === st);
export const getCity = (st: string, ci: string) => getState(st)?.cities.find((c) => c.slug === ci);
export const getNeighborhood = (st: string, ci: string, nb: string) => getCity(st, ci)?.neighborhoods.find((n) => n.slug === nb);
export const getShop = (st: string, ci: string, nb: string, sh: string) => getNeighborhood(st, ci, nb)?.shops.find((s) => s.slug === sh);

export const shopPath = (s: Shop) => `${BASE}/${s.stateSlug}/${s.citySlug}/${s.neighborhoodSlug}/${s.slug}`;

/* A page is kept out of search while every shop on it is a sample row */
export const isSampleOnly = (shops: Shop[]) => shops.length > 0 && shops.every((s) => s.sample);

export const plural = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;

export function serviceSummary(shops: Shop[]): string[] {
  const counts = new Map<string, number>();
  for (const s of shops) for (const v of s.services) counts.set(v, (counts.get(v) ?? 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([k]) => k);
}

/* "Mo-Fr 07:00-19:00" -> "Mon–Fri · 7:00 am – 7:00 pm" */
export function prettyHours(h: string): string {
  const m = h.match(/^([A-Za-z]{2})(?:-([A-Za-z]{2}))?\s+(\d{1,2}):(\d{2})-(\d{1,2}):(\d{2})$/);
  if (!m) return h;
  const t = (hh: string, mm: string) => {
    const n = Number(hh) % 24;
    return `${n % 12 || 12}:${mm} ${n < 12 ? "am" : "pm"}`;
  };
  const days = m[2] ? `${DAYS[m[1]] ?? m[1]}–${DAYS[m[2]] ?? m[2]}` : DAYS[m[1]] ?? m[1];
  return `${days} · ${t(m[3], m[4])} – ${t(m[5], m[6])}`;
}

export type Crumb = { name: string; path: string };

export function breadcrumbLd(crumbs: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: `${SITE}${c.path}` })),
  };
}

export function shopLd(s: Shop) {
  return {
    "@type": "DryCleaningOrLaundry",
    "@id": `${SITE}${shopPath(s)}#shop`,
    name: s.name,
    url: `${SITE}${shopPath(s)}`,
    ...(s.description && { description: s.description }),
    ...(s.phone && { telephone: s.phone }),
    address: {
      "@type": "PostalAddress",
      ...(s.address && { streetAddress: s.address }),
      addressLocality: s.city,
      addressRegion: s.stateCode,
      ...(s.zip && { postalCode: s.zip }),
      addressCountry: "US",
    },
    ...(s.lat !== undefined && s.lng !== undefined && { geo: { "@type": "GeoCoordinates", latitude: s.lat, longitude: s.lng } }),
    ...(s.hours.length && { openingHours: s.hours }),
    ...(s.services.length && { knowsAbout: s.services }),
    containedInPlace: { "@type": "Place", name: `${s.neighborhood}, ${s.city}, ${s.stateCode}` },
  };
}
