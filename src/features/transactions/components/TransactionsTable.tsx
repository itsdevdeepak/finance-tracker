import Table from "@/components/ui/Table";
import { Transaction } from "../types";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import IconEdit from "@/components/icons/IconEdit";
import IconTrash from "@/components/icons/IconTrash";
import Link from "next/link";
import { transactionPath } from "@/constants/paths";
import Image from "next/image";

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
					<Table.Header>Options</Table.Header>
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
										loading="eager"
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
							<Table.Data>
								<div className="flex items-center justify-end text-gray-light">
									<Link
										href={`${transactionPath(transaction.id)}/edit`}
										className="cursor-pointer hover:bg-gray-lighter p-xs rounded-lg hover:text-gray"
									>
										<IconEdit className="size-lg" />
									</Link>
									<Link
										href={`${transactionPath(transaction.id)}/delete`}
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
		/>
	);
}
