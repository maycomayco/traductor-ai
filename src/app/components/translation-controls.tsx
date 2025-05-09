"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowDownUp,
  ArrowRight,
  Star,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";

export function TranslationControls() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-center">
        <Button className="gap-2">
          <ArrowRight className="h-4 w-4" />
          Translate
        </Button>
      </div>
    </div>
  );
}
