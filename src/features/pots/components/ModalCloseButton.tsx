import IconCloseModal from "@/components/icons/IconCloseModal";
import { useModal } from "@/components/ui/Modal";

export default function ModalCloseButton() {
  const context = useModal();
  if (!context) return null;

  return (
    <button
      aria-label="Close Modal"
      className="cursor-pointer rounded-full"
      onClick={context.closeModal}
    >
      <IconCloseModal className="text-gray size-xl md:size-2xl" />
    </button>
  );
}
