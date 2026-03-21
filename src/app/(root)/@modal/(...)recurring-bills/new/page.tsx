import Modal from "@/components/ui/Modal";
import { recurringBillFormAction } from "@/features/recurring-bills/action";
import RecurringBillForm from "@/features/recurring-bills/components/RecurringBillForm";
import { NewForm } from "@/features/recurring-bills/constants";

export default function Page() {
  return (
    <Modal fallbackRoute="/recurring-bills">
      <RecurringBillForm
        action={recurringBillFormAction}
        heading={NewForm.heading}
        description={NewForm.description}
      />
    </Modal>
  );
}
