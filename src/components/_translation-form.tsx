import { getTranslations } from "@/action/translation-action";
import { useForm } from "react-hook-form";

export default function TranslationForm({
  setQuery,
}: {
  setQuery: (query: string) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form
      className="flex flex-col gap-4"
      // onSubmit={handleSubmit(getTranslations)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <label htmlFor="query" className="block text-sm font-medium mb-2">
          Texto a traducir
        </label>
        <textarea
          autoFocus
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900"
          id="query"
          placeholder="Introduce el texto el cual deseas que se genere una traducción"
          rows={3}
          {...register("query", { required: true, minLength: 10 })}
          // onChange={setQuery}
        />
        {/* errors will return when field validation fails  */}
        {errors.query && (
          <span className="ml-2 text-sm text-red-500">
            This field is required
            {/* {JSON.stringify(errors.prompt, 0, false)} */}
          </span>
        )}
      </div>

      <button
        className="focus:ring-primary-200 hover:bg-primary-800 rounded-lg bg-sky-800 px-5 py-2.5 text-center text-sm font-medium text-white focus:ring-4"
        // disabled={isLoading}
        type="submit"
      >
        {/* {isLoading ? "Traduciendo..." : "Traducir"} */}
        Traducir
      </button>
    </form>
  );
}
