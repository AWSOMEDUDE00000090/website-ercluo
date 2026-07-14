---
title: "Stepper synth"
summary: "Four stepper motors playing four-part harmony — an Arduino sequencer that turns step pulses into pitch, inspired by Love Hultén's MO4."
period: "2024"
date: 2024-06-01
tech: ["Arduino", "C++", "Electronics", "Audio"]
coverImage: "../../assets/covers/stepper-synth.svg"
coverImageAlt: "Illustration of a stepper motor next to a square-wave signal annotated with musical notes"
featured: false
---

## Origin

A stepper motor whines at whatever frequency you step it. Step it at
261.6 Hz and it hums middle C. Love Hultén's [MO4](https://www.lovehulten.com/mo4.html)
turned that into furniture-grade art; my version turned it into a weekend
that became a month.

## Build

Four NEMA 17s on A4988 drivers, an Arduino Nano doing direct port
manipulation to keep four independent step frequencies stable. The
"synth" part is a lookup table from MIDI note number to timer interval,
and a hand-rolled sequencer format that lives in flash:

```cpp
// One voice of the four. Timer ISR toggles the STEP pin.
struct Voice {
  volatile uint16_t halfPeriodUs;  // 0 = rest
  uint8_t stepPin;
};
```

Motors are bolted to a pine board, which acts as a soundboard — unbolted,
they're barely audible; bolted, the whole desk plays Bach.

## What I learned

Timing is everything and `digitalWrite()` is nothing. The first version
used it and drifted audibly sharp under load; direct port writes inside
timer ISRs fixed the intonation. Also: microstepping smooths the tone into
something almost sine-like, while full steps sound gloriously like an
angry robot choir. I kept full steps.
