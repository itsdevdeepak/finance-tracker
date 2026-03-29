import 'server-only';

import {
  CreateTransactionResponse,
  DeleteTransactionByIdResponse,
  GetAccountSummaryResponse,
  GetTransactionByIdResponse,
  GetTransactionsParams,
  GetTransactionsResponse,
  Transaction,
  UpdateTransactionByIdResponse,
} from "./types";
import {
  getOrderBy,
  isValidCategoryOption,
} from "./utils";
import { verifySession } from "@/lib/auth-session";
import { prisma } from "@/lib/prisma";
import { TransactionWhereInput } from "@/generated/prisma/models";
import { getQueryConfig } from "@/lib/utils/prisma";
import { TRANSACTION_ERROR_MESSAGES } from "./constants";
import { getAvatarOrRandom } from "@/lib/utils/avatars";

const omitProperties = {
  updatedAt: true,
  createdAt: true,
  userId: true
} as const;

export async function getAccountSummary(): Promise<GetAccountSummaryResponse> {
  const session = await verifySession();
  if (!session.isAuth) throw new Error("Unauthorized");

  try {
    const [balanceRes, incomeRes, expenseRes, totalSavedRes] = await prisma.$transaction([
      prisma.transaction.aggregate({
        where: {
          userId: session.userId
        },
        _sum: {
          amount: true
        }
      }),
      prisma.transaction.aggregate({
        where: {
          userId: session.userId,
          amount: {
            gte: 1
          }
        },
        _sum: {
          amount: true
        }
      }),
      prisma.transaction.aggregate({
        where: {
          userId: session.userId,
          amount: {
            lt: 1
          }
        },
        _sum: {
          amount: true
        }
      }),
      prisma.pot.aggregate({
        where: {
          userId: session.userId,
        },
        _sum: {
          total: true
        }
      })
    ]);

    const balance = balanceRes._sum.amount || 0;
    const income = incomeRes._sum.amount || 0;
    const expense = Math.abs(expenseRes._sum.amount || 0);
    const totalSaved = totalSavedRes._sum.total || 0;
    const current = balance - totalSaved;

    return {
      data: {
        accountSummary: {
          current,
          expense,
          income
        }
      }

    };
  } catch (error) {
    console.error(TRANSACTION_ERROR_MESSAGES.FETCH_SUMMARY_FAILED, error);
    const accountSummary = {
      current: 0,
      expense: 0,
      income: 0
    };
    if (error instanceof Error) {
      return {
        data: {
          accountSummary,
        }, error: error.message
      };
    }
    return {
      data: {
        accountSummary,
      }, error: TRANSACTION_ERROR_MESSAGES.FETCH_SUMMARY_FAILED
    };
  }
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
  const session = await verifySession();
  if (!session.isAuth) throw new Error("Unauthorized");

  try {
    const filters: TransactionWhereInput[] = [];
    const safePage = Number.isInteger(page) && page > 0 ? page : 1;
    const safeMonth = month && month >= 1 && month <= 12 ? month : undefined;

    if (category && isValidCategoryOption(category)) {
      filters.push({
        category: {
          equals: category,
        }
      });
    }

    if (year) {
      const startDate = new Date(year, safeMonth ? safeMonth - 1 : 0, 1);
      const endDate = safeMonth ? new Date(year, safeMonth, 1) : new Date(year + 1, 0, 1);

      filters.push({
        date: {
          gte: startDate,
          lt: endDate
        }
      });
    }

    if (query) {
      const searchableFields = getQueryConfig<Transaction>(query, [
        { name: "name" }, { name: "category" }, { name: "amount", isNumber: true },
      ]);

      filters.push({ OR: searchableFields });
    }

    const where: TransactionWhereInput = {
      userId: session.userId,
      ...(filters.length ? { AND: filters } : {}),
    };

    const pagination = limit && limit > 0
      ? {
        skip: (safePage - 1) * limit,
        take: limit,
      }
      : undefined;

    const orderBy = getOrderBy(sort ?? "");

    let totalItems = 0;
    let transactions;

    if (pagination) {
      [totalItems, transactions] = await prisma.$transaction([
        prisma.transaction.count({ where }),
        prisma.transaction.findMany({
          where,
          orderBy,
          ...pagination,
          omit: omitProperties
        })
      ]);
    } else {
      transactions = await prisma.transaction.findMany({
        where,
        orderBy,
        omit: omitProperties
      });
      totalItems = transactions.length;
    }

    const totalPages = pagination ? Math.ceil(totalItems / pagination.take) : 1;

    return {
      data: transactions,
      meta: {
        totalPages,
        totalItems,
        currentPage: safePage,
      },
    };
  } catch (error) {
    console.error(TRANSACTION_ERROR_MESSAGES.FETCH_ALL_FAILED, error);
    return { data: [], error: TRANSACTION_ERROR_MESSAGES.FETCH_ALL_FAILED };
  }
}

