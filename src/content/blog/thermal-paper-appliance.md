---
title: "The case for the single-purpose appliance"
description: "A receipt printer that only prints notes is more useful than an app that does everything. Notes on building the LAN printer and why constraints made it good."
pubDate: 2026-05-14
tags: ["embedded", "printers", "design"]
---

The [LAN receipt printer](/projects/lan-receipt-printer/) does one thing.
You type a note on a web page, and it appears on paper in the kitchen.
No accounts, no history, no read receipts, no app. It has been the most
used thing I've ever built, and I think the reasons generalize.

## Constraints did the design work

A receipt printer can't notify you. It can't buzz, can't badge, can't
interrupt dinner. Someone sees the note when they walk past the kettle —
which is somehow the correct delivery semantics for "we're out of
oatmeal" in a way no messaging app has managed.

The 384-pixel-wide, 1-bit display forced every remaining decision:

- **Text wants to be big.** Double-height ESC/POS text is legible from
  across the room. The web UI defaults to it.
- **Images must be dithered.** Floyd–Steinberg at 1-bit makes photos
  look like newsprint — a limitation that reads as a style.
- **Output is append-only.** You can't edit a printed note. People write
  differently when it's permanent-ish. Better, mostly.

## The firmware is boring on purpose

An ESP32 runs a web server, a job queue, and a byte translator, and
that's the entire system:

```cpp
// The queue exists because two people once printed simultaneously
// and produced a receipt that read like a ransom note.
QueueHandle_t jobs = xQueueCreate(8, sizeof(PrintJob));
```

No cloud relay, no MQTT broker, no firmware OTA pipeline for a device I
can reach with a ladder — I mean a chair. Every component I didn't add
is a component that has never woken me up.

## The lesson I keep relearning

Feature count is a cost, not a value. The printer is good *because* it
can't do anything else. The next time a project brief starts growing
bullet points, I'm printing this post and taping it to the monitor —
which, conveniently, I have a machine for.
