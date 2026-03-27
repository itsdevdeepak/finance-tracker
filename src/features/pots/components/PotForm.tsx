"use client";

import { useActionState } from "react";
import { Pot } from "../types";
import { colorOptions } from "../constants";
import TextInput from "@/components/ui/form/TextInput";
import ColorSelect from "@/components/ui/form/ColorSelect";
import IconDollar from "@/components/icons/IconDollar";
import DialogCard from "@/components/ui/DialogCard";
import { FormAction } from "@/components/ui/form/types";
import { EMPTY_ACTION_STATE } from "@/components/ui/form/constants";
import Form from "@/components/ui/form/Form";
import SubmitButton from "@/components/ui/form/SubmitButton";

export default function PotForm({
	heading,
	description,
	initialData,
	action,
}: {
	heading: string;
	description: string;
	initialData?: Pot;
	action: FormAction;
}) {
	const [state, formAction, isPending] = useActionState(
		action,
		EMPTY_ACTION_STATE,
	);

	const defaultValues = {
		name: (state.payload?.get("name") as string) || initialData?.name || "",
		target:
			(state.payload?.get("target") as string) || initialData?.target || "",
		theme: (state.payload?.get("theme") as string) || initialData?.theme || "",
	};

	const buttonLabel = isPending
		? initialData
			? "Saving Changes"
			: "Adding Pot"
		: initialData
			? "Save Changes"
			: "Add Pot";

	return (
		<DialogCard heading={heading} description={description}>
			<Form
				action={formAction}
				actionState={state}
				fieldNames={Object.keys(defaultValues)}
			>
				<input type="hidden" name="id" value={initialData?.id} />
				<TextInput
					autoFocus={true}
					defaultValue={defaultValues.name ?? ""}
					label="Pot Name"
					name="name"
					placeholder="e.g. Rainy Days"
					error={state.fieldErrors?.name}
					helperText="Max 30 characters"
				/>
				<TextInput
					type="number"
					defaultValue={defaultValues.target}
					label="Target"
					error={state.fieldErrors?.target}
					name="target"
					placeholder="e.g. 2000"
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
	);
}
