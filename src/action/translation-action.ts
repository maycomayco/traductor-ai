"use server"

import { auth } from "@clerk/nextjs/server"
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
    const { userId } = await auth()

    if (!userId) {
        return {
            success: false,
            error: "No autorizado",
            translations: null,
        }
    }

    try {
        const queryValue = formData.get("query")

        if (typeof queryValue !== "string") {
            return {
                success: false,
                error: "El texto no puede estar vacío",
                translations: null,
            }
        }

        if (queryValue.trim() === "") {
            return {
                success: false,
                error: "El texto no puede estar vacío",
                translations: null,
            }
        }

        const translations = await createTranslation({ query: queryValue })

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
