"use client";

import { useActionState } from "react";
import DialogCard from "@/components/ui/DialogCard";
import ColorSelect from "@/components/ui/form/ColorSelect";
import TextInput from "@/components/ui/form/TextInput";
import { Budget } from "../types";
import Select from "@/components/ui/form/Select";
import IconDollar from "@/components/icons/IconDollar";
import { CategorySelectOptions, colorOptions } from "../constants";
import { BudgetFormState } from "../actions";

export default function BudgetForm({
  heading,
  description,
  action,
  initialData,
}: {
  heading: string;
  description: string;
  initialData?: Budget;
  action: (
    prevState: BudgetFormState,
    formData: FormData,
  ) => Promise<BudgetFormState>;
}) {
  const [state, formAction, isPending] = useActionState(action, {
    success: false,
    data: initialData,
  });

  return (
    <>
      <DialogCard heading={heading} description={description}>
        <form className="flow-base" action={formAction}>
          <Select
            name="category"
            label="Budget Category"
            defaultValue={initialData?.category}
            options={CategorySelectOptions}
          />
          <TextInput
            type="number"
            name="maximum"
            label="Maximum Spend"
            placeholder="e.g. 2000"
            defaultValue={initialData?.maximum ?? ""}
            error={state.errors?.maximum}
            IconLeft={IconDollar}
          />
          <ColorSelect
            defaultValue={initialData?.theme}
            options={colorOptions}
            label="Theme"
            name="theme"
          />
          <button disabled={isPending} className="w-full button" type="submit">
            {isPending
              ? initialData
                ? "Saving Changes"
                : "Adding Budget"
              : initialData
                ? "Save Changes"
                : "Add Budget"}
          </button>
        </form>
      </DialogCard>
    </>
  );
}
