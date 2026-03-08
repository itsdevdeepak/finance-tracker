import { potFormAction } from "../actions";
import { EditForm } from "../constants";
import { getPotById } from "../service";
import PotForm from "./PotForm";
import PotNotFound from "./PotNotFound";

export default async function EditPotView({ id }: { id: string }) {
  const { data } = await getPotById(id);

  if (!data.pot) return <PotNotFound />;

  return (
    <PotForm
      action={potFormAction}
      initialData={data.pot}
      heading={EditForm.heading}
      description={EditForm.description}
    />
  );
}
