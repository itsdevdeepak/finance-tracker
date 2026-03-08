export function formatDate(
  date: Date,
  locale: string = "en-US",
  options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  },
) {
  return date.toLocaleDateString(locale, options);
}

export function formatCurrency(
  amount: number,
  locale: string = "en-US",
  currency: Intl.NumberFormatOptions["currency"] = "USD",
) {
  return Intl.NumberFormat(locale, { style: "currency", currency }).format(
    amount,
  );
}

export function capitalizedString(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
