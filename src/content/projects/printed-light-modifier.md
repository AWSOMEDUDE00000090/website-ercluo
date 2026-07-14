---
title: "3D-printed cone light modifier"
summary: "A parametric flash-to-softlight cone, printed in white PLA and tuned over nine revisions until the falloff earned a place in the bag."
period: "2025"
date: 2025-09-05
tech: ["Fusion 360", "3D printing", "Photography"]
coverImage: "../../assets/covers/light-modifier.svg"
coverImageAlt: "Engineering cross-section of a cone light modifier mounted on a speedlight, with copper rays showing the light spread"
featured: true
order: 3
---

## Problem statement

Bare speedlight: harsh, specular, unflattering. Softbox: lovely, and
roughly the size of a carry-on. I wanted the 80% solution that fits in a
camera bag — a printed cone that catches the flash head by friction and
spreads the beam through a matte white interior.

## Parametric from the start

The whole geometry is driven by a Fusion 360 parameter table, so the same
file re-generates for any flash head:

| Parameter | v9 value | Governs |
| --------- | -------- | ------- |
| `throat_w × throat_h` | 46 × 72 mm | friction fit on the head |
| `interference` | 0.4 mm | grip strength vs. PLA shrink |
| `exit_d` | 168 mm | how soft the falloff gets |
| `length` | 96 mm | hotspot control vs. packability |
| `wall` | 2.0 mm | five perimeters, zero infill |

## What nine revisions taught me

- **v1–v3, the grip.** Printed PLA shrinks unevenly with wall temperature.
  0.4 mm interference holds a firm grip that survives light-stand whip
  without cracking during insertion.
- **v4–v6, the hotspot.** A straight cone tunnels a bright core straight
  through the middle. Re-profiling the flare with a gentle S-curve and
  sanding the inside matte spread it out; glossy layer lines act like a
  hall of mirrors.
- **v7–v8, the heat.** Full-power flash dumps into a closed white cone
  add up. Vent slots at the throat shed the heat with no measurable light
  leak on the histogram.
- **v9.** Ninety grams. Lives in the bag. Done.

> The test target for every revision was the same: one portrait, one
> chrome spoon, one histogram. If you can make a spoon look good, faces
> are easy.

## Files

STL plus the Fusion parameter table are in the repo, sized for my flash —
change two numbers and reprint for yours.
