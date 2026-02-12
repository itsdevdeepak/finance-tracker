import Transactions from "@/features/transactions/components/Transactions";
import { getTransactions } from "@/features/transactions/service";
import { sanitizeSearchParams } from "@/features/transactions/utils";

export default async function Page(props: PageProps<"/transactions">) {
  const searchParams = await props.searchParams;

  const { query, sort, category, page, limit } =
    sanitizeSearchParams(searchParams);

  const { data, meta, error } = await getTransactions({
    query,
    sort,
    category,
    page,
    limit,
  });

  if (error || meta === undefined) return <h2>error</h2>;

  return (
    <section className="flow-2xl">
      <h1 className="text-xl font-bold">Transactions</h1>
      <Transactions transactions={data} meta={meta} />
    </section>
  );
}
