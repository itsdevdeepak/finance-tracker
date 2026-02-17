"use client";

import { use } from "react";
import type {
  GetRecurringBillsResponse,
  RecurringBillsSummary,
} from "../types";
import { formatCurrency } from "@/lib/utils/format";
import IconRecurringBills from "@/components/icons/IconRecurringBills";
import RecurringTable from "./RecurringTable";
import RecurringList from "./RecurringList";
import DataControls from "./DataControl";

import useUpdateParam from "@/hooks/useUpdateParam";
import Pagination from "@/components/ui/Pagination";

function RecurringCards({ summary }: { summary: RecurringBillsSummary }) {
  return (
    <>
      <div className="h-fit flex gap-xl grow flex-wrap *:basis-83 *:grow *:shrink">
        <div className="max-sm:flex items-center gap-lg bg-gray-darker text-white rounded-xl p-xl">
          <IconRecurringBills className="w-10 h-10 sm:mb-2xl" />
          <div className="flow-xs">
            <p className="text-sm">Total Bills</p>
            <p className="text-2xl font-bold">
              {formatCurrency(summary.totalAmount)}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-lg flow-lg">
          <p className="font-bold">Summary</p>
          <div className="*:not-first:pt-base *:not-last:pb-base x *:not-last:border-b  *:not-last:border-gray-lighter">
            <div className="flex justify-between text-sm">
              <p className="text-gray">Paid Bills</p>
              <p className="font-bold">
                {summary.paidCount} {formatCurrency(summary.paidAmount)}
              </p>
            </div>
            <div className="flex justify-between text-sm">
              <p className="text-gray">Total Upcoming</p>
              <p className="font-bold">
                {summary.upcomingCount} {formatCurrency(summary.upcomingAmount)}
              </p>
            </div>
            <div className="flex justify-between text-sm text-red rounded-xl">
              <p>Due Soon</p>
              <p className="font-bold">
                {summary.dueCount} {formatCurrency(summary.dueAmount)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function RecurringBills({
  getRecurringBillResponse,
}: {
  getRecurringBillResponse: Promise<GetRecurringBillsResponse>;
}) {
  const { data, error, meta } = use(getRecurringBillResponse);
  const { isPending, updateParam } = useUpdateParam();
  const { recurringBills, summary } = data;

  if (error || !meta) {
    return <h2>{error}</h2>;
  }

  return (
    <section className="flex flex-wrap gap-lg">
      <RecurringCards summary={summary} />
      <div className="flex-5 bg-white p-2xl rounded-xl basis-150">
        <DataControls updateParam={updateParam} inTransition={isPending} />
        <RecurringTable
          className={`max-sm:hidden ${isPending ? "opacity-75 animate-pulse" : ""}`}
          recurringBills={recurringBills}
        />
        <RecurringList
          className={`sm:hidden ${isPending ? "opacity-75 animate-pulse" : ""}`}
          recurringBills={recurringBills}
        />
        <Pagination
          {...meta}
          inTransition={isPending}
          updatePage={(page: number) =>
            updateParam({ name: "page", value: page.toString() })
          }
        />
      </div>
    </section>
  );
}
