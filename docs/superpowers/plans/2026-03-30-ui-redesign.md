# UI Redesign — Brutalist/Retro Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign TraductorAI's visual layer with a brutalist/retro aesthetic: beige background, hard black 2px borders, Google-Translate-inspired blue accent, zero border-radius, Bebas Neue + IBM Plex Mono + Barlow typography.

**Architecture:** Pure visual changes — no logic, hooks, server actions, or Zod schemas touched. All 7 modified files are in `src/`. The font stack is loaded via `next/font/google` and exposed as CSS variables. Color tokens live in `src/app/globals.css` `:root`.

**Tech Stack:** Next.js 15, Tailwind CSS v4, `next/font/google` (Bebas Neue, IBM Plex Mono, Barlow)

---

## File Map

| File | Change |
|------|--------|
| `src/app/globals.css` | New color palette, border-radius → 0, font variable refs |
| `src/app/layout.tsx` | Swap fonts (Geist → Bebas/Mono/Barlow), update footer + body classes |
| `src/components/header.tsx` | Black header, Bebas Neue logo, blue "AI" accent |
| `src/app/page.tsx` | Remove soft focus rings, full-width split border |
| `src/components/translation-form.tsx` | Panel label, brutalist textarea/button, char counter, hint |
| `src/components/translation-results.tsx` | Panel label, adjust padding |
| `src/components/translation-list.tsx` | Card layout, coloquial blue card, `[ copiar ]` button |
| `src/components/loader-paragraph.tsx` | Brutalist skeleton bars (beige bg, black border) |

---

## Task 1: Fonts and CSS Variables

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`

This task establishes the entire design token system. All subsequent tasks depend on these variables.

- [ ] **Step 1: Update `src/app/layout.tsx`** — swap font imports and body classes

Replace the full file with:

```tsx
import { ClerkProvider } from "@clerk/nextjs"
import type { Metadata } from "next"
import { Barlow, Bebas_Neue, IBM_Plex_Mono } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import { ServiceWorkerRegister } from "@/components/service-worker-register"
import { Toaster } from "@/components/ui/sonner"

const bebasNeue = Bebas_Neue({
    weight: "400",
    variable: "--font-bebas",
    subsets: ["latin"],
})

const ibmPlexMono = IBM_Plex_Mono({
    weight: ["400", "700"],
    variable: "--font-mono",
    subsets: ["latin"],
})

const barlow = Barlow({
    weight: ["400", "700", "900"],
    variable: "--font-sans",
    subsets: ["latin"],
})

export const metadata: Metadata = {
    title: "TraductorAI",
    description: "AI powered translator",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <ClerkProvider>
            <html lang="es">
                <body
                    className={`${bebasNeue.variable} ${ibmPlexMono.variable} ${barlow.variable} antialiased`}
                >
                    <div className="flex flex-col min-h-screen">
                        <Header />
                        {children}

                        <footer className="border-t-2 border-[#1a1a1a] py-3 px-8 flex items-center justify-between">
                            <span className="font-mono text-[9px] font-bold tracking-[3px] uppercase text-[#1a1a1a] opacity-30">
                                TraductorAI
                            </span>
                            <span className="font-mono text-[9px] tracking-[1px] text-[#1a1a1a] opacity-30">
                                powered by GPT-3.5
                            </span>
                        </footer>
                    </div>

                    <Toaster richColors visibleToasts={1} />
                    <ServiceWorkerRegister />
                </body>
            </html>
        </ClerkProvider>
    )
}
```

- [ ] **Step 2: Update `src/app/globals.css`** — new palette, zero radius, font refs

Replace the full file with:

```css
@import "tailwindcss";
@import "tw-animate-css";

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-sans);
  --font-mono: var(--font-mono);
  --color-sidebar-ring: var(--sidebar-ring);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar: var(--sidebar);
  --color-ring: var(--ring);
  --color-input: var(--input);
  --color-border: var(--border);
  --color-destructive: var(--destructive);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent: var(--accent);
  --color-muted-foreground: var(--muted-foreground);
  --color-muted: var(--muted);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-secondary: var(--secondary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary: var(--primary);
  --color-popover-foreground: var(--popover-foreground);
  --color-popover: var(--popover);
  --color-card-foreground: var(--card-foreground);
  --color-card: var(--card);
  --radius-sm: 0rem;
  --radius-md: 0rem;
  --radius-lg: 0rem;
  --radius-xl: 0rem;
}

