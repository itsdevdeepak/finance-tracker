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

    let rawRecurringBills = rawData.transactions.filter(transaction => transaction.recurring);
    rawRecurringBills = rawRecurringBills.reduce((acc: TransactionRaw[], curr) => {
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

    const recurringBills: RecurringBillCreateManyInput[] = rawRecurringBills.map(({ name, amount, category, date, avatar }) => {
      const paidDate = new Date(date);
      const today = new Date();
      const dueDate = new Date(today.getFullYear(), paidDate.getMonth(), paidDate.getDate())
      return ({
        name,
        amount: Math.abs(amount),
        avatar,
        category,
        dueDate: dueDate.getDate(),
        userId: user.id,
      })
    })

    const budgets: BudgetCreateManyInput[] = rawData.budgets.map(({ category, maximum, theme }) => ({
      category,
      maximum: +maximum,
      dueDate: new Date("1 January 2027"),
      theme,
      userId: user.id,
    }))

    const pots: PotCreateManyInput[] = rawData.pots.map(({ name, target, theme, total }) => ({
      name,
      theme,
      target: +target,
      total: +total,
      userId: user.id,
    }))

    const recurringResult = await prisma.recurringBill.createManyAndReturn({ data: recurringBills });

    const transactions: TransactionCreateManyInput[] = rawData.transactions.map(({ name, amount, category, date, avatar, recurring }) => {
      let recurringId;
      if (recurring) {
        const result = recurringResult.find(recurring => recurring.name === name);
        if (result) {
          recurringId = result.id
        }
      }

      return {
        name,
        amount,
        avatar,
        category,
        date: new Date(date),
        userId: user.id,
        ...(recurringId ? { recurringBillId: recurringId } : {})
      }
    })

    await prisma.transaction.createMany({ data: transactions })
    await prisma.budget.createMany({ data: budgets })
    await prisma.pot.createMany({ data: pots })

    console.log("Seeding Done!")
  } catch (error) {
    console.error("Failed to Seed Data", error)
  }
}

seed()