import Link from "next/link";
import { recurringBillsPath } from "@/constants/paths";
import RecurringBillsSkeleton from "@/features/recurring-bills/components/RecurringBillsSkeleton";

export default function Loading() {
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
			<RecurringBillsSkeleton />
		</section>
	);
}
