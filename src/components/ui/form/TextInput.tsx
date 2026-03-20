import { IconProps } from "@/components/icons/types";
import { ChangeEventHandler, useId } from "react";

export default function TextInput({
  label,
  name,
  placeholder,
  type = "text",
  value,
  onChange,
  defaultValue = "",
  autoFocus = false,
  required = false,
  min,
  max,
  helperText,
  error,
  IconLeft,
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: "text" | "number" | "email" | "password";
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  defaultValue?: string | number;
  autoFocus?: boolean;
  required?: boolean;
  min?: number;
  max?: number;
  helperText?: string;
  error?: string;
  IconLeft?: React.FC<IconProps>;
}) {
  const isControlled = value !== undefined && onChange !== undefined;

  const id = useId();

  return (
    <div className="flex flex-col gap-2xs">
      <label className="text-gray text-xs font-bold" htmlFor={id}>
        {label}
      </label>
      <div
        className={`inline-flex gap-sm border border-beige rounded-lg hover:border-gray focus-within:border-gray focus-within:outline-2 focus-within:outline-green focus-within:outline-offset-2 ${error ? "border-red" : ""}`}
      >
        {IconLeft && (
          <div className="py-sm pl-lg text-gray">
            <IconLeft className="h-full" />
          </div>
        )}
        <input
          className={`py-sm ${IconLeft ? "pr-lg" : "px-lg"} focus:outline-none w-full`}
          autoFocus={autoFocus}
          {...(isControlled ? { value, onChange } : { defaultValue })}
          id={id}
          name={name}
          placeholder={placeholder}
          required={required}
          type={type}
          min={min}
          max={max}
          aria-describedby={
            [error && `${id}-error`, helperText && `${id}-helper`]
              .filter(Boolean)
              .join(" ") || undefined
          }
          aria-invalid={!!error}
        />
      </div>
      {error && (
        <span
          id={`${id}-error`}
          aria-live="polite"
          className="text-red font-bold text-xs text-right"
        >
          <span className="sr-only">Error: </span> {error}
        </span>
      )}
      {helperText && (
        <span className="text-gray text-xs text-right">{helperText}</span>
      )}
    </div>
  );
}
