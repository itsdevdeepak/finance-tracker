import { Suspense } from "react";
import DeletePotView from "@/features/pots/components/DeletePotView";
import DialogSkeletal from "@/components/ui/DialogSkeletal";

export default async function Page({ params }: PageProps<"/pots/[id]/delete">) {
  const { id } = await params;

  return (
    <section className="flex items-center justify-center min-h-screen">
      <Suspense fallback={<DialogSkeletal />}>
        <DeletePotView id={id} />
      </Suspense>
    </section>
  );
}
