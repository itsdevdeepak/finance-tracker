import { GetRecurringBillsParams, GetRecurringBillsResponse, RecurringBill } from "./types";
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
