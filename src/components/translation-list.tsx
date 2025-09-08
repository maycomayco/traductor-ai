import { FaCopy } from "react-icons/fa";

export default function TranslationsList({
  translations,
}: {
  translations: [string, string][];
}) {
  async function handleCopy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  }
  return (
    <div className="space-y-4">
      {translations.map((translation, idx) => (
        <div
          key={idx + translation[0]}
          className="space-y-1 border-b last:border-0"
        >
          <p className="relative leading-relaxed text-neutral-800 pb-4 text-xl cursor-pointer" onClick={() => handleCopy(translation[1])}>
            {translation[1]}
          </p>
        </div>
      ))}
    </div>
  );
}
