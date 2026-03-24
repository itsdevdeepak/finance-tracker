import { notFound } from "next/navigation";
import { potSavingFormAction } from "../actions";
import { AddToPot, WithdrawPot } from "../constants";
import { getPotById } from "../service";
import SavingForm from "./SavingForm";

export default async function SavingFormView({
  id,
  type,
}: {
  id: string;
  type: "withdraw" | "adding";
}) {
  const { data } = await getPotById(id);

  let heading, description;
  if (type === "adding") {
    heading = AddToPot.heading;
    description = AddToPot.description;
  } else {
    heading = WithdrawPot.heading;
    description = WithdrawPot.description;
  }

  if (!data.pot) return notFound();

  return (
    <SavingForm
      action={potSavingFormAction}
      pot={data.pot}
      type={type}
      heading={heading}
      description={description}
    />
  );
}
