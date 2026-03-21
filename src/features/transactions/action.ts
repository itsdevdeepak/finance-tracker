"use server";

import { revalidatePath } from "next/cache";
import { Transaction } from "./types";
import { validateAmount, validateCategory, validateDate, validateName } from "./utils";
import { createTransaction, deleteTransactionById, updateTransactionById } from "./service";

export type TransactionFormState = {
  success: boolean;
  errors?: {
    name?: string;
    amount?: string;
    category?: string;
    date?: string;
    avatar?: string;
    other?: string;
  };
  data?: Transaction;
};


export async function transactionFormAction(
  prevState: TransactionFormState,
  formData: FormData,
): Promise<TransactionFormState> {
  const id = prevState.data?.id;

  const name = validateName(formData.get("name"));
  const amount = validateAmount(formData.get("amount"));
  const category = validateCategory(formData.get("category"));
  const date = validateDate(formData.get("date"));

  const errors: TransactionFormState["errors"] = {};

  if (!name) errors.name = "Name must be between 1 and 30 characters";
  if (!amount) errors.amount = "Amount must be a number";
  if (!category) errors.category = "Invalid category name";
  if (!date) errors.date = "Invalid date";

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  if (id) {
    const { data, error } = await updateTransactionById(id, {
      name: name as string,
      amount: amount as number,
      category: category as string,
      date: date as Date,
    });

    if (error || !data.transaction) {
      return {
        success: false,
        errors: { other: "Failed to update transaction. Please try again!" },
      };
    }

    revalidatePath(`/transactions`);
    revalidatePath(`/transactions/${id}`);

    return { success: true, data: data.transaction };
  }

  const { data, error } = await createTransaction({
    name: name as string,
    amount: amount as number,
    category: category as string,
    date: date as Date,
    avatar: null
  });

  if (error || !data.transaction)
    return {
      success: false,
      errors: { other: "Failed to create transaction. Please try again!" },
    };

  revalidatePath("/pots");
  return { success: true, data: data.transaction };
}

export type DeleteTransactionActionState = {
  success: boolean;
  error?: string;
  data?: Transaction;
};

export async function deleteTransaction(id: string): Promise<DeleteTransactionActionState> {
  const { error, data } = await deleteTransactionById(id);

  if (error || !data.transaction)
    return {
      success: false,
      error: "Failed to delete transaction. Please try again! or Try going back.",
    };

  revalidatePath(`/transactions`);
  revalidatePath(`/transactions/${data.transaction.id}`);

  return { success: true, data: data.transaction };
}
