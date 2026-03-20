export type RecurringBill = {
  id: string;
  name: string;
  avatar: string | null;
  category: string;
  amount: number;
  dueDate: number;
  lastPaidDate: Date | null
};

export type GetRecurringBillsParams = {
  query?: string;
  sort?: string;
  page?: number;
  limit?: number;
};

export type RecurringBillsSummary = {
  paidCount: number;
  paidAmount: number;
  dueCount: number;
  dueAmount: number;
  upcomingCount: number;
  upcomingAmount: number;
  totalAmount: number;
  totalCount: number;
};

export type GetRecurringBillsResponse = {
  data: {
    summary: RecurringBillsSummary;
    recurringBills: RecurringBill[];
  };
  meta?: {
    totalPages: number;
    totalItems: number;
    currentPage: number;
  };

  error?: string;
};
