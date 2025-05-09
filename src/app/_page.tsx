import Image from "next/image";
import Link from "next/link";
import { LanguageSelector } from "./components/language-selector";
import { TranslationArea } from "./components/translation-area";
import { TranslationControls } from "./components/translation-controls";

export default function Home() {
  return (
    <main className="flex-1 container mx-auto px-4 py-6">
      <div className="grid gap-6 md:gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          <LanguageSelector direction="from" />
          <LanguageSelector direction="to" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          <TranslationArea type="input" />
          <TranslationArea type="output" />
        </div>

        <TranslationControls />
      </div>
    </main>
  );
}
