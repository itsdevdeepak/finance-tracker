import { ActionState } from "./types";

export function fromErrorToActionState(error: string | ActionState['fieldErrors'], formData?: FormData, { isValidationError = false } = {}): ActionState {
  if (isValidationError) {
    const fieldErrors = typeof error === "object" && error !== null ? error : {};

    return {
      status: "ERROR",
      message: "",
      payload: formData,
      fieldErrors,
      timestamp: Date.now()
    };
  } else {
    return {
      status: "ERROR",
      message: typeof error === "string" && error.trim() || "An Unknown Error occurred",
      payload: formData,
      fieldErrors: {},
      timestamp: Date.now()
    };
  }
}

export function toActionState(message: string): ActionState {
  return {
    status: "SUCCESS",
    message,
    fieldErrors: {},
    timestamp: Date.now()
  };
}