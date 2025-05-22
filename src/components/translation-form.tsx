import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { getTranslations } from "@/action/translation-action";

// schema for the form
const formSchema = z.object({
  query: z.string().min(10).max(350),
});

export default function TranslationForm({
  loading,
  setLoading,
  setTranslations,
}: {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setTranslations: (translations: any) => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Create a FormData object to send the query to the server
    const formData = new FormData();
    formData.append("query", values.query);

    try {
      setLoading(true);
      const { error, success, translations } = await getTranslations(formData);
      if (success) {
        setTranslations(translations);
      } else {
        // TODO: improve this error handling
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Texto a traducir</FormLabel>
              <FormControl>
                <Textarea
                  className="placeholder:text-xs"
                  placeholder="Había una vez-truz..."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Intenta de que no sean demasiado largos, para que el modelo
                pueda generar una traducción de calidad.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-32" disabled={loading}>
          {loading ? "Traduciendo..." : "Traducir"}
        </Button>
      </form>
    </Form>
  );
}
