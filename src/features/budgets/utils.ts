import { CATEGORIES } from "@/constants/transaction";
import { getColorByName } from "@/lib/utils/colors";
import { validateNumber, validateString } from "@/lib/utils/validation";
import { Budget } from "./types";
import { DonutData } from "@/components/ui/DonutChart";
import { ColorsByName } from "@/constants/colors";

export function validateCategory(rawCategory: unknown) {
  const category = validateString(rawCategory, { minLength: 3 });
  if (!category) return null;
  return (
    CATEGORIES.find(
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

export function getBudgetChartData(budgets: Budget[]) {
  const totalSpent = Math.round(
    budgets.reduce((total, { spent }) => total + spent, 0),
  );
  const totalLimit = Math.round(
    budgets.reduce((total, { maximum }) => total + maximum, 0),
  );
  const data: DonutData[] = budgets.map((budget) => {
    const percent =
      totalSpent > 0 ? Math.min((budget.spent / totalSpent) * 100, 100) : 0;
    return {
      title: budget.category,
      color: getColorByName(budget.theme) ?? ColorsByName.navy,
      percent,
    };
  });
  return { totalSpent, totalLimit, data };
}
