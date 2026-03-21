export const SortingSelectOptions = [
  "Latest",
  "Oldest",
  "A to Z",
  "Z to A",
  "Highest",
  "Lowest",
] as const;

export const categorySelectOptions = [
  "All Transactions",
  "Entertainment",
  "Bills",
  "Groceries",
  "Dining Out",
  "Transportation",
  "Personal Care",
  "Education",
  "Lifestyle",
  "Shopping",
  "General",
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