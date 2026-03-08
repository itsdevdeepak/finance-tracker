import { potSavingFormAction } from "../actions";
import { AddToPot, WithdrawPot } from "../constants";
import { getPotById } from "../service";
import PotNotFound from "./PotNotFound";
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

  if (!data.pot) return <PotNotFound />;

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
