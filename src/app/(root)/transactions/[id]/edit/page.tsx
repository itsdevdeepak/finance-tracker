import DialogSkeletal from "@/components/ui/DialogSkeletal";
import EditTransactionView from "@/features/transactions/components/EditTransactionView";
import { Suspense } from "react";

export default async function Page({
  params,
}: PageProps<"/transactions/[id]/edit">) {
  const { id } = await params;
  return (
    <section className="flex items-center justify-center min-h-screen">
      <Suspense fallback={<DialogSkeletal />}>
        <EditTransactionView id={id} />
      </Suspense>
    </section>
  );
}
