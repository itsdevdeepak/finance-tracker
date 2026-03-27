"use client";

import { useActionState } from "react";
import { loginFormAction } from "../actions";
import DialogCard from "@/components/ui/DialogCard";
import Link from "next/link";
import InputField from "@/components/ui/form/InputField";
import { signupPath } from "@/constants/paths";
import Form from "@/components/ui/form/Form";
import { EMPTY_ACTION_STATE } from "@/components/ui/form/constants";
import SubmitButton from "@/components/ui/form/SubmitButton";

export default function LoginForm() {
	const [state, formAction, isPending] = useActionState(
		loginFormAction,
		EMPTY_ACTION_STATE,
	);

	const defaultValues = {
		email: (state.payload?.get("email") as string | null) || "",
		password: (state.payload?.get("password") as string | null) || "",
	};

	return (
		<DialogCard heading="Login" description="">
			<Form
				action={formAction}
				actionState={state}
				fieldNames={Object.keys(defaultValues)}
			>
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
				<SubmitButton label={isPending ? "Logging in..." : "Login"} />
				<p className="text-sm text-gray text-center">
					Need to create an account?
					<Link
						href={signupPath()}
						className="ms-xs font-bold text-gray-darker underline hover:text-gray"
					>
						Sign Up
					</Link>
				</p>
			</Form>
		</DialogCard>
	);
}
