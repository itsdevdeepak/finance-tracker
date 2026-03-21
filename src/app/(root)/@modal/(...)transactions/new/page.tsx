import Modal from "@/components/ui/Modal";
import { transactionFormAction } from "@/features/transactions/action";
import TransactionForm from "@/features/transactions/components/TransactionForm";
import { NewForm } from "@/features/transactions/constants";

export default function Page() {
  return (
    <Modal fallbackRoute="/pots">
      <TransactionForm
        action={transactionFormAction}
        heading={NewForm.heading}
        description={NewForm.description}
      />
    </Modal>
  );
}
