import DialogSkeletal from "@/components/ui/DialogSkeletal";
import Modal from "@/components/ui/Modal";
import EditTransactionView from "@/features/transactions/components/EditTransactionView";
import { Suspense } from "react";

export default async function Page({
  params,
}: PageProps<"/transactions/[id]/edit">) {
  const { id } = await params;

  return (
    <Modal fallbackRoute="/transactions">
      <Suspense fallback={<DialogSkeletal />}>
        <EditTransactionView id={id} />
      </Suspense>
    </Modal>
  );
}
