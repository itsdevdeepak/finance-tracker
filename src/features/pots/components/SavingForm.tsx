"use client";

import { useActionState, useEffect, useState } from "react";
import { Pot } from "../types";
import { PotSavingFormState } from "../actions";
import { formatCurrency } from "@/lib/utils/format";
import { useModal } from "@/components/ui/Modal";
import ModalCloseButton from "./ModalCloseButton";
import ProgressBar from "./ProgressBar";
import TextInput from "@/components/ui/form/TextInput";
import IconDollar from "@/components/icons/IconDollar";

function AmountPreview({
  type,
  target,
  newAmount,
  total,
}: {
  type: "adding" | "withdraw";
  newAmount: number;
  target: number;
  total: number;
}) {
  const isWithdrawing = type === "withdraw";
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
  action: (
    prevState: PotSavingFormState,
    formData: FormData,
  ) => Promise<PotSavingFormState>;
  pot: Pot;
}) {
  const [amount, setAmount] = useState(0);
  const [state, formAction, isPending] = useActionState(action, {
    success: false,
    data: pot,
  });
  const context = useModal();

  useEffect(() => {
    if (state.success) {
      context?.closeModal();
    }
  }, [state.success, context]);

  const isWithdrawing = type === "withdraw";
  const amountLimit = isWithdrawing ? pot.total : pot.target - pot.total;

  const buttonText = isWithdrawing ? "Confirm Withdrawal" : "Confirm Addition";
  const buttonPendingText = isWithdrawing
    ? "Withdrawing from Pot"
    : "Adding to Pot";

  return (
    <div className="bg-white rounded-xl px-lg py-xl flow-lg max-w-[516px] shadow">
      <div className="w-full inline-flex items-center justify-between">
        <h1 className="text-lg md:text-xl font-bold">{heading}</h1>
        <ModalCloseButton />
      </div>
      {state.errors?.other && (
        <p className="text-red font-bold text-sm">{state.errors?.other}</p>
      )}
      <p className="text-gray text-sm">{description}</p>
      <form action={formAction} className="flow-lg">
        <AmountPreview
          type={type}
          target={pot.target}
          total={pot.total}
          newAmount={amount}
        />
        <TextInput
          type="number"
          autoFocus={true}
          label={`Amount to ${isWithdrawing ? "Withdraw" : "Add"}`}
          name="total"
          placeholder="e.g. 2000"
          min={0}
          max={amountLimit}
          error={state.errors?.total}
          value={amount.toString()}
          onChange={(event) => setAmount(+event.target.value)}
          IconLeft={IconDollar}
        />
        <button disabled={isPending} className="w-full button" type="submit">
          {isPending ? buttonPendingText : buttonText}
        </button>
      </form>
    </div>
  );
}
