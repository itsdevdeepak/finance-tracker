import React from "react";
import DonutChart, { DonutData } from "@/components/ui/DonutChart";
import { ColorsByName } from "@/constants/colors";
import { Budget } from "../types";
import { getColorByName } from "@/lib/utils/colors";
import { formatCurrency } from "@/lib/utils/format";

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

function BudgetSummary({ budgets }: { budgets: Budget[] }) {
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

export default function BudgetsChart({ budgets }: { budgets: Budget[] }) {
  const totalSpent = Math.round(
    budgets.reduce((total, { spent }) => total + spent, 0),
  );

  const totalLimit = Math.round(
    budgets.reduce((total, { maximum }) => total + maximum, 0),
  );

  const data: DonutData[] = budgets.map((budget) => {
    const percent =
      totalSpent > 0 ? Math.min((budget.spent / totalSpent) * 100, 100) : 0;
    return {
      title: budget.category,
      color: getColorByName(budget.theme) ?? ColorsByName.navy,
      percent,
    };
  });

  return (
    <article className="p-xl bg-white rounded-xl flow-3xl grow h-fit">
      <DonutChart
        heading={"$" + totalSpent}
        subHeading={`of \$${totalLimit} limit`}
        className="*:first:min-w-[240px] *:first:max-w-[350px]"
        data={data}
        renderCaption={() => <BudgetSummary budgets={budgets} />}
      />
    </article>
  );
}
