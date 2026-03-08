export function validateNumber(
  value: unknown,
  options?: { min?: number; max?: number },
): number | null {
  if (value === null || value === undefined || value === "") return null;
  const parsedValue = Number(value);

  if (Number.isNaN(parsedValue) || !Number.isFinite(parsedValue)) return null;

  if (options) {
    if (typeof options.min === "number" && parsedValue < options.min)
      return null;
    if (typeof options.max === "number" && parsedValue > options.max)
      return null;
  }

  return parsedValue;
}

export function validateString(
  value: unknown,
  options?: { minLength?: number; maxLength?: number; pattern?: RegExp },
): string | null {
  if (value === null || value === undefined) return null;
  if (typeof value !== "string") return null;

  const sanitizedValue = value.replace(/[<>"']/g, "").trim();
  if (sanitizedValue.length === 0) return null;

  if (options) {
    if (
      typeof options.minLength === "number" &&
      sanitizedValue.length < options.minLength
    ) {
      return null;
    }

    if (
      typeof options.maxLength === "number" &&
      sanitizedValue.length > options.maxLength
    ) {
      return null;
    }

    if (options.pattern && !options.pattern.test(sanitizedValue)) return null;
  }

  return sanitizedValue;
}
