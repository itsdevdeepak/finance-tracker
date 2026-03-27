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
import { ActionState } from "@/components/ui/form/types";
import { fromErrorToActionState } from "@/components/ui/form/utils";
import { POT_ERROR_MESSAGES } from "./constants";
import { setCookieByKey } from "@/actions/cookies";
import { redirect } from "next/navigation";
import { potsPath } from "@/constants/paths";

export async function potSavingFormAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const id = formData.get("id") as string | null;
  const target = validateTarget(formData.get("target"));

  if (!target) {
    return fromErrorToActionState("Target was not provided", formData, { isValidationError: true });
  }

  const total = validateTotal(formData.get("total"), target);

  if (!total) {
    return fromErrorToActionState("Amount must be positive and cannot exceed target amount", formData, { isValidationError: true });
  }


  const { error } = await updatePotById(id || "", { total });

  if (error) {
    return fromErrorToActionState(error || POT_ERROR_MESSAGES.UPDATE_FAILED, formData);
  }

  revalidatePath(potsPath());

  await setCookieByKey("toast", "Pot updated");

  redirect(potsPath());
}

export async function potFormAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {

  const id = formData.get("id") as string | null;
  const name = validateName(formData.get("name"));
  const target = validateTarget(formData.get("target"));
  const theme = validateTheme(formData.get("theme"));

  const fieldErrors: ActionState["fieldErrors"] = {};

  if (!name) fieldErrors.name = "Name must be between 1 and 30 characters";
  if (!target) fieldErrors.target = "Target must be a positive number";
  if (!theme) fieldErrors.theme = "Please select a valid theme";

  if (Object.keys(fieldErrors).length > 0) {
    return fromErrorToActionState(fieldErrors, formData, { isValidationError: true });
  }

  if (id) {
    const { error } = await updatePotById(id, {
      name: name as string,
      target: target as number,
      theme: theme as string,
    });

    if (error) {
      return fromErrorToActionState(error || POT_ERROR_MESSAGES.UPDATE_FAILED, formData);
    }

    revalidatePath(potsPath());
    await setCookieByKey("toast", "Pot updated");

  } else {
    const { error } = await createNewPot({
      name: name as string,
      target: target as number,
      theme: theme as string,
      total: 0,
    });

    if (error) {
      return fromErrorToActionState(error || POT_ERROR_MESSAGES.CREATE_FAILED, formData);
    }

    revalidatePath(potsPath());

    await setCookieByKey("toast", "Pot created");
  }

  redirect(potsPath());
}

export type DeletePotActionState = {
  success: boolean;
  error?: string;
  data?: Pot;
};

export async function deletePot(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const id = (formData.get("id") as string) || "";

  const { error } = await deletePotById(id);

  if (error) {
    return fromErrorToActionState(error || POT_ERROR_MESSAGES.DELETE_FAILED, formData);
  }

  revalidatePath(potsPath());

  await setCookieByKey("toast", "Pot deleted");

  redirect(potsPath());
}
