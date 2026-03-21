import {
  CreateTransactionResponse,
  DeleteTransactionByIdResponse,
  GetTransactionByIdResponse,
  GetTransactionsParams,
  GetTransactionsResponse,
  Transaction,
  UpdateTransactionByIdResponse,
} from "./types";
import {
  getOrderBy,
} from "./utils";
import { verifySession } from "@/lib/auth-session";
import { prisma } from "@/lib/prisma";
import { TransactionWhereInput } from "@/generated/prisma/models";
import { categories } from "@/constants/transaction";
import { getQueryConfig } from "@/lib/utils/prisma";

const omitProperties = {
  updatedAt: true,
  createdAt: true,
  userId: true
} as const;

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

    if (category && categories.includes(category)) {
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
      ])

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
    console.error("failed getting transaction data", error);
    return { data: [], error: "failed getting transaction data" };
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
    })

    return { data: { transaction } };
  } catch (error) {
    console.error("failed getting transaction data", error);
    return {
      data: {
        transaction: null,
      },
      error: "failed getting transaction data",
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

    if (existingTransaction && existingTransaction.userId !== session.userId) {
      throw new Error(`Pot with same date already exist`);
    }

    const newTransaction = await prisma.transaction.create({
      data: { ...transactionData, avatar: transactionData.avatar || null, userId: session.userId },
      omit: omitProperties
    })

    return { data: { transaction: newTransaction } }

  } catch (error) {
    console.error("failed create transaction", error);
    return { data: { transaction: null }, error: "failed create transaction data" };
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

    if (existingTransaction && existingTransaction.userId !== session.userId) {
      throw new Error(`Pot with id: ${id} already exist`);
    }

    const updatedTransaction = await prisma.transaction.update({
      where: {
        id,
        userId: session.userId,
      },
      data: updatedFields,
      omit: omitProperties
    })

    return { data: { transaction: updatedTransaction } }

  } catch (error) {
    if (error instanceof Error) {
      return { data: { transaction: null }, error: error.message };
    }
    console.error("failed update transaction", error);
    return { data: { transaction: null }, error: "failed update transaction" };
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

    if (existingTransaction && existingTransaction.userId !== session.userId) {
      throw new Error(`Pot with id: ${id} already exist`);
    }

    const deletedTransaction = await prisma.transaction.delete({
      where: {
        id,
        userId: session.userId,
      },
      omit: omitProperties
    })

    return { data: { transaction: deletedTransaction } }

  } catch (error) {
    console.error("failed to delete transaction", error);
    return { data: { transaction: null }, error: "failed to delete transaction" };
  }
}