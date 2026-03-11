import { NewForm } from "@/features/budgets/constants";
import { budgetFormAction } from "@/features/budgets/actions";
import BudgetForm from "@/features/budgets/components/BudgetForm";

export default function Page() {
  return (
    <section className="flex items-center justify-center min-h-screen">
      <BudgetForm
        action={budgetFormAction}
        heading={NewForm.heading}
        description={NewForm.description}
      />
    </section>
  );
}
