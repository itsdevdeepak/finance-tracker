import RecurringBillsSkeleton from "@/features/recurring-bills/components/RecurringBillsSkeleton";

export default function Loading() {
  return (
    <section className="flow-2xl">
      <h1 className="text-xl font-bold">Recurring Bills</h1>
      <RecurringBillsSkeleton />
    </section>
  );
}
