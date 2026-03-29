import { use } from "react";
import CompactCard from "./CompactCard";
import { formatCurrency } from "@/lib/utils/format";
import { GetAccountSummaryResponse } from "@/features/transactions/types";

export default function BalanceCards({
	getBalancePromise,
}: {
	getBalancePromise: Promise<GetAccountSummaryResponse>;
}) {
	const { data, error } = use(getBalancePromise);

	if (error) {
		throw new Error(error);
	}

	const { current, income, expense } = data.accountSummary;

	return (
		<div className="flex max-sm:flex-col *:flex-1 *:grow *:shrink gap-sm md:gap-xl">
			<CompactCard isDark={true}>
				<h3 className="text-sm">Current Balance</h3>
				<div className="text-2xl font-bold">{formatCurrency(current)}</div>
			</CompactCard>
			<CompactCard>
				<h3 className="text-sm">Income</h3>
				<div className="text-2xl font-bold">{formatCurrency(income)}</div>
			</CompactCard>
			<CompactCard>
				<h3 className="text-sm">Expenses</h3>
				<div className="text-2xl font-bold">{formatCurrency(expense)}</div>
			</CompactCard>
		</div>
	);
}
