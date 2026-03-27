import { Suspense } from "react";
import RecurringBills from "@/features/recurring-bills/components/RecurringBills";
import RecurringBillsSkeleton from "@/features/recurring-bills/components/RecurringBillsSkeleton";
import { getRecurringBills } from "@/features/recurring-bills/service";
import { sanitizeSearchParams } from "@/features/transactions/utils";
import Link from "next/link";
import ErrorFallback from "@/components/ErrorFallback";
import { recurringBillsPath } from "@/constants/paths";

export default async function Page(props: PageProps<"/recurring-bills">) {
	const searchParams = await props.searchParams;
	const { query, sort, limit, page } = sanitizeSearchParams(searchParams);
	const recurringBills = getRecurringBills({ query, sort, limit, page });
	return (
		<section className="flex flex-col gap-2xl min-h-[calc(100dvh-5rem)]">
			<div className="flex justify-between">
				<h1 className="text-xl font-bold">Recurring Bills</h1>
				<Link
					prefetch={true}
					href={`${recurringBillsPath()}/new`}
					className="button"
				>
					+ Add New Recurring Bill
				</Link>
			</div>
			<ErrorFallback>
				<Suspense fallback={<RecurringBillsSkeleton />}>
					<RecurringBills getRecurringBillResponse={recurringBills} />
				</Suspense>
			</ErrorFallback>
		</section>
	);
}
