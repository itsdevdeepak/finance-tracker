"use client";

import DialogCard from "@/components/ui/DialogCard";
import { Transaction } from "../types";
import { useActionState } from "react";
import Select from "@/components/ui/form/Select";
import IconDollar from "@/components/icons/IconDollar";
import { FormAction } from "@/components/ui/form/types";
import { EMPTY_ACTION_STATE } from "@/components/ui/form/constants";
import Form from "@/components/ui/form/Form";
import SubmitButton from "@/components/ui/form/SubmitButton";
import { CATEGORIES } from "@/constants/transaction";
import InputField from "@/components/ui/form/InputField";

export default function TransactionForm({
	heading,
	description,
	initialData,
	action,
}: {
	heading: string;
	description: string;
	initialData?: Transaction;
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
		avatar:
			(state.payload?.get("avatar") as string) || initialData?.avatar || "",
		date:
			(state.payload?.get("date") as string) ||
			(initialData?.date instanceof Date
				? initialData.date.toISOString().split("T")[0]
				: initialData?.date) ||
			"",
		category:
			(state.payload?.get("category") as string) || initialData?.category || "",
	};

	const buttonLabel = isPending
		? initialData
			? "Saving Changes"
			: "Adding Transaction"
		: initialData
			? "Save Changes"
			: "Add Transaction";

	const formKey = [
		initialData?.id || "new-transaction",
		defaultValues.name,
		defaultValues.amount,
		defaultValues.date,
		defaultValues.category,
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
				<InputField
					autoFocus={true}
					label="Transaction Name"
					name="name"
					placeholder="e.g. Jimmy"
					helperText="Max 30 characters"
					defaultValue={defaultValues.name}
					error={state.fieldErrors?.name}
				/>
				<InputField
					type="number"
					label="Amount"
					name="amount"
					placeholder="e.g. 2000"
					defaultValue={defaultValues.amount}
					error={state.fieldErrors?.amount}
					IconLeft={IconDollar}
				/>
				<InputField
					type="date"
					label="Date"
					name="date"
					placeholder="e.g. 2026/02/13"
					defaultValue={defaultValues.date}
					error={state.fieldErrors?.date}
					helperText="Format: YYYY/MM/DD"
				/>
				<Select
					defaultValue={initialData?.category}
					options={CATEGORIES.map((category) => ({
						value: category,
					}))}
					label="Category"
					name="category"
				/>
				<SubmitButton label={buttonLabel} />
			</Form>
		</DialogCard>
	);
}
