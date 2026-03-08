import SavingFormView from "@/features/pots/components/SavingFormView";

export default async function Page({
  params,
}: PageProps<"/pots/[id]/saving/add">) {
  const { id } = await params;
  return (
    <section className="flex items-center justify-center min-h-screen">
      <SavingFormView id={id} type="adding" />
    </section>
  );
}
