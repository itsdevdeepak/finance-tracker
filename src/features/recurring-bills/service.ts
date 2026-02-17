import fs from "fs/promises";
import path from "path";

import { TransactionRaw } from "../transactions/types";
import { GetRecurringBillsParams, GetRecurringBillsResponse } from "./types";
import { getBillStatus, sortRecurringBills } from "./utils";
import { limitDataPerPage, searchData } from "@/lib/utils/data-processing";

async function getMockData() {
  const filePath = path.join(process.cwd(), "src/lib/data/data.json");
  const rawData = await fs.readFile(filePath, "utf-8");

  const data = JSON.parse(rawData).transactions as TransactionRaw[];
  const filtered = data.filter((transaction) => transaction.recurring);

  const result = filtered.reduce((acc: TransactionRaw[], curr) => {
    const exist = acc.findIndex((t) => t.name === curr.name);
    if (exist >= 0) {
      const d1 = new Date(curr.date);
      const d2 = new Date(acc[exist].date);
      if (d1.getTime() > d2.getTime()) {
        acc[exist] = curr;
      }
    } else {
      acc.push(curr);
    }
    return acc;
  }, []);
  return result;
}

export async function getRecurringBills({
  query,
  sort,
  page = 1,
  limit = 10,
}: GetRecurringBillsParams): Promise<GetRecurringBillsResponse> {
  try {
    const rawData = await getMockData();
    let recurringBills = rawData.map(
      ({ name, amount, category, avatar, date }, idx) => ({
        name,
        avatar,
        category,
        amount: Math.abs(amount),
        id: idx.toString(),
        dueDate: new Date(date).getDate(),
      }),
    );

    if (query) {
      recurringBills = searchData(recurringBills, query, [
        "name",
        "amount",
        "dueDate",
        "category",
      ]);
    }

    if (sort) {
      recurringBills = sortRecurringBills(recurringBills, sort);
    }

    const totalItems = recurringBills.length;
    const totalPages = Math.ceil(totalItems / limit);

    const summary = recurringBills.reduce(
      (acc, bill) => {
        const status = getBillStatus(bill);
        acc.totalAmount += bill.amount;
        acc.totalCount += 1;

        if (status === "paid") {
          acc.paidCount += 1;
          acc.paidAmount += bill.amount;
          return acc;
        }

        if (status === "due") {
          acc.dueCount += 1;
          acc.dueAmount += bill.amount;
        }

        acc.upcomingCount += 1;
        acc.upcomingAmount += bill.amount;
        return acc;
      },
      {
        paidCount: 0,
        paidAmount: 0,
        dueCount: 0,
        dueAmount: 0,
        upcomingCount: 0,
        upcomingAmount: 0,
        totalAmount: 0,
        totalCount: 0,
      },
    );

    recurringBills = limitDataPerPage(recurringBills, page, limit);

    return {
      data: {
        summary,
        recurringBills,
      },
      meta: {
        currentPage: page,
        totalItems,
        totalPages,
      },
    };
  } catch (error) {
    console.log("failed getting recurring data", error);
    return {
      data: {
        summary: {
          paidCount: 0,
          paidAmount: 0,
          dueCount: 0,
          dueAmount: 0,
          upcomingCount: 0,
          upcomingAmount: 0,
          totalAmount: 0,
          totalCount: 0,
        },
        recurringBills: [],
      },
      error: "failed getting recurring data",
    };
  }
}
