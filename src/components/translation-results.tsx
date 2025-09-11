import { LoaderParagraph } from "@/components/loader-paragraph";
import { TranslationsList } from "./translation-list";
import type { Translation } from "@/types";

type TranslationsResultsProps = {
  /** Current translation object containing writing, speaking, and coloquial translations */
  readonly translation: Translation | null;
  /** Whether the translation is currently being loaded */
  readonly loading: boolean;
};

/**
 * Component that displays translation results or loading state.
 * Shows a loader while translating and the translation list when complete.
 */
export function TranslationsResults({
  translation,
  loading,
}: TranslationsResultsProps) {
  /** Convert translation object to array format expected by TranslationsList */
  function getTranslationEntries(translation: Translation): readonly [string, string][] {
    return Object.entries(translation) as readonly [string, string][];
  }

  const translationEntries = translation ? getTranslationEntries(translation) : [];

  return (
    <div className="px-8 pt-8 min-h-54">
      {loading && <LoaderParagraph />}
      {!loading && <TranslationsList translations={translationEntries} />}
    </div>
  );
}
