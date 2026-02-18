import TransactionsSkeleton from "@/features/transactions/components/TransactionsSkeleton";

export default function Loading() {
  return (
    <section className="flow-2xl">
      <h1 className="text-xl font-bold">Transactions</h1>
      <TransactionsSkeleton />
    </section>
  );
}
