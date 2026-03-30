import { transactionsPath } from "@/constants/paths";
import TransactionsSkeleton from "@/features/transactions/components/TransactionsSkeleton";
import Link from "next/link";

export default function Loading() {
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
			<TransactionsSkeleton />
		</section>
	);
}
