import { notFound } from "next/navigation";
import { deleteTransaction } from "../action";
import { getTransactionById } from "../service";
import DeleteDialog from "./DeleteDialog";

export default async function DeleteTransactionView({ id }: { id: string }) {
  const { data } = await getTransactionById(id);
  if (!data.transaction) return notFound();

  return (
    <DeleteDialog transaction={data.transaction} action={deleteTransaction} />
  );
}
