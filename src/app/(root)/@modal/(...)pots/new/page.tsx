import Modal from "@/components/ui/Modal";
import { potFormAction } from "@/features/pots/actions";
import PotForm from "@/features/pots/components/PotForm";
import { NewForm } from "@/features/pots/constants";

export default function Page() {
  const action = potFormAction.bind(null, null);

  return (
    <Modal fallbackRoute="/pots">
      <PotForm
        action={action}
        heading={NewForm.heading}
        description={NewForm.description}
      />
    </Modal>
  );
}
