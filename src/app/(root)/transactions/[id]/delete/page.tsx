import { Suspense } from "react";
import DialogSkeletal from "@/components/ui/DialogSkeletal";
import DeleteTransactionView from "@/features/transactions/components/DeleteTransactionView";

export default async function Page({
  params,
}: PageProps<"/transactions/[id]/delete">) {
  const { id } = await params;

  return (
    <section className="flex items-center justify-center min-h-screen">
      <Suspense fallback={<DialogSkeletal />}>
        <DeleteTransactionView id={id} />
      </Suspense>
    </section>
  );
}
