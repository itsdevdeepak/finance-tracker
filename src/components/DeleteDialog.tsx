"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "./toast/ToastProvider";
import { useModal } from "./ui/Modal";
import { EMPTY_ACTION_STATE } from "./ui/form/constants";
import { FormAction } from "./ui/form/types";
import useActionFeedback from "./ui/form/hooks/useActionFeedback";
import DialogCard from "./ui/DialogCard";
import SubmitButton from "./ui/form/SubmitButton";

export default function DeleteDialog({
	resourceId,
	heading,
	description,
	action,
}: {
	resourceId: string;
	heading: string;
	description: string;
	action: FormAction;
}) {
	const router = useRouter();
	const toast = useToast();
	const modal = useModal();
	const [state, formAction, isPending] = useActionState(
		action,
		EMPTY_ACTION_STATE,
	);

	useActionFeedback(state, {
		onError: (actionState) => {
			toast?.error(actionState.message || "Unexpected error occurred");
		},
	});

	return (
		<DialogCard heading={heading} description={description}>
			<form action={formAction}>
				<input type="hidden" name="id" value={resourceId} />
				<SubmitButton className="bg-red" label="Yes, Confirm Deletion" />
				<button
					type="button"
					autoFocus={true}
					disabled={isPending}
					onClick={() => {
						if (modal) {
							modal.closeModal();
						} else {
							router.back();
						}
					}}
					className="button w-full bg-transparent rounded-sm font-normal text-gray-darker not-disabled:hover:text-gray/90"
				>
					No, I want to go back
				</button>
			</form>
		</DialogCard>
	);
}
