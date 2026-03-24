import { getTransactionById } from "../service";
import { transactionFormAction } from "../action";
import { EditForm } from "../constants";
import TransactionForm from "./TransactionForm";
import { notFound } from "next/navigation";

export default async function EditTransactionView({ id }: { id: string }) {
  const { data, error } = await getTransactionById(id);

  if (!data.transaction || error) return notFound();

  return (
    <TransactionForm
      action={transactionFormAction}
      initialData={data.transaction}
      heading={EditForm.heading}
      description={EditForm.description}
    />
  );
}
