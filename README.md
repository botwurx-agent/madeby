# MadeBy

Website for MadeBy, a commercial production company for Food & Beverage brands.
Built with Vite, React 19, TypeScript and React Router.

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # type-check + production build → dist/
npm run preview  # serve the production build
npm run lint
```

## Pages

| Route    | File                  | What's on it |
| -------- | --------------------- | ------------ |
| `/`      | `src/pages/Home.tsx`  | Film-leader loader, hero with RGB strips, marquee, scroll-assembled faceted sphere (philosophy), horizontal film-strip reel with video player, about, services, contact |
| `/work`  | `src/pages/Work.tsx`  | Editorial 16:9 scatter grid, category filters, full-screen project detail |
| `/about` | `src/pages/About.tsx` | Hero, sticky origin-story chapters, parallax BTS strip, flip-card team portraits |

Nav links `Services` and `Contact` go to `/#services` and `/#contact`.

## Editing content

- **Projects:** `src/data/projects.ts`. Each project takes an optional `img` (import a file from
  `src/assets/projects/`) and an optional `video` (MP4 URL). Once `video` is set, the player
  plays it. `featured: true` puts the project on the home-page film strip.
- **Hero background reel:** set `HERO_VIDEO` in `src/pages/home/Hero.tsx`.
- **Team, origin chapters, BTS cells:** `src/data/about.ts`.
- **Services, stats, nav, socials, contact email:** `src/data/site.ts`.
- **Colours and fonts:** the CSS variables at the top of `src/styles/global.css`.

## Deploying

The build is a static single-page app. The host must send every route back to `index.html`.
`vercel.json` and `public/_redirects` (Netlify) already do this.
