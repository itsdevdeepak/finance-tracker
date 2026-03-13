"use cache";

import fs from "fs/promises";
import path from "path";

import {
  Budget,
  CreateNewBudgetProps,
  GetBudgetByIdResponse,
  GetBudgetResponse,
  RawBudget,
  UpdateBudgetByIdProps,
  UpdateBudgetByIdResponse,
} from "./types";
import { getTransactions } from "../transactions/service";
import { Transaction } from "../transactions/types";
import { cacheLife } from "next/cache";

async function getMockData() {
  const filePath = path.join(process.cwd(), "src/lib/data/data.json");
  const rawData = await fs.readFile(filePath, "utf-8");

  const data = JSON.parse(rawData).budgets as RawBudget[];
  return data;
}

export async function getBudgets(): Promise<GetBudgetResponse> {
  cacheLife("hours");

  try {
    const today = new Date("1 August 2024");

    const [rawBudgets, { data: transactions }] = await Promise.all([
      getMockData(),
      getTransactions({
        year: today.getFullYear(),
        month: today.getMonth() + 1,
      }),
    ]);

    const transactionsByCategory = transactions.reduce(
      (acc, transaction) => {
        const category = transaction.category;
        if (!acc[category]) acc[category] = [];
        acc[category].push(transaction);
        return acc;
      },
      {} as Record<string, Transaction[]>,
    );

    const budgets: Budget[] = rawBudgets.map((rawBudget, idx) => {
      const spending = transactionsByCategory[rawBudget.category] ?? [];
      const spent = spending.reduce((total, { amount }) => {
        return total + (amount < 0 ? Math.abs(amount) : 0);
      }, 0);

      return {
        ...rawBudget,
        spent,
        transactions: spending,
        maximum: parseInt(rawBudget.maximum, 10),
        id: idx.toString(),
      };
    });

    return { data: { budgets } };
  } catch (error) {
    console.error("failed to get Budgets data", error);
    return {
      data: {
        budgets: [],
      },
      error: "failed to get Budgets data",
    };
  }
}

export async function getBudgetById(
  id: string,
): Promise<GetBudgetByIdResponse> {
  try {
    const budgets = await getBudgets();
    const budget = budgets.data.budgets.find((budget) => budget.id === id);

    if (!budget) throw new Error(`Can't find budget with id:${id}`);

    return { data: { budget } };
  } catch (error) {
    console.error("failed update budget", error);
    return {
      data: {
        budget: null,
      },
      error: "failed to update budget",
    };
  }
}

export async function createBudget({
  category,
  maximum,
  theme,
}: CreateNewBudgetProps): Promise<UpdateBudgetByIdResponse> {
  try {
    const budgets = await getBudgets();
    const budget = budgets.data.budgets.find(
      (budget) => budget.category === category,
    );

    if (budget) {
      throw new Error(`Budget with category:${category} already exist`);
    }

    const today = new Date("1 August 2024");

    const { data: transactions } = await getTransactions({
      category,
      year: today.getFullYear(),
      month: today.getMonth() + 1,
    });

    const spent = transactions.reduce((total, { amount }) => {
      return total + (amount < 0 ? Math.abs(amount) : 0);
    }, 0);

    const merged = {
      id: "newID",
      category,
      maximum,
      theme,
      spent,
      transactions,
    };

    return { data: { budget: merged } };
  } catch (error) {
    console.error("failed update budget", error);
    return {
      data: {
        budget: null,
      },
      error: "failed to update budget",
    };
  }
}

export async function updateBudgetById({
  id,
  updatedFields,
}: UpdateBudgetByIdProps): Promise<UpdateBudgetByIdResponse> {
  try {
    const budgets = await getBudgets();
    const budget = budgets.data.budgets.find((budget) => budget.id === id);

    if (!budget) throw new Error(`Budget with id:${id} doesn't exist`);

    const merged = { ...budget, ...updatedFields };

    return { data: { budget: merged } };
  } catch (error) {
    console.error("failed update budget", error);
    return {
      data: {
        budget: null,
      },
      error: "failed to update budget",
    };
  }
}

export async function deleteBudgetById(
  id: string,
): Promise<UpdateBudgetByIdResponse> {
  try {
    const budgets = await getBudgets();
    const budget = budgets.data.budgets.find((budget) => budget.id === id);

    if (!budget) throw new Error(`Budget with id:${id} doesn't exist`);

    return { data: { budget: budget } };
  } catch (error) {
    console.error("failed delete budget", error);
    return {
      data: {
        budget: null,
      },
      error: "failed to delete budget",
    };
  }
}
