import { FormHTMLAttributes, PropsWithChildren, useEffect } from "react";
import { ActionState } from "./types";
import { useToast } from "@/components/toast/ToastProvider";
import useActionFeedback from "./hooks/useActionFeedback";
import { useModal } from "../Modal";

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
	action: (formData: FormData) => void;
	actionState: ActionState;
	fieldNames: string[];
	className?: string;
}

export default function Form({
	action,
	actionState,
	fieldNames = [],
	className,
	children,
	...restProps
}: PropsWithChildren<FormProps>) {
	const toast = useToast();
	const modal = useModal();

	useActionFeedback(actionState, {
		onError: (actionState) => {
			const hasFieldErrors = Object.keys(actionState.fieldErrors).some((key) =>
				fieldNames.includes(key),
			);

			const message = hasFieldErrors ? "Invalid Data" : actionState.message;

			if (!message?.trim()) return;
			toast?.error(message, undefined, { duration: 5000 });
		},
	});

	useEffect(() => {
		if (actionState.status === "SUCCESS") {
			modal?.closeModal();
		}
	}, [actionState, modal]);

	return (
		<form
			action={action}
			className={`flex flex-col gap-base ${className}`}
			{...restProps}
		>
			{children}
		</form>
	);
}
