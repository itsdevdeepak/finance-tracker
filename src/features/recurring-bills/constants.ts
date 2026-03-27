import type { Option } from "@/components/ui/form/Select";
import { CATEGORIES } from "@/constants/transaction";

export const SORT_OPTIONS = [
  "Latest",
  "Oldest",
  "A to Z",
  "Z to A",
  "Highest",
  "Lowest",
] as const;

export const CategorySelectOptions: Option[] = CATEGORIES.map((category) => ({
  value: category,
}));

export const NewForm = {
  heading: "Add New Recurring Bill",
  description:
    "Set up a recurring bill to track monthly payments and stay ahead of upcoming due dates.",
};

export const EditForm = {
  heading: "Edit Recurring Bill",
  description:
    "If your recurring bill details change, update them here to keep your records accurate.",
};

export const DeleteRecurringBill = {
  description:
    "Are you sure you want to delete this recurring bill? This action cannot be reversed, and all the data inside it will be removed forever.",
};

export const RECURRING_BILLS_ERROR_MESSAGES = {
  NOT_FOUND: "Recurring bill not found.",
  DUPLICATE: "A recurring bill with the same details already exists.",
  INVALID_ID: "Invalid recurring bill id.",
  CREATE_FAILED: "Failed to create recurring bill. Please try again later.",
  UPDATE_FAILED: "Failed to update recurring bill. Please try again later.",
  DELETE_FAILED: "Failed to delete recurring bill. Please try again later.",
  FETCH_BY_ID_FAILED: "Failed to get recurring bill. Please try again later.",
  FETCH_ALL_FAILED: "Failed to get recurring bills. Please try again later.",
  UNEXPECTED: "Unexpected error. Please try again later.",
} as const;