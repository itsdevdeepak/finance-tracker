"use server";

import { revalidatePath } from "next/cache";
import { Budget } from "./types";
import { validateCategory, validateMaximumSpent, validateTheme } from "./utils";
import { createBudget, deleteBudgetById, updateBudgetById } from "./service";

export type BudgetFormState = {
  success: boolean;
  errors?: {
    category?: string;
    maximum?: string;
    theme?: string;
    other?: string;
  };
  data?: Budget;
};

export async function budgetFormAction(
  prevState: BudgetFormState,
  formData: FormData,
): Promise<BudgetFormState> {
  const id = prevState.data?.id;

  const category = validateCategory(formData.get("category"));
  const maximum = validateMaximumSpent(formData.get("maximum"));
  const theme = validateTheme(formData.get("theme"));

  const errors: BudgetFormState["errors"] = {};

  if (!category) errors.category = "Please select a valid Category";
  if (!maximum) errors.maximum = "Amount must be a positive number";
  if (!theme) errors.theme = "Please select a valid theme";

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  if (id) {
    const { data, error } = await updateBudgetById({
      id,
      updatedFields: {
        category: category as string,
        maximum: maximum as number,
        theme: theme as string,
      },
    });

    if (error || !data.budget) {
      return {
        success: false,
        errors: { other: "Failed to update Budget. Please try again!" },
      };
    }

    revalidatePath(`/budget`);
    revalidatePath(`/budget/${id}`);

    return { success: true, data: data.budget };
  }

  const { data, error } = await createBudget({
    category: category as string,
    maximum: maximum as number,
    theme: theme as string,
  });

  if (error)
    return {
      success: false,
      errors: { other: "Failed to create Budget. Please try again!" },
    };

  revalidatePath("/budget");
  return { success: true, data: data.budget as Budget };
}

export type DeleteBudgetActionState = {
  success: boolean;
  error?: string;
  data?: Budget;
};

export async function deleteBudget(
  id: string,
): Promise<DeleteBudgetActionState> {
  const { error, data } = await deleteBudgetById(id);

  if (error || !data.budget)
    return {
      success: false,
      error: "Failed to delete Budget. Please try again! or Try going back.",
    };

  revalidatePath(`/budget`);
  revalidatePath(`/budget/${data.budget.id}`);

  return { success: true, data: data.budget };
}
