import Link from "next/link";
import IconCaretRight from "@/components/icons/IconCaretRight";
import TransactionList from "./TransactionList";
import { getTransactions } from "../service";
import { SortingOption } from "../types";
import ErrorCard from "@/components/ui/ErrorCard";

export default async function TransactionsSummary() {
  const { data, error } = await getTransactions({
    limit: 5,
    sort: "Latest" as SortingOption,
  });

  if (error) {
    return (
      <ErrorCard
        heading="Transactions data couldn't be loaded"
        description="Please check your connection or try again soon."
      />
    );
  }

  const transactions = data;

  return (
    <div className="card flow-2xl">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Transactions</h2>
        <Link className="pageLink" href="/transactions">
          See Details <IconCaretRight />
        </Link>
      </div>
      <div>
        <TransactionList transactions={transactions} />
      </div>
    </div>
  );
}