export async function getTransactionById(id: string): Promise<GetTransactionByIdResponse> {
  const session = await verifySession();
  if (!session.isAuth) throw new Error("Unauthorized");

  try {
    const transaction = await prisma.transaction.findUnique({
      where: {
        id: id,
        userId: session.userId
      },
      omit: omitProperties
    });

    return { data: { transaction } };
  } catch (error) {
    console.error(TRANSACTION_ERROR_MESSAGES.FETCH_BY_ID_FAILED, error);
    return {
      data: {
        transaction: null,
      },
      error: TRANSACTION_ERROR_MESSAGES.FETCH_BY_ID_FAILED
    };
  }
}

export async function createTransaction(transactionData: Omit<Transaction, "id" | "userId">): Promise<CreateTransactionResponse> {
  const session = await verifySession();
  if (!session.isAuth) throw new Error("Unauthorized");

  try {
    const existingTransaction = await prisma.transaction.findUnique({
      where: {
        userId_name_date_category_amount: {
          userId: session.userId,
          name: transactionData.name,
          amount: transactionData.amount,
          category: transactionData.category,
          date: transactionData.date
        }
      }
    });

    if (existingTransaction) {
      throw new Error(TRANSACTION_ERROR_MESSAGES.DUPLICATE);
    }

    const newTransaction = await prisma.transaction.create({
      data: {
        ...transactionData,
        avatar: getAvatarOrRandom(transactionData.avatar),
        userId: session.userId,
      },
      omit: omitProperties
    });

    return { data: { transaction: newTransaction } };

  } catch (error) {
    console.error(TRANSACTION_ERROR_MESSAGES.CREATE_FAILED, error);

    if (error instanceof Error) {
      return { data: { transaction: null }, error: error.message };
    }

    return { data: { transaction: null }, error: TRANSACTION_ERROR_MESSAGES.CREATE_FAILED };
  }
}

export async function updateTransactionById(id: string, updatedFields: Partial<Omit<Transaction, "id" | "userId">>): Promise<UpdateTransactionByIdResponse> {
  const session = await verifySession();
  if (!session.isAuth) throw new Error("Unauthorized");

  try {
    const existingTransaction = await prisma.transaction.findUnique({
      where: {
        id,
        userId: session.userId,
      }
    });

    if (!existingTransaction) {
      throw new Error(TRANSACTION_ERROR_MESSAGES.INVALID_ID);
    }

    const updatedTransaction = await prisma.transaction.update({
      where: {
        id,
        userId: session.userId,
      },
      data: updatedFields,
      omit: omitProperties
    });

    return { data: { transaction: updatedTransaction } };

  } catch (error) {
    console.error(TRANSACTION_ERROR_MESSAGES.UPDATE_FAILED, error);

    if (error instanceof Error) {
      return { data: { transaction: null }, error: error.message };
    }
    return { data: { transaction: null }, error: TRANSACTION_ERROR_MESSAGES.UPDATE_FAILED };
  }
}

export async function deleteTransactionById(id: string): Promise<DeleteTransactionByIdResponse> {
  const session = await verifySession();
  if (!session.isAuth) throw new Error("Unauthorized");

  try {
    const existingTransaction = await prisma.transaction.findUnique({
      where: {
        id,
        userId: session.userId,
      }
    });

    if (!existingTransaction) {
      throw new Error(TRANSACTION_ERROR_MESSAGES.INVALID_ID);
    }

    const deletedTransaction = await prisma.transaction.delete({
      where: {
        id,
        userId: session.userId,
      },
      omit: omitProperties
    });

    return { data: { transaction: deletedTransaction } };

  } catch (error) {
    console.error(TRANSACTION_ERROR_MESSAGES.DELETE_FAILED, error);

    if (error instanceof Error) {
      return { data: { transaction: null }, error: error.message };
    }
    return { data: { transaction: null }, error: TRANSACTION_ERROR_MESSAGES.DELETE_FAILED };
  }
}