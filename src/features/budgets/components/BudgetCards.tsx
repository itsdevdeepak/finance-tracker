import { Budget } from "../types";
import { BudgetCard } from "./BudgetCard";

export default async function BudgetCards({ budgets }: { budgets: Budget[] }) {
  return (
    <div className="flow-xl">
      {budgets.map((budget) => (
        <BudgetCard key={budget.id} budget={budget} />
      ))}
    </div>
  );
}
