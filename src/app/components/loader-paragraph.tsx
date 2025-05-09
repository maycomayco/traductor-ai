export const LoaderParagraph = () => {
  return (
    <div className="flex animate-pulse flex-col gap-4" role="status">
      <div>
        <div className="mb-2.5 h-2 rounded-full bg-gray-200" />
        <div className="mb-2.5 h-2 rounded-full bg-gray-200" />
      </div>
      <div>
        <div className="mb-2.5 h-2 rounded-full bg-gray-200" />
        <div className="mb-2.5 h-2 rounded-full bg-gray-200" />
      </div>
      <div>
        <div className="mb-2.5 h-2 rounded-full bg-gray-200" />
        <div className="mb-2.5 h-2 rounded-full bg-gray-200" />
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
