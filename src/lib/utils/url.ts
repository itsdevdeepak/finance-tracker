import { ReadonlyURLSearchParams } from "next/navigation";

export function encodeSearchParam(param: string) {
  return encodeURIComponent(param.trim());
}

export function decodeSearchParam(param: string) {
  return decodeURIComponent(param.trim());
}

export function createQueryString(
  searchParams: ReadonlyURLSearchParams,
  rawParams: { name: string; value: string }[],
) {
  const params = new URLSearchParams(searchParams);

  rawParams.forEach(({ name, value }) => {
    const encodedName = encodeSearchParam(name);
    const encodedValue = encodeSearchParam(value);

    if (encodedValue.length === 0) {
      params.delete(encodedName);
    } else {
      params.set(encodedName, encodedValue);
    }
  });

  return params.toString();
}
