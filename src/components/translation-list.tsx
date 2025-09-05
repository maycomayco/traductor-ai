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
          <h3 className="text-left font-medium capitalize">{translation[0]}</h3>
          <p className="relative leading-relaxed text-neutral-700 pb-4">
            {translation[1]}
            <button className="ml-2" onClick={() => handleCopy(translation[1])}>
              <FaCopy className="size-4 fill-neutral-600" />
            </button>
          </p>
        </div>
      ))}
    </div>
  );
}
