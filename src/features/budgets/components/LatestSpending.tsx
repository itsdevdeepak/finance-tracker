import Link from "next/link";
import Image from "next/image";
import { getTransactions } from "@/features/transactions/service";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import IconCaretRight from "@/components/icons/IconCaretRight";

export async function LatestSpending({ category }: { category: string }) {
	const { data: transactions } = await getTransactions({
		category: category,
		limit: 3,
		sort: "Latest",
	});

	return (
		<div className="flow-lg p-lg rounded-xl bg-beige-lighter">
			<div className="flex justify-between">
				<h3 className="font-bold">Latest Spending</h3>
				<Link
					href={`/transactions?category=${category}`}
					className="text-gray text-sm inline-flex items-center gap-sm hover:text-gray-darker"
				>
					See All
					<IconCaretRight className="size-xs" />
				</Link>
			</div>
			<ul className="*:py-sm *:first:pt-0 *:not-last:border-b *:not-last:border-gray-lighter">
				{transactions.map((transaction) => {
					return (
						<li key={transaction.id}>
							<div className="flex items-center gap-base text-xs">
								<Image
									src={
										transaction.avatar ||
										"/images/avatars/savory-bites-bistro.jpg"
									}
									width={32}
									height={32}
									alt=""
								/>
								<span className="font-bold">{transaction.name}</span>
								<div className="ml-auto flex flex-col gap-2xs">
									<span className="font-bold">
										{formatCurrency(transaction.amount)}
									</span>
									<span className="text-gray">
										{formatDate(transaction.date)}
									</span>
								</div>
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
