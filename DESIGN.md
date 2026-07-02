# DESIGN.md — SINAG Portfolio

Visual system captured from the shipped code. Follow these tokens; don't invent parallel ones.

## Color

| Token | Value | Use |
|---|---|---|
| `black` | `#000000` | Page background (html, body, all sections) |
| `surface-1` | `#080808` / `#0a0a0a` | Contact panels |
| `surface-2` | `#0c0c0c` | Credential cards |
| `surface-3` | `#101010` | About card, project cards |
| `surface-4` | `#212121` | Service / process cards |
| `primary` | `#DEDBC8` (Tailwind `primary`) | THE accent: headings, CTAs, cursor, labels |
| `primary-bright` | `#E1E0CC` | Display type (hero wordmark, stats numbers) |
| hairlines | `rgba(255,255,255,0.04–0.12)` | Borders, dividers, grid patterns |
| availability | `emerald-400/500` | Pulse dot only |
| issuer accents | per-badge (AWS orange, IBM blue, Cisco cyan, CompTIA red) | Credentials chips only |

Rules: cream is the single light source; no gradients except black fade overlays and the process progress rail. Text on black: small text ≥ `primary/60` or `gray-500`; never `gray-600`/`gray-700` below 14px.

## Typography

- **Body/display:** Almarai (300/400/700/800 loaded — note: `font-medium` renders as 400).
- **Emphasis:** Instrument Serif *italic only* (`font-serif italic`), always as the second segment of a heading at ~70–75% primary opacity.
- Hero wordmark: viewport-scaled (`text-[26vw]`…), `tracking-[-0.07em]`, `leading-[0.85]` — brand identity, keep.
- Section headings: `text-2xl → text-4xl`, normal weight, two-tone (cream + serif-italic muted).
- Micro labels: `text-[10px]`–`xs`, `tracking-widest uppercase`, cream — the established section grammar.

## Layout

- Sections: `py-24 md:py-36`, `px-4 md:px-6`, content `max-w-6xl`/`max-w-7xl mx-auto`.
- Cards + hero container: `rounded-2xl md:rounded-[2rem]`.
- Grids: tight `gap-3` for media grids; `gap-4 md:gap-6` for card rows.
- Anchored sections need `scroll-margin-top` (floating nav).

## Motion

- Library: framer-motion. Signature ease: `[0.22, 1, 0.36, 1]` (and `[0.16, 1, 0.3, 1]` in hero). Durations 0.7–0.9s, staggers 0.08–0.15s.
- Vocabulary: per-word pull-up reveals (`WordsPullUp*`), scroll-linked per-char opacity (`AnimatedLetter`), 3D tilt + glare (`TiltCard`, ±5–7°), count-up stats, CSS marquee (Credentials), simplex-noise waves (About).
- Custom cursor: cream dot + spring-lagged ring; fine-pointer devices only.
- `MotionConfig reducedMotion="user"` at app root; CSS animations must have reduced-motion fallbacks.

## Components

- CTA pill: cream `rounded-full` pill, `pl-5 pr-1 py-1`, label + black circular arrow chip, `hover:gap-3` + arrow scale. Reuse for every primary action.
- Chips/badges: `rounded-full`, `text-[9px]–[10px]`, translucent black bg + hairline border.
- Availability indicator: pulsing emerald dot + tiny label.
- Toasts: fixed bottom-center pill, `rgba(14,14,14,0.95)` + hairline.
