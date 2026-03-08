import { deletePot } from "../actions";
import { getPotById } from "../service";
import DeleteDialog from "./DeleteDialog";
import PotNotFound from "./PotNotFound";

export default async function DeletePotView({ id }: { id: string }) {
  const { data } = await getPotById(id);
  if (!data.pot) return <PotNotFound />;

  return <DeleteDialog pot={data.pot} action={deletePot} />;
}
