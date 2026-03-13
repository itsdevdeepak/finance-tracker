import Link from "next/link";
import { getBudgets } from "../service";
import BudgetsChart from "./BudgetChart";
import IconCaretRight from "@/components/icons/IconCaretRight";
import { Budget } from "../types";
import DataTile from "@/components/ui/DataTile";
import { formatCurrency } from "@/lib/utils/format";
import { getColorByName } from "@/lib/utils/colors";
import { ColorsByName } from "@/constants/colors";
import ErrorCard from "@/components/ui/ErrorCard";

function Caption({ budgets }: { budgets: Budget[] }) {
  return (
    <div className="grid gap-base grid-cols-[repeat(auto-fill,minmax(var(--min),1fr))] [--min:max(110px,calc(50%-var(--space-base)))]">
      {budgets.slice(0, 4).map(({ id, category, spent, theme }) => (
        <DataTile
          key={id}
          title={category}
          value={formatCurrency(spent)}
          color={getColorByName(theme) ?? ColorsByName.navy}
        />
      ))}
    </div>
  );
}

export default async function BudgetsSummary() {
  const { data, error } = await getBudgets();

  if (error) {
    return (
      <ErrorCard
        heading="Budgets data couldn't be loaded"
        description="Please check your connection or try again soon."
      />
    );
  }

  return (
    <div className="card flow-2xl">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Budgets</h2>
        <Link className="pageLink" href="/budgets">
          See Details <IconCaretRight />
        </Link>
      </div>
      <BudgetsChart
        budgets={data.budgets}
        renderCaption={(budgets) => <Caption budgets={budgets} />}
      />
    </div>
  );
}
