import { Suspense } from "react";
import DialogSkeletal from "@/components/ui/DialogSkeletal";
import EditBudgetView from "@/features/budgets/components/EditBudgetView";

export default async function Page({
  params,
}: PageProps<"/budgets/[id]/edit">) {
  const { id } = await params;

  return (
    <section className="flex items-center justify-center min-h-screen">
      <Suspense fallback={<DialogSkeletal />}>
        <EditBudgetView id={id} />
      </Suspense>
    </section>
  );
}
