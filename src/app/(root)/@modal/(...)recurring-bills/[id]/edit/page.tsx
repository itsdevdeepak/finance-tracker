import DialogSkeletal from "@/components/ui/DialogSkeletal";
import Modal from "@/components/ui/Modal";
import EditRecurringBillView from "@/features/recurring-bills/components/EditRecurringBillView";
import { Suspense } from "react";

export default async function Page({
  params,
}: PageProps<"/recurring-bills/[id]/edit">) {
  const { id } = await params;

  return (
    <Modal fallbackRoute="/recurring-bills">
      <Suspense fallback={<DialogSkeletal />}>
        <EditRecurringBillView id={id} />
      </Suspense>
    </Modal>
  );
}
