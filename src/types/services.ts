export type RawBalance = {
  current: string;
  income: string;
  expenses: string;
};

export type Balance = {
  current: number;
  income: number;
  expenses: number;
};

export type GetBalanceResponse = {
  success: boolean;
  data: { balance: Balance | null };
  error?: string;
};
