import { notFound } from "next/navigation";
import { potFormAction } from "../actions";
import { EditForm } from "../constants";
import { getPotById } from "../service";
import PotForm from "./PotForm";

export default async function EditPotView({ id }: { id: string }) {
  const { data } = await getPotById(id);

  if (!data.pot) return notFound();

  return (
    <PotForm
      action={potFormAction}
      initialData={data.pot}
      heading={EditForm.heading}
      description={EditForm.description}
    />
  );
}
