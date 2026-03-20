import { Budget } from "../types";
import { LatestSpending } from "./LatestSpending";
import { ColorsByName } from "@/constants/colors";
import { getColorByName } from "@/lib/utils/colors";
import AmountInfo from "./AccountInfo";
import OptionsMenu, { Option } from "@/components/ui/OptionsMenu";

export async function BudgetCard({ budget }: { budget: Budget }) {
  const color = getColorByName(budget.theme) || ColorsByName.navy;
  const budgetRoute = `/budgets/${budget.id}`;

  return (
    <article className="p-xl bg-white rounded-xl flow-3xl">
      <div className="flex gap-base items-center">
        <div
          className="w-base h-base rounded-full"
          style={{ background: color }}
        />
        <h2 className="font-bold">{budget.category}</h2>
        <OptionsMenu name="budget" className="ml-auto">
          <Option type="link" prefetch={true} href={`${budgetRoute}/edit`}>
            Edit Budget
          </Option>
          <Option
            type="link"
            prefetch={true}
            href={`${budgetRoute}/delete`}
            className="text-red"
          >
            Delete Budget
          </Option>
        </OptionsMenu>
      </div>
      <AmountInfo
        spent={budget.spent}
        maximum={budget.maximum}
        theme={budget.theme}
      />
      <LatestSpending category={budget.category} />
    </article>
  );
}
