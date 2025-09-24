"use client"
import type { Dispatch, SetStateAction } from "react"
import { useState } from "react"
import type { Translation } from "@/types"

/** Hook return type for translation state management */
type UseTranslationReturn = {
  /** Current translation data */
  readonly translations: Translation | null
  /** Whether a translation request is in progress */
  readonly loading: boolean
  /** Function to update the translations state */
  readonly setTranslations: Dispatch<SetStateAction<Translation | null>>
  /** Function to update the loading state */
  readonly setLoading: Dispatch<SetStateAction<boolean>>
}

/**
 * Custom hook to manage translation state and loading status.
 * Centralizes state management for translation functionality.
 */
export function useTranslation(): UseTranslationReturn {
  const [translations, setTranslations] = useState<Translation | null>(null)
  const [loading, setLoading] = useState(false)

  return {
    translations,
    loading,
    setTranslations,
    setLoading,
  } as const
}
