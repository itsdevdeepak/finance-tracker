import { Suspense } from "react";
import DialogSkeletal from "@/components/ui/DialogSkeletal";
import DeleteBudgetView from "@/features/budgets/components/DeleteBudgetView";

export default async function Page({
  params,
}: PageProps<"/budgets/[id]/delete">) {
  const { id } = await params;

  return (
    <section className="flex items-center justify-center min-h-screen">
      <Suspense fallback={<DialogSkeletal />}>
        <DeleteBudgetView id={id} />
      </Suspense>
    </section>
  );
}
