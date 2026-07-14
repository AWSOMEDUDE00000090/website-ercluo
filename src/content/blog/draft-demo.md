---
title: "Draft: measuring the CPU's real clock ceiling"
description: "Demo draft — this file has draft: true, so it renders in dev for preview but never ships in a production build. Delete or flip the flag."
pubDate: 2026-07-12
tags: ["hardware"]
draft: true
---

This is the draft-workflow demo. While `draft: true` is in the
frontmatter, this post appears when running `npm run dev` (so you can
preview it) and is excluded from `npm run build` (so it never deploys).
Set it to `false` — or delete the line — to publish.

## Planned outline

- Ring-oscillator measurement of actual propagation through the ALU path
- Where the SAP design's critical path actually is (hint: not the adder)
- Whether the 555 deserves its reputation
