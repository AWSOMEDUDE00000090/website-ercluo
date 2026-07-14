---
title: "Networked thermal printer"
summary: "An Epson TM-T88 receipt printer wired to an ESP32 so anyone on the LAN can print notes, doodles, and to-do lists from a web page."
period: "2026"
date: 2026-06-15
tech: ["ESP32", "C++", "PlatformIO", "ESC/POS", "Web"]
links:
  repo: "https://github.com/AWSOMEDUDE00000090"
coverImage: "../../assets/covers/thermal-printer.svg"
coverImageAlt: "Illustration of a receipt printer printing a receipt, with Wi-Fi waves beside it"
featured: true
order: 2
---

## The pitch

Receipt printers are the best output device nobody uses: instant, silent-ish,
no ink, and paper that curls with intent. I picked up a used Epson TM-T88
— the diner-grade workhorse — and put an ESP32 in front of its serial port
so it lives on the network as a tiny print appliance.

Text a note to the house, and it emerges as a physical artifact next to the
coffee maker. It's the group chat, but with provenance.

## How it works

```
phone/laptop ──HTTP──▶ ESP32 (web UI + queue) ──RS-232──▶ TM-T88
```

The ESP32 serves a small single-page UI from flash, exposes a `/print`
endpoint, and translates requests into ESC/POS — the ancient, wonderful
byte protocol every receipt printer still speaks:

```cpp
// Center, double-height header, then reset.
static const uint8_t HEADER[] = {
  0x1B, 0x61, 0x01,       // ESC a 1  → center align
  0x1D, 0x21, 0x01,       // GS ! 1   → double height
};
printer.write(HEADER, sizeof(HEADER));
printer.print(title);
printer.write(0x1B); printer.write('@');  // ESC @ → reset
```

Images get dithered to 1-bit on the ESP32 (Floyd–Steinberg, 384 px wide)
and shipped as raster data with `GS v 0`. Watching a photo emerge line by
thermal line does not get old.

## Details that mattered

- **Level shifting.** The TM-T88 is real RS-232 (±12 V), not TTL serial.
  A MAX3232 sits between it and the ESP32 — the first board I let out the
  magic smoke on skipped this step.
- **Flow control.** Long prints overflow the printer buffer without DTR
  handshaking. Honoring it made large raster jobs reliable.
- **A queue.** Two people printing simultaneously interleaves bytes and
  produces abstract art. A small FIFO in RAM fixed it, though the abstract
  art had fans.

## State of the build

Daily-driver stable. The paper spool sits in a 3D-printed bracket, and the
web UI has exactly three controls — text, image, cut — which is three more
than a receipt printer ever expected to have.
