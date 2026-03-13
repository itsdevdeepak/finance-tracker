import { GetBalanceResponse } from "@/types";
import { use } from "react";
import CompactCard from "./CompactCard";
import { formatCurrency } from "@/lib/utils/format";

export default function BalanceCards({
  balancePromise,
}: {
  balancePromise: Promise<GetBalanceResponse>;
}) {
  const { data } = use(balancePromise);

  return (
    <div className="flex max-sm:flex-col *:flex-1 *:grow *:shrink gap-sm md:gap-xl">
      <CompactCard isDark={true}>
        <h3 className="text-sm">Current Balance</h3>
        <div className="text-2xl font-bold">
          {data.balance ? formatCurrency(data.balance.current) : "--"}
        </div>
      </CompactCard>
      <CompactCard>
        <h3 className="text-sm">Income</h3>
        <div className="text-2xl font-bold">
          {data.balance ? formatCurrency(data.balance.income) : "--"}
        </div>
      </CompactCard>
      <CompactCard>
        <h3 className="text-sm">Expenses</h3>
        <div className="text-2xl font-bold">
          {data.balance ? formatCurrency(data.balance.expenses) : "--"}
        </div>
      </CompactCard>
    </div>
  );
}
