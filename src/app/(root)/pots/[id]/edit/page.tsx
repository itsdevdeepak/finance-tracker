import DialogSkeletal from "@/components/ui/DialogSkeletal";
import EditPotView from "@/features/pots/components/EditPotView";
import { Suspense } from "react";

export default async function Page({ params }: PageProps<"/pots/[id]/edit">) {
  const { id } = await params;

  return (
    <section className="flex items-center justify-center min-h-screen">
      <Suspense fallback={<DialogSkeletal />}>
        <EditPotView id={id} />
      </Suspense>
    </section>
  );
}
