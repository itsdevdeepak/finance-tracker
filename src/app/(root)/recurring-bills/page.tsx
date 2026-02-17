import RecurringBills from "@/features/recurring-bills/components/RecurringBills";
import { getRecurringBills } from "@/features/recurring-bills/service";
import { sanitizeSearchParams } from "@/features/transactions/utils";

export default async function Page(props: PageProps<"/recurring-bills">) {
  const searchParams = await props.searchParams;
  const { query, sort, limit, page } = sanitizeSearchParams(searchParams);
  const recurringBills = getRecurringBills({ query, sort, limit, page });
  return (
    <section className="flow-2xl">
      <h1 className="text-xl font-bold">Recurring Bills</h1>
      <RecurringBills getRecurringBillResponse={recurringBills} />
    </section>
  );
}
