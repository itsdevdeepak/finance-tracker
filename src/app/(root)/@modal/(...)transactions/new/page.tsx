import Modal from "@/components/ui/Modal";
import { transactionsPath } from "@/constants/paths";
import { transactionFormAction } from "@/features/transactions/action";
import TransactionForm from "@/features/transactions/components/TransactionForm";
import { NewForm } from "@/features/transactions/constants";

export default function Page() {
	return (
		<Modal fallbackRoute={transactionsPath()}>
			<TransactionForm
				action={transactionFormAction}
				heading={NewForm.heading}
				description={NewForm.description}
			/>
		</Modal>
	);
}
