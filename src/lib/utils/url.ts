import { ReadonlyURLSearchParams } from "next/navigation";
import { URLParam } from "@/types";

export function encodeSearchParam(param: string) {
  const trimmed = param.trim();
  if (!trimmed) return "";

  try {
    return encodeURIComponent(trimmed);
  } catch {
    return trimmed;
  }
}

export function decodeSearchParam(param: string) {
  const trimmed = param.trim();
  if (!trimmed) return "";

  try {
    // replace + (params are encoded) with " "
    return decodeURIComponent(trimmed.replace(/\+/g, " "));
  } catch {
    return trimmed;
  }
}

export function createQueryString(
  searchParams: ReadonlyURLSearchParams,
  rawParams: URLParam[],
) {
  const params = new URLSearchParams(searchParams);

  rawParams.forEach(({ name, value }) => {
    if (value.length === 0) {
      params.delete(name);
    } else {
      params.set(name, value);
    }
  });

  return params.toString();
}
