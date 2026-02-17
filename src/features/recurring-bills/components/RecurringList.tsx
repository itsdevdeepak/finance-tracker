import Image from "next/image";
import { RecurringBill } from "../types";
import { formatCurrency } from "@/lib/utils/format";
import { formatToMonthlyDate, getBillStatus } from "../utils";
import IconBillPaid from "@/components/icons/IconBillPaid";
import IconBillDue from "@/components/icons/IconBillDue";

function RecurringItem({
  recurringBill,
  status,
}: {
  recurringBill: RecurringBill;
  status: "paid" | "due" | "upcoming";
}) {
  return (
    <div className="flex gap-sm justify-between">
      <div className="flex items-center gap-sm grow">
        <Image
          className="w-8 h-8 rounded-full"
          src={recurringBill.avatar}
          alt=""
          width={32}
          height={32}
        />
        <div className="flow-2xs">
          <p className="font-bold">{recurringBill.name}</p>
          <div className="inline-flex items-center gap-sm">
            <p className={`${status === "paid" ? "text-green" : "text-gray"}`}>
              {formatToMonthlyDate(recurringBill.dueDate)}
            </p>
            <span className="sr-only">Status: {status}</span>
            {status === "paid" && (
              <IconBillPaid
                aria-hidden="true"
                className="text-green w-base h-base"
              />
            )}
            {status === "due" && (
              <IconBillDue
                aria-hidden="true"
                className="text-red w-base h-base"
              />
            )}
          </div>
        </div>
      </div>
      <div className="text-right flow-2xs flex items-end justify-end">
        <p className="font-bold">{formatCurrency(recurringBill.amount)}</p>
      </div>
    </div>
  );
}

export default function RecurringList({
  className = "",
  recurringBills,
}: {
  className?: string;
  recurringBills: RecurringBill[];
}) {
  return (
    <ul role="list" className={`text-sm ${className}`}>
      {recurringBills.map((recurringBill) => (
        <li
          className="py-base not-last:border-b border-gray-lighter"
          key={recurringBill.id}
        >
          <RecurringItem
            recurringBill={recurringBill}
            status={getBillStatus(recurringBill)}
          />
        </li>
      ))}
    </ul>
  );
}
