"use client";
import { createTranslation } from "@/lib/services/open-ai";
import { useRef, useState } from "react";

// este hook recibe como parámetro el texto a traducir
export const useTranslationGPT = ({ query }: { query: string }) => {
  const [translation, setTranslation] = useState({});
  const [loading, setLoading] = useState(false);
  const previousQuery = useRef(query); // con esto controlamos que no se vuelva a realizar la misma petición

  const getTranslation = async () => {
    if (query === previousQuery.current) return;

    try {
      setLoading(true);
      previousQuery.current = query;
      const response = await createTranslation({ query });

      setTranslation(response);
    } catch {
      throw new Error("Error getting translations");
    } finally {
      setLoading(false);
    }
  };

  return { translation, loading, getTranslation };
};
