import { categorySelectOptions, SortingSelectOptions } from "./constants";

export type TransactionRaw = {
  avatar: string;
  name: string;
  category: string;
  date: string;
  amount: number;
  recurring: boolean;
};

export type Transaction = {
  id: string;
  avatar: string | null;
  name: string;
  category: string;
  date: Date;
  amount: number;
};

export type SortingOption = (typeof SortingSelectOptions)[number];
export type CategoryOption = (typeof categorySelectOptions)[number];

export type GetTransactionsParams = {
  query?: string;
  sort?: string;
  category?: string;
  page?: number;
  limit?: number;
  month?: number;
  year?: number;
};

export type GetTransactionsResponse = {
  data: Transaction[];
  meta?: {
    totalPages: number;
    totalItems: number;
    currentPage: number;
  };

  error?: string;
};

export type GetTransactionByIdResponse = {
  data: { transaction: Transaction | null };
  error?: string;
};

export type CreateTransactionResponse = {
  data: { transaction: Transaction | null };
  error?: string;
};

export type UpdateTransactionByIdResponse = {
  data: { transaction: Transaction | null };
  error?: string;
};

export type DeleteTransactionByIdResponse = {
  data: { transaction: Transaction | null };
  error?: string;
};