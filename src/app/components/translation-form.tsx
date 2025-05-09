import { useForm } from "react-hook-form";

type TranslationForm = {
  setQuery: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  getTranslation: () => void;
  isLoading: boolean;
};

export const TranslationForm = ({
  setQuery,
  getTranslation,
  isLoading,
}: TranslationForm) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(getTranslation)}
    >
      <div>
        <textarea
          autoFocus
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900"
          id="prompt"
          placeholder="Introduce el texto el cual deseas que se genere una traducción"
          rows={3}
          {...register("prompt", { required: true, minLength: 10 })}
          onChange={setQuery}
        />
        {/* errors will return when field validation fails  */}
        {errors.prompt && (
          <span className="ml-2 text-sm text-red-500">
            This field is required
            {/* {JSON.stringify(errors.prompt, 0, false)} */}
          </span>
        )}
      </div>

      <button
        className="focus:ring-primary-200 hover:bg-primary-800 rounded-lg bg-sky-800 px-5 py-2.5 text-center text-sm font-medium text-white focus:ring-4"
        disabled={isLoading}
        type="submit"
      >
        Generar
      </button>
    </form>
  );
};
