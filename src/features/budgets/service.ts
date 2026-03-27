import {
  Budget,
  CreateNewBudgetProps,
  CreateNewBudgetResponse,
  GetBudgetByIdResponse,
  GetBudgetResponse,
  UpdateBudgetByIdProps,
  UpdateBudgetByIdResponse,
} from "./types";
import { verifySession } from "@/lib/auth-session";
import { prisma } from "@/lib/prisma";
import { getMonthRange } from "@/lib/utils/prisma";
import { BUDGET_ERROR_MESSAGES } from "./constants";

const omitBudgetProperties = {
  createdAt: true,
  updatedAt: true,
  userId: true,
};

type TX = Parameters<Parameters<typeof prisma.$transaction>[0]>[0];

async function getSpentAmount(tx: TX, userId: string, category: string) {
  const currentMonthRange = getMonthRange(new Date());

  const aggregate = await tx.transaction.aggregate({
    _sum: { amount: true },
    where: {
      userId,
      category,
      date: {
        gte: currentMonthRange.start,
        lt: currentMonthRange.end
      },
    },
  });

  return Math.abs(aggregate._sum.amount ?? 0);
}

export async function getBudgets(): Promise<GetBudgetResponse> {
  const session = await verifySession();
  if (!session.isAuth) throw new Error("Unauthorized");

  try {
    const currentMonthRange = getMonthRange(new Date());

    const budgets = await prisma.$transaction(async (tx) => {

      const budgets = await tx.budget.findMany({
        where: { userId: session.userId },
        omit: omitBudgetProperties,
      });

      const categories = budgets.map(budget => budget.category);
      const spendingByCategory = await tx.transaction.groupBy({
        by: ["category"],
        _sum: { amount: true },
        where: {
          userId: session.userId,
          date: {
            gte: currentMonthRange.start,
            lt: currentMonthRange.end
          },
          category: {
            in: categories
          }
        }
      });

      const merged: Budget[] = [];
      for (let i = 0; i < budgets.length; i++) {
        const budgetData = budgets[i];
        const spent = spendingByCategory.find(spending => spending.category === budgetData.category)?._sum.amount || 0;
        merged.push({ ...budgetData, spent: Math.abs(spent) });
      }

      return merged;
    });

    return { data: { budgets } };
  } catch (error) {
    console.error(BUDGET_ERROR_MESSAGES.FETCH_ALL_FAILED, error);

    return {
      data: {
        budgets: [],
      },
      error: BUDGET_ERROR_MESSAGES.FETCH_ALL_FAILED,
    };
  }
}

export async function getBudgetById(
  id: string,
): Promise<GetBudgetByIdResponse> {
  const session = await verifySession();
  if (!session.isAuth) throw new Error("Unauthorized");

  try {
    const budget = await prisma.$transaction(async (tx) => {
      const budget = await tx.budget.findUnique({
        where: {
          id: id,
          userId: session.userId
        },
        omit: omitBudgetProperties,
      });

      if (!budget) return null;

      const spent = await getSpentAmount(tx, session.userId, budget.category);

      return { ...budget, spent };
    });

    return { data: { budget } };
  } catch (error) {
    console.error(BUDGET_ERROR_MESSAGES.FETCH_BY_ID_FAILED, error);

    if (error instanceof Error) {
      return { data: { budget: null }, error: error.message };
    }

    return {
      data: {
        budget: null,
      },
      error: BUDGET_ERROR_MESSAGES.FETCH_BY_ID_FAILED,
    };
  }
}

export async function createBudget({
  category,
  maximum,
  theme,
}: CreateNewBudgetProps): Promise<CreateNewBudgetResponse> {
  const session = await verifySession();
  if (!session.isAuth) throw new Error("Unauthorized");

  try {
    const today = new Date();

    const budget = await prisma.$transaction(async (tx) => {
      const existingBudget = await tx.budget.findUnique({
        where: {
          category_userId: {
            category,
            userId: session.userId
          }
        }
      });

      if (existingBudget) {
        throw new Error(BUDGET_ERROR_MESSAGES.DUPLICATE);
      }

      const newBudget = await tx.budget.create({
        data: {
          category,
          maximum,
          theme,
          dueDate: new Date(today.getFullYear(), today.getMonth() + 1, 1),
          userId: session.userId
        },
        omit: omitBudgetProperties,
      });

      const spent = await getSpentAmount(tx, session.userId, newBudget.category);

      if (!newBudget) return null;

      return { ...newBudget, spent };
    });

    return { data: { budget } };
  } catch (error) {
    console.error(BUDGET_ERROR_MESSAGES.CREATE_FAILED, error);

    if (error instanceof Error) {
      return { data: { budget: null }, error: error.message };
    }

    return {
      data: {
        budget: null,
      },
      error: BUDGET_ERROR_MESSAGES.CREATE_FAILED,
    };
  }
}

export async function updateBudgetById({
  id,
  updatedFields,
}: UpdateBudgetByIdProps): Promise<UpdateBudgetByIdResponse> {
  const session = await verifySession();
  if (!session.isAuth) throw new Error("Unauthorized");

  try {
    const budget = await prisma.$transaction(async (tx) => {
      const existingBudget = await tx.budget.findUnique({
        where: {
          id,
          userId: session.userId
        }
      });

      if (!existingBudget) {
        throw new Error(BUDGET_ERROR_MESSAGES.INVALID_ID);
      };

      const updatedBudget = await tx.budget.update({
        where: {
          id,
          userId: session.userId
        },
        data: updatedFields,
        omit: omitBudgetProperties,
      });

      const spent = await getSpentAmount(tx, session.userId, updatedBudget.category);

      return { ...updatedBudget, spent };
    });

    return { data: { budget } };
  } catch (error) {
    console.error(BUDGET_ERROR_MESSAGES.UPDATE_FAILED, error);

    if (error instanceof Error) {
      return { data: { budget: null }, error: error.message };
    }

    return {
      data: {
        budget: null,
      },
      error: BUDGET_ERROR_MESSAGES.UPDATE_FAILED,
    };
  }
}

export async function deleteBudgetById(
  id: string,
): Promise<UpdateBudgetByIdResponse> {
  const session = await verifySession();
  if (!session.isAuth) throw new Error("Unauthorized");

  try {
    const budget = await prisma.$transaction(async (tx) => {
      const existingBudget = await tx.budget.findUnique({
        where: {
          id,
          userId: session.userId
        }
      });

      if (!existingBudget) {
        throw new Error(BUDGET_ERROR_MESSAGES.INVALID_ID);
      };

      const deletedbudget = await tx.budget.delete({
        where: {
          id,
          userId: session.userId
        },
        omit: omitBudgetProperties,
      });

      const spent = await getSpentAmount(tx, session.userId, deletedbudget.category);

      return { ...deletedbudget, spent };
    });

    return { data: { budget } };
  } catch (error) {
    console.error(BUDGET_ERROR_MESSAGES.DELETE_FAILED, error);

    if (error instanceof Error) {
      return { data: { budget: null }, error: error.message };
    }

    return {
      data: {
        budget: null,
      },
      error: BUDGET_ERROR_MESSAGES.DELETE_FAILED,
    };
  }
}
