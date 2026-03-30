# TraductorAI — UI Redesign Spec
**Date:** 2026-03-30
**Status:** Approved

## Overview

Complete visual redesign of TraductorAI with a brutalist/retro aesthetic inspired by the app's favicon (Google Translate palette). No architectural changes — only visual layer (CSS, markup structure, fonts).

## Design System

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--beige` | `#f2ede4` | Page background, footer |
| `--black` | `#1a1a1a` | Header bg, borders, text |
| `--blue` | `#4a90d9` | Translate button, result tags, Coloquial card fill |
| `--blue-dark` | `#2d6bb0` | Button hover state |
| `--white` | `#ffffff` | Input bg, Writing/Speaking card bg |

### Typography

| Role | Font | Weight | Notes |
|------|------|--------|-------|
| Logo | Bebas Neue | 400 | Letter-spacing 2px |
| UI Labels | IBM Plex Mono | 700 | All caps, letter-spacing 3px |
| Body / Input | Barlow | 400 | Line-height 1.6 |
| Button | IBM Plex Mono | 700 | All caps, letter-spacing 3px |

All fonts loaded from Google Fonts.

### Borders & Radius

- **All borders:** `2px solid #1a1a1a` — no exceptions
- **Border radius:** 0 everywhere — hard corners throughout
- Coloquial card border: `2px solid #4a90d9`

## Layout

Two-column split layout (existing structure preserved):

```
┌─────────────────────────────────────────┐
│  HEADER: Logo left · Avatar right        │ h=56px, bg=#1a1a1a
├──────────────────┬──────────────────────┤
│  LEFT PANEL      │  RIGHT PANEL         │ border-right: 2px solid
│  · Label ESPAÑOL │  · Label INGLÉS      │
│  · Textarea      │  · Card: WRITING     │
│  · Button        │  · Card: SPEAKING    │
│  · Hint text     │  · Card: COLOQUIAL   │
├──────────────────┴──────────────────────┤
│  FOOTER: brand left · "powered by" right│ border-top: 2px solid
└─────────────────────────────────────────┘
```

Responsive: stacks to single column on mobile (existing `lg:flex-row` pattern).

## Components

### Header (`header.tsx`)
- Background: `#1a1a1a`
- Logo: Bebas Neue, `TraductorAI` with `AI` in `#4a90d9`
- Right side: Clerk `UserButton` styled with `#4a90d9` avatar ring

### TranslationForm (`translation-form.tsx`)
- Panel label: IBM Plex Mono, 10px, 3px letter-spacing, all-caps, `ESPAÑOL →`
- Textarea: white bg, 2px black border, Barlow 15px, no resize, no border-radius
- Character counter: absolute bottom-right, IBM Plex Mono 9px, gray
- Submit button: full-width, blue bg, black 2px border, IBM Plex Mono uppercase, shortcut `⌘ + ↵` right-aligned
- Hint text: IBM Plex Mono 10px, 40% opacity

### TranslationResults / TranslationList (`translation-results.tsx`, `translation-list.tsx`)
- Panel label: IBM Plex Mono, 10px, all-caps, `← INGLÉS`
- Each translation displayed as a card with:
  - **Header row:** label tag (IBM Plex Mono, blue) + `[ copiar ]` copy button (monospace, low opacity)
  - **Body:** Barlow 14px, 1.6 line-height
- **Writing & Speaking cards:** white bg, black border
- **Coloquial card:** blue bg (`#4a90d9`), blue border, white text, bold

### LoaderParagraph (`loader-paragraph.tsx`)
- Skeleton lines styled as beige bars with `#1a1a1a` border, animated pulse
- No rounded corners

### Footer (`layout.tsx`)
- `border-top: 2px solid #1a1a1a`
- Beige bg, two labels in IBM Plex Mono 9px at 30% opacity: `TraductorAI` left, `powered by GPT-3.5` right

## globals.css Changes

Replace current CSS variables with the new palette tokens. Add `@import` for Google Fonts (Bebas Neue, IBM Plex Mono, Barlow). Remove border-radius variables or set all to `0`.

## What Does NOT Change

- All logic, hooks, server actions, Zod schemas — untouched
- Clerk auth integration
- PWA / service worker
- Accessibility attributes (aria-live, sr-only, etc.)
- Keyboard shortcut (Cmd+Enter)
- Toast notifications (Sonner)

## Files to Modify

1. `app/globals.css` — CSS variables, font imports
2. `app/layout.tsx` — footer markup and classes
3. `src/components/header.tsx` — logo, styling
4. `src/components/translation-form.tsx` — textarea, button, labels
5. `src/components/translation-results.tsx` — panel wrapper
6. `src/components/translation-list.tsx` — result cards, copy button
7. `src/components/loader-paragraph.tsx` — skeleton style
