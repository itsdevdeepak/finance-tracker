import { deleteTransaction } from "../action";
import { getTransactionById } from "../service";
import DeleteDialog from "./DeleteDialog";
import TransactionNotFound from "./TransactionNotFound";

export default async function DeleteTransactionView({ id }: { id: string }) {
  const { data } = await getTransactionById(id);
  if (!data.transaction) return <TransactionNotFound />;

  return (
    <DeleteDialog transaction={data.transaction} action={deleteTransaction} />
  );
}
