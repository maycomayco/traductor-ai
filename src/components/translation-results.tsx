import { forwardRef, useCallback } from "react"
import { LoaderParagraph } from "@/components/loader-paragraph"
import type { Translation } from "@/types"
import { TranslationsList } from "./translation-list"

type TranslationsResultsProps = {
  /** Current translation object containing writing, speaking, and coloquial translations */
  readonly translation: Translation | null
  /** Whether the translation is currently being loaded */
  readonly loading: boolean
  /** Callback to notify parent when results area is focused/blurred */
  readonly onResultsAreaFocus?: (focused: boolean) => void
}

/**
 * Component that displays translation results or loading state.
 * Shows a loader while translating and the translation list when complete.
 * Forwards ref to the main container div for focus detection.
 */
export const TranslationsResults = forwardRef<
  HTMLDivElement,
  TranslationsResultsProps
>(function TranslationsResults({ translation, loading, onResultsAreaFocus }, ref) {
  /** Convert translation object to array format expected by TranslationsList */
  function getTranslationEntries(
    translation: Translation,
  ): readonly [string, string][] {
    return Object.entries(translation) as readonly [string, string][]
  }

  const handleResultsAreaFocus = useCallback((): void => {
    onResultsAreaFocus?.(true)
  }, [onResultsAreaFocus])

  const handleResultsAreaBlur = useCallback(
    (event: React.FocusEvent): void => {
      // Only trigger blur if focus is moving outside the results area
      const currentTarget = event.currentTarget as HTMLElement
      if (!currentTarget.contains(event.relatedTarget as Node)) {
        onResultsAreaFocus?.(false)
      }
    },
    [onResultsAreaFocus],
  )

  const translationEntries = translation
    ? getTranslationEntries(translation)
    : []

  return (
    <div 
      ref={ref}
      className="px-8 pt-8 min-h-54"
      tabIndex={-1}
      onFocus={handleResultsAreaFocus}
      onBlur={handleResultsAreaBlur}
    >
      {loading && <LoaderParagraph />}
      {!loading && <TranslationsList translations={translationEntries} />}
    </div>
  )
})
