import { Suspense } from "react";
import DialogSkeletal from "@/components/ui/DialogSkeletal";
import Modal from "@/components/ui/Modal";
import DeletePotView from "@/features/pots/components/DeletePotView";

export default async function Page({ params }: PageProps<"/pots/[id]/delete">) {
  const { id } = await params;

  return (
    <Modal fallbackRoute="/pots">
      <Suspense fallback={<DialogSkeletal />}>
        <DeletePotView id={id} />
      </Suspense>
    </Modal>
  );
}
