import { LoaderParagraph } from "@/components/loader-paragraph";
import TranslationsList from "./translation-list";
import { type Translation } from "@/types";

type TranslationsResultsProps = {
    readonly translation: Translation | null;
    readonly loading: boolean;
  };

export const TranslationsResults = ({
  translation,
  loading,
}: TranslationsResultsProps) => {  
    const arrayTranslation = translation ? Object.entries(translation) : [];

  return (
    <div className="px-8 pt-8 min-h-54">
      {loading && <LoaderParagraph />}
      {!loading && <TranslationsList translations={arrayTranslation} />}
    </div>
  );
};
