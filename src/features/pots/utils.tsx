import { getColorByName } from "@/lib/utils/colors";
import { validateNumber, validateString } from "@/lib/utils/validation";

export function validateName(rawName: unknown) {
  return validateString(rawName, { minLength: 1, maxLength: 30 });
}

export function validateTarget(rawTarget: unknown) {
  return validateNumber(rawTarget, { min: 1 });
}

export function validateTotal(rawTotal: unknown, max: number) {
  return validateNumber(rawTotal, { min: 0, max });
}

export function validateTheme(rawTheme: unknown) {
  const theme = validateString(rawTheme, { minLength: 3 });
  if (!theme || !getColorByName(theme)) return null;
  return theme;
}
