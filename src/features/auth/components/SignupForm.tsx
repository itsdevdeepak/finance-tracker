"use client";

import { useActionState } from "react";
import { signUpFormAction } from "../actions";
import DialogCard from "@/components/ui/DialogCard";
import { CurrencyCodes } from "@/constants/currency";
import Select from "@/components/ui/form/Select";
import Link from "next/link";
import InputField from "@/components/ui/form/InputField";
import { loginPath } from "@/constants/paths";
import { EMPTY_ACTION_STATE } from "@/components/ui/form/constants";
import Form from "@/components/ui/form/Form";
import SubmitButton from "@/components/ui/form/SubmitButton";

export default function SignupForm() {
	const [state, formAction, isPending] = useActionState(
		signUpFormAction,
		EMPTY_ACTION_STATE,
	);

	const defaultValues = {
		name: (state.payload?.get("name") as string | null) || "",
		email: (state.payload?.get("email") as string | null) || "",
		password: (state.payload?.get("password") as string | null) || "",
		currencyCode: (state.payload?.get("v") as string | null) || "",
	};

	return (
		<DialogCard heading="Sign up" description="">
			<Form
				className="flow-base"
				action={formAction}
				actionState={state}
				fieldNames={Object.keys(defaultValues)}
			>
				<InputField
					name="name"
					type="text"
					label="Name"
					placeholder="e.g Jimmy"
					defaultValue={defaultValues.name}
					error={state.fieldErrors?.name}
				/>
				<InputField
					name="email"
					type="email"
					label="Email"
					placeholder="user@example.com"
					defaultValue={defaultValues.email}
					error={state.fieldErrors?.email}
				/>
				<InputField
					name="password"
					type="password"
					label="Password"
					defaultValue={defaultValues.password}
					error={state.fieldErrors?.password}
					placeholder="&#11044;&#11044;&#11044;&#11044;&#11044;&#11044;&#11044;"
				/>
				<Select
					name="currencyCode"
					label="Currency Code"
					defaultValue={defaultValues.currencyCode}
					options={CurrencyCodes.map((code) => ({ value: code }))}
				/>
				<SubmitButton
					label={isPending ? "Creating user..." : "Create New User"}
				/>
				<p className="text-sm text-gray text-center">
					Already have an account?
					<Link
						href={loginPath()}
						className="ms-xs font-bold text-gray-darker underline hover:text-gray"
					>
						Login
					</Link>
				</p>
			</Form>
		</DialogCard>
	);
}
