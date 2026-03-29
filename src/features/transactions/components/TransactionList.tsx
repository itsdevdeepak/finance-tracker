import { Transaction } from "../types";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import Link from "next/link";
import IconEdit from "@/components/icons/IconEdit";
import IconTrash from "@/components/icons/IconTrash";
import { transactionPath } from "@/constants/paths";
import Image from "next/image";

function TransactionItem({ transaction }: { transaction: Transaction }) {
	return (
		<div className="flex gap-sm justify-between *:flex-1">
			<div className="flex items-center gap-sm">
				<Image
					className="w-8 h-8 rounded-full"
					src={transaction.avatar}
					alt=""
					width={32}
					height={32}
				/>

				<div className="flow-2xs">
					<p className="font-bold">{transaction.name}</p>
					<p className="text-gray">{transaction.category}</p>
				</div>
			</div>
			<div className="flex gap-sm items-center justify-end">
				<div className="text-right flow-2xs">
					<p
						className={`font-bold ${transaction.amount > 0 ? "text-green before:content-['+']" : ""}`}
					>
						{formatCurrency(transaction.amount)}
					</p>
					<p className="text-gray">{formatDate(transaction.date)}</p>
				</div>
				<div className="flex flex-col items-center justify-end text-gray-light">
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
