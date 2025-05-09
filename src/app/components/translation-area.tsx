"use client";

import { Button } from "@/components/ui/button";
import { Copy, Volume2 } from "lucide-react";
import { useState } from "react";

interface TranslationAreaProps {
  type: "input" | "output";
}

export function TranslationArea({ type }: TranslationAreaProps) {
  const [text, setText] = useState(
    type === "input" ? "" : "Hola, ¿cómo estás?"
  );
  const isInput = type === "input";
  const placeholder = isInput
    ? "Enter text to translate"
    : "Translation will appear here";

  return (
    <div className="flex flex-col gap-2 h-full">
      <div className="relative">
        <textarea
          className="w-full min-h-[200px] p-4 rounded-md border resize-none focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder={placeholder}
          value={text}
          onChange={(e) => isInput && setText(e.target.value)}
          readOnly={!isInput}
        />

        <div className="absolute bottom-2 right-2 flex items-center gap-2">
          {!isInput && (
            <Button size="icon" variant="ghost" className="h-8 w-8">
              <Volume2 className="h-4 w-4" />
              <span className="sr-only">Listen</span>
            </Button>
          )}
          <Button size="icon" variant="ghost" className="h-8 w-8">
            <Copy className="h-4 w-4" />
            <span className="sr-only">Copy</span>
          </Button>
        </div>
      </div>

      {isInput && (
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>0/5000</span>
          <button className="hover:text-foreground">Clear</button>
        </div>
      )}
    </div>
  );
}
