type LoaderParagraphProps = {
  /** Number of paragraph blocks to display */
  readonly paragraphs?: number;
  /** Number of lines per paragraph block */
  readonly linesPerParagraph?: number;
};

/**
 * Loading skeleton component that simulates paragraph content while data is being fetched.
 * Shows animated placeholder lines organized in paragraph blocks.
 */
export function LoaderParagraph({
  paragraphs = 3,
  linesPerParagraph = 2,
}: LoaderParagraphProps) {
  return (
    <div 
      className="flex animate-pulse flex-col gap-4" 
      role="status"
      aria-label="Cargando contenido de traducción"
    >
      {Array.from({ length: paragraphs }, (_, paragraphIndex) => (
        <div key={paragraphIndex}>
          {Array.from({ length: linesPerParagraph }, (_, lineIndex) => {
            const isLastLine = lineIndex === linesPerParagraph - 1;
            const widthClass = isLastLine ? "w-4/5" : "w-full";
            
            return (
              <div 
                key={lineIndex}
                className={`mb-2.5 h-2 rounded-full bg-gray-200 ${widthClass}`} 
              />
            );
          })}
        </div>
      ))}
      <span className="sr-only">Cargando...</span>
    </div>
  );
}
