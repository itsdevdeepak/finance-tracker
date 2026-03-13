"use cache";

import fs from "fs/promises";
import path from "path";

import type { GetBalanceResponse, RawBalance } from "../types";
import { validateNumber } from "@/lib/utils/validation";

async function getMockData() {
  const filePath = path.join(process.cwd(), "src/lib/data/data.json");
  const rawData = await fs.readFile(filePath, "utf-8");

  const data = JSON.parse(rawData).balance as RawBalance;
  return data;
}

export async function getBalance(): Promise<GetBalanceResponse> {
  try {
    const rawBalance = await getMockData();
    const current = validateNumber(rawBalance.current, { min: 0 });
    const income = validateNumber(rawBalance.income, { min: 0 });
    const expenses = validateNumber(rawBalance.expenses, { min: 0 });

    if (!current || !income || !expenses) {
      throw new Error("Balance contain Invalid Data");
    }

    return { success: true, data: { balance: { current, income, expenses } } };
  } catch (error) {
    console.error("failed to get balance", error);
    return {
      success: false,
      data: { balance: null },
      error: "failed to get balance",
    };
  }
}
