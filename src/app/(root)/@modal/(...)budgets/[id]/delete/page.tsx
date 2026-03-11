import Modal from "@/components/ui/Modal";
import DeleteBudgetView from "@/features/budgets/components/DeleteBudgetView";

export default async function Page({
  params,
}: PageProps<"/budgets/[id]/delete">) {
  const { id } = await params;

  return (
    <Modal fallbackRoute="/budget">
      <DeleteBudgetView id={id} />
    </Modal>
  );
}
