---
title: "What fourteen breadboards taught me about abstraction"
description: "Building a CPU from bare logic gates permanently changed how I read a stack trace. Notes on leaky abstractions from underneath them."
pubDate: 2026-03-08
tags: ["hardware", "computer-architecture", "learning"]
---

Before the [breadboard computer](/projects/8bit-breadboard-computer/), I
understood the layers of a computer the way you understand the floors of a
building you've only seen from the street. After it, I'd lived in the
basement for a year. Some notes from down there.

## Abstractions are load-bearing, not decorative

In software it's easy to treat abstraction as politeness — wrapping things
so colleagues don't see the mess. In hardware the abstraction *is* the
function. A register only "holds" a value because a flip-flop loops its
output back into its input forever. The metaphor of storage is implemented
by an activity, running constantly, burning power. There is no rest state;
there is only maintained agreement.

Once you've seen that, "the variable holds the value" reads differently.
Everything is doing work all the time.

## Every layer lies a little

- The datasheet says a 74LS output drives ten inputs. It does — until the
  wire between them is twenty centimeters of breadboard jumper acting as
  an antenna.
- The clock is "a square wave." Zoom in and it's a wobbly analog ramp, and
  every chip has its own opinion about where the edge is.
- RAM "remembers." Brown out the supply rail by 300 mV and it remembers
  something else.

None of these are failures of the abstraction. They're the terms of the
contract, written in fine print at the bottom of a datasheet. Software's
fine print is just harder to find — it lives in issue trackers.

## The debugging inversion

The habit that transferred: **when a layer misbehaves, suspect the layer
below before the layer above.** On the breadboard this is literal — a flaky
instruction decode is a floating input, not a microcode bug, four times
out of five. In software the equivalent move is checking the dependency
version, the environment, the actual bytes on the wire, before re-reading
your own logic for the fifth time.

The layer below is quieter than your code. That doesn't make it innocent.
