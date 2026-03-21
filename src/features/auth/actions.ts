"use server";

import { auth } from "@/lib/auth";
import {
  validateCurrencyCode,
  validateEmail,
  validatePassword,
  validateString,
} from "@/lib/utils/validation";
import { headers } from "next/headers";

export type LoginFormState = {
  success: boolean;
  errors?: {
    email?: string
    password?: string
    other?: string;
  };
};



export async function loginFormAction(
  _prevState: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  try {
    const email = validateEmail(formData.get("email"));
    const password = validatePassword(formData.get("password"), {
      minLength: 8,
    });

    if (!email) {
      return { success: false, errors: { email: "Invalid email address" } };
    }

    if (!password) {
      return {
        success: false,
        errors: { password: "Password should be at least 8 characters" },
      };
    }

    await auth.api.signInEmail({
      body: { email, password },
    });

    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, errors: { other: error.message } };
    } else {
      console.error(error);
      return { success: false, errors: { other: "Failed to Login" } };
    }
  }
}

export type SignupFormState = {
  success: boolean;
  errors?: {
    name?: string;
    email?: string;
    password?: string;
    other?: string;
  };
};

export async function signUpFormAction(_prevState: SignupFormState,
  formData: FormData,): Promise<SignupFormState> {
  try {
    const name = validateString(formData.get("name"), { minLength: 2 });
    const email = validateEmail(formData.get("email"));
    const password = validatePassword(formData.get("password"), {
      minLength: 8,
    });
    const currencyCode = validateCurrencyCode(formData.get("currencyCode"));

    const errors: Record<string, string> = {};

    if (!name) {
      errors.name = "Name should be at least 2 character long ";
    }

    if (!email) {
      errors.email = "Invalid email address";
    }

    if (!password) {
      errors.password = "Password should be at least 8 characters";
    }

    if (Object.keys(errors).length > 0) {
      return {
        success: false,
        errors: errors,
      };
    }

    await auth.api.signUpEmail({
      body: {
        name: name as string,
        email: email as string,
        password: password as string,
        currencyCode,
      },
    });

    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, errors: { other: error.message } };
    } else {
      console.error(error);
      return { success: false, errors: { other: "Failed to SignUp" } };
    }
  }
}


export async function logout() {
  try {
    await auth.api.signOut({ headers: await headers() })
  } catch (error) {
    console.error(error)
    throw new Error("Failed to Logout")
  }
}