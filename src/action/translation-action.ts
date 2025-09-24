"use server"

import { createTranslation } from "@/lib/services/open-ai"
import type { Translation } from "@/types"

type TranslationResponse = {
  success: boolean
  error: string | null
  translations: Translation | null
}

export async function getTranslations(
  formData: FormData,
): Promise<TranslationResponse> {
  try {
    const query = formData.get("query") as string

    if (!query || query.trim() === "") {
      return {
        success: false,
        error: "El texto no puede estar vacío",
        translations: null,
      }
    }

    const translations = await createTranslation({ query: query })

    return {
      success: true,
      translations,
      error: null,
    }
  } catch (error) {
    console.error("Error en la traducción:", error)
    return {
      success: false,
      error: "Ocurrió un error al procesar la traducción",
      translations: null,
    }
  }
}
