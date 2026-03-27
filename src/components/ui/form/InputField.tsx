import { IconProps } from "@/components/icons/types";
import { InputHTMLAttributes, useId } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
	name: string;
	label: string;
	placeholder: string;
	helperText?: string;
	error?: string;
	IconLeft?: React.FC<IconProps>;
}

export default function InputField({
	label,
	name,
	placeholder,
	helperText,
	error,
	IconLeft,
	...restProps
}: InputFieldProps) {
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
					id={id}
					name={name}
					placeholder={placeholder}
					aria-describedby={
						[error && `${id}-error`, helperText && `${id}-helper`]
							.filter(Boolean)
							.join(" ") || undefined
					}
					aria-invalid={!!error}
					{...restProps}
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
