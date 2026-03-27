import type { Option } from "@/components/ui/form/Select";
import { ColorsByName } from "@/constants/colors";
import { CATEGORIES } from "@/constants/transaction";

export const colorOptions = Object.entries(ColorsByName).map(([key, val]) => ({
  value: key,
  color: val,
}));

export const CategorySelectOptions: Option[] = CATEGORIES.map((category) => ({
  value: category,
}));

export const NewForm = {
  heading: "Add New Budget",
  description:
    "Choose a category to set a spending budget. These categories can help you monitor spending.",
};

export const EditForm = {
  heading: "Edit Budget",
  description:
    "As your budgets change, feel free to update your spending limits.",
};

export const DeleteBudget = {
  description:
    "Are you sure you want to delete this budget? This action cannot be reversed, and all the data inside it will be removed forever.",
};

export const BUDGET_ERROR_MESSAGES = {
  NOT_FOUND: "Budget not found.",
  DUPLICATE: "A budget with the same details already exists.",
  INVALID_ID: "Invalid budget id.",
  CREATE_FAILED: "Failed to create budget. Please try again later.",
  UPDATE_FAILED: "Failed to update budget. Please try again later.",
  DELETE_FAILED: "Failed to delete budget. Please try again later.",
  FETCH_BY_ID_FAILED: "Failed to get budget. Please try again later.",
  FETCH_ALL_FAILED: "Failed to get budgets. Please try again later.",
  UNEXPECTED: "Unexpected error. Please try again later.",
} as const;