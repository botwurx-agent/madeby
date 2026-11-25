# MadeBy

Website for MadeBy, a commercial production company for food & beverage brands.
Next.js (App Router), React 19, TypeScript. Every page is pre-rendered to static HTML.

Look: black, white type (Inter Tight + Geist Mono), and Porsche Lava Orange (`--orange`, sampled
from a GT2 RS) used only for small accents — the logo colon, the Live dot, active/hover rules,
REC timecodes and focus lines.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
npm run lint
npm run typecheck
```

## Layout (follows the sketches)

| Sketch | Where | What it does |
| ------ | ----- | ------------ |
| 1A Brand video | `src/views/home/Hero.tsx` | Opens like a shutter from an orange line; shrinks into a framed card as the page slides over it. Running timecode. |
| 1B Work | `src/views/home/WorkSection.tsx`, `src/components/WorkTile.tsx`, `src/components/Viewer.tsx` | 4×3 grid. Hover: clip plays, viewfinder corners close in, REC timecode. Click: viewer opens out of the tile; ← → keys, MORE >> to `/work`. |
| 1C About us | `src/views/home/TeamSection.tsx` | One row per person. Click: profile with roles, bio and a strip of their samples (which open the viewer on top). |
| 1D Ethos + BTS | `src/views/home/Ethos.tsx`, `BtsCarousel.tsx` | Statement lights up word by word on scroll; BTS carousel with the centre frame enlarged (drag, swipe, arrows). |
| 1E Services | `src/views/home/Services.tsx` | Pre-Production / Production / Post-Production rows. Click: samples ripple out around the phase description. |
| Call to action | `src/views/home/Contact.tsx` | Name / email / details form. |
| MORE >> | `src/views/WorkPage.tsx` (`/work`) | Every sample, filterable by category. |

Every modal is `src/lib/Overlay.tsx`: darkened page, X button, Esc, focus trap, and a panel that
opens out of (and folds back into) whatever was clicked.

## Editing content

All copy and media lives in `src/data/`:

- `work.ts` — work samples. `featured: true` puts one in the home grid (first 12).
- `team.ts` — crew, roles, bios, portraits, and which samples show in each profile.
- `services.ts` — the three phases and their items (12 fill the phase viewer).
- `bts.ts` — behind-the-scenes carousel.
- `site.ts` — nav, `LIVE_URL` (where the Live link goes), `HERO_VIDEO`, socials, contact email, ethos line.

Any sample, portrait, service item or BTS frame takes `img` (import a file from `src/assets/`) and/or
`video` (an MP4 URL or a path in `/public`). Use short muted MP4s rather than GIFs — same look,
a fraction of the size. Anything without media shows a placeholder frame.

**Contact form:** there is no backend yet, so sending opens the visitor's email app with the
message filled in, addressed to `CONTACT_EMAIL`. Swap `submit` in `Contact.tsx` for a form
service or API route when ready.

**Colours and timing:** CSS variables at the top of `src/styles/global.css`.
Motion respects `prefers-reduced-motion`.

## SEO

Per-page metadata, Open Graph image (`src/app/opengraph-image.tsx`), sitemap, robots, and
Organization JSON-LD. Old URLs (`/about`, `/work/<slug>`) redirect (see `next.config.ts`).

## Deploying

Import into Vercel. Once a custom domain is connected, set `NEXT_PUBLIC_SITE_URL`
(e.g. `https://madeby.studio`) so canonical links and the sitemap use it.
