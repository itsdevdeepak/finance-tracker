"use client";

import { useActionState, useState } from "react";
import { Pot } from "../types";
import { formatCurrency } from "@/lib/utils/format";
import ProgressBar from "./ProgressBar";
import IconDollar from "@/components/icons/IconDollar";
import DialogCard from "@/components/ui/DialogCard";
import { FormAction } from "@/components/ui/form/types";
import { EMPTY_ACTION_STATE } from "@/components/ui/form/constants";
import Form from "@/components/ui/form/Form";
import SubmitButton from "@/components/ui/form/SubmitButton";
import InputField from "@/components/ui/form/InputField";

function AmountPreview({
	isWithdrawing,
	target,
	newAmount,
	total,
}: {
	isWithdrawing: boolean;
	newAmount: number;
	target: number;
	total: number;
}) {
	const currentPercent = target > 0 ? Math.min(100, (total / target) * 100) : 0;
	const rawDelta = target > 0 ? (newAmount / target) * 100 : 0;

	const clampedDelta = isWithdrawing
		? Math.min(rawDelta, currentPercent)
		: Math.min(rawDelta, 100 - currentPercent);

	const displayPercent = isWithdrawing
		? currentPercent - clampedDelta
		: currentPercent + clampedDelta;

	const basePercent = isWithdrawing
		? currentPercent - clampedDelta
		: currentPercent;

	const projectedTotal = isWithdrawing
		? Math.max(0, total - newAmount)
		: total + newAmount;

	return (
		<div className="flow-base">
			<div className="flex justify-between items-center">
				<span className="text-gray text-sm">New Amount</span>
				<span className="text-3xl font-bold">
					{formatCurrency(projectedTotal)}
				</span>
			</div>
			<div className="flow-xs">
				<ProgressBar
					basePercent={basePercent}
					deltaPercent={clampedDelta}
					isWithdrawing={isWithdrawing}
				/>
				<div className="flex justify-between text-xs">
					<span
						className={`font-bold ${isWithdrawing ? "text-red" : "text-green"}`}
					>
						{displayPercent.toFixed(2)}%
					</span>
					<span className="text-gray">Target of {formatCurrency(target)}</span>
				</div>
			</div>
		</div>
	);
}

export default function SavingForm({
	heading,
	description,
	action,
	type,
	pot,
}: {
	heading: string;
	description: string;
	type: "withdraw" | "adding";
	action: FormAction;
	pot: Pot;
}) {
	const [amount, setAmount] = useState(0);
	const [state, formAction, isPending] = useActionState(
		action,
		EMPTY_ACTION_STATE,
	);

	const isWithdrawing = type === "withdraw";
	const amountLimit = isWithdrawing ? pot.total : pot.target - pot.total;

	const projectedTotal = isWithdrawing
		? Math.max(0, pot.total - amount)
		: pot.total + amount;

	const buttonText = isWithdrawing ? "Confirm Withdrawal" : "Confirm Addition";
	const buttonPendingText = isWithdrawing
		? "Withdrawing from Pot"
		: "Adding to Pot";

	const buttonLabel = isPending ? buttonPendingText : buttonText;

	return (
		<DialogCard heading={heading} description={description}>
			<Form
				action={formAction}
				actionState={state}
				fieldNames={["total", "target"]}
				className="gap-lg"
			>
				<input type="hidden" name="id" value={pot.id} />
				<input type="hidden" name="target" value={pot.target} />
				<input type="hidden" name="total" value={projectedTotal} />
				<AmountPreview
					isWithdrawing={isWithdrawing}
					target={pot.target}
					total={pot.total}
					newAmount={amount}
				/>
				<InputField
					type="number"
					autoFocus={true}
					label={`Amount to ${isWithdrawing ? "Withdraw" : "Add"}`}
					name="amount"
					placeholder="e.g. 2000"
					min={0}
					max={amountLimit}
					error={state.fieldErrors?.total}
					value={amount.toString()}
					onChange={(event) => setAmount(+event.target.value)}
					IconLeft={IconDollar}
				/>
				<SubmitButton label={buttonLabel} />
			</Form>
		</DialogCard>
	);
}
