"use client";

import { Transaction } from "../types";
import DataControls from "./DataControls";
import TransactionList from "./TransactionList";
import TransactionTable from "./TransactionsTable";
import Pagination from "@/components/ui/Pagination";

import useUpdateParam from "@/hooks/useUpdateParam";

export default function Transactions({
  transactions,
  meta,
}: {
  transactions: Transaction[];
  meta: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
  };
}) {
  const { isPending, updateParam } = useUpdateParam();

  return (
    <div className="bg-white p-lg md:p-2xl rounded-xl">
      <DataControls updateParam={updateParam} inTransition={isPending} />
      <TransactionTable
        className={`max-sm:hidden ${isPending ? "opacity-75 animate-pulse" : ""}`}
        transactions={transactions}
      />
      <TransactionList
        className={`sm:hidden ${isPending ? "opacity-75 animate-pulse" : ""}`}
        transactions={transactions}
      />
      <Pagination
        {...meta}
        inTransition={isPending}
        updatePage={(page: number) =>
          updateParam({ name: "page", value: page.toString() })
        }
      />
    </div>
  );
}
