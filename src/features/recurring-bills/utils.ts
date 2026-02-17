import { sortData } from "@/lib/utils/data-processing";
import { isValidSortOption } from "../transactions/utils";
import { RecurringBill } from "./types";

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

export function getBillStatus(
  bill: RecurringBill,
): "paid" | "upcoming" | "due" {
  const today = new Date("19 August 2024");
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const upcomingDate = Math.min(endOfMonth.getDate(), today.getDate() + 5);
  const dueDate = bill.dueDate;

  if (today.getDate() > dueDate) return "paid";
  if (upcomingDate >= dueDate && dueDate > today.getDate()) return "due";
  return "upcoming";
}

export function sortRecurringBills(
  data: RecurringBill[],
  sortingOption: string,
) {
  if (!isValidSortOption(sortingOption)) return data;

  switch (sortingOption) {
    case "Latest": {
      return sortData(data, "dueDate", "asc");
    }
    case "Oldest": {
      return sortData(data, "dueDate", "desc");
    }
    case "Highest": {
      return sortData(data, "amount", "desc");
    }
    case "Lowest": {
      return sortData(data, "amount", "asc");
    }
    case "A to Z": {
      return sortData(data, "name", "asc");
    }
    case "Z to A": {
      return sortData(data, "name", "desc");
    }
    default:
      return data;
  }
}
