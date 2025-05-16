"use client";

import { useState } from "react";
import { TranslationsResults } from "@/components/translation-results";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { getTranslations } from "@/action/translation-action";

// schema for the form
const formSchema = z.object({
  query: z.string().min(10).max(100),
});

export default function Home() {
  const [translations, setTranslations] = useState({});
  const [loading, setLoading] = useState(false);
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
    <main className="flex-1 container mx-auto px-4 py-6">
      <div className="flex flex-col gap-8">
        <section>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="query"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        className="placeholder:text-xs"
                        placeholder="Coloca el texto que quieres traducir"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Intenta de que no sean demasiado largos, para que el
                      modelo pueda generar una traducción de calidad.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-32">
                {loading ? "Traduciendo..." : "Traducir"}
              </Button>
            </form>
          </Form>
        </section>

        {translations && (
          <TranslationsResults translation={translations} loading={loading} />
        )}
      </div>
    </main>
  );
}
