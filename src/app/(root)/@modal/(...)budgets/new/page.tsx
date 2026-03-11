import Modal from "@/components/ui/Modal";
import { budgetFormAction } from "@/features/budgets/actions";
import BudgetForm from "@/features/budgets/components/BudgetForm";
import { NewForm } from "@/features/budgets/constants";

export default function Page() {
  return (
    <Modal fallbackRoute="/budgets">
      <BudgetForm
        action={budgetFormAction}
        heading={NewForm.heading}
        description={NewForm.description}
      />
    </Modal>
  );
}
