---
title: "LAN receipt printer"
summary: "A thrifted Epson TM-T88 turned network appliance: an ESP32 web server feeds it ESC/POS, so anything on the Wi-Fi can print a note."
period: "2026"
date: 2026-06-10
tech: ["ESP32", "C++", "PlatformIO", "ESC/POS"]
links:
  repo: "https://github.com/AWSOMEDUDE00000090"
coverImage: "../../assets/covers/receipt-printer.svg"
coverImageAlt: "System diagram: a phone connecting over Wi-Fi to an ESP32 board, wired over RS-232 to a TM-T88 receipt printer"
featured: true
order: 2
---

## Concept

A receipt printer is a display that produces artifacts. No ink cartridges,
no drivers worth mentioning, paper by the kilometer for pocket change —
and a print head that's been bulletproof in diners since the nineties.
Mine came from a restaurant-supply liquidation with one dent and zero
problems.

The build puts an ESP32 in front of it: the ESP32 joins the house Wi-Fi,
serves a one-page web UI, and translates whatever you type (or upload)
into ESC/POS bytes over serial. Anyone on the network can leave a note
that exists physically, next to the kettle, with a timestamp.

## The electrical part

The TM-T88 speaks true RS-232 at ±12 V. The ESP32 speaks 3.3 V and will
die defending that opinion. A MAX3232 transceiver bridges them:

```text
ESP32 TX2  → MAX3232 T1IN   → printer RXD
ESP32 RX2  ← MAX3232 R1OUT  ← printer DTR (flow control)
```

Honoring DTR turned out to be non-negotiable — raster images overflow the
printer's buffer instantly without it, and you get modern art instead of
your photo.

## The firmware part

PlatformIO project, three responsibilities:

- **Serve the UI** — a single HTML file in flash with a textarea, an image
  picker, and a big PRINT button.
- **Queue jobs** — a FIFO so two simultaneous prints don't interleave
  bytes. (Discovered empirically. The interleaved output had admirers.)
- **Translate** — text goes out with alignment/size commands; images get
  resized to 384 px, Floyd–Steinberg dithered to 1-bit, and streamed with
  `GS v 0` raster commands.

```cpp
// The whole ESC/POS "driver" is writing bytes with intent:
void cut() { serial.write("\x1D\x56\x42\x00", 4); }   // GS V — partial cut
void center() { serial.write("\x1B\x61\x01", 3); }    // ESC a 1
```

## In service

It has survived months of daily use: shopping lists, doodles from
visiting cousins, a printed haiku pipeline that ran until the novelty
wore off (it hasn't). Thermal paper fades in a year or two — for a
household message board, that's a feature.
