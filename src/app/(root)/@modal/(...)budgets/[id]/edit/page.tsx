import Modal from "@/components/ui/Modal";
import EditBudgetView from "@/features/budgets/components/EditBudgetView";

export default async function Page({
  params,
}: PageProps<"/budgets/[id]/edit">) {
  const { id } = await params;

  return (
    <Modal fallbackRoute="/budget">
      <EditBudgetView id={id} />
    </Modal>
  );
}
