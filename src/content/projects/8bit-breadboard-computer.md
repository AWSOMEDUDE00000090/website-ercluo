---
title: "8-bit breadboard computer"
summary: "A complete 8-bit CPU built from 74LS-series logic on fourteen breadboards — clock, registers, ALU, RAM, and a microcoded control unit."
period: "2025–2026"
date: 2026-02-01
tech: ["74LS logic", "EEPROM", "Assembly", "Electronics"]
role: "Everything except the electrons"
links:
  repo: "https://github.com/AWSOMEDUDE00000090"
coverImage: "../../assets/covers/breadboard-computer.svg"
coverImageAlt: "Illustration of a breadboard with three ICs, jumper wires, and a row of output LEDs"
featured: true
order: 1
---

## Why

You can learn computer architecture from a textbook, or you can spend a year
of weekends finding out *exactly* which control line you forgot to hook up.
I chose the second option. The design follows the classic SAP-1 lineage
(program counter, A and B registers, ALU, RAM, output register) extended
with a proper flags register and conditional jumps.

## Architecture

| Module | Chips | Notes |
| ------ | ----- | ----- |
| Clock | 555 ×3 | Astable, monostable, and manual-step modes |
| Registers | 74LS173 | A, B, instruction, and output |
| ALU | 74LS283 + 74LS86 | Add/subtract via XOR-inverted B |
| RAM | 74LS189 | 16 bytes. Yes, bytes. |
| Control | 2× AT28C64 EEPROM | Microcode, 16 control lines |

The bus is eight lines across the top of every board, and *everything*
talks over it through tri-state buffers. The single most useful debugging
habit I picked up: put an LED on every register output, always. Blinkenlights
aren't decoration; they're the only observability layer you get.

## The microcode

Each instruction decodes to up to five microsteps. The control EEPROMs take
the opcode and step counter as address bits and emit the control word:

```text
LDA: MI|CO, RO|II|CE, IO|MI, RO|AI
ADD: MI|CO, RO|II|CE, IO|MI, RO|BI, EO|AI|FI
JC : MI|CO, RO|II|CE, (carry ? IO|J : none)
```

I wrote a small Python script that assembles these tables and spits out a
binary for the programmer, which beat hand-typing 2 KB of hex into a TL866
by roughly one lifetime.

## What went wrong (selected)

- **Floating inputs.** 74LS inputs read high when disconnected — until they
  don't. Two days lost to a "random" instruction register.
- **Power distribution.** Fourteen breadboards on one supply rail droop
  enough to corrupt RAM. Star-wiring the power fixed it.
- **The clock edge.** My RAM module wrote on the wrong half of the cycle.
  The fix was a single inverter; the diagnosis was a weekend with a logic
  analyzer.

## Where it landed

It runs programs. Fibonacci up to 233 (8 bits — it overflows with dignity),
a multiply routine, and a counter that exists purely because the output
register looks great counting. Next iteration gets more RAM and a proper
PCB — the breadboard version is staying assembled as furniture.
