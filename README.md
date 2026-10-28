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
- `app/globals.css`: Tailwind v4 setup and the design tokens (see below), base element styles and keyframes
- `components/ui.tsx`: building blocks (page column `wrap`, 12-column `grid12`, `Section`, `SectionHead`, `Kicker`, `btn()`, icons)
- `components/sections.tsx`: sections shared by pages (FAQ, testimonials, links to the other pages)
- `components/hero.ts`: the shared hero layout
- `components/home`, `components/drive`, `components/cleaners`: each page's own sections
- `components/`: header, footer, hanger logo, store buttons
- `public/main.js`: animations and interactions (app tour, scan demo, reveals, menu)

## Styling

The site uses Tailwind CSS v4. Styles are utility classes on the components; `app/globals.css` only holds
what utilities can't express.

- **Colors** follow the light/dark theme through CSS variables, so one class works in both themes:
  `brand` (#0060F6 / #2F7BFF), `ink`, `paper`, `surface`, `muted`, `line`, `wash`, `on-brand`, `card` / `card-fg`,
  and the Drive page's `night-*` aliases. Fixed colors: `white`, `blue` (logo blue in both themes), `navy`, and `app-*`
  for the phone mockups. Example: `bg-surface text-ink shadow-[0_0_0_1px_var(--line)]`.
- **Fonts**: `font-display` (Manrope) for headings, `font-body` (DM Sans) for everything else.
- **Type scale**: `text-xs` to `text-3xl` (the larger ones are fluid). Sizes carry no line height, so add `leading-*`.
- **Spacing tokens**: `px-gutter` (page sides), `py-section`, `gap-x-col` (grid), `gap-tile` (between cards), `p-card`, `p-card-lg`.
- **Breakpoints** are desktop-first, matching the original design: `max-lg:` is the mobile layout (900px and below),
  `max-md:` 760px, `max-sm:` 560px, `max-xl:` 1000px. `steps-static:` is the plain-grid fallback for the pinned steps.
- **Theme**: `dark:` targets `<html data-theme="dark">`, which `public/main.js` toggles.
- **Runtime hooks**: class names such as `site-header`, `reveal`, `split`, `app-view`, `hsteps-track`, `viewfinder`, `vf-box`,
  `bag-empty`, `foot-logo` are what `public/main.js` looks for, so keep them when editing markup. State classes it adds
  (`is-active`, `is-solid`, `is-found`, `menu-open`…) are styled with variants like `[&.is-solid]:` and `in-[.is-active]:`.
  Markup that `main.js` builds itself carries its classes in `main.js`, which Tailwind scans.

Before launch, replace the App Store and Google Play search links in `components/StoreButtons.tsx` with the real listing URLs.
