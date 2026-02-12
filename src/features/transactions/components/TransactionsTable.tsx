import Table from "@/components/ui/Table";
import { Transaction } from "../types";
import Image from "next/image";
import { formatCurrency, formatDate } from "@/lib/utils/format";

export default function TransactionTable({
  className = "",
  transactions,
}: {
  className?: string;
  transactions: Transaction[];
}) {
  return (
    <Table
      className={className}
      header={
        <Table.Row>
          <Table.Header>Recipient / Sender</Table.Header>
          <Table.Header>Category</Table.Header>
          <Table.Header>Transaction Date</Table.Header>
          <Table.Header>Amount</Table.Header>
        </Table.Row>
      }
      data={[
        transactions.map((transaction) => {
          return (
            <Table.Row key={transaction.id} data-avatar={transaction.avatar}>
              <Table.Data>
                <div className="inline-flex items-center gap-base font-bold">
                  <Image
                    className="rounded-full"
                    src={transaction.avatar}
                    alt=""
                    width={40}
                    height={40}
                  />
                  {transaction.name}
                </div>
              </Table.Data>
              <Table.Data className="text-gray">
                {transaction.category}
              </Table.Data>
              <Table.Data className="text-gray">
                {formatDate(transaction.date)}
              </Table.Data>
              <Table.Data
                className={`font-bold ${transaction.amount > 0 ? "text-green before:content-['+']" : ""}`}
              >
                {formatCurrency(transaction.amount)}
              </Table.Data>
            </Table.Row>
          );
        }),
      ]}
    />
  );
}
