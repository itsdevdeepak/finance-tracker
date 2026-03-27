export function loginPath() {
  return "/login";
}

export function signupPath() {
  return "/signup";
}

export function budgetsPath() {
  return "/budgets";
}

export function budgetPath(id: string) {
  return `${budgetsPath()}/${id}`;
}

export function potsPath() {
  return "/pots";
}

export function potPath(id: string) {
  return `${potsPath()}/${id}`;
}

export function recurringBillsPath() {
  return "/recurring-bills";
}

export function recurringBillPath(id: string) {
  return `${recurringBillsPath()}/${id}`;
}


export function transactionsPath() {
  return "/transactions";
}

export function transactionPath(id: string) {
  return `${transactionsPath()}/${id}`;
}
