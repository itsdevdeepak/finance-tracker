"use server";

import { revalidatePath } from "next/cache";
import { validateCategory, validateMaximumSpent, validateTheme } from "./utils";
import { createBudget, deleteBudgetById, updateBudgetById } from "./service";
import { ActionState } from "@/components/ui/form/types";
import { fromErrorToActionState } from "@/components/ui/form/utils";
import { BUDGET_ERROR_MESSAGES } from "./constants";
import { redirect } from "next/navigation";
import { setCookieByKey } from "@/actions/cookies";
import { budgetsPath } from "@/constants/paths";

export async function budgetFormAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {

  const id = formData.get("id") as string | null;
  const category = validateCategory(formData.get("category"));
  const maximum = validateMaximumSpent(formData.get("maximum"));
  const theme = validateTheme(formData.get("theme"));

  const fieldErrors: ActionState["fieldErrors"] = {};

  if (!category) fieldErrors.category = "Please select a valid Category";
  if (!maximum) fieldErrors.maximum = "Amount must be a positive number";
  if (!theme) fieldErrors.theme = "Please select a valid theme";

  if (Object.keys(fieldErrors).length > 0) {
    return fromErrorToActionState(fieldErrors, formData, { isValidationError: true });
  }

  if (id) {
    const { error } = await updateBudgetById({
      id,
      updatedFields: {
        category: category as string,
        maximum: maximum as number,
        theme: theme as string,
      },
    });

    if (error) {
      return fromErrorToActionState(error || BUDGET_ERROR_MESSAGES.UPDATE_FAILED);
    }

    revalidatePath(budgetsPath());

    await setCookieByKey("toast", "Budget updated");

  } else {
    const { error } = await createBudget({
      category: category as string,
      maximum: maximum as number,
      theme: theme as string,
    });

    if (error) {
      return fromErrorToActionState(error || BUDGET_ERROR_MESSAGES.CREATE_FAILED, formData);
    }

    revalidatePath(budgetsPath());

    await setCookieByKey("toast", "Budget created");
  }

  redirect(budgetsPath());
}

export async function deleteBudget(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const id = (formData.get("id") as string) || "";

  const { error } = await deleteBudgetById(id);

  if (error) {
    return fromErrorToActionState(BUDGET_ERROR_MESSAGES.DELETE_FAILED);
  }

  revalidatePath(budgetsPath());

  await setCookieByKey("toast", "Budget deleted");

  redirect(budgetsPath());
}
