import { Budget } from "../types";
import { formatCurrency } from "@/lib/utils/format";
import { getColorByName } from "@/lib/utils/colors";

function SummaryItem({ budget }: { budget: Budget }) {
  return (
    <li className="flex items-center justify-between gap-sm *:not-last:border-gray-lighter *:not-last:border-b text-nowrap">
      <div
        style={
          { "--clr-dot": getColorByName(budget.theme) } as React.CSSProperties
        }
        className={`flex py-base text-sm text-gray gap-base before:content=[''] before:rounded-full before:w-1 before:block before:bg-(--clr-dot)`}
      >
        <span>{budget.category}</span>
      </div>
      <div className="text-base inline-flex items-center gap-xs">
        <span className="font-black">{formatCurrency(budget.spent)}</span>
        <span className="text-gray text-xs">
          of {formatCurrency(budget.maximum)}
        </span>
      </div>
    </li>
  );
}

export function BudgetChartSummary({ budgets }: { budgets: Budget[] }) {
  return (
    <div className="w-full flow-xl">
      <h1 className="text-2xl font-bold">Spending Summary</h1>
      <ul>
        {budgets.map((budget) => {
          return <SummaryItem key={budget.id} budget={budget} />;
        })}
      </ul>
    </div>
  );
}
