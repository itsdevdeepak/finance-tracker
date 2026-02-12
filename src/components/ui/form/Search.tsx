import IconSearch from "@/components/icons/IconSearch";

export default function Search({
  name,
  defaultValue,
  placeholder,
  inTransition,
  updateQuery,
}: {
  name: string;
  defaultValue: string;
  placeholder: string;
  inTransition: boolean;
  updateQuery: (newQuery: string) => void;
}) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const value = formData.get(name)?.toString();
    if (typeof value !== "string") return;

    updateQuery(value);
  };

  return (
    <form
      role="search"
      className={`min-w-20 basis-80 inline-flex items-center justify-between py-sm px-lg rounded-lg border border-beige focus-within:outline-2 focus-within:outline-green focus-within:outline-offset-2 focus-within:border-gray-900 hover:border-gray ${inTransition ? "cursor-not-allowed opacity-50" : ""}`}
      onSubmit={handleSubmit}
      key={defaultValue}
    >
      <label htmlFor={`search-${name}`} className="sr-only">
        {placeholder}
      </label>
      <input
        id={`search-${name}`}
        className="focus:outline-none disabled:cursor-not-allowed w-full text-ellipsis"
        type="search"
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        disabled={inTransition}
      />

      <IconSearch className="w-4 h-4" aria-hidden="true" />
    </form>
  );
}
