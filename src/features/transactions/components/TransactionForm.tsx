"use client";

import DialogCard from "@/components/ui/DialogCard";
import { Transaction } from "../types";
import { TransactionFormState } from "../action";
import { ChangeEvent, useActionState, useState } from "react";
import TextInput from "@/components/ui/form/TextInput";
import Select from "@/components/ui/form/Select";
import { categorySelectOptions } from "../constants";
import IconDollar from "@/components/icons/IconDollar";

export default function TransactionForm({
  heading,
  description,
  initialData,
  action,
}: {
  heading: string;
  description: string;
  initialData?: Transaction;
  action: (
    prevState: TransactionFormState,
    formData: FormData,
  ) => Promise<TransactionFormState>;
}) {
  const [formValues, setFormValues] = useState({
    name: initialData?.name ?? "",
    amount: initialData?.amount?.toString() ?? "",
    avatar: initialData?.avatar ?? "",
    date: initialData?.date.toString() ?? "",
  });

  const [state, formAction, isPending] = useActionState(action, {
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
    <DialogCard
      heading={heading}
      description={description}
      error={state.errors?.other}
    >
      <form className="flow-base" action={formAction}>
        <TextInput
          autoFocus={true}
          label="Transaction Name"
          name="name"
          placeholder="e.g. Jimmy"
          helperText="Max 30 characters"
          value={formValues.name}
          onChange={handleInputChange}
          error={state.errors?.name}
        />
        <TextInput
          type="number"
          label="Amount"
          name="amount"
          placeholder="e.g. 2000"
          value={formValues.amount}
          onChange={handleInputChange}
          error={state.errors?.amount}
          IconLeft={IconDollar}
        />
        <TextInput
          type="text"
          label="Date"
          name="date"
          placeholder="e.g. 2026/02/13"
          value={formValues.date}
          onChange={handleInputChange}
          error={state.errors?.date}
          helperText="Format: YYYY/MM/DD"
        />
        <Select
          defaultValue={initialData?.category}
          options={categorySelectOptions.map((category) => ({
            value: category,
          }))}
          label="Category"
          name="category"
        />
        <button disabled={isPending} className="w-full button" type="submit">
          {isPending
            ? initialData
              ? "Saving Changes"
              : "Adding Transaction"
            : initialData
              ? "Save Changes"
              : "Add Transaction"}
        </button>
      </form>
    </DialogCard>
  );
}
