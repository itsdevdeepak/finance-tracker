import { Suspense } from "react";
import DialogSkeletal from "@/components/ui/DialogSkeletal";
import Modal from "@/components/ui/Modal";
import DeleteRecurringBillView from "@/features/recurring-bills/components/DeleteRecurringBillView";

export default async function Page({
  params,
}: PageProps<"/recurring-bills/[id]/delete">) {
  const { id } = await params;

  return (
    <Modal fallbackRoute="/recurring-bills">
      <Suspense fallback={<DialogSkeletal />}>
        <DeleteRecurringBillView id={id} />
      </Suspense>
    </Modal>
  );
}
