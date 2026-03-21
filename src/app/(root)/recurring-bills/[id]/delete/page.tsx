import { Suspense } from "react";
import DialogSkeletal from "@/components/ui/DialogSkeletal";
import DeleteRecurringBillView from "@/features/recurring-bills/components/DeleteRecurringBillView";

export default async function Page({
  params,
}: PageProps<"/recurring-bills/[id]/delete">) {
  const { id } = await params;

  return (
    <section className="flex items-center justify-center min-h-screen">
      <Suspense fallback={<DialogSkeletal />}>
        <DeleteRecurringBillView id={id} />
      </Suspense>
    </section>
  );
}
