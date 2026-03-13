import BudgetsView from "@/features/budgets/components/BudgetsView";
import BudgetViewSkeletal from "@/features/budgets/components/BudgetsViewSkeletal";
import { getBudgets } from "@/features/budgets/service";
import Link from "next/link";
import { Suspense } from "react";

export default function Page() {
  const getBudgetsResponse = getBudgets();

  return (
    <section className="flow-2xl">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">Budgets</h1>
        <Link prefetch={true} href="/budget/new" className="button">
          + Add New Budget
        </Link>
      </div>
      <Suspense fallback={<BudgetViewSkeletal />}>
        <BudgetsView getBudgetsResponse={getBudgetsResponse} />
      </Suspense>
    </section>
  );
}
