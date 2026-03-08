import { Suspense } from "react";
import DeletePotView from "@/features/pots/components/DeletePotView";
import PotModalSkeletal from "@/features/pots/components/PotModalSkeletal";

export default async function Page({ params }: PageProps<"/pots/[id]/delete">) {
  const { id } = await params;

  return (
    <section className="flex items-center justify-center min-h-screen">
      <Suspense fallback={<PotModalSkeletal />}>
        <DeletePotView id={id} />
      </Suspense>
    </section>
  );
}
