import { RecurringBill } from "../types";
import { formatCurrency } from "@/lib/utils/format";
import { formatToMonthlyDate, getBillStatus } from "../utils";
import IconBillPaid from "@/components/icons/IconBillPaid";
import IconBillDue from "@/components/icons/IconBillDue";
import Avatar from "./Avatar";
import Link from "next/link";
import IconEdit from "@/components/icons/IconEdit";
import IconTrash from "@/components/icons/IconTrash";
import { recurringBillPath } from "@/constants/paths";
import { payRecurringBill } from "../action";
import PayRecurring from "./PayRecurring";

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
				<Avatar
					className="w-8 h-8 rounded-full"
					imageUrl={recurringBill.avatar}
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
			<div className="text-right flow-2xs flex items-center gap-base justify-end">
				<p className="font-bold">{formatCurrency(recurringBill.amount)}</p>
				<div className="flex items-center justify-end text-gray-light">
					<PayRecurring
						recurringId={recurringBill.id}
						recurringStatus={status}
					/>
					<Link
						href={`${recurringBillPath(recurringBill.id)}/edit`}
						className="cursor-pointer hover:bg-gray-lighter p-xs rounded-lg hover:text-gray"
					>
						<IconEdit className="size-lg" />
					</Link>
					<Link
						href={`${recurringBillPath(recurringBill.id)}/delete`}
						className="cursor-pointer hover:bg-gray-lighter p-xs rounded-lg hover:text-red"
					>
						<IconTrash className="size-lg" />
					</Link>
				</div>
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
						status={getBillStatus(
							recurringBill.dueDate,
							recurringBill.lastPaidDate,
						)}
					/>
				</li>
			))}
		</ul>
	);
}
