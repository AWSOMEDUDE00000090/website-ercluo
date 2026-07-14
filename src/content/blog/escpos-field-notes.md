---
title: "ESC/POS field notes: talking to receipt printers in 2026"
description: "A working reference for the ESC/POS commands that matter — alignment, raster images, cutting — collected while networking a TM-T88."
pubDate: 2026-05-22
tags: ["embedded", "esc-pos", "printers"]
---

ESC/POS is the byte protocol receipt printers have spoken since the
eighties, and documentation for it is scattered across vendor PDFs that
each assume you have a different printer. These are the commands that
actually mattered while building the
[networked thermal printer](/projects/networked-thermal-printer/), verified
on a TM-T88.

## The ones you'll use constantly

| Bytes | Name | Effect |
| ----- | ---- | ------ |
| `1B 40` | ESC @ | Reset everything. Start every job with this. |
| `1B 61 n` | ESC a | Align: 0 left, 1 center, 2 right |
| `1D 21 n` | GS ! | Size: low nibble height, high nibble width |
| `1B 45 n` | ESC E | Bold on/off |
| `1D 56 42 00` | GS V | Partial cut (the satisfying one) |

## Printing images

`GS v 0` streams raster data: a header with width in bytes and height in
dots, then one bit per dot, MSB first.

```cpp
uint16_t wBytes = (width + 7) / 8;
uint8_t hdr[] = { 0x1D, 0x76, 0x30, 0x00,
                  (uint8_t)(wBytes & 0xFF), (uint8_t)(wBytes >> 8),
                  (uint8_t)(height & 0xFF), (uint8_t)(height >> 8) };
```

Two things nobody tells you:

1. **Dither before you threshold.** A straight 50% threshold turns photos
   into ink blots. Floyd–Steinberg at the printer's native 384 px width
   looks shockingly good on thermal paper.
2. **Respect the buffer.** Fire raster rows as fast as serial allows and
   the printer drops data mid-image. Honor DTR flow control or chunk with
   small delays.

## Debugging setup

A logic analyzer on the TX line plus a hex dump beats every library's
debug mode. When output looks wrong, it's almost always an unterminated
size or alignment state — which is why every job starts with `ESC @`.

Receipt printers reward this kind of fiddling. The feedback loop is
physical, immediate, and smells faintly of thermal paper.
