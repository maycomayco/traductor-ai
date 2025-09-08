import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { getTranslations } from "@/action/translation-action";
import { type Translation } from "@/types";
import { type Dispatch, type SetStateAction } from "react";

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
  setLoading: Dispatch<SetStateAction<boolean>>;
  setTranslations: Dispatch<SetStateAction<Translation | null>>;
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
      if (success && translations) {
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
    <div className="p-8">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  className="min-h-[120px] text-xl! leading-relaxed border-0 shadow-none focus-visible:ring-slate-200 font-sans focus:border-0 focus:ring-0 focus-visible:ring-0 p-0 resize-none"
                  placeholder="Type to translate..."
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
          disabled={loading}
        >
          {loading ? "Traduciendo..." : "Traducir"}
        </Button>
      </form>
    </Form>
    </div>
  );
}
