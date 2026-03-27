import { Suspense } from "react";
import Link from "next/link";
import Transactions from "@/features/transactions/components/Transactions";
import TransactionsSkeleton from "@/features/transactions/components/TransactionsSkeleton";
import { getTransactions } from "@/features/transactions/service";
import { sanitizeSearchParams } from "@/features/transactions/utils";
import ErrorFallback from "@/components/ErrorFallback";
import { transactionsPath } from "@/constants/paths";

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
		<section className="flex flex-col gap-2xl min-h-[calc(100dvh-5rem)]">
			<div className="flex justify-between">
				<h1 className="text-xl font-bold">Transactions</h1>
				<Link
					prefetch={true}
					href={`${transactionsPath()}/new`}
					className="button"
				>
					+ Add New Transaction
				</Link>
			</div>
			<ErrorFallback>
				<Suspense fallback={<TransactionsSkeleton />}>
					<Transactions getTransactionsResponse={transactionsPromise} />
				</Suspense>
			</ErrorFallback>
		</section>
	);
}
