# Seoul Walking Tours — Project Scope

## Vision

A professional booking website for Jitse, a Seoul walking tour guide. International tourists browse 5 signature tours, learn about the guide, and submit booking requests through a calendar-based form. The site also offers tailor-made tours and concierge services.

---

## Client

- **Name**: Jitse (tour guide, site owner)
- **Target audience**: International tourists visiting Seoul
- **Languages offered**: English (at minimum)

---

## Pages

| Page | Route | Status |
|------|-------|--------|
| Landing | `/` | Complete (layout done, real WP data connected) |
| Tour detail | `/tours/[slug]` | Complete (dynamic, pulls from CMS) |
| Booking | `/booking` | Complete (form wired up, confirmation dialog, email) |
| About | `/about` | Built (awaiting owner's bio content) |
| FAQ | `/faq` | Built (awaiting owner's Q&A content) |
| Tailored walks | `/tailored-walks` | Built |
| Concierge | `/concierge` | Built |
| Privacy | `/privacy` | Complete |

---

## Tours (5 planned)

Each tour has up to 8 stops with icon, title, subtitle, content, and image. ACF fields (now being migrated to Sanity):

| Field | Purpose |
|-------|---------|
| `hero_image` | Full-width header image |
| `duration`, `walking_level`, `meeting_point`, `start_time`, `best_timing` | Practical info sidebar |
| `intro_title`, `intro_subtitle`, `intro_content` | Tour description block |
| `card_description`, `why_i_like` | Landing page card |
| `tag` | Category label: popular / scenery / food / culture / history / none |
| `personal_note` | Guide's personal note section (teal block) |
| `stop_1_*` … `stop_8_*` | Up to 8 itinerary stops (icon, title, subtitle, content, image) |

**Known tours so far**: "Seoul Markets" (slug: `seoul-markets`), "Seoul Wall" (slug: `seoul-wall`). 5 total planned.

---

## Booking System

- Form fields: tour (pre-filled), date range, name, email, phone, participants, special requests, add-on tours
- On submit: confirmation dialog opens showing privacy notice + booking summary
- On confirm: POST to backend → booking stored + email sent to Jitse
- On success: form replaced with green confirmation message
- Dates sent as `yyyy-MM-dd` strings (transformed via date-fns before sending)
- No time slots — Jitse confirms the exact time via email reply

**Privacy**: no checkbox, static informational text. `/privacy` page linked inside the dialog and in the footer.

---

## Tech Stack (current → target)

| Layer | Was | Now (target) |
|-------|-----|------|
| CMS | WordPress (headless) + ACF | **Sanity** |
| Booking storage | WordPress CPT (Bookings) | TBD — Sanity doc or Cloudflare Function |
| Email notifications | `wp_mail` → WP Mail SMTP (Brevo/Gmail) | TBD — Resend / Brevo via Cloudflare Function |
| Frontend | Astro 5 + React + Tailwind v4 | Same |
| Hosting | Hostinger (planned) | **Cloudflare Pages** |
| Domain | Hostinger | Hostinger (DNS pointed to Cloudflare) |
| Local email testing | Mailpit (`localhost:8025`) | N/A after migration |

---

## Migration Plan: WordPress → Sanity + Cloudflare

### Step 1 — Sanity setup
- Create Sanity project (`npm create sanity@latest`)
- Define `tour` schema matching current ACF fields (stops as array of objects, not numbered flat fields)
- Enter tour content into Sanity Studio
- Update `src/lib/api.ts` to use `@sanity/client` instead of WordPress REST API

### Step 2 — Booking backend replacement
With no WordPress, the booking POST endpoint needs a new home:
- **Option A**: Cloudflare Pages Function (`functions/api/booking.ts`) — handles POST, stores in Sanity, sends email via Resend/Brevo API
- **Option B**: External form service (Formspree, etc.) — simpler but less control

### Step 3 — Astro + Cloudflare adapter
- Install `@astrojs/cloudflare` adapter
- Update `astro.config.mjs` with `output: 'static'` (or `hybrid` if Functions are used)
- Test `astro build` output

### Step 4 — Deploy to Cloudflare Pages
- Connect GitHub repo to Cloudflare Pages
- Set build command: `npm run build`, output dir: `dist`
- Set environment variables (Sanity project ID, dataset, token)

### Step 5 — DNS
- Add custom domain in Cloudflare Pages dashboard
- Update Hostinger nameservers to point to Cloudflare

---

## Open Decisions

- [ ] Where do booking submissions go after WP is removed? (Sanity doc vs. Cloudflare Function)
- [ ] Which transactional email service? (Resend recommended for simplicity)
- [ ] Apple Calendar integration for availability? (Was "MAYBE" — still open)
- [ ] Pricing page? (Owner to decide)
- [ ] Testimonials on About page?
- [ ] Tailor-made tours: inquiry form or direct email?

---

## Important Notes for Development

- **Start XAMPP before `npm run dev`** when still using WordPress locally — otherwise `getStaticPaths()` returns empty and no tour pages generate. After Sanity migration this constraint is gone.
- **No ACF Pro** — stops use numbered flat fields (`stop_1_title`, `stop_2_title`, etc.) in WP. In Sanity these will become a proper array of stop objects.
- **ACF image fields** return numeric IDs by default — a PHP filter in `seoul-tours.php` converts them to URLs. Sanity handles this natively.
- **CORS** in the WP plugin allows `localhost:4321` and `yourdomain.com` — irrelevant after migration.
- **Local email hooks** in `seoul-tours.php` (Mailpit/phpmailer_init) must be removed before any WP-based deployment — irrelevant after migration.
- `MobileMenu` uses `createPortal` to escape the navbar stacking context — requires a `mounted` state check to avoid SSR errors.
- The `@/` path alias maps to `src/`.
