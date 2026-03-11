import { categories } from "@/constants/transaction";
import { getColorByName } from "@/lib/utils/colors";
import { validateNumber, validateString } from "@/lib/utils/validation";

export function validateCategory(rawCategory: unknown) {
  const category = validateString(rawCategory, { minLength: 3 });
  if (!category) return null;
  return (
    categories.find(
      (value) => value.toLowerCase() === category.toLowerCase(),
    ) ?? null
  );
}

export function validateMaximumSpent(rawTarget: unknown) {
  return validateNumber(rawTarget, { min: 1 });
}

export function validateTheme(rawTheme: unknown) {
  const theme = validateString(rawTheme, { minLength: 3 });
  if (!theme || !getColorByName(theme)) return null;
  return theme;
}
