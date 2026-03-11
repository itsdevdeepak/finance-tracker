import BudgetsView from "@/features/budgets/components/BudgetsView";
import { getBudgets } from "@/features/budgets/service";
import Link from "next/link";

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
      <BudgetsView getBudgetsResponse={getBudgetsResponse} />
    </section>
  );
}