:root {
  --radius: 0rem;
  --background: #f2ede4;
  --foreground: #1a1a1a;
  --card: #ffffff;
  --card-foreground: #1a1a1a;
  --popover: #ffffff;
  --popover-foreground: #1a1a1a;
  --primary: #4a90d9;
  --primary-foreground: #ffffff;
  --secondary: #f2ede4;
  --secondary-foreground: #1a1a1a;
  --muted: #e8e3da;
  --muted-foreground: #666666;
  --accent: #4a90d9;
  --accent-foreground: #ffffff;
  --destructive: #cc3300;
  --border: #1a1a1a;
  --input: #1a1a1a;
  --ring: #4a90d9;
  --sidebar: #f2ede4;
  --sidebar-foreground: #1a1a1a;
  --sidebar-primary: #4a90d9;
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: #e8e3da;
  --sidebar-accent-foreground: #1a1a1a;
  --sidebar-border: #1a1a1a;
  --sidebar-ring: #4a90d9;
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}

@layer utilities {
  .debug {
    @apply border border-red-500;
  }
}
```

- [ ] **Step 3: Verify build compiles**

```bash
pnpm build
```

Expected: Build succeeds with no TypeScript errors. If font names are wrong, Next.js will error — `Bebas_Neue`, `IBM_Plex_Mono`, `Barlow` are the correct `next/font/google` export names.

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css src/app/layout.tsx
git commit -m "feat: brutalist design tokens — beige palette, zero-radius, Bebas/Mono/Barlow fonts"
```

---

## Task 2: Header

**Files:**
- Modify: `src/components/header.tsx`

- [ ] **Step 1: Replace `src/components/header.tsx`**

```tsx
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"

export default function Header() {
  return (
    <header className="bg-[#1a1a1a] border-b-2 border-[#1a1a1a] h-14 flex items-center justify-between px-8 shrink-0">
      <h1 className="font-[family-name:var(--font-bebas)] text-3xl tracking-widest text-[#f2ede4]">
        Traductor<span className="text-[#4a90d9]">AI</span>
      </h1>
      <div className="flex items-center gap-4">
        <SignedOut>
          <SignInButton>
            <button
              type="button"
              className="font-mono text-[10px] font-bold tracking-[2px] uppercase text-[#f2ede4] opacity-60 hover:opacity-100 transition-opacity"
            >
              [ iniciar sesión ]
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-8 h-8 border-2 border-[#4a90d9] rounded-none",
              },
            }}
          />
        </SignedIn>
      </div>
    </header>
  )
}
```

- [ ] **Step 2: Start dev server and verify header renders**

```bash
pnpm dev
```

Open http://localhost:3000. Expected: Black header with `TraductorAI` in Bebas Neue, "AI" in blue, beige page background.

- [ ] **Step 3: Commit**

```bash
git add src/components/header.tsx
git commit -m "feat: brutalist header — black bg, Bebas Neue logo, blue AI accent"
```

---

## Task 3: Page Layout

**Files:**
- Modify: `src/app/page.tsx`

