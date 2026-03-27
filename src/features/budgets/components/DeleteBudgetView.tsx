import { notFound } from "next/navigation";
import { deleteBudget } from "../actions";
import { getBudgetById } from "../service";
import DeleteDialog from "@/components/DeleteDialog";
import { DeleteBudget } from "../constants";

export default async function DeleteBudgetView({ id }: { id: string }) {
	const { data } = await getBudgetById(id);

	if (!data.budget) return notFound();

	const heading = `Delete '${data.budget.category}'?`;

	return (
		<DeleteDialog
			resourceId={data.budget.id}
			heading={heading}
			description={DeleteBudget.description}
			action={deleteBudget}
		/>
	);
}
