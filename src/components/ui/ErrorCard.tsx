import IconFailed from "../icons/IconFailed";

export default function ErrorCard({
  heading,
  description,
}: {
  heading: string;
  description: string;
}) {
  return (
    <div
      className="card border-red bg-gray-lighter flex flex-col items-center justify-center gap-base text-gray-light"
      role="alert"
      aria-live="polite"
    >
      <IconFailed className="size-13" aria-hidden="true" />
      <div className="flow-sm text-center">
        <h2 className="text-lg font-semibold" id="pots-error-title">
          {heading}
        </h2>
        <p className="text-sm  text-center" aria-describedby="pots-error-title">
          {description}
        </p>
      </div>
    </div>
  );
}
