import { LoaderParagraph } from "@/components/loader-paragraph";
import TranslationsList from "./translation-list";
import { type Translation } from "@/types";

type TranslationsResultsProps = {
  translation: Translation;
  loading: boolean;
};

export const TranslationsResults = ({
  translation,
  loading,
}: TranslationsResultsProps) => {
  const arrayTranslation = Object.entries(translation);

  return (
    <>
      {loading && <LoaderParagraph />}
      {!loading && (
        <>
          <h2 className="text-2xl font-semibold">Traducciones</h2>
          <TranslationsList translations={arrayTranslation} />
        </>
      )}
    </>
  );
};
