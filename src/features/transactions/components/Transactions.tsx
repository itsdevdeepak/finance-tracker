"use client";

import { useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createQueryString } from "@/lib/utils/url";
import { Transaction, URLParam } from "../types";
import DataControls from "./DataControls";
import TransactionList from "./TransactionList";
import TransactionTable from "./TransactionsTable";
import Pagination from "@/components/ui/Pagination";

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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  function updateUrl(params: URLParam | URLParam[], replace = false) {
    startTransition(() => {
      const navigate = replace ? router.replace : router.push;

      const queryString = createQueryString(
        searchParams,
        Array.isArray(params) ? params : [params],
      );

      navigate(`${pathname}?${queryString}`, { scroll: false });
    });
  }

  return (
    <div className="bg-white p-lg md:p-2xl rounded-xl">
      <DataControls updateUrl={updateUrl} inTransition={isPending} />
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
          updateUrl({ name: "page", value: page.toString() })
        }
      />
    </div>
  );
}
