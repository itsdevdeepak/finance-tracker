"use client";

import { useActionState, useEffect } from "react";
import { Pot } from "../types";
import { colorOptions } from "../constants";
import { PotFormState } from "../actions";
import { useModal } from "@/components/ui/Modal";
import TextInput from "@/components/ui/form/TextInput";
import ColorSelect from "@/components/ui/form/ColorSelect";
import IconDollar from "@/components/icons/IconDollar";
import DialogCard from "@/components/ui/DialogCard";

export default function PotForm({
  heading,
  description,
  initialData,
  action,
}: {
  heading: string;
  description: string;
  initialData?: Pot;
  action: (
    prevState: PotFormState,
    formData: FormData,
  ) => Promise<PotFormState>;
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
          label="Pot Name"
          name="name"
          placeholder="e.g. Rainy Days"
          error={state.errors?.name}
          helperText="Max 30 characters"
        />
        <TextInput
          type="number"
          defaultValue={initialData?.target ?? ""}
          label="Target"
          error={state.errors?.target}
          name="target"
          placeholder="e.g. 2000"
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
              : "Adding Pot"
            : initialData
              ? "Save Changes"
              : "Add Pot"}
        </button>
      </form>
    </DialogCard>
  );
}
