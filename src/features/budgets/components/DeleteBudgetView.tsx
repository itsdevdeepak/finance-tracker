import { deleteBudget } from "../actions";
import { getBudgetById } from "../service";
import BudgetNotFound from "./BudgetNotFound";
import DeleteDialog from "./DeleteDialog";

export default async function DeleteBudgetView({ id }: { id: string }) {
  const { data } = await getBudgetById(id);
  if (!data.budget) return <BudgetNotFound />;

  return <DeleteDialog budget={data.budget} action={deleteBudget} />;
}
