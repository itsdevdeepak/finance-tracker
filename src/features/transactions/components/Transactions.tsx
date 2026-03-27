"use client";

import { use } from "react";
import { GetTransactionsResponse } from "../types";
import DataControls from "./DataControls";
import TransactionList from "./TransactionList";
import TransactionTable from "./TransactionsTable";
import Pagination from "@/components/ui/Pagination";

import useUpdateParam from "@/hooks/useUpdateParam";

export default function Transactions({
	getTransactionsResponse,
}: {
	getTransactionsResponse: Promise<GetTransactionsResponse>;
}) {
	const { data: transactions, meta, error } = use(getTransactionsResponse);
	const { isPending, updateParam } = useUpdateParam();

	if (error) throw new Error(error);
	if (!meta) throw new Error("Transactions meta data not defined");

	return (
		<div className="bg-white p-lg md:p-2xl rounded-xl">
			<DataControls updateParam={updateParam} inTransition={isPending} />
			<TransactionTable
				className={`max-sm:hidden ${isPending ? "opacity-75 animate-pulse" : ""}`}
				transactions={transactions}
			/>
			<TransactionList
				className={`sm:hidden ${isPending ? "opacity-75 animate-pulse" : ""}`}
				transactions={transactions}
			/>
			<Pagination
				{...meta}
				inTransition={isPending}
				updatePage={(page: number) =>
					updateParam({ name: "page", value: page.toString() })
				}
			/>
		</div>
	);
}
