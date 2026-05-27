# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project scope

See `PROJECT.md` for the full project vision, page inventory, tour field reference, booking system details, and the WordPress → Sanity + Cloudflare migration plan.

## Commands

```bash
npm run dev       # dev server at http://localhost:4321
npm run build     # production build to ./dist/
npm run preview   # preview the production build locally
```

## Architecture

This is an **Astro 5** site with **React** islands, **Tailwind CSS v4**, and **shadcn/ui** components.

### Data source

All tour content comes from a local **WordPress** instance via REST API (`src/lib/api.ts`). The WP site must be running at `http://localhost/tour-guide-site/` for tour data to load. Tours use **ACF (Advanced Custom Fields)** for all custom fields — hero image, stops, practical info, etc. If WordPress is not running, `getAllTours()` returns an empty array and tour pages will not be generated.

### Pages and routing

- `src/pages/` — Astro file-based routing. Static pages are plain `.astro` files.
- `src/pages/tours/[slug].astro` — dynamic route. Uses `getStaticPaths()` to generate one page per tour fetched from WordPress.

### Layout

Every page wraps in `src/layouts/BaseLayout.astro`, which fetches all tours (for the nav dropdown) and renders `<Navbar>` + `<Footer>` around a `<slot />`.

### Component conventions

- **`.astro` files** — used for layout and server-only components (e.g., `PersonalNote.astro`).
- **`.tsx` files** — React components. Most page sections and all interactive UI live here.
- React components that need interactivity use Astro client directives: `client:load` (interactive immediately) or `client:visible` (lazy, hydrates on scroll).
- `src/components/ui/` — shadcn/ui components (do not edit manually; re-add via `npx shadcn add <component>`).
- `src/components/sections/` — page section components used on `index.astro`.
- `src/components/views/` — full-page view components for non-index pages.

### Styling

Tailwind CSS v4 is configured via `@tailwindcss/vite` (no `tailwind.config.js`). All custom design tokens are defined in `src/styles/global.css` under `@theme`:

- **Color palette**: chromatic teal (dark/medium/light), atmospheric teal, natural tones, accent orange (`#ff8940`), accent crimson.
- **Typography scale**: `text-hero`, `text-section`, `text-subsection` (all fluid with `clamp()`).
- **Spacing scale**: `section-lg`, `section`, `section-sm`, `col-gap` (fluid spacing for page rhythm).
- Utility classes `.accent-label` and `.headline` are defined in `global.css`.

### Path alias

`@/` maps to `src/` (e.g., `@/lib/api`, `@/components/ui/button`).
