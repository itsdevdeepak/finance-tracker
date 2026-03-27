"use client";

import { ChangeEvent, useActionState, useState } from "react";
import { loginFormAction } from "../actions";
import DialogCard from "@/components/ui/DialogCard";
import Link from "next/link";
import InputField from "@/components/ui/form/InputField";
import { signupPath } from "@/constants/paths";

export default function LoginForm() {
	const [formValues, setFormValues] = useState({ email: "", password: "" });

	const [state, formAction, isPending] = useActionState(loginFormAction, {
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
		<DialogCard heading="Login" description="" error={state.errors?.other}>
			<form className="flow-base" action={formAction}>
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
				<button disabled={isPending} className="w-full button" type="submit">
					{isPending ? "Logging in..." : "Login"}
				</button>
				<p className="text-sm text-gray text-center">
					Need to create an account?
					<Link
						href={signupPath()}
						className="ms-xs font-bold text-gray-darker underline hover:text-gray"
					>
						Sign Up
					</Link>
				</p>
			</form>
		</DialogCard>
	);
}
