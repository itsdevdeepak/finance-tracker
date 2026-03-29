import { EMPTY_ACTION_STATE } from "@/components/ui/form/constants";
import Form from "@/components/ui/form/Form";
import { useActionState } from "react";
import { RecurringBill } from "../types";
import { getBillStatus } from "../utils";
import IconLoading from "@/components/icons/IconLoading";
import { payRecurringBill } from "../action";

interface PayRecurringProps {
	recurringId: RecurringBill["id"];
	recurringStatus: ReturnType<typeof getBillStatus>;
}

export default function PayRecurring({
	recurringId,
	recurringStatus,
}: PayRecurringProps) {
	const [state, formAction, isPending] = useActionState(
		payRecurringBill,
		EMPTY_ACTION_STATE,
	);

	const isDisabled = recurringStatus !== "due" || isPending;
	const buttonText = isPending ? "Processing payment" : "Pay bill";

	return (
		<Form action={formAction} actionState={state} fieldNames={[]}>
			<input type="hidden" name="id" value={recurringId} />
			<button
				type="submit"
				disabled={isDisabled}
				className="button flex justify-center items-center min-w-11 min-h-7 text-xs font-bold text-white bg-red/80 rounded-lg py-2xs px-xs transition-opacity disabled:opacity-60"
				aria-label={buttonText}
				aria-busy={isPending}
			>
				{isPending ? (
					<IconLoading
						className="size-base motion-safe:animate-spin"
						aria-hidden="true"
					/>
				) : (
					<span>Pay</span>
				)}
			</button>
		</Form>
	);
}
