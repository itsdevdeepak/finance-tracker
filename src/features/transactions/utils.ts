import { categorySelectOptions, SortingSelectOptions } from "./constants";
import { CategoryOption, SortingOption, Transaction } from "./types";
import { decodeSearchParam } from "@/lib/utils/url";
import { sortData } from "@/lib/utils/data-processing";

export function isValidSortOption(option: string): option is SortingOption {
  return SortingSelectOptions.includes(option as SortingOption);
}

export function sortTransactions(data: Transaction[], sortingOption: string) {
  if (!isValidSortOption(sortingOption)) return data;

  switch (sortingOption) {
    case "Latest": {
      return sortData(data, "date", "asc");
    }
    case "Oldest": {
      return sortData(data, "date", "desc");
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

export function isValidCategoryOption(
  option: string,
): option is CategoryOption {
  return categorySelectOptions.includes(option as CategoryOption);
}

export function filterTransaction(data: Transaction[], category: string) {
  if (!isValidCategoryOption(category)) return data;
  if (category === "All Transactions") return data;

  return [...data].filter((transaction) => transaction.category === category);
}

function sanitizeString(value: string | undefined, fallback = "") {
  if (!value) return fallback;

  const decoded = decodeSearchParam(value);

  return decoded.replace(/[<>\"']/g, "").substring(0, 67);
}

function sanitizeNumber(value: string | undefined, fallback = 0) {
  if (!value) return fallback;
  const num = parseInt(decodeSearchParam(value), 10);
  return Number.isNaN(num) || num < 0 ? fallback : num;
}

export function sanitizeSearchParams(
  searchParams: Record<string, string | string[] | undefined>,
) {
  const rawQuery = Array.isArray(searchParams.query)
    ? searchParams.query[0]
    : searchParams.query;
  const rawSort = Array.isArray(searchParams.sort)
    ? searchParams.sort[0]
    : searchParams.sort;
  const rawCategory = Array.isArray(searchParams.category)
    ? searchParams.category[0]
    : searchParams.category;
  const rawPage = Array.isArray(searchParams.page)
    ? searchParams.page[0]
    : searchParams.page;
  const rawLimit = Array.isArray(searchParams.limit)
    ? searchParams.limit[0]
    : searchParams.limit;

  return {
    query: sanitizeString(rawQuery),
    sort:
      rawSort && isValidSortOption(sanitizeString(rawSort))
        ? sanitizeString(rawSort)
        : SortingSelectOptions[0],
    category:
      rawCategory && isValidCategoryOption(sanitizeString(rawCategory))
        ? sanitizeString(rawCategory)
        : categorySelectOptions[0],
    page: sanitizeNumber(rawPage, 1),
    limit: Math.min(100, sanitizeNumber(rawLimit, 10)),
  };
}
