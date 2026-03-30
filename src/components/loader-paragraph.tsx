type LoaderParagraphProps = {
  readonly paragraphs?: number
  readonly linesPerParagraph?: number
}

export function LoaderParagraph({
  paragraphs = 3,
  linesPerParagraph = 2,
}: LoaderParagraphProps) {
  return (
    <div
      className="flex motion-safe:animate-pulse flex-col gap-4"
      role="status"
      aria-label="Cargando contenido de traducción"
    >
      {Array.from({ length: paragraphs }, (_, paragraphIndex) => (
        <div key={paragraphIndex} className="border-2 border-[#1a1a1a] bg-white">
          <div className="px-3.5 py-2 border-b-2 border-[#1a1a1a]">
            <div className="h-2 bg-[#e8e3da] w-16" />
          </div>
          <div className="px-4 py-3.5 flex flex-col gap-2">
            {Array.from({ length: linesPerParagraph }, (_, lineIndex) => {
              const isLastLine = lineIndex === linesPerParagraph - 1
              return (
                <div
                  key={lineIndex}
                  className={`h-2 bg-[#e8e3da] ${isLastLine ? "w-4/5" : "w-full"}`}
                />
              )
            })}
          </div>
        </div>
      ))}
      <span className="sr-only">Cargando...</span>
    </div>
  )
}
