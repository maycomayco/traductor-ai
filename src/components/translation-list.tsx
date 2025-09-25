import { toast } from "sonner"

type TranslationsListProps = {
  /** Array of translation entries as key-value pairs */
  readonly translations: readonly [string, string][]
}

/** Component that displays a list of translations with copy functionality */
export function TranslationsList({ translations }: TranslationsListProps) {
  /** Copies text to the clipboard */
  async function handleCopy(text: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text)
      toast.success("Texto copiado al portapapeles")
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  return (
    <div className="space-y-4">
      {translations.map((translation, idx) => (
        <div
          key={idx + translation[0]}
          className="space-y-1 border-b last:border-0"
        >
          <p
            className="relative leading-relaxed text-neutral-800 text-xl cursor-pointer"
            onClick={() => handleCopy(translation[1])}
          >
            {translation[1]}
          </p>
        </div>
      ))}
    </div>
  )
}
