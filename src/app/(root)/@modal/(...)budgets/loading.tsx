import DialogSkeletal from "@/components/ui/DialogSkeletal";
import Modal from "@/components/ui/Modal";

export default function Loading() {
  return (
    <Modal fallbackRoute="/pots">
      <DialogSkeletal />
    </Modal>
  );
}
