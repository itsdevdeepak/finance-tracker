import { Suspense } from "react";
import Modal from "@/components/ui/Modal";
import DialogSkeletal from "@/components/ui/DialogSkeletal";
import DeleteTransactionView from "@/features/transactions/components/DeleteTransactionView";

export default async function Page({
  params,
}: PageProps<"/transactions/[id]/edit">) {
  const { id } = await params;

  return (
    <Modal fallbackRoute="/transactions">
      <Suspense fallback={<DialogSkeletal />}>
        <DeleteTransactionView id={id} />
      </Suspense>
    </Modal>
  );
}
