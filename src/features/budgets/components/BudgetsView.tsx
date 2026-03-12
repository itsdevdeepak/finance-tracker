"use client";

import { use } from "react";
import { GetBudgetResponse } from "../types";
import BudgetsChart from "./BudgetChart";
import Budgets from "./Budgets";
import { BudgetChartSummary } from "./BudgetChartSummary";

export default function BudgetsView({
  getBudgetsResponse,
}: {
  getBudgetsResponse: Promise<GetBudgetResponse>;
}) {
  const { data } = use(getBudgetsResponse);

  return (
    <div className="with-sidebar gap-xl *:first:basis-[420px] *:shrink *:grow">
      <BudgetsChart
        budgets={data.budgets}
        renderCaption={(budgets) => <BudgetChartSummary budgets={budgets} />}
      />
      <Budgets budgets={data.budgets} />
    </div>
  );
}
