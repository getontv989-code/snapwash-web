# Snapwash website (Next.js)

Three statically rendered pages built with the Next.js App Router:

- `/` for customers (app users)
- `/drive` for drivers
- `/cleaners` for dry cleaners and laundromats
- `/laundry/...` location pages: state, city, neighborhood and shop, generated from `data/shops.csv`

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Deploy on Vercel

Push this folder to a GitHub repository and import it at https://vercel.com/new. Vercel detects Next.js automatically; no settings or environment variables are needed. Every later push redeploys.

## Where things live

- `app/*/page.tsx`: page content, per-page SEO metadata and JSON-LD structured data
- `app/layout.tsx`: fonts (Manrope headings, DM Sans body), shared metadata, the page script
- `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx`: sitemap, robots.txt and the share image
- `components/`: header, footer, hanger logo, store buttons
- `public/main.js`: animations and interactions (app tour, scan demo, reveals, menu)
- `app/globals.css`: the design system

## Location pages

Every row in `data/shops.csv` is one laundry shop. The build turns the rows into pages:

```
/laundry                                         all states
/laundry/new-york                                cities in the state
/laundry/new-york/brooklyn                       neighborhoods and shops in the city
/laundry/new-york/brooklyn/williamsburg          shops in the neighborhood
/laundry/new-york/brooklyn/williamsburg/<shop>   one shop
```

Add, edit or delete rows (Excel or Google Sheets work; export as CSV) and push: a new city or neighborhood gets its pages automatically. Columns:

| Column | Required | Example |
| --- | --- | --- |
| name | yes | Corner Dry Cleaners |
| state | yes, full name | New York |
| city | yes | Brooklyn |
| neighborhood | yes | Williamsburg |
| address, zip, phone | no | 123 Bedford Ave, 11211, (718) 555-0100 |
| services | no, `;` separated | Dry cleaning;Wash & fold |
| hours | no, `;` separated, schema.org format | Mo-Fr 07:00-19:00;Sa 08:00-17:00 |
| lat, lng | no | 40.7142, -73.9566 |
| description | no | One or two sentences about the shop |
| sample | no | `yes` marks placeholder rows |

Pages whose shops are all `sample: yes` render with a notice, are `noindex` and stay out of the sitemap. Delete the sample rows once real shops are in.

Each page gets its own title, description, canonical URL, breadcrumbs, FAQ and JSON-LD (`DryCleaningOrLaundry` for shops, `CollectionPage` + `ItemList` for places, `BreadcrumbList` everywhere), and is listed in `sitemap.xml`. The build fails with the line number if a row is missing a required field or has an unknown state.

Before launch, replace the App Store and Google Play search links in `components/StoreButtons.tsx` and the hero buttons in `app/page.tsx` with the real listing URLs.
