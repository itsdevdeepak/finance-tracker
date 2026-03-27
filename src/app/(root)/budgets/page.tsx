import { Suspense } from "react";
import Link from "next/link";
import BudgetsView from "@/features/budgets/components/BudgetsView";
import BudgetViewSkeletal from "@/features/budgets/components/BudgetsViewSkeletal";
import ErrorFallback from "@/components/ErrorFallback";
import { budgetsPath } from "@/constants/paths";

export default function Page() {
	return (
		<section className="flex flex-col gap-2xl min-h-[calc(100dvh-5rem)]">
			<div className="flex justify-between">
				<h1 className="text-xl font-bold">Budgets</h1>
				<Link prefetch={true} href={`${budgetsPath()}/new`} className="button">
					+ Add New Budget
				</Link>
			</div>
			<ErrorFallback>
				<Suspense fallback={<BudgetViewSkeletal />}>
					<BudgetsView />
				</Suspense>
			</ErrorFallback>
		</section>
	);
}
