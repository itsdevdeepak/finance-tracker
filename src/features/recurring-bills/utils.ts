import { isValidSortOption } from "../transactions/utils";
import { categories } from "@/constants/transaction";
import { validateNumber, validateString } from "@/lib/utils/validation";

export function formatToMonthlyDate(date: Date | number) {
  try {
    const monthlyDate = date instanceof Date ? date.getDate() : date;

    if (monthlyDate > 31 || monthlyDate < 1) {
      throw new Error("Invalid Date");
    }

    let postFix = "";

    if (monthlyDate >= 11 && monthlyDate <= 13) {
      postFix = "th";
    }

    switch (monthlyDate % 10) {
      case 1: {
        postFix = "st";
        break;
      }
      case 2: {
        postFix = "nd";
        break;
      }
      case 3: {
        postFix = "rd";
        break;
      }
      default: {
        postFix = "th";
      }
    }

    return `Monthly-${monthlyDate}${postFix}`;
  } catch (error) {
    console.error("Error during formatting date", error);
    return "Invalid Date";
  }
}

export function getBillStatus(dueDate: number, lastPaidDate: Date | null,) {
  const today = new Date();

  if (
    lastPaidDate &&
    lastPaidDate.getFullYear() === today.getFullYear() &&
    lastPaidDate.getMonth() === today.getMonth()
  ) {
    return "paid";
  }

  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const safeDueDate = Math.min(dueDate > 1 ? dueDate : 1, endOfMonth.getDate());
  const dueThresholdDate = new Date(today.getFullYear(), today.getMonth(), safeDueDate - 5);

  if (today >= dueThresholdDate) return "due";
  return "upcoming"
}


export function getOrderBy(sortingOption: string): Record<string, "asc" | "desc"> {
  if (!isValidSortOption(sortingOption)) return {
    "dueDate": "desc"
  };

  switch (sortingOption) {
    case "Latest": {
      return {
        "dueDate": "asc"
      }
    }
    case "Oldest": {
      return {
        "dueDate": "desc"
      }
    }
    case "Highest": {
      return {
        "amount": "desc"
      }
    }
    case "Lowest": {
      return {
        "amount": "asc"
      }
    }
    case "A to Z": {
      return {
        "name": "asc"
      }
    }
    case "Z to A": {
      return {
        "name": "desc"
      }
    }
    default:
      return {
        "dueDate": "asc"
      };
  }
}

export function validateRecurringBillName(rawName: unknown) {
  return validateString(rawName, { minLength: 1, maxLength: 30 });
}

export function validateRecurringBillCategory(rawCategory: unknown) {
  const category = validateString(rawCategory, { minLength: 1, maxLength: 30 });
  if (!category || !categories.includes(category)) return null;
  return category;
}

export function validateRecurringBillAmount(rawAmount: unknown) {
  return validateNumber(rawAmount);
}

export function validateDueDate(rawDueDate: unknown) {
  const parsedDueDate = validateNumber(rawDueDate, { min: 1, max: 31 });
  if (!parsedDueDate || !Number.isInteger(parsedDueDate)) return null;
  return parsedDueDate;
}