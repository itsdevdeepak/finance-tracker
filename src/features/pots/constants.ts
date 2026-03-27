import { ColorsByName } from "@/constants/colors";

export const colorOptions = Object.entries(ColorsByName).map(([key, val]) => ({
  value: key,
  color: val,
}));

export const NewForm = {
  heading: "Add New Pot",
  description:
    "Create a pot to set savings targets. These can help keep you on track as you save for special purchases.",
};

export const EditForm = {
  heading: "Edit Pot",
  description: "If your saving targets change, feel free to update your pots.",
};

export const DeletePot = {
  description:
    "Are you sure you want to delete this pot? This action cannot be reversed, and all the data inside it will be removed forever.",
};

export const AddToPot = {
  heading: "Add to ‘Savings’",
  description:
    "Enter the amount you'd like to add to this pot. You can transfer funds from your available balance.",
};

export const WithdrawPot = {
  heading: "Withdraw from 'Savings'",
  description:
    "Enter the amount you'd like to withdraw from this pot. Funds will be returned to your available balance.",
};

export const POT_ERROR_MESSAGES = {
  NOT_FOUND: "Pot not found.",
  DUPLICATE: "A pot with the same details already exists.",
  INVALID_ID: "Invalid pot id.",
  CREATE_FAILED: "Failed to create pot. Please try again later.",
  UPDATE_FAILED: "Failed to update pot. Please try again later.",
  DELETE_FAILED: "Failed to delete pot. Please try again later.",
  FETCH_BY_ID_FAILED: "Failed to get pot. Please try again later.",
  FETCH_ALL_FAILED: "Failed to get pots. Please try again later.",
  UNEXPECTED: "Unexpected error. Please try again later.",
} as const;