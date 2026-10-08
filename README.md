# MadeBy

Website for MadeBy, a commercial production company for Food & Beverage brands.
Built with Next.js (App Router), React 19 and TypeScript. Every page is pre-rendered
to static HTML, so search engines and link previews see the full content.

## Develop

```bash
npm install
npm run dev        # local dev server on http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
npm run lint
npm run typecheck
```

## Pages

| Route          | Source                                             | What's on it |
| -------------- | -------------------------------------------------- | ------------ |
| `/`            | `src/app/page.tsx` → `src/views/Home.tsx`          | Film-leader loader, hero with RGB strips, marquee, scroll-assembled faceted sphere, horizontal film-strip reel with video player, about, services, contact |
| `/work`        | `src/app/work/page.tsx` → `src/views/Work.tsx`     | Editorial 16:9 scatter grid with category filters; each card links to its project page |
| `/work/[slug]` | `src/app/work/[slug]/page.tsx` → `src/views/ProjectDetail.tsx` | One page per project, generated from the project list |
| `/about`       | `src/app/about/page.tsx` → `src/views/About.tsx`   | Hero, sticky origin-story chapters, parallax BTS strip, flip-card team portraits |

## Editing content

- **Projects:** `src/data/projects.ts`. Each project has a `slug` (its URL), an optional `img`
  (import a file from `src/assets/projects/`) and an optional `video` (MP4 URL). `featured: true`
  puts it on the home-page film strip. Adding a project automatically adds its page, sitemap
  entry and share image.
- **Hero background reel:** set `HERO_VIDEO` in `src/views/home/Hero.tsx`.
- **Team, origin chapters, BTS cells:** `src/data/about.ts`.
- **Services, stats, nav, socials, contact email, site description:** `src/data/site.ts`.
- **Colours:** the CSS variables at the top of `src/styles/global.css`. Fonts load through
  `next/font` in `src/app/layout.tsx`.

## SEO

- Per-page titles, descriptions, canonical URLs and Open Graph / Twitter tags (`metadata` in each
  `src/app/**/page.tsx`).
- Project pages use their still as the share image; other pages use `src/app/opengraph-image.tsx`.
- `/sitemap.xml` and `/robots.txt` are generated from `src/app/sitemap.ts` and `src/app/robots.ts`.
- Organization and per-project structured data (JSON-LD).
- Images are served through `next/image` (resized, AVIF/WebP, lazy-loaded).

## Deploying

Import the repo into Vercel; it detects Next.js automatically. Once a custom domain is connected,
set the environment variable `NEXT_PUBLIC_SITE_URL` (e.g. `https://madeby.studio`) so canonical
links and the sitemap use it. Until then the Vercel production URL is used.
