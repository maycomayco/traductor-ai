import { type TranslationSchema } from "./lib/schemas";
import { z } from "zod";

export type Translation = z.infer<typeof TranslationSchema>;
