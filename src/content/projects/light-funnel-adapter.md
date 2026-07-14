---
title: "Light-funnel speedlight adapter"
summary: "A 3D-printed optical funnel that adapts a bare speedlight to softbox-quality falloff — designed in Fusion 360, tuned across nine prints."
period: "2025"
date: 2025-08-20
tech: ["Fusion 360", "3D printing", "Photography"]
coverImage: "../../assets/covers/light-funnel.svg"
coverImageAlt: "Technical cross-section of a cone-shaped light modifier attached to a camera flash, with a light beam spreading out"
featured: true
order: 3
---

## The problem

A bare speedlight is a harsh point source. Softboxes fix that but don't fit
in a backpack. I wanted the middle ground: a compact modifier that spreads
the beam into a wider, softer cone and mounts without straps or velcro —
a friction-fit funnel, printed overnight.

## Design

The geometry is a compound cone: a straight throat that grips the flash
head, then a flared horn whose interior is printed in white PLA to act as
a diffuse reflector. The flare profile isn't a straight taper — a slight
S-curve keeps the hotspot from tunneling straight through the middle.

Key dimensions ended up at:

- Throat: 46 × 72 mm rounded rectangle, 0.4 mm interference for friction fit
- Horn: 140 mm exit diameter over an 85 mm length
- Wall: 2.4 mm (six perimeters, zero infill — it's a shell)

## Iteration log

Nine prints to get right, and each one earned its place:

1. **v1–v3** — throat tolerance. PLA shrinkage varies with wall temperature;
   0.4 mm interference was the magic number for a grip that survives being
   swung around on a light stand.
2. **v4–v6** — the hotspot. Fixed by the S-curve profile and a sanded
   (matte) interior. Glossy layer lines act like a mirror maze.
3. **v7–v8** — heat. A speedlight dumped at full power into a closed cone
   warms up fast. Vent slots at the throat dropped the temperature without
   visible light leaks.
4. **v9** — the keeper.

## Results

Side-by-side against a 60 cm softbox at portrait distance, the funnel's
falloff is visibly harder but far closer to the softbox than to bare flash —
and it weighs 90 grams. It lives in the camera bag now, which is the only
benchmark that matters.

> Print settings, STL, and the Fusion parameter table are in the write-up
> repo so you can resize it for your own flash head.
