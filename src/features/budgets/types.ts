export type RawBudget = {
  category: string;
  theme: string;
  maximum: string;
};

export type Budget = {
  id: string;
  category: string;
  theme: string;
  spent: number;
  maximum: number;
};

export type BudgetWithoutId = Omit<Budget, "id">;

export type GetBudgetResponse = {
  data: {
    budgets: Budget[];
  };
  error?: string;
};

export type GetBudgetByIdResponse = {
  data: {
    budget: Budget | null;
  };
  error?: string;
};

export type CreateNewBudgetProps = Omit<
  Budget,
  "id" | "spent" | "transactions"
>;

export type CreateNewBudgetResponse = {
  data: {
    budget: Budget | null;
  };
  error?: string;
};

export type UpdateBudgetByIdProps = {
  id: string;
  updatedFields: Partial<Omit<Budget, "id" | "spent" | "transactions">>;
};

export type UpdateBudgetByIdResponse = {
  data: {
    budget: Budget | null;
  };
  error?: string;
};

export type DeleteBudgetByIdResponse = {
  data: {
    budget: Budget | null;
  };
  error?: string;
};
