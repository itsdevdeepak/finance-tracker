import DialogSkeletal from "@/components/ui/DialogSkeletal";
import Modal from "@/components/ui/Modal";
import { transactionsPath } from "@/constants/paths";

export default function Loading() {
	return (
		<Modal fallbackRoute={transactionsPath()}>
			<DialogSkeletal />
		</Modal>
	);
}
