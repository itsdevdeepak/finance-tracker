import Modal from "@/components/ui/Modal";
import SavingFormView from "@/features/pots/components/SavingFormView";

export default async function Page({
  params,
}: PageProps<"/pots/[id]/saving/add">) {
  const { id } = await params;

  return (
    <Modal fallbackRoute="/pots">
      <SavingFormView id={id} type="adding" />
    </Modal>
  );
}
