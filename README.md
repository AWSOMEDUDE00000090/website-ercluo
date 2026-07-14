# ercluo.com

Personal site for Eric Luo — [Astro](https://astro.build) static site with a
markdown-driven blog and projects system, and a cellular-automata hero on
the landing page.

## Run it

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build locally
```

One command to start: `npm run dev`. Node 20+.

## Writing content

Everything on the site is a markdown file. Add a file, rebuild, done — no
CMS, no database.

### Add a blog post

Create `src/content/blog/my-post.md`:

```markdown
---
title: "My post"
description: "One sentence used on cards and in meta tags."
pubDate: 2026-08-01
tags: ["hardware", "notes"]     # optional
heroImage: "../../assets/me.jpg" # optional, path relative to this file
heroImageAlt: "What's in it"     # pairs with heroImage
draft: true                      # optional — see Drafts below
---

Markdown body. Code blocks get Shiki highlighting; tables, quotes,
images, and embeds are styled.
```

The filename becomes the URL: `my-post.md` → `/blog/my-post/`. The index,
tag pages, prev/next links, reading time, and RSS all update on rebuild.

**Drafts:** `draft: true` posts render in `npm run dev` so you can preview
them, and are excluded from production builds. Flip to `false` to publish.
`src/content/blog/draft-demo.md` demonstrates this — delete it whenever.

### Add a project write-up

Create `src/content/projects/my-project.md`:

```markdown
---
title: "My project"
summary: "Card blurb and meta description."
period: "Jan–Mar 2026"            # human-readable, shown on the card
date: 2026-03-01                  # machine-readable, used for sorting
tech: ["ESP32", "C++"]            # rendered as filterable tags
role: "Design and firmware"       # optional
links:                            # optional, all keys optional
  repo: "https://github.com/..."
  live: "https://..."
  demo: "https://..."
  video: "https://..."
coverImage: "../../assets/covers/my-project.svg"  # optional
coverImageAlt: "Describe the image"
gallery:                          # optional
  - src: "../../assets/gallery/one.jpg"
    alt: "Describe it"
featured: true                    # pins it to the landing page strip
order: 1                          # manual sort weight among featured
draft: false
---

Full write-up in markdown.
```

Projects sort by `featured`, then `order`, then `date` (newest first).
The landing page shows the first three featured projects.

### Edit the About page

`src/content/pages/about.md`. The first image in the body is treated as
the portrait slot — swap `src/assets/portrait.svg` for a real photo. The
résumé link points at `public/resume.pdf`, which is a placeholder; replace
the file.

### Frontmatter validation

Schemas live in `src/content.config.ts` (Zod). A typo'd or missing field
fails the build with a pointed error instead of rendering wrong.

## The hero

`src/components/GridHero.astro` renders the landing-page name as a grid of
cells. Idle, every cell relaxes toward the rasterized glyph pattern; near
the cursor, cells evolve by a dispersive CA rule (4-neighbor diffusion +
advection away from the pointer + noise), so the type breaks apart
cell-by-cell and reassembles when the cursor leaves.

All tunables are constants at the top of the component's `<script>`:
`CELL` (cell size), `RADIUS` (cursor influence), `DIFFUSION`, `ADVECTION`,
`NOISE`, `RETURN_RATE` (reassembly speed), `SIZE_LEVELS` (chunkiness).
Colors come from the theme's `--ink` token automatically.

Built-in behavior, no config needed: real `<h1>` behind the canvas for
screen readers/SEO, static text under `prefers-reduced-motion`, dispersion
from touch/tap on touch devices, simulation pauses off-screen
(IntersectionObserver), re-rasterizes on resize and theme change. The
script ships only on the landing page.

## Deploying

`.github/workflows/deploy.yml` builds and deploys to **GitHub Pages** on
every push to `main`. Repo settings → Pages → Source must be
**GitHub Actions**, and the custom domain (`ercluo.com`) must be entered in
the same settings screen once — `public/CNAME` keeps it attached to the
build output.

The output is plain static files (`dist/`), so Netlify, Vercel, or
Cloudflare Pages work as-is: build command `npm run build`, output `dist`.

## Decisions & assumptions

- **Vanilla CSS over Tailwind** — a small token layer in
  `src/styles/global.css` (`--paper`, `--ink`, `--copper`, …) keeps the
  design themeable without a utility-class dependency.
- **Type**: Space Grotesk (headings) + IBM Plex Sans (body), self-hosted
  via Fontsource. Both chosen to read technical without being cold.
- **Sample content** is real-ish: the CPU, printer, and light-modifier
  entries are grounded in actual projects, written to be replaced or kept.
- **OG image** (`public/og.png`) was generated from the hero itself;
  per-post hero/cover images override it on their own pages.
- Site URL is set to `https://ercluo.com` in `astro.config.mjs` — change
  it there if the domain moves.
