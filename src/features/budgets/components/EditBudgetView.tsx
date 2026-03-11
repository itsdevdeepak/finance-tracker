import { budgetFormAction } from "../actions";
import { getBudgetById } from "../service";
import BudgetForm from "./BudgetForm";
import { EditForm } from "../constants";
import BudgetNotFound from "./BudgetNotFound";

export default async function EditBudgetView({ id }: { id: string }) {
  const { data } = await getBudgetById(id);

  if (!data.budget) return <BudgetNotFound />;

  return (
    <BudgetForm
      action={budgetFormAction}
      initialData={data.budget}
      heading={EditForm.heading}
      description={EditForm.description}
    />
  );
}
