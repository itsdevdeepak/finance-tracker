import DialogSkeletal from "@/components/ui/DialogSkeletal";
import Modal from "@/components/ui/Modal";
import EditPotView from "@/features/pots/components/EditPotView";
import { Suspense } from "react";

export default async function Page({ params }: PageProps<"/pots/[id]/edit">) {
  const { id } = await params;

  return (
    <Modal fallbackRoute="/pots">
      <Suspense fallback={<DialogSkeletal />}>
        <EditPotView id={id} />
      </Suspense>
    </Modal>
  );
}
