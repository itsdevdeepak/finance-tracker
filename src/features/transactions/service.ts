import {
  GetTransactionsParams,
  GetTransactionsResponse,
  Transaction,
} from "./types";
import {
  getOrderBy,
} from "./utils";
import { verifySession } from "@/lib/auth-session";
import { prisma } from "@/lib/prisma";
import { TransactionWhereInput } from "@/generated/prisma/models";
import { categories } from "@/constants/transaction";
import { getQueryConfig } from "@/lib/utils/prisma";

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
          omit: {
            updatedAt: true,
            createdAt: true,
            userId: true
          }
        })
      ]);
    } else {
      transactions = await prisma.transaction.findMany({
        where,
        orderBy,
        omit: {
          updatedAt: true,
          createdAt: true,
          userId: true
        }
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
