import { deleteRecurringBill } from "../action";
import { getRecurringBillById } from "../service";
import DeleteDialog from "./DeleteDialog";
import RecurringBillNotFound from "./RecurringBillNotFound";

export default async function DeleteRecurringBillView({ id }: { id: string }) {
  const { data, error } = await getRecurringBillById(id);
  if (!data.recurringBill || error) return <RecurringBillNotFound />;

  return (
    <DeleteDialog
      recurringBill={data.recurringBill}
      action={deleteRecurringBill}
    />
  );
}
