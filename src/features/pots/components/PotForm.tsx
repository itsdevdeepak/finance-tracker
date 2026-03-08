"use client";

import { useActionState, useEffect } from "react";
import { Pot } from "../types";
import { colorOptions } from "../constants";
import { PotFormState } from "../actions";
import { useModal } from "@/components/ui/Modal";
import ModalCloseButton from "./ModalCloseButton";
import TextInput from "@/components/ui/form/TextInput";
import ColorSelect from "@/components/ui/form/ColorSelect";
import IconDollar from "@/components/icons/IconDollar";

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
    <div className="bg-white rounded-xl px-lg py-xl flow-lg md:min-w-[500px] shadow">
      <div className="w-full inline-flex items-center justify-between">
        <h1 className="text-lg md:text-xl font-bold">{heading}</h1>
        <ModalCloseButton />
      </div>
      {state.errors?.other && (
        <p className="text-red font-bold text-sm">{state.errors?.other}</p>
      )}
      <p className="text-gray text-sm max-w-[55ch]">{description}</p>
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
    </div>
  );
}
