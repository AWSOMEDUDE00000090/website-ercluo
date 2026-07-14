---
title: "Rebuilding this site (and letting the type fall apart)"
description: "Why I moved to Astro, how the markdown content system works, and the cellular-automata hero that dissolves my name when your cursor gets close."
pubDate: 2026-07-10
tags: ["web", "astro", "meta"]
heroImage: "../../assets/covers/ca-grid.svg"
heroImageAlt: "A pixel-grid letter E, crisp on the left and dispersing into scattered cells toward a dashed circle representing the cursor"
---

This site used to be hand-written HTML — three pages, one stylesheet, the
web equivalent of a breadboard. It worked, but adding a write-up meant
copying markup around, and I stopped adding write-ups. That's the failure
mode that matters.

## Markdown in, site out

The rebuild runs on Astro's content collections. A post is a markdown file
with typed frontmatter; the schema is enforced at build time, so a typo'd
date fails the build instead of silently rendering wrong:

```ts
const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    draft: z.boolean().default(false),
    // ...
  }),
});
```

Everything else — the index, tags, RSS, reading time, prev/next links — is
derived. Adding this post was `git add` and one file.

## The hero

The part I actually wanted to build: the landing page renders my name as a
grid of cells. Idle, the glyph pattern is an attractor — every cell relaxes
toward it, so it reads as clean type. Move your cursor in and cells within
the influence radius start migrating their ink to neighbors, biased away
from the pointer. The letters scatter cell-by-cell; leave, and they settle
home.

The whole simulation is ~200 lines of vanilla TypeScript on a Canvas 2D
context. No WebGL, no library. A 240×70 grid is small enough that a CPU
does it at 60 fps without noticing, and the real `<h1>` sits underneath
for screen readers, crawlers, and anyone with `prefers-reduced-motion` set.

> Rule of thumb from the hardware bench that applies here: the flashy part
> should be the *last* 200 lines, not the foundation.

## What I'd still like

MDX components for build galleries, and maybe printing new posts to the
[thermal printer](/projects/networked-thermal-printer/) as a deploy hook.
Because a CI pipeline that produces a receipt is objectively funny.
