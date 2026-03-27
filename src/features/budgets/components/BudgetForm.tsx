"use client";

import { useActionState } from "react";
import DialogCard from "@/components/ui/DialogCard";
import ColorSelect from "@/components/ui/form/ColorSelect";
import TextInput from "@/components/ui/form/TextInput";
import { Budget } from "../types";
import Select from "@/components/ui/form/Select";
import IconDollar from "@/components/icons/IconDollar";
import { CategorySelectOptions, colorOptions } from "../constants";
import { FormAction } from "@/components/ui/form/types";
import { EMPTY_ACTION_STATE } from "@/components/ui/form/constants";
import SubmitButton from "@/components/ui/form/SubmitButton";
import Form from "@/components/ui/form/Form";

export default function BudgetForm({
	heading,
	description,
	action,
	initialData,
}: {
	heading: string;
	description: string;
	initialData?: Budget;
	action: FormAction;
}) {
	const [state, formAction, isPending] = useActionState(
		action,
		EMPTY_ACTION_STATE,
	);

	const defaultValues = {
		category:
			(state.payload?.get("category") as string) || initialData?.category || "",
		maximum:
			(state.payload?.get("maximum") as string) || initialData?.maximum || "",
		theme: (state.payload?.get("theme") as string) || initialData?.theme || "",
	};

	const buttonLabel = isPending
		? initialData
			? "Saving Changes"
			: "Adding Budget"
		: initialData
			? "Save Changes"
			: "Add Budget";

	return (
		<>
			<DialogCard heading={heading} description={description}>
				<Form
					action={formAction}
					actionState={state}
					fieldNames={Object.keys(defaultValues)}
				>
					<input type="hidden" name="id" value={initialData?.id} />
					<Select
						name="category"
						label="Budget Category"
						defaultValue={defaultValues?.category}
						options={CategorySelectOptions}
					/>
					<TextInput
						type="number"
						name="maximum"
						label="Maximum Spend"
						placeholder="e.g. 2000"
						defaultValue={defaultValues?.maximum}
						error={state.fieldErrors?.maximum}
						IconLeft={IconDollar}
					/>
					<ColorSelect
						defaultValue={defaultValues?.theme}
						options={colorOptions}
						label="Theme"
						name="theme"
					/>
					<SubmitButton label={buttonLabel} />
				</Form>
			</DialogCard>
		</>
	);
}
