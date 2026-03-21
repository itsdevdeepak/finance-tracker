import { getTransactionById } from "../service";
import { transactionFormAction } from "../action";
import { EditForm } from "../constants";
import TransactionForm from "./TransactionForm";
import TransactionNotFound from "./TransactionNotFound";

export default async function EditTransactionView({ id }: { id: string }) {
  const { data, error } = await getTransactionById(id);

  if (!data.transaction || error) return <TransactionNotFound />;

  return (
    <TransactionForm
      action={transactionFormAction}
      initialData={data.transaction}
      heading={EditForm.heading}
      description={EditForm.description}
    />
  );
}
