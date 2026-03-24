import { notFound } from "next/navigation";
import { budgetFormAction } from "../actions";
import { getBudgetById } from "../service";
import BudgetForm from "./BudgetForm";
import { EditForm } from "../constants";

export default async function EditBudgetView({ id }: { id: string }) {
  const { data } = await getBudgetById(id);

  if (!data.budget) return notFound();

  return (
    <BudgetForm
      action={budgetFormAction}
      initialData={data.budget}
      heading={EditForm.heading}
      description={EditForm.description}
    />
  );
}
