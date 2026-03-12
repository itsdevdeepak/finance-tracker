import DonutChart from "@/components/ui/DonutChart";
import { Budget } from "../types";
import { getBudgetChartData } from "../utils";

export default function BudgetsChart({
  budgets,
  renderCaption,
}: {
  budgets: Budget[];
  renderCaption: (budgets: Budget[]) => React.ReactNode;
}) {
  const { totalSpent, totalLimit, data } = getBudgetChartData(budgets);
  return (
    <article className="p-xl bg-white rounded-xl flow-3xl grow h-fit">
      <DonutChart
        heading={"$" + totalSpent}
        subHeading={`of \$${totalLimit} limit`}
        className="*:first:min-w-[240px] *:first:max-w-[350px]"
        data={data}
        renderCaption={() => renderCaption(budgets)}
      />
    </article>
  );
}
