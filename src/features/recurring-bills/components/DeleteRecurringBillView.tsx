import { notFound } from "next/navigation";
import { deleteRecurringBill } from "../action";
import { getRecurringBillById } from "../service";
import DeleteDialog from "./DeleteDialog";

export default async function DeleteRecurringBillView({ id }: { id: string }) {
  const { data, error } = await getRecurringBillById(id);
  if (!data.recurringBill || error) return notFound();

  return (
    <DeleteDialog
      recurringBill={data.recurringBill}
      action={deleteRecurringBill}
    />
  );
}
