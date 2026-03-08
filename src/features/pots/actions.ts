"use server";

import { revalidatePath } from "next/cache";
import { createNewPot, deletePotById, updatePotById } from "./service";
import {
  validateName,
  validateTarget,
  validateTheme,
  validateTotal,
} from "./utils";
import { Pot } from "./types";

export type PotFormState = {
  success: boolean;
  errors?: {
    name?: string;
    target?: string;
    theme?: string;
    other?: string;
  };
  data?: Pot;
};

export type PotSavingFormState = {
  success: boolean;
  errors?: {
    total?: string;
    other?: string;
  };

  data?: Pot;
};

export async function potSavingFormAction(
  prevState: PotSavingFormState,
  formData: FormData,
): Promise<PotSavingFormState> {
  if (!prevState.data)
    return {
      success: false,
      errors: { other: "Failed to update pot. Please try again" },
    };

  const id = prevState.data.id;

  const total = validateTotal(formData.get("total"), prevState.data.target);

  if (!total) {
    return {
      success: false,
      errors: {
        total: "Amount must be positive and cannot exceed target amount",
      },
    };
  }

  const { data, error } = await updatePotById(id, { total });
  if (error || !data.pot)
    return {
      success: false,
      errors: { other: "Failed to update pot. Please try again" },
    };

  revalidatePath(`/pots`);
  revalidatePath(`/pots/${id}`);

  return { success: true, data: data.pot };
}

export async function potFormAction(
  prevState: PotFormState,
  formData: FormData,
): Promise<PotFormState> {
  const id = prevState.data?.id;

  const name = validateName(formData.get("name"));
  const target = validateTarget(formData.get("target"));
  const theme = validateTheme(formData.get("theme"));

  const errors: PotFormState["errors"] = {};

  if (!name) errors.name = "Name must be between 1 and 30 characters";
  if (!target) errors.target = "Target must be a positive number";
  if (!theme) errors.theme = "Please select a valid theme";

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  if (id) {
    const { data, error } = await updatePotById(id, {
      name: name as string,
      target: target as number,
      theme: theme as string,
    });

    if (error || !data.pot) {
      return {
        success: false,
        errors: { other: "Failed to update pot. Please try again!" },
      };
    }

    revalidatePath(`/pots`);
    revalidatePath(`/pots/${id}`);

    return { success: true, data: data.pot };
  }

  const { data, error } = await createNewPot({
    name: name as string,
    target: target as number,
    theme: theme as string,
    total: 0,
  });

  if (error)
    return {
      success: false,
      errors: { other: "Failed to create pot. Please try again!" },
    };

  revalidatePath("/pots");
  return { success: true, data: data.pot as Pot };
}

export type DeletePotActionState = {
  success: boolean;
  error?: string;
  data?: Pot;
};

export async function deletePot(id: string): Promise<DeletePotActionState> {
  const { error, data } = await deletePotById(id);

  if (error || !data.pot)
    return {
      success: false,
      error: "Failed to delete pot. Please try again! or Try going back.",
    };

  revalidatePath(`/pots`);
  revalidatePath(`/pots/${data.pot.id}`);

  return { success: true, data: data.pot };
}
