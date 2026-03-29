import Table from "@/components/ui/Table";
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
import SubmitButton from "@/components/ui/form/SubmitButton";
import PayRecurring from "./PayRecurring";

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
					<Table.Header>Options</Table.Header>
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
									<Avatar imageUrl={recurring.avatar} />
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
							<Table.Data className="font-bold">
								<div className="flex items-center justify-end text-gray-light overflow-hidden">
									<PayRecurring
										recurringId={recurring.id}
										recurringStatus={status}
									/>
									<Link
										href={`${recurringBillPath(recurring.id)}/edit`}
										className="cursor>-pointer hover:bg-gray-lighter p-xs rounded-lg hover:text-gray"
									>
										<IconEdit className="size-lg" />
									</Link>
									<Link
										href={`${recurringBillPath(recurring.id)}/delete`}
										className="cursor-pointer hover:bg-gray-lighter p-xs rounded-lg hover:text-red"
									>
										<IconTrash className="size-lg" />
									</Link>
								</div>
							</Table.Data>
						</Table.Row>
					);
				}),
			]}
		></Table>
	);
}
