import { z } from 'zod';

export const TranslationSchema = z.object({
  writing: z.string().min(1, "Writing translation is required"),
  speaking: z.string().min(1, "Speaking translation is required"),
  coloquial: z.string().min(1, "Coloquial translation is required"),
});