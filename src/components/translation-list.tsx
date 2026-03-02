import { Copy } from "lucide-react"
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
          className="space-y-1 border-b last:border-b-0"
        >
          <button
            type="button"
            className="group relative w-full text-left leading-relaxed text-neutral-800 text-xl cursor-pointer pb-4 focus-visible:outline-2 focus-visible:outline-neutral-400 focus-visible:outline-offset-2"
            onClick={() => handleCopy(translation[1])}
            aria-label={`Copiar traducción: ${translation[1]}`}
          >
            {translation[1]}
            <Copy
              size={16}
              className="absolute top-1 right-0 text-neutral-400 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity"
              aria-hidden="true"
            />
          </button>
        </div>
      ))}
    </div>
  )
}
