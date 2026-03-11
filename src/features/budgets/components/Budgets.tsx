import Image from "next/image";
import Link from "next/link";
import OptionsMenu, { Option } from "@/components/ui/OptionsMenu";
import IconCaretRight from "@/components/icons/IconCaretRight";
import ProgressBar from "./ProgressBar";
import { Budget } from "../types";
import { getColorByName } from "@/lib/utils/colors";
import { ColorsByName } from "@/constants/colors";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { Transaction } from "@/features/transactions/types";

function AmountInfo({
  spent,
  maximum,
  theme,
}: {
  maximum: number;
  spent: number;
  theme: string;
}) {
  const spendingPercent =
    maximum > 0 ? Math.min((spent / maximum) * 100, 100) : 0;

  const freeAmount = maximum - spent;
  const color = getColorByName(theme) || ColorsByName.navy;

  return (
    <div className="flow-base">
      <span className="text-sm text-gray">
        Maximum of {formatCurrency(maximum)}
      </span>
      <ProgressBar basePercent={spendingPercent} color={color} />
      <div className="flex *:flex-1">
        <div className="flex gap-base">
          <div className="w-2xs rounded-full" style={{ background: color }} />
          <div className="flex flex-col gap-2xs text-xs">
            <span className="text-gray">Spent</span>
            <span className="font-bold">{formatCurrency(spent)}</span>
          </div>
        </div>
        <div className="flex gap-base">
          <div className="w-2xs rounded-full bg-beige-lighter" />
          <div className="flex flex-col gap-2xs text-xs">
            <span className="text-gray">Remaining</span>
            <span className="font-bold">{formatCurrency(freeAmount)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function LatestSpending({
  category,
  transactions,
}: {
  category: string;
  transactions: Transaction[];
}) {
  return (
    <div className="flow-lg p-lg rounded-xl bg-beige-lighter">
      <div className="flex justify-between">
        <h3 className="font-bold">Latest Spending</h3>
        <Link
          href={`/transactions?category=${category}`}
          className="text-gray text-sm inline-flex items-center gap-sm hover:text-gray-darker"
        >
          See All
          <IconCaretRight className="size-xs" />
        </Link>
      </div>
      <ul className="*:py-sm *:first:pt-0 *:not-last:border-b *:not-last:border-gray-lighter">
        {transactions.map((transaction) => {
          return (
            <li key={transaction.id}>
              <div className="flex items-center gap-base text-xs">
                <Image src={transaction.avatar} width={32} height={32} alt="" />
                <span className="font-bold">{transaction.name}</span>
                <div className="ml-auto flex flex-col gap-2xs">
                  <span className="font-bold">
                    {formatCurrency(transaction.amount)}
                  </span>
                  <span className="text-gray">
                    {formatDate(transaction.date)}
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function BudgetCard({ budget }: { budget: Budget }) {
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
      <LatestSpending
        category={budget.category}
        transactions={budget.transactions}
      />
    </article>
  );
}

export default function Budgets({ budgets }: { budgets: Budget[] }) {
  return (
    <div className="flow-xl">
      {budgets.map((budget) => (
        <BudgetCard key={budget.id} budget={budget} />
      ))}
    </div>
  );
}