Remove the soft focus ring states (blue-200 rings don't fit the brutalist aesthetic) and make the split panel fill the full page width.

- [ ] **Step 1: Replace `src/app/page.tsx`**

```tsx
"use client"

import { useRef, useState } from "react"
import { TranslationForm } from "@/components/translation-form"
import { TranslationsResults } from "@/components/translation-results"
import { useTranslation } from "@/hooks/useTranslation"

export default function Home() {
  const { translations, loading, error, setTranslations, setLoading, setError } =
    useTranslation()
  const [isFormAreaClicked, setIsFormAreaClicked] = useState(false)
  const [isResultsAreaFocused, setIsResultsAreaFocused] = useState(false)
  const resultsRef = useRef<HTMLDivElement>(null)

  return (
    <main className="flex-1 flex flex-col">
      <div className="flex flex-1 flex-col lg:flex-row border-b-2 border-[#1a1a1a]">
        <div className="flex-1 lg:border-r-2 lg:border-b-0 border-b-2 border-[#1a1a1a]">
          <TranslationForm
            loading={loading}
            setLoading={setLoading}
            setTranslations={setTranslations}
            setError={setError}
            onFormAreaClick={setIsFormAreaClicked}
          />
        </div>
        <div className="flex-1">
          <TranslationsResults
            ref={resultsRef}
            translation={translations}
            loading={loading}
            error={error}
            onResultsAreaFocus={setIsResultsAreaFocused}
          />
        </div>
      </div>
    </main>
  )
}
```

- [ ] **Step 2: Verify layout in browser**

With `pnpm dev` running, open http://localhost:3000. Expected: Two panels side-by-side on desktop, separated by a hard 2px black border. No shadow, no soft ring. Fills full height.

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: brutalist page layout — full-width split, hard borders, no focus rings"
```

---

## Task 4: Translation Form

**Files:**
- Modify: `src/components/translation-form.tsx`

Adds panel label (`ESPAÑOL →`), brutalist textarea styling, character counter, brutalist button, and hint text. The form logic, validation, and keyboard shortcut are unchanged.

- [ ] **Step 1: Replace `src/components/translation-form.tsx`**

```tsx
import { zodResolver } from "@hookform/resolvers/zod"
import type { Dispatch, SetStateAction } from "react"
import { useCallback, useRef } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { getTranslations } from "@/action/translation-action"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import type { Translation } from "@/types"

const translationFormSchema = z.object({
    query: z
        .string()
        .min(10, "El texto debe tener al menos 10 caracteres")
        .max(350, "El texto no puede exceder 350 caracteres"),
})

type TranslationFormData = z.infer<typeof translationFormSchema>

type TranslationFormProps = {
    readonly loading: boolean
    readonly setLoading: Dispatch<SetStateAction<boolean>>
    readonly setTranslations: Dispatch<SetStateAction<Translation | null>>
    readonly setError: Dispatch<SetStateAction<string | null>>
    readonly onFormAreaClick?: (clicked: boolean) => void
}

export function TranslationForm({
    loading,
    setLoading,
    setTranslations,
    setError,
    onFormAreaClick,
}: TranslationFormProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const formAreaRef = useRef<HTMLDivElement>(null)

    const form = useForm<TranslationFormData>({
        resolver: zodResolver(translationFormSchema),
        defaultValues: { query: "" },
    })

    const query = form.watch("query")

    const handleFormAreaClick = useCallback((): void => {
        onFormAreaClick?.(true)
        textareaRef.current?.focus()
    }, [onFormAreaClick])

    const handleFormAreaBlur = useCallback(
        (event: React.FocusEvent): void => {
            if (!formAreaRef.current?.contains(event.relatedTarget as Node)) {
                onFormAreaClick?.(false)
            }
        },
        [onFormAreaClick],
    )

    const handleSubmit = useCallback(
        async (values: TranslationFormData) => {
            const formData = new FormData()
            formData.append("query", values.query)
            setTranslations(null)
            setError(null)
            try {
                setLoading(true)
                const { error, success, translations } = await getTranslations(formData)
                if (success && translations) {
                    setTranslations(translations)
                } else {
                    const message = error ?? "Ocurrió un error al procesar la traducción"
                    setError(message)
                    toast.error(message)
                }
            } catch {
                const message = "Ocurrió un error al procesar la traducción"
                setError(message)
                toast.error(message)
            } finally {
                setLoading(false)
            }
        },
        [setLoading, setTranslations, setError],
    )

    const handleTextareaKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
            if (e.metaKey && e.key === "Enter" && form.formState.isValid && !loading) {
                e.preventDefault()
                form.handleSubmit(handleSubmit)()
            }
        },
        [form, loading, handleSubmit],
    )

    return (
        <div
            className="p-8 flex flex-col gap-5 h-full"
            ref={formAreaRef}
            onClick={handleFormAreaClick}
            onBlur={handleFormAreaBlur}
            tabIndex={-1}
        >
            {/* Panel label */}
            <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] font-bold tracking-[3px] uppercase text-[#1a1a1a] shrink-0">
                    Español →
                </span>
                <div className="flex-1 h-px bg-[#1a1a1a] opacity-20" />
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-5">
                    <FormField
                        control={form.control}
                        name="query"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="relative border-2 border-[#1a1a1a] bg-white">
                                        <textarea
                                            aria-label="Texto a traducir"
                                            className="w-full min-h-[160px] p-4 font-sans text-base leading-relaxed text-[#1a1a1a] bg-transparent border-0 resize-none outline-none placeholder:text-[#aaa] placeholder:italic disabled:opacity-50"
                                            placeholder="Escribe el texto que quieres traducir..."
                                            disabled={loading}
                                            ref={(el) => {
                                                textareaRef.current = el
                                                field.ref(el)
                                            }}
                                            onKeyDown={handleTextareaKeyDown}
                                            onBlur={field.onBlur}
                                            name={field.name}
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                        <span className="absolute bottom-2.5 right-3.5 font-mono text-[9px] text-[#aaa] tracking-[1px]">
                                            {query.length} / 350
                                        </span>
                                    </div>
                                </FormControl>
                                <FormMessage className="font-mono text-[10px] tracking-[1px] text-[#cc3300]" />
                            </FormItem>
                        )}
                    />

                    <button
                        type="submit"
                        disabled={loading || !form.formState.isValid}
                        className="w-full bg-[#4a90d9] hover:bg-[#2d6bb0] disabled:opacity-40 border-2 border-[#1a1a1a] px-6 py-3.5 font-mono text-[11px] font-bold tracking-[3px] uppercase text-white flex items-center justify-between transition-colors cursor-pointer disabled:cursor-not-allowed"
                    >
                        <span>{loading ? "Traduciendo…" : "Traducir"}</span>
                        <span className="text-[10px] opacity-70 tracking-[1px]">⌘ + ↵</span>
                    </button>

                    <span className="font-mono text-[10px] tracking-[1px] text-[#1a1a1a] opacity-40">
                        Mínimo 10 caracteres · Máximo 350
                    </span>
                </form>
            </Form>
        </div>
    )
}
```

- [ ] **Step 2: Verify in browser**

With `pnpm dev` running, open http://localhost:3000. Expected: Left panel shows `ESPAÑOL →` label, white textarea with hard border, blue button with `⌘ + ↵`, character counter bottom-right of textarea, hint text below button.

- [ ] **Step 3: Commit**

```bash
git add src/components/translation-form.tsx
git commit -m "feat: brutalist translation form — panel label, hard-border textarea, char counter"
```

---

## Task 5: Translation Results Panel

**Files:**
- Modify: `src/components/translation-results.tsx`

Adds the `← INGLÉS` panel label and adjusts padding to match the left panel.

- [ ] **Step 1: Replace `src/components/translation-results.tsx`**

```tsx
import { forwardRef, useCallback } from "react"
import { LoaderParagraph } from "@/components/loader-paragraph"
import type { Translation } from "@/types"
import { TranslationsList } from "./translation-list"

