import { toast } from "sonner"

type TranslationsListProps = {
  readonly translations: readonly [string, string][]
}

export function TranslationsList({ translations }: TranslationsListProps) {
  async function handleCopy(text: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text)
      toast.success("Texto copiado al portapapeles")
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {translations.map((translation, idx) => {
        const key = translation[0]
        const value = translation[1]
        const isColoquial = key.toLowerCase() === "coloquial"

        return (
          <div
            key={idx + key}
            className={`border-2 flex flex-col ${
              isColoquial
                ? "border-[#4a90d9] bg-[#4a90d9]"
                : "border-[#1a1a1a] bg-white"
            }`}
          >
            {/* Card header */}
            <div
              className={`flex items-center justify-between px-3.5 py-2 border-b-2 ${
                isColoquial ? "border-[rgba(255,255,255,0.3)]" : "border-[#1a1a1a]"
              }`}
            >
              <span
                className={`font-mono text-[9px] font-bold tracking-[3px] uppercase ${
                  isColoquial ? "text-[rgba(255,255,255,0.8)]" : "text-[#4a90d9]"
                }`}
              >
                {key}
              </span>
              <button
                type="button"
                className={`font-mono text-[9px] tracking-[1px] border-0 bg-transparent cursor-pointer hover:opacity-100 transition-opacity opacity-30 ${
                  isColoquial ? "text-white" : "text-[#1a1a1a]"
                }`}
                onClick={() => handleCopy(value)}
                aria-label={`Copiar traducción: ${value}`}
              >
                [ copiar ]
              </button>
            </div>

            {/* Card body */}
            <div
              className={`px-4 py-3.5 font-sans text-sm leading-relaxed ${
                isColoquial ? "text-white font-bold" : "text-[#1a1a1a]"
              }`}
            >
              {value}
            </div>
          </div>
        )
      })}
    </div>
  )
}
