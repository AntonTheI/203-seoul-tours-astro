# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Scope

See `PROJECT.md` for the full project vision, page inventory, tour field reference, booking system details, and migration plan.

## Working Style

I am learning programming. When working with me:
- Explain what you are doing and why before writing any code
- Do not give me finished code unless I explicitly ask for it
- Walk me through concepts first, then let me write the code myself
- If I make a mistake, explain why it's wrong rather than just fixing it
- If I propose a suboptimal or wrong approach, correct it immediately — do not validate it first and fix it later

## Commands

```bash
npm run dev       # dev server at http://localhost:4321
npm run build     # production build to ./dist/
npm run preview   # preview the production build locally
```

Sanity Studio runs separately:

```bash
cd studio && npm run dev   # Studio UI at http://localhost:3333
```

## Architecture

**Astro 5** site with **React** islands, **Tailwind CSS v4**, **shadcn/ui** components, and **Sanity** as the CMS.

### Project Structure

```
src/
  components/     # Astro + React components
  layouts/        # BaseLayout.astro wraps every page
  lib/            # api.ts (Sanity queries), sanity.ts (client config)
  pages/          # file-based routing
  styles/         # global.css (Tailwind v4 theme tokens)
studio/           # Sanity Studio (separate project, separate npm install)
```

### Data Source

All tour content comes from **Sanity** (project ID `feu364ik`, dataset `production`). The client is configured in `src/lib/sanity.ts` and all queries live in `src/lib/api.ts`.

If no tours exist in Sanity, `getAllTours()` returns `[]` and no tour pages are generated — this is expected during content entry.

### Pages and Routing

- `src/pages/` — Astro file-based routing. Static pages are plain `.astro` files.
- `src/pages/tours/[slug].astro` — dynamic route, generates one page per tour via `getStaticPaths()`.
- Every page wraps in `src/layouts/BaseLayout.astro`, which fetches all tours (for the nav dropdown) and renders `<Navbar>` + `<Footer>` around a `<slot />`.

## Important Conventions

- **Container class** is `.my-container` NOT `.container` — Tailwind v4 has a built-in `.container` that conflicts.
- **React interactivity** requires a client directive in the `.astro` file: `client:load` (immediate) or `client:visible` (lazy, on scroll). Without it, `useState` won't work.
- **Default to `.astro`** for components. Use `.tsx` only when `useState` or `useEffect` is needed.
- **Never commit images** — `public/images/` is in `.gitignore`. In production, images come from Sanity CDN.
- **shadcn/ui components** in `src/components/ui/` — do not edit manually. Re-add via `npx shadcn add <component>`.

## Styling

Tailwind CSS v4 is configured via `@tailwindcss/vite` (no `tailwind.config.js`). All custom design tokens are defined in `src/styles/global.css` under `@theme`.

### Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `text-hero` | clamp(48px → 72px) | Page hero headings |
| `text-section` | clamp(30px → 48px) | Section headings |
| `text-subsection` | clamp(24px → 32px) | Subsection headings |
| `spacing-section-lg` | clamp(48px → 96px) | Top/bottom padding on major sections |
| `spacing-section` | clamp(32px → 64px) | Gap between major content blocks |
| `spacing-section-sm` | clamp(24px → 48px) | Gap between related elements |
| `spacing-col-gap` | clamp(24px → 64px) | Gap between text and image columns |

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `dark-chromatic-teal` | `#203440` | Primary dark backgrounds, footer |
| `medium-chromatic-teal` | `#335266` | Teal sections, personal note block |
| `light-chromatic-teal` | `#46718c` | Lighter teal accents |
| `natural-light` | `#fff6f2` | Page background, warm off-white |
| `natural-dark-210` | `#17181a` | Body text |
| `accent-orange-23` | `#ff8940` | CTAs, highlights, accent labels |
| `accent-crimson-344` | `#b31b43` | Error states, secondary accent |

Utility classes `.accent-label` and `.headline` are defined in `global.css`.

### Path Alias

`@/` maps to `src/` (e.g., `@/lib/api`, `@/components/ui/button`).

## Design Philosophy

Warm, editorial feel built around the teal + orange palette. The site is image-forward — hero images and tour photography carry the visual weight. UI components should support the content without competing with it. White space is intentional; avoid crowding sections.

## Sanity CMS

- Studio lives in `studio/` and is a separate Node project with its own `package.json`.
- Tour `slug` is a Sanity slug object — reference it as `slug.current`, not `slug`.
- Tour `stops` are stored as an array of objects (not flat numbered fields like WordPress).
- `introContent` is **Portable Text** — use `@portabletext/react` to render it, not a plain `<p>` tag.
- Images are Sanity asset references — use `@sanity/image-url` to build CDN URLs from them.
