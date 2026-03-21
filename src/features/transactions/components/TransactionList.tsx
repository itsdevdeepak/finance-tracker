import { Transaction } from "../types";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import Avatar from "./Avatar";

function TransactionItem({ transaction }: { transaction: Transaction }) {
  return (
    <div className="flex gap-sm justify-between *:flex-1">
      <div className="flex items-center gap-sm">
        <Avatar
          className="w-8 h-8 rounded-full"
          imageUrl={transaction.avatar}
        />
        <div className="flow-2xs">
          <p className="font-bold">{transaction.name}</p>
          <p className="text-gray">{transaction.category}</p>
        </div>
      </div>
      <div className="text-right flow-2xs">
        <p
          className={`font-bold ${transaction.amount > 0 ? "text-green before:content-['+']" : ""}`}
        >
          {formatCurrency(transaction.amount)}
        </p>
        <p className="text-gray">{formatDate(transaction.date)}</p>
      </div>
    </div>
  );
}

export default function TransactionList({
  className = "",
  transactions,
}: {
  className?: string;
  transactions: Transaction[];
}) {
  return (
    <ul role="list" className={`text-sm ${className}`}>
      {transactions.map((transaction) => (
        <li
          className="py-base not-last:border-b border-gray-lighter"
          key={transaction.id}
        >
          <TransactionItem transaction={transaction} />
        </li>
      ))}
    </ul>
  );
}
