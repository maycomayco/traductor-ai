import { zodResolver } from "@hookform/resolvers/zod"
import type { Dispatch, SetStateAction } from "react"
import { useCallback, useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { getTranslations } from "@/action/translation-action"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import type { Translation } from "@/types"

/** Schema for translation form validation */
const translationFormSchema = z.object({
  query: z
    .string()
    .min(10, "El texto debe tener al menos 10 caracteres")
    .max(350, "El texto no puede exceder 350 caracteres"),
})

type TranslationFormData = z.infer<typeof translationFormSchema>

type TranslationFormProps = {
  /** Whether the form is currently submitting */
  readonly loading: boolean
  readonly setLoading: Dispatch<SetStateAction<boolean>>
  readonly setTranslations: Dispatch<SetStateAction<Translation | null>>
}

/**
 * Form component for submitting text to be translated.
 * Handles form validation, submission, and error states.
 * Supports keyboard shortcut (Cmd+Enter) for form submission.
 */
export function TranslationForm({
  loading,
  setLoading,
  setTranslations,
}: TranslationFormProps) {
  const form = useForm<TranslationFormData>({
    resolver: zodResolver(translationFormSchema),
    defaultValues: {
      query: "",
    },
  })

  const handleSubmit = useCallback(
    async (values: TranslationFormData) => {
      const formData = new FormData()
      formData.append("query", values.query)

      try {
        setLoading(true)
        const { error, success, translations } = await getTranslations(formData)

        if (success && translations) {
          setTranslations(translations)
        } else {
          // TODO: Implement proper error handling
          console.error("Translation error:", error)
        }
      } catch (error) {
        // TODO: Implement proper error handling
        console.error("Unexpected error:", error)
      } finally {
        setLoading(false)
      }
    },
    [setLoading, setTranslations],
  )

  // Add keyboard shortcut for form submission
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey && event.key === "Enter") {
        event.preventDefault()

        // Only submit if form is valid and not loading
        if (form.formState.isValid && !loading) {
          const values = form.getValues()
          handleSubmit(values)
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [form, loading, handleSubmit])

  return (
    <div className="p-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    className="min-h-[120px] md:text-xl text-xl leading-relaxed border-0 shadow-none focus-visible:ring-slate-200 font-sans focus:border-0 focus:ring-0 focus-visible:ring-0 p-0 resize-none"
                    placeholder="Escribe el texto que quieres traducir... (Cmd+Enter para traducir)"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="text-neutral-100 font-medium bg-neutral-600 hover:bg-neutral-900 transition-colors"
            disabled={loading || !form.formState.isValid}
          >
            {loading ? "Traduciendo..." : "Traducir"}
          </Button>
        </form>
      </Form>
    </div>
  )
}
