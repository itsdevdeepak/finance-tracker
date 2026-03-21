import { Suspense } from "react";
import Link from "next/link";
import Transactions from "@/features/transactions/components/Transactions";
import TransactionsSkeleton from "@/features/transactions/components/TransactionsSkeleton";
import { getTransactions } from "@/features/transactions/service";
import { sanitizeSearchParams } from "@/features/transactions/utils";

export default async function Page(props: PageProps<"/transactions">) {
  const searchParams = await props.searchParams;

  const { query, sort, category, page, limit } =
    sanitizeSearchParams(searchParams);

  const transactionsPromise = getTransactions({
    query,
    sort,
    category,
    page,
    limit,
  });

  return (
    <section className="flow-2xl">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">Transactions</h1>
        <Link prefetch={true} href="/transactions/new" className="button">
          + Add New Transaction
        </Link>
      </div>
      <Suspense fallback={<TransactionsSkeleton />}>
        <Transactions getTransactionsResponse={transactionsPromise} />
      </Suspense>
    </section>
  );
}
