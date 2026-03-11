import type { Option } from "@/components/ui/form/Select";
import { ColorsByName } from "@/constants/colors";
import { categories } from "@/constants/transaction";

export const colorOptions = Object.entries(ColorsByName).map(([key, val]) => ({
  value: key,
  color: val,
}));

export const CategorySelectOptions: Option[] = categories.map((category) => ({
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
