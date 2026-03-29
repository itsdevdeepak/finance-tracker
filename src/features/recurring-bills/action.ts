"use server";

import { revalidatePath } from "next/cache";
import { createRecurringBill, deleteRecurringBillById, payRecurringBillById, updateRecurringBillById } from "./service";
import {
  validateDueDate,
  validateRecurringBillAmount,
  validateRecurringBillCategory,
  validateRecurringBillName,
} from "./utils";
import { ActionState } from "@/components/ui/form/types";
import { fromErrorToActionState } from "@/components/ui/form/utils";
import { RECURRING_BILLS_ERROR_MESSAGES } from "./constants";
import { redirect } from "next/navigation";
import { setCookieByKey } from "@/actions/cookies";
import { recurringBillsPath, transactionsPath } from "@/constants/paths";

export async function recurringBillFormAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const id = formData.get("name") as string | null;
  const name = validateRecurringBillName(formData.get("name"));
  const amount = validateRecurringBillAmount(formData.get("amount"));
  const category = validateRecurringBillCategory(formData.get("category"));
  const dueDate = validateDueDate(formData.get("dueDate") ?? formData.get("date"));

  const fieldErrors: ActionState["fieldErrors"] = {};

  if (!name) fieldErrors.name = "Name must be between 1 and 30 characters";
  if (!amount) fieldErrors.amount = "Amount must be a number";
  if (!category) fieldErrors.category = "Invalid category name";
  if (!dueDate) fieldErrors.dueDate = "Date must be between 1 and 31";

  if (Object.keys(fieldErrors).length > 0) {
    return fromErrorToActionState(fieldErrors, formData, {
      isValidationError: true,
    });
  }

  if (id) {
    const { error } = await updateRecurringBillById(id, {
      name: name as string,
      amount: amount as number,
      category: category as string,
      dueDate: dueDate as number
    });

    if (error) {
      return fromErrorToActionState(error || RECURRING_BILLS_ERROR_MESSAGES.UPDATE_FAILED, formData);
    }

    revalidatePath(recurringBillsPath());
    await setCookieByKey("toast", "Recurring bill updated");
  } else {
    const { error } = await createRecurringBill({
      name: name as string,
      amount: amount as number,
      category: category as string,
      dueDate: dueDate as number,
      avatar: null
    });

    if (error)
      return fromErrorToActionState(error || RECURRING_BILLS_ERROR_MESSAGES.CREATE_FAILED, formData);

    revalidatePath(recurringBillsPath());
    await setCookieByKey("toast", "Recurring bill created");
  }

  redirect(recurringBillsPath());
}

export async function deleteRecurringBill(_prevState: ActionState,
  formData: FormData): Promise<ActionState> {
  const id = (formData.get("id") as string) || "";
  const { error } = await deleteRecurringBillById(id);

  if (error) {
    fromErrorToActionState(error || RECURRING_BILLS_ERROR_MESSAGES.DELETE_FAILED, formData);
  }

  revalidatePath(recurringBillsPath());
  await setCookieByKey("toast", "Recurring bill deleted");

  redirect(recurringBillsPath());
}

export async function payRecurringBill(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const id = (formData.get("id") as string) || "";

  const { error } = await payRecurringBillById(id);

  if (error) {
    fromErrorToActionState(error || RECURRING_BILLS_ERROR_MESSAGES.PAY_FAILED, formData);
  }

  revalidatePath(recurringBillsPath());
  revalidatePath(transactionsPath());
  await setCookieByKey("toast", "Recurring bill paid");

  redirect(recurringBillsPath());
}
