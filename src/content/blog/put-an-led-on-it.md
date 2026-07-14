---
title: "Put an LED on it: observability for breadboard computers"
description: "The cheapest debugging tool in electronics is a resistor and a light. How blinkenlights carried a 14-breadboard CPU build, and what they replace."
pubDate: 2026-06-28
tags: ["hardware", "debugging", "cpu-build"]
---

Software people pay real money for observability. Dashboards, traces,
structured logs, a vendor bill. On a breadboard, the entire discipline
costs three cents: a resistor and an LED on every signal you care about.

While building the [discrete 8-bit CPU](/projects/discrete-8bit-cpu/), I
put an LED on every register bit, every bus line, and every control
signal. Forty-something lights. It looks like a carnival and it is the
only reason the machine works.

## What the lights actually buy you

**State is visible at wire speed.** No probe, no meter, no context
switch. You clock the machine by hand and *watch* the instruction move:
bus lights flicker, the instruction register catches the pattern, the
control word lights shift to the next microstep. When a value is wrong,
you saw where it went wrong.

**Bugs announce themselves.** My favorite failure: the A register lights
dimmed — not off, *dim*. Two outputs were fighting over the bus, each
winning half the time. A logic analyzer shows that as a confusing
mid-rail voltage. The LED just looks sick.

**They enforce honesty about the clock.** With LEDs on the clock and
control lines, you can single-step and verify each microinstruction does
exactly what the microcode table says. I found two microcode bugs this
way before they ever executed at speed.

## The three-cent rules

1. One LED per bit you'd ever want to ask about. You will ask.
2. Buffer them (or use high-efficiency LEDs at low current) so the
   indicator doesn't load the signal it's watching — a 74LS output
   driving ten inputs *and* a hungry LED starts missing spec.
3. Group them physically like the data flows logically. The bus display
   goes between the things that share the bus.

## The general principle

Every system should expose its state at the granularity you'll debug it
at. On the bench that's an LED per bit; in firmware it's a status struct
you can dump over serial; on a website it's build output you actually
read. The medium changes, the move doesn't: make the invisible thing
visible *before* it breaks, because afterward you'll be too busy
guessing.
