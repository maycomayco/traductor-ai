"use client";

import { useState } from "react";
import { TranslationsResults } from "@/components/translation-results";

import TranslationForm from "@/components/translation-form";
import { type Translation } from "@/types";

export default function Home() {
  const [translations, setTranslations] = useState<Translation | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <main className="flex-1 container px-4 py-6 max-w-4xl mx-auto">
      <div className="flex flex-col gap-8">
        <section>
          <TranslationForm
            loading={loading}
            setLoading={setLoading}
            setTranslations={setTranslations}
          />
        </section>

        {translations && (
          <section className="flex flex-col gap-6">
            <TranslationsResults translation={translations} loading={loading} />
          </section>
        )}
      </div>
    </main>
  );
}
