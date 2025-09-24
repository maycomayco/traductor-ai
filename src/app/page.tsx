"use client"

import { TranslationForm } from "@/components/translation-form"
import { TranslationsResults } from "@/components/translation-results"
import { useTranslation } from "@/hooks/useTranslation"

/**
 * Home page component that serves as the container for the translation application.
 * Manages the overall application state and renders the translation interface.
 */
export default function Home() {
  const { translations, loading, setTranslations, setLoading } =
    useTranslation()

  return (
    <main className="flex-1 container px-4 py-6 max-w-8xl mx-auto">
      <div className="flex border border-gray-200 shadow-xs flex-col lg:flex-row">
        <div className="flex-1 lg:border-r lg:border-b-0 border-b border-gray-200">
          <TranslationForm
            loading={loading}
            setLoading={setLoading}
            setTranslations={setTranslations}
          />
        </div>
        <div className="flex-1">
          <TranslationsResults translation={translations} loading={loading} />
        </div>
      </div>
    </main>
  )
}
