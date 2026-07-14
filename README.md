# ercluo.com

Personal website for Eric Luo — [Astro](https://astro.build) static site with a
markdown-driven blog and projects system, and a cellular-automata hero on the
landing page.

## Quick start

```sh
npm install
npm run dev        # http://localhost:4321
npm run build      # type-checks, then builds to dist/
npm run preview    # serve the production build locally
```

## How to add a blog post

Create one markdown file in `src/content/blog/` — that's the whole workflow:

```md
---
title: "My new post"
description: "One or two sentences used on cards and in meta tags."
pubDate: 2026-08-01
tags: ["embedded", "notes"]     # optional
heroImage: "../../assets/covers/my-image.svg"   # optional, lives in src/assets/
heroImageAlt: "Describe the image"              # required if heroImage is set… please
draft: true                     # optional — visible in dev, excluded from builds
---

Markdown body. Code blocks, tables, blockquotes, and images all styled.
```

The filename becomes the URL (`my-new-post.md` → `/blog/my-new-post/`).
Index, tag pages, RSS, reading time, and prev/next links update automatically.
Frontmatter is validated by the schema in [src/content.config.ts](src/content.config.ts) —
a bad date or missing title fails the build with a clear error.
`example-draft.md` shows the draft workflow.

## How to add a project write-up

Same idea, in `src/content/projects/`:

```md
---
title: "My project"
summary: "Card blurb and meta description."
period: "Jan–Mar 2026"      # human-readable, shown on the card
date: 2026-03-01            # machine-sortable, used for ordering
tech: ["ESP32", "C++"]
role: "Design + firmware"   # optional
links:                      # optional, all keys optional
  repo: "https://github.com/…"
  video: "https://youtube.com/…"
coverImage: "../../assets/covers/my-cover.svg"
coverImageAlt: "Describe the cover"
gallery:                    # optional, rendered as a grid after the body
  - src: "../../assets/photo1.jpg"
    alt: "Describe it"
featured: true              # appears on the landing page (top 3)
order: 1                    # manual sort weight among featured/others
---

Full write-up in markdown/MDX.
```

Sorting: featured first, then `order` (ascending), then newest `date`.

## Editing the About page

Edit [src/content/pages/about.md](src/content/pages/about.md). The first image
in the body is treated as the portrait (replace
`src/assets/portrait-placeholder.svg` with a real photo). The résumé link
points at `public/resume.pdf` — swap in the real file.

Site-wide strings (name, tagline, social links) live in
[src/consts.ts](src/consts.ts).

## Tuning the hero

Everything adjustable is a named constant at the top of the `<script>` in
[src/components/CAHero.astro](src/components/CAHero.astro):

| Constant | What it does |
| --- | --- |
| `CELL_SIZE` / `CELL_GAP` | Grid resolution and the gap between drawn cells |
| `INFLUENCE_RADIUS` | How far (px) around the cursor cells are disturbed |
| `MIGRATION_RATE` | How aggressively ink scatters at full influence |
| `OUTWARD_BIAS` | 0 = pure random walk, 1 = always flee the cursor |
| `RELAX_RATE` | How quickly cells settle back to the glyph pattern |
| `ALPHA_LEVELS` | Opacity quantization (lower = chunkier, more "CA") |

How it works: the heading is rasterized to a low-res grid (`target`), and a
live density grid evolves each frame — near the cursor, cells stochastically
migrate ink to a neighbor (mass-conserving, biased outward); everywhere else
they relax toward `target`, so the text is the attractor. The real `<h1>`
stays in the DOM for screen readers and crawlers; `prefers-reduced-motion`
gets the static text; touch devices disperse from the finger; the sim pauses
off-screen via IntersectionObserver. The script ships only on the landing page.

## Deploying

Pushes to `main` build and deploy automatically via GitHub Actions
([.github/workflows/deploy.yml](.github/workflows/deploy.yml)) to GitHub Pages
with the custom domain `ercluo.com` (`public/CNAME`). One-time setup in the
repo settings: **Settings → Pages → Source → GitHub Actions**.

Any other static host works too — the build output in `dist/` is plain files
(`site` in [astro.config.mjs](astro.config.mjs) sets the canonical origin).

## Assumptions & choices made

- **Vanilla CSS over Tailwind** — the design token layer is ~60 lines of
  custom properties in [src/styles/global.css](src/styles/global.css), themed
  via `[data-theme]`; for a site this size that's simpler to maintain than a
  utility-class pipeline. Astro's scoped `<style>` keeps component CSS local.
- **Type pairing:** Fraunces (display) + Inter (body), self-hosted via
  Fontsource — no external font requests.
- **Astro 5** (5.18) rather than the very new v6 major, deliberately.
- Sample content is real-ish but written by an assistant — rewrite at will.
- YouTube/Instagram links in `src/consts.ts` are placeholders.
- `og-default.png` is a capture of the hero; regenerate whenever, any
  1200×630 PNG works.
