"use server";

import { createTranslation } from "@/lib/services/open-ai";

export async function getTranslations(formData: FormData) {
  try {
    const query = formData.get("query") as string;

    if (!query || query.trim() === "") {
      return {
        success: false,
        error: "El texto no puede estar vacío",
        translations: [],
      };
    }

    // Obtener las 3 traducciones propuestas
    // Esto dependerá de la API específica que uses
    const translations = await createTranslation({ query: query });

    return {
      success: true,
      translations,
      error: null,
    };
  } catch (error) {
    console.error("Error en la traducción:", error);
    return {
      success: false,
      error: "Ocurrió un error al procesar la traducción",
      translations: [],
    };
  }
}
