import { notFound } from "next/navigation";
import { deleteTransaction } from "../action";
import { getTransactionById } from "../service";
import DeleteDialog from "@/components/DeleteDialog";
import { DeleteTransaction } from "../constants";
import { capitalizedString } from "@/lib/utils/format";

export default async function DeleteTransactionView({ id }: { id: string }) {
	const { data } = await getTransactionById(id);

	if (!data.transaction) return notFound();

	const heading = `Delete ‘${capitalizedString(data.transaction.name)}’?`;

	return (
		<DeleteDialog
			resourceId={data.transaction.id}
			heading={heading}
			description={DeleteTransaction.description}
			action={deleteTransaction}
		/>
	);
}