type TranslationsResultsProps = {
  readonly translation: Translation | null
  readonly loading: boolean
  readonly error: string | null
  readonly onResultsAreaFocus?: (focused: boolean) => void
}

function getTranslationEntries(
  translation: Translation,
): readonly [string, string][] {
  return Object.entries(translation) as readonly [string, string][]
}

export const TranslationsResults = forwardRef<
  HTMLDivElement,
  TranslationsResultsProps
>(function TranslationsResults({ translation, loading, error, onResultsAreaFocus }, ref) {
  const handleResultsAreaFocus = useCallback((): void => {
    onResultsAreaFocus?.(true)
  }, [onResultsAreaFocus])

  const handleResultsAreaBlur = useCallback(
    (event: React.FocusEvent): void => {
      const currentTarget = event.currentTarget as HTMLElement
      if (!currentTarget.contains(event.relatedTarget as Node)) {
        onResultsAreaFocus?.(false)
      }
    },
    [onResultsAreaFocus],
  )

  const translationEntries = translation ? getTranslationEntries(translation) : []

  function renderContent() {
    if (loading) return <LoaderParagraph />
    if (error) return (
      <p className="font-mono text-[11px] tracking-[1px] text-[#cc3300]">
        No se pudo completar la traducción. Intenta de nuevo.
      </p>
    )
    return <TranslationsList translations={translationEntries} />
  }

  return (
    <div
      ref={ref}
      className="p-8 flex flex-col gap-5 min-h-54"
      tabIndex={-1}
      onFocus={handleResultsAreaFocus}
      onBlur={handleResultsAreaBlur}
      aria-live="polite"
      aria-atomic="true"
    >
      {/* Panel label */}
      <div className="flex items-center gap-3">
        <span className="font-mono text-[10px] font-bold tracking-[3px] uppercase text-[#1a1a1a] shrink-0">
          ← Inglés
        </span>
        <div className="flex-1 h-px bg-[#1a1a1a] opacity-20" />
      </div>

      {renderContent()}
    </div>
  )
})
```

- [ ] **Step 2: Verify in browser**

Open http://localhost:3000. Expected: Right panel shows `← INGLÉS` label aligned with the left panel's label.

- [ ] **Step 3: Commit**

```bash
git add src/components/translation-results.tsx
git commit -m "feat: brutalist results panel — panel label, consistent padding"
```

---

## Task 6: Translation List (Result Cards)

**Files:**
- Modify: `src/components/translation-list.tsx`

Replaces the divider-based layout with individual cards. The `coloquial` card gets a solid blue background with white text.

- [ ] **Step 1: Replace `src/components/translation-list.tsx`**

```tsx
import { toast } from "sonner"

