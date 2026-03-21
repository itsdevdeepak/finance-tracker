import { recurringBillFormAction } from "../action";
import { EditForm } from "../constants";
import { getRecurringBillById } from "../service";
import RecurringBillForm from "./RecurringBillForm";
import RecurringBillNotFound from "./RecurringBillNotFound";

export default async function EditRecurringBillView({ id }: { id: string }) {
  const { data, error } = await getRecurringBillById(id);

  if (!data.recurringBill || error) return <RecurringBillNotFound />;

  return (
    <RecurringBillForm
      action={recurringBillFormAction}
      initialData={data.recurringBill}
      heading={EditForm.heading}
      description={EditForm.description}
    />
  );
}
