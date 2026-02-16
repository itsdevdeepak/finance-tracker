import { formatDate } from "./format";

type ValidKeys<T, V> = {
  [K in keyof T]: T[K] extends V ? K : never;
}[keyof T];

type SortableValue = string | number | Date;

function compare(a: SortableValue, b: SortableValue): number {
  if (typeof a === "string" && typeof b === "string") return a.localeCompare(b);
  if (a instanceof Date && b instanceof Date) return a.getTime() - b.getTime();
  return Number(a) - Number(b);
}

export function sortData<T>(
  data: T[],
  key: ValidKeys<T, SortableValue>,
  direction: "asc" | "desc",
): T[] {
  const modifier = direction === "asc" ? 1 : -1;

  return [...data].sort(
    (a, b) =>
      modifier * compare(a[key] as SortableValue, b[key] as SortableValue),
  );
}

type SearchableValue = string | number | Date;

export function searchData<T>(
  data: T[],
  query: string,
  targetKeys: ValidKeys<T, SearchableValue>[],
) {
  if (query.length < 1) return data;

  return [...data].filter((item) => {
    return targetKeys.some((key) => {
      const value =
        item[key] instanceof Date ? formatDate(item[key]) : item[key];

      return String(value).toLowerCase().includes(query.toLowerCase());
    });
  });
}

export function limitDataPerPage<T>(
  data: T[],
  currentPage: number,
  limit: number,
) {
  const offset = (currentPage - 1) * limit;
  return [...data].slice(offset, offset + limit);
}
