"use server";

import { fromErrorToActionState } from "@/components/ui/form/utils";
import { auth } from "@/lib/auth";
import {
  validateCurrencyCode,
  validateEmail,
  validatePassword,
  validateString,
} from "@/lib/utils/validation";
import { headers } from "next/headers";
import { AUTH_ERRORS } from "./constants";
import { ActionState } from "@/components/ui/form/types";
import { setCookieByKey } from "@/actions/cookies";
import { redirect } from "next/navigation";
import { loginPath } from "@/constants/paths";

export async function loginFormAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    const email = validateEmail(formData.get("email"));
    const password = validatePassword(formData.get("password"), {
      minLength: 8,
    });

    const fieldErrors: ActionState["fieldErrors"] = {};

    if (!email) {
      fieldErrors.email = "Invalid email address";
    }

    if (!password) {
      fieldErrors.password = "Password should be at least 8 characters";
    }

    if (Object.keys(fieldErrors).length > 0) {
      return fromErrorToActionState(fieldErrors, formData, { isValidationError: true });
    }

    await auth.api.signInEmail({
      headers: await headers(),
      body: {
        email: email as string,
        password: password as string
      },
    });

    await setCookieByKey("toast", "Logged in successfully.");
  } catch (error) {
    console.error("signin", error);
    return fromErrorToActionState(AUTH_ERRORS.LOGIN_FAILED, formData);
  }

  redirect("/");
}

export async function signUpFormAction(_prevState: ActionState,
  formData: FormData): Promise<ActionState> {
  try {
    const name = validateString(formData.get("name"), { minLength: 2 });
    const email = validateEmail(formData.get("email"));
    const password = validatePassword(formData.get("password"), {
      minLength: 8,
    });
    const currencyCode = validateCurrencyCode(formData.get("currencyCode"));

    const fieldErrors: ActionState["fieldErrors"] = {};

    if (!name) {
      fieldErrors.name = "Name should be at least 2 character long ";
    }

    if (!email) {
      fieldErrors.email = "Invalid email address";
    }

    if (!password) {
      fieldErrors.password = "Password should be at least 8 characters";
    }

    if (Object.keys(fieldErrors).length > 0) {
      return fromErrorToActionState(fieldErrors, formData, { isValidationError: true });
    }

    await auth.api.signUpEmail({
      headers: await headers(),
      body: {
        name: name as string,
        email: email as string,
        password: password as string,
        currencyCode,
      },
    });

    await setCookieByKey("toast", "Account created successfully.");

  } catch (error) {
    console.error("signup", error);
    return fromErrorToActionState(AUTH_ERRORS.SIGNUP_FAILED, formData);
  }

  redirect("/");
}


export async function logout() {
  try {
    await auth.api.signOut({ headers: await headers() });

    await setCookieByKey("toast", "Logged out successfully.");
  } catch (error) {
    console.error("logout", error);
    return fromErrorToActionState(AUTH_ERRORS.LOGIN_FAILED);
  }

  redirect(loginPath());
}