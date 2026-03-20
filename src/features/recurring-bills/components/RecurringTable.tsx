import Image from "next/image";
import Table from "@/components/ui/Table";
import { RecurringBill } from "../types";
import { formatCurrency } from "@/lib/utils/format";
import { formatToMonthlyDate, getBillStatus } from "../utils";
import IconBillPaid from "@/components/icons/IconBillPaid";
import IconBillDue from "@/components/icons/IconBillDue";

export default function RecurringTable({
  recurringBills,
  className,
}: {
  recurringBills: RecurringBill[];
  className?: string;
}) {
  return (
    <Table
      className={className}
      header={
        <Table.Row>
          <Table.Header>Bill Title</Table.Header>
          <Table.Header>Due Date</Table.Header>
          <Table.Header>Amount</Table.Header>
        </Table.Row>
      }
      data={[
        recurringBills.map((recurring) => {
          const status = getBillStatus(
            recurring.dueDate,
            recurring.lastPaidDate,
          );

          return (
            <Table.Row key={recurring.id} data-avatar={recurring.avatar}>
              <Table.Data>
                <div className="inline-flex items-center gap-base font-bold">
                  <Image
                    className="rounded-full"
                    src={recurring.avatar}
                    alt=""
                    width={40}
                    height={40}
                  />
                  {recurring.name}
                </div>
              </Table.Data>
              <Table.Data>
                <div
                  className={`inline-flex items-center gap-sm ${status === "paid" ? "text-green" : ""}`}
                >
                  {formatToMonthlyDate(recurring.dueDate)}
                  <span className="sr-only">Status: {status}</span>
                  {status === "paid" && (
                    <IconBillPaid
                      aria-hidden="true"
                      className="w-base h-base"
                    />
                  )}
                  {status === "due" && (
                    <IconBillDue
                      aria-hidden="true"
                      className="text-red w-base h-base"
                    />
                  )}
                </div>
              </Table.Data>
              <Table.Data className="font-bold">
                {formatCurrency(recurring.amount)}
              </Table.Data>
            </Table.Row>
          );
        }),
      ]}
    ></Table>
  );
}
