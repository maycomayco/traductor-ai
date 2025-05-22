import { LoaderParagraph } from "@/components/loader-paragraph";
import TranslationsList from "./translation-list";

type TranslationsResultsProps = {
  translation: Record<string, string>;
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
      {!loading && <TranslationsList translations={arrayTranslation} />}
    </>
  );
};
