import { validateNumber, validateString } from "@/lib/utils/validation";
import { categorySelectOptions, SortingSelectOptions } from "./constants";
import { CategoryOption, SortingOption } from "./types";
import { decodeSearchParam } from "@/lib/utils/url";

export function isValidSortOption(option: string): option is SortingOption {
  return SortingSelectOptions.includes(option as SortingOption);
}

export function getOrderBy(sortingOption: string): Record<string, "asc" | "desc"> {
  if (!isValidSortOption(sortingOption)) return {
    "date": "desc"
  };

  switch (sortingOption) {
    case "Latest": {
      return {
        "date": "desc"
      }
    }
    case "Oldest": {
      return {
        "date": "asc"
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
        "date": "desc"
      };
  }
}

export function isValidCategoryOption(
  option: string,
): option is CategoryOption {
  return categorySelectOptions.includes(option as CategoryOption);
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


export function validateName(rawName: unknown) {
  return validateString(rawName, { minLength: 1, maxLength: 30 });
}

export function validateCategory(rawCategory: unknown) {
  const category = validateString(rawCategory, { minLength: 1, maxLength: 30 });
  if (!category || !isValidCategoryOption(category)) return null;
  return category;
}

export function validateAmount(rawAmount: unknown) {
  return validateNumber(rawAmount);
}

export function validateDate(rawDate: unknown) {
  const dateString = validateString(rawDate, { minLength: 6 });
  if (!dateString) return null;

  const date = new Date(dateString);
  return isNaN(date.getTime()) ? null : date;
}

export function validateAvatar(rawAvatar: unknown) {
  const avatarString = validateString(rawAvatar, { minLength: 1 });
  if (!avatarString) return null;

  try {
    const url = new URL(avatarString);
    const imageExtensions = /\.(jpg|jpeg|png|gif|webp|svg)$/i;
    if (!imageExtensions.test(url.pathname)) return null;
    return url.toString();
  } catch {
    return null;
  }
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
