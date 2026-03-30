"use client";

import { useActionState } from "react";
import DialogCard from "@/components/ui/DialogCard";
import Select from "@/components/ui/form/Select";
import IconDollar from "@/components/icons/IconDollar";
import { RecurringBill } from "../types";
import { CategorySelectOptions } from "../constants";
import { FormAction } from "@/components/ui/form/types";
import { EMPTY_ACTION_STATE } from "@/components/ui/form/constants";
import Form from "@/components/ui/form/Form";
import SubmitButton from "@/components/ui/form/SubmitButton";
import InputField from "@/components/ui/form/InputField";

export default function RecurringBillForm({
	heading,
	description,
	initialData,
	action,
}: {
	heading: string;
	description: string;
	initialData?: RecurringBill;
	action: FormAction;
}) {
	const [state, formAction, isPending] = useActionState(
		action,
		EMPTY_ACTION_STATE,
	);

	const defaultValues = {
		name: (state.payload?.get("name") as string) || initialData?.name || "",
		amount:
			(state.payload?.get("amount") as string) || initialData?.amount || "",
		dueDate:
			(state.payload?.get("dueDate") as string) || initialData?.dueDate || "",
		avatar:
			(state.payload?.get("avatar") as string) || initialData?.avatar || "",

		category:
			(state.payload?.get("category") as string) || initialData?.category || "",
	};

	const buttonLabel = isPending
		? initialData
			? "Saving Changes"
			: "Adding Recurring Bill"
		: initialData
			? "Save Changes"
			: "Add Recurring Bill";

	const formKey = [
		initialData?.id || "new-recurring-bill",
		defaultValues.name,
		defaultValues.amount,
		defaultValues.dueDate,
		defaultValues.category,
		defaultValues.avatar,
	].join("|");

	return (
		<DialogCard heading={heading} description={description}>
			<Form
				key={formKey}
				action={formAction}
				actionState={state}
				fieldNames={Object.keys(defaultValues)}
			>
				<input type="hidden" name="id" value={initialData?.id} />
				<input type="hidden" name="avatar" value={defaultValues.avatar} />
				<InputField
					autoFocus={true}
					defaultValue={defaultValues?.name}
					label="Recurring Bill Name"
					name="name"
					placeholder="e.g. Netflix"
					error={state.fieldErrors.name}
					helperText="Max 30 characters"
				/>
				<InputField
					type="number"
					defaultValue={defaultValues?.amount}
					label="Amount"
					error={state.fieldErrors.amount}
					name="amount"
					placeholder="e.g. 2000"
					IconLeft={IconDollar}
				/>
				<InputField
					type="number"
					defaultValue={defaultValues?.dueDate}
					label="Due Day of Month"
					error={state.fieldErrors.dueDate}
					name="dueDate"
					min={1}
					max={31}
					placeholder="e.g. 15"
					helperText="Enter a value between 1 and 31"
				/>
				<Select
					name="category"
					label="Category"
					defaultValue={defaultValues?.category}
					options={CategorySelectOptions}
					className="**:[[role='listbox']]:max-h-60!"
				/>
				<SubmitButton label={buttonLabel} />
			</Form>
		</DialogCard>
	);
}
