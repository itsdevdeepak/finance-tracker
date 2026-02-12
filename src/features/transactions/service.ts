import fs from "fs/promises";
import path from "path";

import {
  GetTransactionsParams,
  GetTransactionsResponse,
  Transaction,
  TransactionRaw,
} from "./types";
import {
  filterTransaction,
  limitTransactions,
  searchTransaction,
  sortTransactions,
} from "./utils";

async function getMockData(): Promise<TransactionRaw[]> {
  const filePath = path.join(process.cwd(), "src/lib/data/data.json");
  const rawData = await fs.readFile(filePath, "utf-8");

  const data = JSON.parse(rawData).transactions;
  return data;
}

export async function getTransactions({
  query,
  sort,
  category,
  page,
  limit,
}: GetTransactionsParams): Promise<GetTransactionsResponse> {
  try {
    await new Promise((res) => {
      setTimeout(res, 1000);
    });

    const data = await getMockData();
    let transactions: Transaction[] = data.map((transaction, idx) => ({
      ...transaction,
      id: "" + idx,
      date: new Date(transaction.date),
    }));

    transactions = searchTransaction(transactions, query);
    transactions = filterTransaction(transactions, category);

    const totalItems = transactions.length;
    const totalPages = Math.ceil(totalItems / limit);

    transactions = sortTransactions(transactions, sort);
    transactions = limitTransactions(transactions, page, limit);

    return {
      data: transactions,
      meta: {
        totalPages,
        totalItems,
        currentPage: page,
      },
    };
  } catch (error) {
    console.log("failed getting transaction data", error);
    return { data: [], error: "failed getting transaction data" };
  }
}
