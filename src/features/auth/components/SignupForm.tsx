"use client";

import { ChangeEvent, useActionState, useState } from "react";
import { signUpFormAction } from "../actions";
import DialogCard from "@/components/ui/DialogCard";
import { CurrencyCodes } from "@/constants/currency";
import Select from "@/components/ui/form/Select";
import Link from "next/link";
import InputField from "@/components/ui/form/InputField";
import { loginPath } from "@/constants/paths";

export default function SignupForm() {
	const [formValues, setFormValues] = useState({
		name: "",
		email: "",
		password: "",
		currencyCode: "USD" satisfies (typeof CurrencyCodes)[number],
	});

	const [state, formAction, isPending] = useActionState(signUpFormAction, {
		success: false,
	});

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		setFormValues((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	return (
		<DialogCard heading="Sign up" description="" error={state.errors?.other}>
			<form className="flow-base" action={formAction}>
				<InputField
					name="name"
					type="text"
					label="Name"
					placeholder="e.g Jimmy"
					value={formValues.name}
					onChange={handleInputChange}
					error={state.errors?.name}
				/>
				<InputField
					name="email"
					type="email"
					label="Email"
					placeholder="user@example.com"
					value={formValues.email}
					onChange={handleInputChange}
					error={state.errors?.email}
				/>
				<InputField
					name="password"
					type="password"
					label="Password"
					value={formValues.password}
					onChange={handleInputChange}
					error={state.errors?.password}
					placeholder="&#11044;&#11044;&#11044;&#11044;&#11044;&#11044;&#11044;"
				/>
				<Select
					name="currencyCode"
					label="Currency Code"
					options={CurrencyCodes.map((code) => ({ value: code }))}
					onChange={(option) =>
						setFormValues((values) => ({
							...values,
							currencyCode: option.value,
						}))
					}
				/>
				<button disabled={isPending} className="w-full button" type="submit">
					{isPending ? "Creating user..." : "Create New User"}
				</button>

				<p className="text-sm text-gray text-center">
					Already have an account?
					<Link
						href={loginPath()}
						className="ms-xs font-bold text-gray-darker underline hover:text-gray"
					>
						Login
					</Link>
				</p>
			</form>
		</DialogCard>
	);
}
