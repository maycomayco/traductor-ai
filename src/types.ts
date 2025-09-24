import type { z } from "zod"
import type { TranslationSchema } from "./lib/schemas"

export type Translation = z.infer<typeof TranslationSchema>
