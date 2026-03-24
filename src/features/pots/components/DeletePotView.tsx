import { notFound } from "next/navigation";
import { deletePot } from "../actions";
import { getPotById } from "../service";
import DeleteDialog from "./DeleteDialog";

export default async function DeletePotView({ id }: { id: string }) {
  const { data } = await getPotById(id);
  if (!data.pot) return notFound();

  return <DeleteDialog pot={data.pot} action={deletePot} />;
}
