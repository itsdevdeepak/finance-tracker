import Modal from "@/components/ui/Modal";
import DeletePotView from "@/features/pots/components/DeletePotView";
import PotModalSkeletal from "@/features/pots/components/PotModalSkeletal";
import { Suspense } from "react";

export default async function Page({ params }: PageProps<"/pots/[id]/delete">) {
  const { id } = await params;

  return (
    <Modal fallbackRoute="/pots">
      <Suspense fallback={<PotModalSkeletal />}>
        <DeletePotView id={id} />
      </Suspense>
    </Modal>
  );
}
