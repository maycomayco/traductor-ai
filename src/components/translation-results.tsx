import { FaCopy } from "react-icons/fa";

import { LoaderParagraph } from "@/components/loader-paragraph";

type TranslationsResultsProps = {
  translation: Record<string, string>;
  loading: boolean;
};

export const TranslationsResults = ({
  translation,
  loading,
}: TranslationsResultsProps) => {
  const arrayTranslation = Object.entries(translation);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <section className="flex flex-col gap-6">
      {loading && <LoaderParagraph />}
      {!loading &&
        arrayTranslation.length > 0 &&
        arrayTranslation.map((item, idx) => (
          <div key={idx}>
            <h2 className="text-xl font-bold capitalize text-sky-800">
              {item[0]}
            </h2>
            <p className="relative text-xl leading-relaxed opacity-50">
              {item[1]}
              <button className="ml-2" onClick={() => handleCopy(item[1])}>
                <FaCopy className="size-4" />
              </button>
            </p>
          </div>
        ))}
    </section>
  );
};
