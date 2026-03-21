"use server";

import { revalidatePath } from "next/cache";
import { RecurringBill } from "./types";
import { createRecurringBill, deleteRecurringBillById, updateRecurringBillById } from "./service";
import {
  validateDueDate,
  validateRecurringBillAmount,
  validateRecurringBillCategory,
  validateRecurringBillName,
} from "./utils";

export type RecurringBillFormState = {
  success: boolean;
  errors?: {
    name?: string;
    amount?: string;
    category?: string;
    dueDate?: string;
    other?: string;
  };
  data?: RecurringBill;
};


export async function recurringBillFormAction(
  prevState: RecurringBillFormState,
  formData: FormData,
): Promise<RecurringBillFormState> {
  const id = prevState.data?.id;

  const name = validateRecurringBillName(formData.get("name"));
  const amount = validateRecurringBillAmount(formData.get("amount"));
  const category = validateRecurringBillCategory(formData.get("category"));
  const dueDate = validateDueDate(formData.get("dueDate") ?? formData.get("date"));

  const errors: RecurringBillFormState["errors"] = {};

  if (!name) errors.name = "Name must be between 1 and 30 characters";
  if (!amount) errors.amount = "Amount must be a number";
  if (!category) errors.category = "Invalid category name";
  if (!dueDate) errors.dueDate = "Date must be between 1 and 31";

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  if (id) {
    const { data, error } = await updateRecurringBillById(id, {
      name: name as string,
      amount: amount as number,
      category: category as string,
      dueDate: dueDate as number
    });

    if (error || !data.recurringBill) {
      return {
        success: false,
        errors: { other: "Failed to update recurring bill. Please try again!" },
      };
    }

    revalidatePath(`/recurring-bills`);
    revalidatePath(`/recurring-bills/${id}`);

    return { success: true, data: data.recurringBill };
  }

  const { data, error } = await createRecurringBill({
    name: name as string,
    amount: amount as number,
    category: category as string,
    dueDate: dueDate as number,
    avatar: null
  });

  if (error || !data.recurringBill)
    return {
      success: false,
      errors: { other: "Failed to create recurring bill. Please try again!" },
    };

  revalidatePath("/recurring-bills");
  return { success: true, data: data.recurringBill };
}

export type DeleteRecurringBillActionState = {
  success: boolean;
  error?: string;
  data?: RecurringBill;
};

export async function deleteRecurringBill(id: string): Promise<DeleteRecurringBillActionState> {
  const { error, data } = await deleteRecurringBillById(id);

  if (error || !data.recurringBill)
    return {
      success: false,
      error: "Failed to delete recurring bill. Please try again! or Try going back.",
    };

  revalidatePath(`/recurring-bills`);
  revalidatePath(`/recurring-bills/${data.recurringBill.id}`);

  return { success: true, data: data.recurringBill };
}
