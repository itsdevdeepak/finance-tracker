import type { Option } from "@/components/ui/form/Select";
import { categories } from "@/constants/transaction";

export const SORT_OPTIONS = [
  "Latest",
  "Oldest",
  "A to Z",
  "Z to A",
  "Highest",
  "Lowest",
] as const;

export const CategorySelectOptions: Option[] = categories.map((category) => ({
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
