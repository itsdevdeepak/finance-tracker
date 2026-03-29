"use server";

import { revalidatePath } from "next/cache";
import {
  validateAmount,
  validateCategory,
  validateDate,
  validateName,
} from "./utils";
import {
  createTransaction,
  deleteTransactionById,
  updateTransactionById,
} from "./service";
import { ActionState } from "@/components/ui/form/types";
import {
  fromErrorToActionState,
} from "@/components/ui/form/utils";
import { redirect } from "next/navigation";
import { setCookieByKey } from "@/actions/cookies";
import { TRANSACTION_ERROR_MESSAGES } from "./constants";
import { transactionsPath } from "@/constants/paths";

type ValidFields = "id" | "name" | "amount" | "category" | "date" | "avatar";
type TransactionFormState = ActionState<ValidFields>;

export async function transactionFormAction(
  _prevState: TransactionFormState,
  formData: FormData,
): Promise<TransactionFormState> {

  const id = formData.get("id") as string | null;
  const name = validateName(formData.get("name"));
  const amount = validateAmount(formData.get("amount"));
  const category = validateCategory(formData.get("category"));
  const date = validateDate(formData.get("date"));

  const fieldErrors: TransactionFormState["fieldErrors"] = {};

  if (!name) fieldErrors.name = "Name must be between 1 and 30 characters";
  if (!amount) fieldErrors.amount = "Amount must be a number";
  if (!category) fieldErrors.category = "Invalid category name";
  if (!date) fieldErrors.date = "Invalid date";

  if (Object.keys(fieldErrors).length > 0) {
    return fromErrorToActionState(fieldErrors, formData, {
      isValidationError: true,
    });
  }

  if (id) {
    const { error } = await updateTransactionById(id, {
      name: name as string,
      amount: amount as number,
      category: category as string,
      date: date as Date,
    });

    if (error) {
      return fromErrorToActionState(
        error || TRANSACTION_ERROR_MESSAGES.UPDATE_FAILED,
        formData,
      );
    }

    revalidatePath(transactionsPath());
    await setCookieByKey("toast", "Transaction updated");

    redirect(transactionsPath());
  } else {
    const { error } = await createTransaction({
      name: name as string,
      amount: amount as number,
      category: category as string,
      date: date as Date,
      avatar: null,
    });

    if (error) {
      return fromErrorToActionState(
        error || TRANSACTION_ERROR_MESSAGES.CREATE_FAILED,
        formData,
      );
    }

    revalidatePath(transactionsPath());
    await setCookieByKey("toast", "Transaction created");

    redirect(transactionsPath());
  }
}

export async function deleteTransaction(
  _prevState: ActionState<"id">,
  formData: FormData,
): Promise<ActionState<"id">> {
  const id = (formData.get("id") as string) || "";
  const { error } = await deleteTransactionById(id);

  if (error) {
    return fromErrorToActionState(error || TRANSACTION_ERROR_MESSAGES.DELETE_FAILED, formData);
  }

  revalidatePath(transactionsPath());
  await setCookieByKey("toast", "Transaction deleted");

  redirect(transactionsPath());
}
