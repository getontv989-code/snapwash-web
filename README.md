# Snapwash website (Next.js)

Three statically rendered pages built with the Next.js App Router:

- `/` for customers (app users)
- `/drive` for drivers
- `/cleaners` for dry cleaners and laundromats

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

Before launch, replace the App Store and Google Play search links in `components/StoreButtons.tsx` and the hero buttons in `app/page.tsx` with the real listing URLs.
