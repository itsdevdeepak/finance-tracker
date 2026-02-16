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
  avatar: string;
  name: string;
  category: string;
  date: Date;
  amount: number;
  recurring: boolean;
};

export type SortingOption = (typeof SortingSelectOptions)[number];
export type CategoryOption = (typeof categorySelectOptions)[number];

export type GetTransactionsParams = {
  query?: string;
  sort?: string;
  category?: string;
  page?: number;
  limit?: number;
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
