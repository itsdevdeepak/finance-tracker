import fs from "fs/promises";
import path from "path";

import {
  GetTransactionsParams,
  GetTransactionsResponse,
  Transaction,
  TransactionRaw,
} from "./types";
import {
  filterTransactionWithCategory,
  filterTransactionWithDate,
  sortTransactions,
} from "./utils";
import { limitDataPerPage, searchData } from "@/lib/utils/data-processing";

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
  year,
  month,
  page = 1,
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

    if (query) {
      transactions = searchData(transactions, query, [
        "name",
        "category",
        "amount",
        "date",
      ]);
    }

    if (category) {
      transactions = filterTransactionWithCategory(transactions, category);
    }

    if (year) {
      transactions = filterTransactionWithDate(transactions, year, month);
    }

    const totalItems = transactions.length;
    const totalPages = limit ? Math.ceil(totalItems / limit) : 1;

    if (sort) {
      transactions = sortTransactions(transactions, sort);
    }

    if (limit !== undefined) {
      transactions = limitDataPerPage(transactions, page, limit);
    }

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
