import { zodResolver } from "@hookform/resolvers/zod"
import type { Dispatch, SetStateAction } from "react"
import { useCallback, useRef } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { getTranslations } from "@/action/translation-action"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import type { Translation } from "@/types"

const translationFormSchema = z.object({
    query: z
        .string()
        .min(10, "El texto debe tener al menos 10 caracteres")
        .max(350, "El texto no puede exceder 350 caracteres"),
})

type TranslationFormData = z.infer<typeof translationFormSchema>

type TranslationFormProps = {
    readonly loading: boolean
    readonly setLoading: Dispatch<SetStateAction<boolean>>
    readonly setTranslations: Dispatch<SetStateAction<Translation | null>>
    readonly setError: Dispatch<SetStateAction<string | null>>
    readonly onFormAreaClick?: (clicked: boolean) => void
}

export function TranslationForm({
    loading,
    setLoading,
    setTranslations,
    setError,
    onFormAreaClick,
}: TranslationFormProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const formAreaRef = useRef<HTMLDivElement>(null)

    const form = useForm<TranslationFormData>({
        resolver: zodResolver(translationFormSchema),
        defaultValues: { query: "" },
    })

    const query = form.watch("query")

    const handleFormAreaClick = useCallback((): void => {
        onFormAreaClick?.(true)
        textareaRef.current?.focus()
    }, [onFormAreaClick])

    const handleFormAreaBlur = useCallback(
        (event: React.FocusEvent): void => {
            if (!formAreaRef.current?.contains(event.relatedTarget as Node)) {
                onFormAreaClick?.(false)
            }
        },
        [onFormAreaClick],
    )

    const handleSubmit = useCallback(
        async (values: TranslationFormData) => {
            const formData = new FormData()
            formData.append("query", values.query)
            setTranslations(null)
            setError(null)
            try {
                setLoading(true)
                const { error, success, translations } = await getTranslations(formData)
                if (success && translations) {
                    setTranslations(translations)
                } else {
                    const message = error ?? "Ocurrió un error al procesar la traducción"
                    setError(message)
                    toast.error(message)
                }
            } catch {
                const message = "Ocurrió un error al procesar la traducción"
                setError(message)
                toast.error(message)
            } finally {
                setLoading(false)
            }
        },
        [setLoading, setTranslations, setError],
    )

    const handleTextareaKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
            if (e.metaKey && e.key === "Enter" && form.formState.isValid && !loading) {
                e.preventDefault()
                form.handleSubmit(handleSubmit)()
            }
        },
        [form, loading, handleSubmit],
    )

    return (
        <div
            className="p-8 flex flex-col gap-5 h-full"
            ref={formAreaRef}
            onClick={handleFormAreaClick}
            onBlur={handleFormAreaBlur}
            tabIndex={-1}
        >
            {/* Panel label */}
            <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] font-bold tracking-[3px] uppercase text-[#1a1a1a] shrink-0">
                    Español →
                </span>
                <div className="flex-1 h-px bg-[#1a1a1a] opacity-20" />
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-5">
                    <FormField
                        control={form.control}
                        name="query"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="relative border-2 border-[#1a1a1a] bg-white">
                                        <textarea
                                            aria-label="Texto a traducir"
                                            className="w-full min-h-[160px] p-4 font-sans text-base leading-relaxed text-[#1a1a1a] bg-transparent border-0 resize-none outline-none placeholder:text-[#aaa] placeholder:italic disabled:opacity-50"
                                            placeholder="Escribe el texto que quieres traducir..."
                                            disabled={loading}
                                            ref={(el) => {
                                                textareaRef.current = el
                                                field.ref(el)
                                            }}
                                            onKeyDown={handleTextareaKeyDown}
                                            onBlur={field.onBlur}
                                            name={field.name}
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                        <span className="absolute bottom-2.5 right-3.5 font-mono text-[9px] text-[#aaa] tracking-[1px]">
                                            {query.length} / 350
                                        </span>
                                    </div>
                                </FormControl>
                                <FormMessage className="font-mono text-[10px] tracking-[1px] text-[#cc3300]" />
                            </FormItem>
                        )}
                    />

                    <button
                        type="submit"
                        disabled={loading || !form.formState.isValid}
                        className="w-full bg-[#4a90d9] hover:bg-[#2d6bb0] disabled:opacity-40 border-2 border-[#1a1a1a] px-6 py-3.5 font-mono text-[11px] font-bold tracking-[3px] uppercase text-white flex items-center justify-between transition-colors cursor-pointer disabled:cursor-not-allowed"
                    >
                        <span>{loading ? "Traduciendo…" : "Traducir"}</span>
                        <span className="text-[10px] opacity-70 tracking-[1px]">⌘ + ↵</span>
                    </button>

                    <span className="font-mono text-[10px] tracking-[1px] text-[#1a1a1a] opacity-40">
                        Mínimo 10 caracteres · Máximo 350
                    </span>
                </form>
            </Form>
        </div>
    )
}
