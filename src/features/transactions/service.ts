import fs from "fs/promises";
import path from "path";

import {
  GetTransactionsParams,
  GetTransactionsResponse,
  Transaction,
  TransactionRaw,
} from "./types";
import { filterTransaction, sortTransactions } from "./utils";
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
  page = 1,
  limit = 10,
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
      transactions = filterTransaction(transactions, category);
    }

    const totalItems = transactions.length;
    const totalPages = Math.ceil(totalItems / limit);
    if (sort) {
      transactions = sortTransactions(transactions, sort);
    }

    transactions = limitDataPerPage(transactions, page, limit);

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
