---
title: "Draft: PCB-ifying the breadboard computer"
description: "Planning notes for moving the 8-bit computer to a proper four-layer board. This is a draft — visible in dev, excluded from production builds."
pubDate: 2026-07-13
tags: ["hardware"]
draft: true
---

This post has `draft: true` in its frontmatter, so it shows up while
running `npm run dev` (so you can preview it) but is excluded from
`npm run build`. Flip the flag to publish it.

## The plan

- Consolidate the control logic into a single CPLD, or keep it discrete
  for the aesthetics?
- Four layers, dedicated ground plane, and finally: no floating inputs.
