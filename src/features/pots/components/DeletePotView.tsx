import { notFound } from "next/navigation";
import { deletePot } from "../actions";
import { getPotById } from "../service";
import DeleteDialog from "@/components/DeleteDialog";
import { DeletePot } from "../constants";
import { capitalizedString } from "@/lib/utils/format";

export default async function DeletePotView({ id }: { id: string }) {
	const { data } = await getPotById(id);

	if (!data.pot) return notFound();

	const heading = `Delete ‘${capitalizedString(data.pot.name)}’?`;

	return (
		<DeleteDialog
			resourceId={id}
			heading={heading}
			description={DeletePot.description}
			action={deletePot}
		/>
	);
}
