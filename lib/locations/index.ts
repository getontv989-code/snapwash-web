import { STATES } from "./data";
import type { Area, City, Shop, State } from "./types";

export type { Area, City, Shop, State } from "./types";

/* Read-only access to the location directory. Async so a database or API can replace the
   static seed data without changing any page. */

export const BASE_PATH = "/laundry-service";

export const paths = {
  hub: () => BASE_PATH,
  state: (s: State) => `${BASE_PATH}/${s.code}`,
  city: (s: State, c: City) => `${BASE_PATH}/${s.code}/${c.slug}`,
  area: (s: State, c: City, a: Area) => `${BASE_PATH}/${s.code}/${c.slug}/${a.slug}`,
  shop: (s: State, c: City, a: Area, sh: Shop) => `${BASE_PATH}/${s.code}/${c.slug}/${a.slug}/${sh.slug}`,
};

export async function getStates(): Promise<State[]> {
  return STATES;
}

export async function getState(code: string) {
  const state = STATES.find((s) => s.code === code && s.listed);
  return state ?? null;
}

export async function getCity(code: string, citySlug: string) {
  const state = await getState(code);
  const city = state?.cities.find((c) => c.slug === citySlug && c.listed);
  return state && city ? { state, city } : null;
}

export async function getArea(code: string, citySlug: string, areaSlug: string) {
  const found = await getCity(code, citySlug);
  const area = found?.city.areas.find((a) => a.slug === areaSlug && a.listed);
  return found && area ? { ...found, area } : null;
}

export async function getShop(code: string, citySlug: string, areaSlug: string, shopSlug: string) {
  const found = await getArea(code, citySlug, areaSlug);
  const shop = found?.area.shops.find((s) => s.slug === shopSlug);
  return found && shop ? { ...found, shop } : null;
}

/** Every page in the directory, for generateStaticParams and the sitemap. */
export async function getAllPaths() {
  const out: { state: string; city?: string; area?: string; shop?: string; path: string }[] = [];
  for (const s of STATES.filter((x) => x.listed)) {
    out.push({ state: s.code, path: paths.state(s) });
    for (const c of s.cities.filter((x) => x.listed)) {
      out.push({ state: s.code, city: c.slug, path: paths.city(s, c) });
      for (const a of c.areas.filter((x) => x.listed)) {
        out.push({ state: s.code, city: c.slug, area: a.slug, path: paths.area(s, c, a) });
        for (const sh of a.shops) out.push({ state: s.code, city: c.slug, area: a.slug, shop: sh.slug, path: paths.shop(s, c, a, sh) });
      }
    }
  }
  return out;
}

/** Counts shown in the hero card and tables */
export function countShops(c: City) {
  return c.areas.reduce((n, a) => n + a.shops.length, 0);
}
