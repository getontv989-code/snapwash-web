/* Location directory model: state > city > area (neighborhood) > shop.
   Every level carries a slug that becomes one URL segment under /laundry-service.
   An entry with `listed: false` shows in its parent's table as "Coming soon" but gets no page. */

export type Status = "live" | "soon";

export type Shop = {
  slug: string;
  name: string;
  /** One or two sentences shown under the name */
  summary: string;
  services: string[];
  address: { street: string; city: string; region: string; postalCode: string };
  phone?: string;
  website?: string;
  hours: { days: string; open: string }[];
  about: string[];
  /** Price list shown on the shop page */
  menu?: { service: string; price: string; turnaround: string }[];
  highlights?: { title: string; body: string }[];
  payments?: string[];
  faq?: { q: string; a: string }[];
};

export type Area = {
  slug: string;
  name: string;
  /** Borough, county or district shown next to the name in the city's table */
  district?: string;
  listed: boolean;
  intro?: string;
  shops: Shop[];
};

export type City = {
  slug: string;
  name: string;
  /** Region shown next to the name in the state's table */
  region?: string;
  listed: boolean;
  intro?: string;
  areas: Area[];
};

export type State = {
  /** Two-letter USPS code, lower case in the URL */
  code: string;
  name: string;
  status: Status;
  listed: boolean;
  intro?: string;
  cities: City[];
};
