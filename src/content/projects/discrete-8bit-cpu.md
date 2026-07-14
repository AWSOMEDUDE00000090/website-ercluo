---
title: "Discrete 8-bit CPU"
summary: "A working computer built gate-by-gate from 74LS chips: bus architecture, microcoded control, and sixteen whole bytes of RAM."
period: "2025–2026"
date: 2026-01-20
tech: ["74LS logic", "EEPROM", "Assembly", "KiCad"]
role: "Design, wiring, microcode, debugging, more debugging"
links:
  repo: "https://github.com/AWSOMEDUDE00000090"
coverImage: "../../assets/covers/breadboard-cpu.svg"
coverImageAlt: "Block diagram of an 8-bit CPU: six modules connected to a central bus, with dashed copper control lines"
featured: true
order: 1
---

## Premise

I wanted to lose the ability to say "the computer just does it." The way
to lose it is to build the computer, so I did — an 8-bit CPU in the SAP
lineage, spread across fourteen breadboards: program counter, two
registers, an adder/subtractor ALU, sixteen bytes of RAM, an instruction
register, and a microcoded control unit driving it all over a shared bus.

## The architecture, briefly

Everything is a bus citizen. A module can assert onto the eight bus lines
through tri-state buffers, or latch from them, and the control word says
who talks and who listens on each clock tick:

```text
FETCH:  MI CO   →  RO II CE
LDA x:  IO MI   →  RO AI
ADD x:  IO MI   →  RO BI  →  EO AI FI
OUT:    AO OI
```

Two EEPROMs hold the microcode; opcode plus step counter goes in on the
address pins, sixteen control lines come out. Writing the microcode
assembler in Python (rather than hand-typing hex) is the single decision
I'd defend in court.

## Selected disasters

1. **The phantom opcode.** A floating input on the instruction register
   read `0x00` on Tuesdays and `0x40` in the afternoon sun. TTL inputs
   are not optional. Tie them off.
2. **Brownout memory.** All fourteen boards on one daisy-chained rail
   drooped enough under LED load to scramble RAM. Star power distribution
   from a single bench supply node fixed it permanently.
3. **Write-cycle roulette.** RAM latched on the wrong clock phase and
   occasionally stored the *next* bus value. One 74LS04 inverter, one
   weekend of my life.

## Verdict

It computes Fibonacci until 8 bits give out, multiplies by repeated
addition, and makes a very convincing desk ornament between programs.
Follow-up plan: same architecture on a real PCB with 256 bytes and a
proper reset circuit — the KiCad files are already started.
