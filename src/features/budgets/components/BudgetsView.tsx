import BudgetsChart from "./BudgetChart";
import { BudgetChartSummary } from "./BudgetChartSummary";
import { getBudgets } from "../service";
import BudgetCards from "./BudgetCards";

export default async function BudgetsView() {
  const { data } = await getBudgets();

  return (
    <div className="with-sidebar gap-xl *:first:basis-[420px] *:shrink *:grow">
      <BudgetsChart
        budgets={data.budgets}
        renderCaption={(budgets) => <BudgetChartSummary budgets={budgets} />}
      />
      <BudgetCards budgets={data.budgets} />
    </div>
  );
}
