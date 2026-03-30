"use client"

import { useRef } from "react"
import { TranslationForm } from "@/components/translation-form"
import { TranslationsResults } from "@/components/translation-results"
import { useTranslation } from "@/hooks/useTranslation"

export default function Home() {
  const { translations, loading, error, setTranslations, setLoading, setError } =
    useTranslation()
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
          />
        </div>
        <div className="flex-1">
          <TranslationsResults
            ref={resultsRef}
            translation={translations}
            loading={loading}
            error={error}
          />
        </div>
      </div>
    </main>
  )
}
