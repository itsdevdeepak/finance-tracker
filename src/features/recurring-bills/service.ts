import { CreateRecurringBillResponse, DeleteRecurringBillByIdResponse, GetRecurringBillByIdResponse, GetRecurringBillsParams, GetRecurringBillsResponse, RecurringBill, UpdateRecurringBillByIdResponse } from "./types";
import { getBillStatus, getOrderBy } from "./utils";
import { verifySession } from "@/lib/auth-session";
import { RecurringBillWhereInput } from "@/generated/prisma/models";
import { getQueryConfig } from "@/lib/utils/prisma";
import { prisma } from "@/lib/prisma";

const omitProperties = {
  updatedAt: true,
  createdAt: true,
  userId: true
} as const

export async function getRecurringBills({
  query,
  sort,
  page = 1,
  limit,
}: GetRecurringBillsParams): Promise<GetRecurringBillsResponse> {
  const session = await verifySession();
  if (!session.isAuth) throw new Error("Unauthorized");

  try {
    const filters: RecurringBillWhereInput[] = [];

    if (query) {
      const searchableFields = getQueryConfig<RecurringBill>(query, [
        { name: "name" }, { name: "category" }, { name: "amount", isNumber: true },
      ])

      filters.push({ OR: searchableFields });
    }

    const safePage = Number.isInteger(page) && page > 0 ? page : 1;
    const pagination = limit && limit > 0
      ? {
        skip: (safePage - 1) * limit,
        take: limit,
      }
      : undefined;

    const where: RecurringBillWhereInput = {
      userId: session.userId,
      ...(filters.length > 0 ? { AND: filters } : {}),
    };

    const [allBills, paginatedBills] = await prisma.$transaction(async (tx) => {
      const paginatedBills = await tx.recurringBill.findMany({
        where,
        ...(pagination || {}),
        omit: omitProperties,
        orderBy: getOrderBy(sort || ""),
        include: {
          transactions: {
            take: 1,
            select: { date: true },
            orderBy: {
              date: "desc"
            },
          }
        }
      });

      const allBills = await tx.recurringBill.findMany({
        where: { userId: session.userId },
        omit: omitProperties,
        include: {
          transactions: {
            take: 1,
            select: { date: true },
            orderBy: {
              date: "desc"
            },
          }
        }
      });

      const formattedBills = paginatedBills.map(({ transactions, ...bill }) => ({ ...bill, lastPaidDate: transactions[0]?.date || null }));
      const formattedAllBills = allBills.map(({ transactions, ...bill }) => ({ ...bill, lastPaidDate: transactions[0]?.date || null }));

      return [formattedAllBills, formattedBills]
    });

    const totalPages = pagination ? Math.ceil(allBills.length / pagination.take) : 1;

    const summary = allBills.reduce(
      (acc, bill) => {
        const status = getBillStatus(bill.dueDate, bill.lastPaidDate);
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

    return {
      data: {
        summary,
        recurringBills: paginatedBills,
      },
      meta: {
        currentPage: safePage,
        totalItems: allBills.length,
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

export async function getRecurringBillById(id: string): Promise<GetRecurringBillByIdResponse> {
  const session = await verifySession();
  if (!session.isAuth) throw new Error("Unauthorized");
  try {
    const recurringBillResult = await prisma.recurringBill.findUnique({
      where: {
        id,
        userId: session.userId,
      },
      omit: omitProperties,
      include: {
        transactions: {
          take: 1,
          select: { date: true },
          orderBy: {
            date: "desc",
          },
        },
      },
    });

    if (!recurringBillResult) {
      return {
        data: {
          recurringBill: null,
        },
      };
    }

    const { transactions, ...recurringBill } = recurringBillResult;

    return {
      data: {
        recurringBill: {
          ...recurringBill,
          lastPaidDate: transactions[0]?.date || null,
        },
      },
    };
  } catch (error) {
    console.log("failed getting recurring data", error);
    return {
      data: {
        recurringBill: null
      },
      error: "failed getting recurring data",
    };
  }
}

export async function createRecurringBill(recurringBillData: Omit<RecurringBill, "id" | "userId" | "lastPaidDate">): Promise<CreateRecurringBillResponse> {
  const session = await verifySession();
  if (!session.isAuth) throw new Error("Unauthorized");
  try {
    const existingRecurringBill = await prisma.recurringBill.findFirst({
      where: {
        userId: session.userId,
        name: recurringBillData.name,
        amount: recurringBillData.amount,
        category: recurringBillData.category,
        dueDate: recurringBillData.dueDate,
      },
    });

    if (existingRecurringBill) {
      throw new Error("Recurring bill with same details already exists");
    }

    const recurringBill = await prisma.recurringBill.create({
      data: {
        ...recurringBillData,
        avatar: recurringBillData.avatar || null,
        userId: session.userId,
      },
      omit: omitProperties,
    });

    return {
      data: {
        recurringBill: {
          ...recurringBill,
          lastPaidDate: null,
        },
      },
    };
  } catch (error) {
    console.log("failed getting recurring data", error);
    return {
      data: {
        recurringBill: null
      },
      error: "failed getting recurring data",
    };
  }
}

export async function updateRecurringBillById(id: string, updatedFields: Partial<Omit<RecurringBill, "id" | "userId" | "lastPaidDate">>): Promise<UpdateRecurringBillByIdResponse> {
  const session = await verifySession();
  if (!session.isAuth) throw new Error("Unauthorized");
  try {
    const recurringBill = await prisma.$transaction(async (tx) => {
      const recurringBillResult = await tx.recurringBill.findUnique({
        where: {
          id,
          userId: session.userId,
        },
      });

      if (!recurringBillResult || recurringBillResult.userId !== session.userId) {
        throw new Error(`Recurring bill with id:${id} doesn't exist`);
      }

      const updatedRecurringBill = await tx.recurringBill.update({
        where: {
          id,
          userId: session.userId,
        },
        data: updatedFields,
        omit: omitProperties,
      });

      const latestTransaction = await tx.transaction.findFirst({
        where: {
          userId: session.userId,
          recurringBillId: id,
        },
        orderBy: {
          date: "desc",
        },
        select: {
          date: true,
        },
      });

      return {
        ...updatedRecurringBill,
        lastPaidDate: latestTransaction?.date || null,
      };
    });

    return {
      data: {
        recurringBill,
      },
    };
  } catch (error) {
    console.log("failed getting recurring data", error);
    return {
      data: {
        recurringBill: null
      },
      error: "failed getting recurring data",
    };
  }
}

export async function deleteRecurringBillById(id: string): Promise<DeleteRecurringBillByIdResponse> {
  const session = await verifySession();
  if (!session.isAuth) throw new Error("Unauthorized");
  try {
    const recurringBill = await prisma.$transaction(async (tx) => {
      const recurringBillResult = await tx.recurringBill.findUnique({
        where: {
          id,
          userId: session.userId,
        },
        include: {
          transactions: {
            take: 1,
            select: { date: true },
            orderBy: {
              date: "desc",
            },
          },
        },
      });

      if (!recurringBillResult || recurringBillResult.userId !== session.userId) {
        throw new Error(`Recurring bill with id:${id} doesn't exist`);
      }

      const deletedRecurringBill = await tx.recurringBill.delete({
        where: {
          id,
          userId: session.userId,
        },
        omit: omitProperties,
      });

      return {
        ...deletedRecurringBill,
        lastPaidDate: recurringBillResult.transactions[0]?.date || null,
      };
    });

    return {
      data: {
        recurringBill,
      },
    };
  } catch (error) {
    console.log("failed getting recurring data", error);
    return {
      data: {
        recurringBill: null
      },
      error: "failed getting recurring data",
    };
  }
}