type TranslationsListProps = {
  readonly translations: readonly [string, string][]
}

export function TranslationsList({ translations }: TranslationsListProps) {
  async function handleCopy(text: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text)
      toast.success("Texto copiado al portapapeles")
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {translations.map((translation, idx) => {
        const key = translation[0]
        const value = translation[1]
        const isColoquial = key.toLowerCase() === "coloquial"

        return (
          <div
            key={idx + key}
            className={`border-2 flex flex-col ${
              isColoquial
                ? "border-[#4a90d9] bg-[#4a90d9]"
                : "border-[#1a1a1a] bg-white"
            }`}
          >
            {/* Card header */}
            <div
              className={`flex items-center justify-between px-3.5 py-2 border-b-2 ${
                isColoquial ? "border-[rgba(255,255,255,0.3)]" : "border-[#1a1a1a]"
              }`}
            >
              <span
                className={`font-mono text-[9px] font-bold tracking-[3px] uppercase ${
                  isColoquial ? "text-[rgba(255,255,255,0.8)]" : "text-[#4a90d9]"
                }`}
              >
                {key}
              </span>
              <button
                type="button"
                className={`font-mono text-[9px] tracking-[1px] border-0 bg-transparent cursor-pointer hover:opacity-100 transition-opacity opacity-30 ${
                  isColoquial ? "text-white" : "text-[#1a1a1a]"
                }`}
                onClick={() => handleCopy(value)}
                aria-label={`Copiar traducción: ${value}`}
              >
                [ copiar ]
              </button>
            </div>

            {/* Card body */}
            <div
              className={`px-4 py-3.5 font-sans text-sm leading-relaxed ${
                isColoquial ? "text-white font-bold" : "text-[#1a1a1a]"
              }`}
            >
              {value}
            </div>
          </div>
        )
      })}
    </div>
  )
}
```

- [ ] **Step 2: Verify in browser — submit a translation**

Open http://localhost:3000, type at least 10 characters, click Traducir. Expected: Three cards appear — Writing and Speaking with white bg + black border, Coloquial with blue bg + white bold text. Each card has a label tag and `[ copiar ]` button.

- [ ] **Step 3: Commit**

```bash
git add src/components/translation-list.tsx
git commit -m "feat: brutalist result cards — coloquial blue card, monospace copy button"
```

---

## Task 7: Loader Skeleton

**Files:**
- Modify: `src/components/loader-paragraph.tsx`

Removes rounded corners and gray background from skeleton lines; uses beige+black border style to match the design system.

- [ ] **Step 1: Replace `src/components/loader-paragraph.tsx`**

```tsx
type LoaderParagraphProps = {
  readonly paragraphs?: number
  readonly linesPerParagraph?: number
}

export function LoaderParagraph({
  paragraphs = 3,
  linesPerParagraph = 2,
}: LoaderParagraphProps) {
  return (
    <div
      className="flex motion-safe:animate-pulse flex-col gap-4"
      role="status"
      aria-label="Cargando contenido de traducción"
    >
      {Array.from({ length: paragraphs }, (_, paragraphIndex) => (
        <div key={paragraphIndex} className="border-2 border-[#1a1a1a] bg-white">
          <div className="px-3.5 py-2 border-b-2 border-[#1a1a1a]">
            <div className="h-2 bg-[#e8e3da] w-16" />
          </div>
          <div className="px-4 py-3.5 flex flex-col gap-2">
            {Array.from({ length: linesPerParagraph }, (_, lineIndex) => {
              const isLastLine = lineIndex === linesPerParagraph - 1
              return (
                <div
                  key={lineIndex}
                  className={`h-2 bg-[#e8e3da] ${isLastLine ? "w-4/5" : "w-full"}`}
                />
              )
            })}
          </div>
        </div>
      ))}
      <span className="sr-only">Cargando...</span>
    </div>
  )
}
```

- [ ] **Step 2: Verify loading state in browser**

Temporarily slow the network in devtools (Network tab → Slow 3G) and submit a translation. Expected: Skeleton cards appear as bordered white cards with beige placeholder bars pulsing, matching the card structure of the result cards.

- [ ] **Step 3: Final build check**

```bash
pnpm build
```

Expected: Clean build with no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/loader-paragraph.tsx
git commit -m "feat: brutalist loader skeleton — card-shaped with beige placeholder bars"
```
