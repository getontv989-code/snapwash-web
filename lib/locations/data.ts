import type { Area, City, Shop, State } from "./types";

/* Seed data for the location directory. The pages only read it through ./index.ts,
   so this file can later be swapped for a database or the listing engine without touching them. */

const ginos: Shop = {
  slug: "ginos-dry-cleaning",
  name: "Gino's Dry Cleaning",
  summary: "Neighborhood dry cleaning, shirt care and alterations on the Upper West Side.",
  services: ["Dry cleaning", "Shirt care", "Alterations", "Wash & fold", "Household items"],
  address: { street: "214 West 79th Street", city: "New York", region: "NY", postalCode: "10024" },
  phone: "(212) 555-0148",
  hours: [
    { days: "Monday to Friday", open: "7:00 AM to 7:00 PM" },
    { days: "Saturday", open: "8:00 AM to 5:00 PM" },
    { days: "Sunday", open: "Closed" },
  ],
  about: [
    "Gino's has looked after Upper West Side wardrobes from the same counter for years: suits before interviews, dresses before weddings, and the weekly stack of work shirts in between.",
    "Shirts come back pressed and on hangers or folded, your choice. Suits and delicates are cleaned by hand where the label asks for it, and the tailor can take in a waist or shorten a hem while the garment is already in the shop.",
  ],
};

const unlisted = (name: string, district: string): Area => ({
  slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
  name,
  district,
  listed: false,
  shops: [],
});

const nyc: City = {
  slug: "new-york-city",
  name: "New York City",
  region: "Five boroughs",
  listed: true,
  intro: "From pre-war walk-ups to doorman buildings, most New Yorkers have no room for a washer and no time for the laundromat queue. Snapwash connects you with the cleaners already on your block and sends a driver for the bag.",
  areas: [
    {
      slug: "upper-west-side",
      name: "Upper West Side",
      district: "Manhattan",
      listed: true,
      intro: "Between Central Park and the Hudson, the Upper West Side runs on family-owned cleaners tucked along Broadway, Amsterdam and Columbus. Snapwash lets you use them without carrying a bag down the avenue.",
      shops: [ginos],
    },
    unlisted("Upper East Side", "Manhattan"),
    unlisted("Harlem", "Manhattan"),
    unlisted("Washington Heights", "Manhattan"),
    unlisted("Chelsea", "Manhattan"),
    unlisted("Greenwich Village", "Manhattan"),
    unlisted("East Village", "Manhattan"),
    unlisted("Lower East Side", "Manhattan"),
    unlisted("SoHo", "Manhattan"),
    unlisted("Tribeca", "Manhattan"),
    unlisted("Astoria", "Queens"),
    unlisted("Long Island City", "Queens"),
    unlisted("Sunnyside", "Queens"),
    unlisted("Jackson Heights", "Queens"),
    unlisted("Forest Hills", "Queens"),
    unlisted("Flushing", "Queens"),
    unlisted("Williamsburg", "Brooklyn"),
    unlisted("Greenpoint", "Brooklyn"),
    unlisted("Brooklyn Heights", "Brooklyn"),
    unlisted("Park Slope", "Brooklyn"),
    unlisted("Bushwick", "Brooklyn"),
    unlisted("Bedford-Stuyvesant", "Brooklyn"),
    unlisted("Crown Heights", "Brooklyn"),
    unlisted("Fordham", "The Bronx"),
    unlisted("St. George", "Staten Island"),
  ],
};

const city = (name: string, region: string): City => ({
  slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
  name,
  region,
  listed: false,
  areas: [],
});

const newYork: State = {
  code: "ny",
  name: "New York",
  status: "live",
  listed: true,
  intro: "Snapwash started in New York. Pick a city to see the neighborhoods we cover and the local cleaners you can book in the app.",
  cities: [
    nyc,
    city("Long Island", "Nassau and Suffolk"),
    city("Westchester", "Lower Hudson Valley"),
    city("Hudson Valley", "Mid-Hudson"),
    city("Albany", "Capital Region"),
    city("Rochester", "Finger Lakes"),
    city("Buffalo", "Western New York"),
    city("Syracuse", "Central New York"),
  ],
};

/* Every state appears in the hub table so new ones only need data, not layout work. */
const OTHER_STATES: [string, string][] = [
  ["al", "Alabama"], ["ak", "Alaska"], ["az", "Arizona"], ["ar", "Arkansas"], ["ca", "California"],
  ["co", "Colorado"], ["ct", "Connecticut"], ["de", "Delaware"], ["dc", "District of Columbia"], ["fl", "Florida"],
  ["ga", "Georgia"], ["hi", "Hawaii"], ["id", "Idaho"], ["il", "Illinois"], ["in", "Indiana"],
  ["ia", "Iowa"], ["ks", "Kansas"], ["ky", "Kentucky"], ["la", "Louisiana"], ["me", "Maine"],
  ["md", "Maryland"], ["ma", "Massachusetts"], ["mi", "Michigan"], ["mn", "Minnesota"], ["ms", "Mississippi"],
  ["mo", "Missouri"], ["mt", "Montana"], ["ne", "Nebraska"], ["nv", "Nevada"], ["nh", "New Hampshire"],
  ["nj", "New Jersey"], ["nm", "New Mexico"], ["nc", "North Carolina"], ["nd", "North Dakota"], ["oh", "Ohio"],
  ["ok", "Oklahoma"], ["or", "Oregon"], ["pa", "Pennsylvania"], ["ri", "Rhode Island"], ["sc", "South Carolina"],
  ["sd", "South Dakota"], ["tn", "Tennessee"], ["tx", "Texas"], ["ut", "Utah"], ["vt", "Vermont"],
  ["va", "Virginia"], ["wa", "Washington"], ["wv", "West Virginia"], ["wi", "Wisconsin"], ["wy", "Wyoming"],
];

/** States where Snapwash already runs but whose guides aren't written yet */
const SOON = new Set(["nj", "ct"]);

export const STATES: State[] = [
  newYork,
  ...OTHER_STATES.map(([code, name]): State => ({
    code,
    name,
    status: SOON.has(code) ? "live" : "soon",
    listed: false,
    cities: [],
  })),
];
