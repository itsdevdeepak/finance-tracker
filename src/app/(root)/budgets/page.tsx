import { Suspense } from "react";
import Link from "next/link";
import BudgetsView from "@/features/budgets/components/BudgetsView";
import BudgetViewSkeletal from "@/features/budgets/components/BudgetsViewSkeletal";

export default function Page() {
  return (
    <section className="flow-2xl">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">Budgets</h1>
        <Link prefetch={true} href="/budgets/new" className="button">
          + Add New Budget
        </Link>
      </div>
      <Suspense fallback={<BudgetViewSkeletal />}>
        <BudgetsView />
      </Suspense>
    </section>
  );
}
