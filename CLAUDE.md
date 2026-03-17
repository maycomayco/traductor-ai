# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Always use `pnpm` never `yarn` or `npm`

Never run `git commit` or `git push` unless explicitly requested.

## Architecture

**TraductorAI** is a Next.js 15 app that translates Spanish text into three English variants (writing, speaking, coloquial) using OpenAI.

### Data flow

```
TranslationForm (client)
  → react-hook-form + Zod validation (min 10, max 350 chars)
  → translation-action.ts (Next.js Server Action)
      → Clerk auth check
      → open-ai.ts (GPT-3.5-turbo, returns {writing, speaking, coloquial} JSON)
  → useTranslation hook (manages translations/loading/error state)
  → TranslationsResults + TranslationsList (display + copy-to-clipboard)
```

### Key patterns

- **Auth**: Clerk middleware protects all routes except `/sign-in` and `/sign-up`. The server action also re-validates auth independently.
- **State**: `useTranslation` hook in `src/hooks/` centralizes translation state; the home page (`app/page.tsx`) owns state and passes setters down to `TranslationForm`.
- **Server Actions**: `src/action/translation-action.ts` is the only server action — it handles auth, sanitization, and OpenAI calls.
- **Styling**: Tailwind CSS v4 with OKLch color variables in `globals.css`. Use `cn()` from `src/lib/utils.ts` for conditional classnames. `src/components/ui/` (shadcn/ui) is excluded from Biome linting.
- **Linter**: Biome is configured in the project.

### TypeScript

Never use `as` (type casting), `any`, or non-null assertion (`!`). Use proper type narrowing, type guards, or fix the types upstream instead.

### Path alias

`@/*` resolves to `src/*` (e.g., `import { cn } from "@/lib/utils"`).
