import { CATEGORIES } from "@/constants/transaction";

export const SortingSelectOptions = [
  "Latest",
  "Oldest",
  "A to Z",
  "Z to A",
  "Highest",
  "Lowest",
] as const;

export const CategorySelectOptions = [
  "All Transactions",
  ...CATEGORIES
] as const;


export const NewForm = {
  heading: "Add New Transaction",
  description:
    "Create a transaction to track your spending. This can help keep you on track as you manage your finances.",
};

export const EditForm = {
  heading: "Edit Transaction",
  description: "If your transaction details change, feel free to update them.",
};

export const DeleteTransaction = {
  description:
    "Are you sure you want to delete this transaction? This action cannot be reversed, and all the data inside it will be removed forever.",
};

export const TRANSACTION_ERROR_MESSAGES = {
  NOT_FOUND: "Transaction not found.",
  DUPLICATE: "A transaction with the same details already exists.",
  INVALID_ID: "Invalid transaction id.",
  CREATE_FAILED: "Failed to create transaction. Please try again later.",
  UPDATE_FAILED: "Failed to update transaction. Please try again later.",
  DELETE_FAILED: "Failed to delete transaction. Please try again later.",
  FETCH_BY_ID_FAILED: "Failed to get transaction. Please try again later.",
  FETCH_ALL_FAILED: "Failed to get transactions. Please try again later.",
  FETCH_SUMMARY_FAILED: "Failed to get Account Summary. Please try again later.",
  UNEXPECTED: "Unexpected error. Please try again later.",
} as const;