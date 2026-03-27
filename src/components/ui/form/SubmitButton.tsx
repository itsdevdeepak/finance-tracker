import IconLoading from "@/components/icons/IconLoading";
import { ButtonHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";

export default function SubmitButton({
	label,
	className,
	...restProps
}: { label: string } & ButtonHTMLAttributes<HTMLButtonElement>) {
	const { pending } = useFormStatus();

	return (
		<button
			type="submit"
			className={`button w-full ${className} flex justify-center items-center gap-xs`}
			disabled={pending}
			{...restProps}
		>
			{pending && <IconLoading className="size-lg animate-spin" />}
			{label}
		</button>
	);
}
