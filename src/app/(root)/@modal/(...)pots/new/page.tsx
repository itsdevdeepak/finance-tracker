import Modal from "@/components/ui/Modal";
import { potFormAction } from "@/features/pots/actions";
import PotForm from "@/features/pots/components/PotForm";
import { NewForm } from "@/features/pots/constants";

export default function Page() {
  return (
    <Modal fallbackRoute="/pots">
      <PotForm
        action={potFormAction}
        heading={NewForm.heading}
        description={NewForm.description}
      />
    </Modal>
  );
}
