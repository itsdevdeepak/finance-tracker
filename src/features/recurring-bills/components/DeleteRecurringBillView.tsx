import { notFound } from "next/navigation";
import { deleteRecurringBill } from "../action";
import { getRecurringBillById } from "../service";
import DeleteDialog from "@/components/DeleteDialog";
import { DeleteRecurringBill } from "../constants";
import { capitalizedString } from "@/lib/utils/format";

export default async function DeleteRecurringBillView({ id }: { id: string }) {
	const { data, error } = await getRecurringBillById(id);

	if (!data.recurringBill || error) return notFound();

	const heading = `Delete ‘${capitalizedString(data.recurringBill.name)}’?`;

	return (
		<DeleteDialog
			resourceId={data.recurringBill.id}
			heading={heading}
			description={DeleteRecurringBill.description}
			action={deleteRecurringBill}
		/>
	);
}
