import DialogSkeletal from "@/components/ui/DialogSkeletal";
import EditRecurringBillView from "@/features/recurring-bills/components/EditRecurringBillView";
import { Suspense } from "react";

export default async function Page({
  params,
}: PageProps<"/recurring-bills/[id]/edit">) {
  const { id } = await params;

  return (
    <section className="flex items-center justify-center min-h-screen">
      <Suspense fallback={<DialogSkeletal />}>
        <EditRecurringBillView id={id} />
      </Suspense>
    </section>
  );
}
