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
