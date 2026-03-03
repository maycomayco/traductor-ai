"use client"

import { useRef, useState } from "react"
import { TranslationForm } from "@/components/translation-form"
import { TranslationsResults } from "@/components/translation-results"
import { useTranslation } from "@/hooks/useTranslation"

/**
 * Home page component that serves as the container for the translation application.
 * Manages the overall application state and renders the translation interface.
 */
export default function Home() {
  const { translations, loading, error, setTranslations, setLoading, setError } =
    useTranslation()
  const [isFormAreaClicked, setIsFormAreaClicked] = useState(false)
  const [isResultsAreaFocused, setIsResultsAreaFocused] = useState(false)
  const resultsRef = useRef<HTMLDivElement>(null)

  return (
    <main className="flex-1 container px-4 py-6 max-w-8xl mx-auto">
      <div className="flex border border-gray-200 shadow-xs flex-col lg:flex-row">
        <div 
          className={`flex-1 lg:border-r lg:border-b-0 border-b border-gray-200 transition-[box-shadow] duration-200 ${
            isFormAreaClicked 
              ? "ring-2 ring-blue-200/50" 
              : ""
          }`}
        >
          <TranslationForm
            loading={loading}
            setLoading={setLoading}
            setTranslations={setTranslations}
            setError={setError}
            onFormAreaClick={setIsFormAreaClicked}
          />
        </div>
        <div 
          className={`flex-1 transition-[box-shadow] duration-200 ${
            isResultsAreaFocused 
              ? "ring-2 ring-blue-200/50" 
              : ""
          }`}
        >
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
