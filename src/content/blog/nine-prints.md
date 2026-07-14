---
title: "Nine prints to a good part"
description: "Iteration logs from the cone light modifier: what each failed print taught me about tolerances, surfaces, and knowing when to stop."
pubDate: 2026-02-19
tags: ["3d-printing", "photography", "process"]
---

The [cone light modifier](/projects/printed-light-modifier/) took nine
prints. This is normal and nobody says so. CAD screenshots and glamour
shots of v-final make it look like parts spring fully formed from
Fusion 360; the actual process is a stack of eight almost-right cones by
the bin.

Here's what each one taught, in case your part is a cousin of mine.

## v1–v3: tolerance is an empirical science

The throat needed to grip a flash head by friction. I modeled the head,
offset by a "reasonable" 0.2 mm, and printed a part that fit like a
sticker — because printed holes shrink and printed posts swell, and the
amounts depend on your printer, material, and wall temperature.

The fix was printing a tolerance ladder: one test part with five
openings stepped 0.1 mm apart, printed in the same orientation as the
real part. Twenty minutes of printing replaced three full-part guesses.
**0.4 mm interference** was the answer for my PLA and my printer. Yours
will differ; that's the point.

## v4–v6: surfaces are optics

A glossy white interior sounds reflective in a good way. It isn't — layer
lines act as concentric mirrors and tunnel a hotspot straight down the
axis. Test photos of a chrome spoon (harshest possible subject) showed a
bright core with a dim halo.

Two changes fixed it: an S-curve flare profile instead of a straight
taper, and sanding the interior to 400 grit. Matte is not a look, it's a
scattering function.

## v7–v8: thermal budgets exist

A speedlight at full power dumps real heat into an enclosed cone. v7
smelled like regret after twenty flashes. Vent slots at the throat —
positioned where the histogram said no light escapes — dropped the
temperature to boring.

## v9: stopping

v9 wasn't perfect; it was *sufficient*, and the difference between those
is a skill. The falloff test matched a small softbox closely enough that
the remaining gap wouldn't survive a viewer's attention. Print nine,
stop, use the thing.

> The part on the printer teaches you more than the part in CAD.
> Budget for the reprints — they aren't failures, they're the tuition.
