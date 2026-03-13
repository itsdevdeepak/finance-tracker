import { Suspense } from "react";
import { getBalance } from "@/services";
import BalanceCards from "@/components/BalanceCards";
import BalanceCardsSkeletal from "@/components/BalanceCardsSkeletal";
import SummarySkeletal from "@/components/ui/SummarySkeletal";
import BudgetsSummary from "@/features/budgets/components/BudgetsSummary";
import PotsSummary from "@/features/pots/components/PotsSummary";
import RecurringBillsSummary from "@/features/recurring-bills/components/RecurringBillsSummary";
import TransactionsSummary from "@/features/transactions/components/TransactionsSummary";

export default function Home() {
  const getBalancePromise = getBalance();
  return (
    <section className="flow-2xl">
      <h1 className="text-xl font-bold">Overview</h1>
      <Suspense fallback={<BalanceCardsSkeletal />}>
        <BalanceCards balancePromise={getBalancePromise} />
      </Suspense>
      <div className="flex max-lg:flex-col gap-2xl">
        <div className="grow flow-2xl">
          <Suspense fallback={<SummarySkeletal height="100px" />}>
            <PotsSummary />
          </Suspense>
          <Suspense fallback={<SummarySkeletal height="390px" />}>
            <TransactionsSummary />
          </Suspense>
        </div>
        <div className="flow-2xl">
          <Suspense fallback={<SummarySkeletal width="470px" height="350px" />}>
            <BudgetsSummary />
          </Suspense>
          <Suspense fallback={<SummarySkeletal height="210px" />}>
            <RecurringBillsSummary />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
