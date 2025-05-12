"use client";

import { useState } from "react";
import { useTranslationGPT } from "@/hooks/useTranslation";
import { TranslationForm } from "@/components/translation-form";
import { TranslationsResults } from "@/components/translation-results";

export default function Home() {
  const [textareaValue, setTextareaValue] = useState("");
  const { translation, loading, getTranslation } = useTranslationGPT({
    query: textareaValue,
  });

  const setQuery = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(event.target.value);
  };
  return (
    <main className="flex-1 container mx-auto px-4 py-6">
      <div className="flex flex-col gap-8">
        <TranslationForm
          getTranslation={getTranslation}
          isLoading={loading}
          setQuery={setQuery}
        />
        <TranslationsResults loading={loading} translation={translation} />
      </div>
    </main>
  );
}
