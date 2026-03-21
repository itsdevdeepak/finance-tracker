"use client";

import { useActionState, useEffect } from "react";
import DialogCard from "@/components/ui/DialogCard";
import TextInput from "@/components/ui/form/TextInput";
import Select from "@/components/ui/form/Select";
import IconDollar from "@/components/icons/IconDollar";
import { useModal } from "@/components/ui/Modal";
import { RecurringBillFormState } from "../action";
import { RecurringBill } from "../types";
import { CategorySelectOptions } from "../constants";

export default function RecurringBillForm({
  heading,
  description,
  initialData,
  action,
}: {
  heading: string;
  description: string;
  initialData?: RecurringBill;
  action: (
    prevState: RecurringBillFormState,
    formData: FormData,
  ) => Promise<RecurringBillFormState>;
}) {
  const context = useModal();
  const [state, formAction, isPending] = useActionState(action, {
    success: false,
    data: initialData,
  });

  useEffect(() => {
    if (state.success) {
      context?.closeModal();
    }
  }, [state.success, context]);

  return (
    <DialogCard
      heading={heading}
      description={description}
      error={state.errors?.other}
    >
      <form className="flow-base" action={formAction}>
        <TextInput
          autoFocus={true}
          defaultValue={initialData?.name ?? ""}
          label="Recurring Bill Name"
          name="name"
          placeholder="e.g. Netflix"
          error={state.errors?.name}
          helperText="Max 30 characters"
        />
        <TextInput
          type="number"
          defaultValue={initialData?.amount ?? ""}
          label="Amount"
          error={state.errors?.amount}
          name="amount"
          placeholder="e.g. 2000"
          IconLeft={IconDollar}
        />
        <TextInput
          type="number"
          defaultValue={initialData?.dueDate ?? ""}
          label="Due Day of Month"
          error={state.errors?.dueDate}
          name="dueDate"
          min={1}
          max={31}
          placeholder="e.g. 15"
          helperText="Enter a value between 1 and 31"
        />
        <Select
          name="category"
          label="Category"
          defaultValue={initialData?.category}
          options={CategorySelectOptions}
        />
        <button disabled={isPending} className="w-full button" type="submit">
          {isPending
            ? initialData
              ? "Saving Changes"
              : "Adding Recurring Bill"
            : initialData
              ? "Save Changes"
              : "Add Recurring Bill"}
        </button>
      </form>
    </DialogCard>
  );
}
