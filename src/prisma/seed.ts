import fs from "fs/promises";
import path from "path";

import { prisma } from "../lib/prisma";
import { RawBudget } from "@/features/budgets/types";
import { PotRaw } from "@/features/pots/types";
import { TransactionRaw } from "@/features/transactions/types";
import { BudgetCreateManyInput, PotCreateManyInput, RecurringBillCreateManyInput, TransactionCreateManyInput } from "../generated/prisma/models";
import { auth } from "@/lib/auth";

async function getData() {
  const filePath = path.join(process.cwd(), "src/lib/data/data.json");
  const rawData = await fs.readFile(filePath, "utf-8");

  const data = JSON.parse(rawData);
  const transactions = (data.transactions ?? []) as TransactionRaw[];
  const budgets = (data.budgets ?? []) as RawBudget[];
  const pots = (data.pots ?? []) as PotRaw[];
  return { transactions, budgets, pots };
}

async function seed() {
  console.log("Seeding...")
  try {
    const lastPaidDate = new Date("17 Feb 2026");
    const rawData = await getData();

    const { user } = await auth.api.signUpEmail({
      body: {
        name: "user",
        email: "user@user.com",
        password: "qwerasdf",
      }
    })

    await prisma.transaction.deleteMany({ where: { userId: user.id } })
    await prisma.recurringBill.deleteMany({ where: { userId: user.id } })
    await prisma.budget.deleteMany({ where: { userId: user.id } })
    await prisma.pot.deleteMany({ where: { userId: user.id } })

    const rawTransactions = rawData.transactions.filter(transaction => !transaction.recurring);
    const transactions: TransactionCreateManyInput[] = rawTransactions.map(({ name, amount, category, date, avatar }) => ({
      name,
      amount,
      avatar,
      category,
      date: new Date(date),
      type: amount < 0 ? "EXPANSE" : "INCOME",
      userId: user.id,
    }))

    const rawRecurringBills = rawData.transactions.filter(transaction => transaction.recurring);
    const recurringBills: RecurringBillCreateManyInput[] = rawRecurringBills.map(({ name, amount, category, avatar }) => ({
      name,
      amount,
      avatar,
      category,
      lastPaidDate,
      dueDate: new Date("17 March 2026"),
      period: "MONTHLY",
      userId: user.id,
    }))

    const budgets: BudgetCreateManyInput[] = rawData.budgets.map(({ category, maximum, theme }) => ({
      category,
      maximum: +maximum,
      dueDate: new Date("1 January 2027"),
      theme,
      userId: user.id,
    }))

    const pots: PotCreateManyInput[] = rawData.pots.map(({ name, target, theme }) => ({
      name,
      target: +target,
      dueDate: new Date("1 January 2027"),
      theme,
      userId: user.id,
    }))

    await prisma.transaction.createMany({ data: transactions })
    await prisma.recurringBill.createMany({ data: recurringBills })
    await prisma.budget.createMany({ data: budgets })
    await prisma.pot.createMany({ data: pots })

    console.log("Seeding Done!")
  } catch (error) {
    console.error("Failed to Seed Data", error)
  }
}

seed()