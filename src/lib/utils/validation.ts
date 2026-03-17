import { CurrencyCodes } from "@/constants/currency";

export function validateNumber(
  value: unknown,
  options?: { min?: number; max?: number },
): number | null {
  if (value === null || value === undefined || value === "") return null;
  const parsedValue = Number(value);

  if (Number.isNaN(parsedValue) || !Number.isFinite(parsedValue)) return null;

  if (options) {
    if (typeof options.min === "number" && parsedValue < options.min)
      return null;
    if (typeof options.max === "number" && parsedValue > options.max)
      return null;
  }

  return parsedValue;
}

export function validateString(
  value: unknown,
  options?: { minLength?: number; maxLength?: number; pattern?: RegExp },
): string | null {
  if (value === null || value === undefined) return null;
  if (typeof value !== "string") return null;

  const sanitizedValue = value.replace(/[<>"']/g, "").trim();
  if (sanitizedValue.length === 0) return null;

  if (options) {
    if (
      typeof options.minLength === "number" &&
      sanitizedValue.length < options.minLength
    ) {
      return null;
    }

    if (
      typeof options.maxLength === "number" &&
      sanitizedValue.length > options.maxLength
    ) {
      return null;
    }

    if (options.pattern && !options.pattern.test(sanitizedValue)) return null;
  }

  return sanitizedValue;
}

export function validateEmail(value: unknown) {
  const email = validateString(value, { minLength: 5 });

  if (!email) return null;

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) return null;

  return email;
}

export function validatePassword(
  value: unknown,
  options?: {
    minLength?: number;
    maxLength?: number;
    requireUppercase?: boolean;
    requireLowercase?: boolean;
    requireNumber?: boolean;
    requireSpecialChar?: boolean;
  },
): string | null {
  const password = validateString(value, {
    minLength: options?.minLength,
    maxLength: options?.maxLength,
  });

  if (!password) return null;

  if (options) {
    if (options.requireUppercase && !/[A-Z]/.test(password)) {
      return null;
    }
    if (options.requireLowercase && !/[a-z]/.test(password)) {
      return null;
    }
    if (options.requireNumber && !/[0-9]/.test(password)) {
      return null;
    }
    if (
      options.requireSpecialChar &&
      !/[!@#$%^&*(),.?":{}|<>\[\]\\/;'`~_-]/.test(password)
    ) {
      return null;
    }
  }

  return password;
}

export function validateCurrencyCode(value: unknown): string | null {
  const currencyCode = validateString(value, { minLength: 3, maxLength: 3 });

  if (!currencyCode) return null;
  if (!CurrencyCodes.includes(currencyCode.toUpperCase())) return null;

  return currencyCode.toUpperCase();
}
