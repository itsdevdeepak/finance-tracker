import IconCaretRight from "@/components/icons/IconCaretRight";
import Link from "next/link";
import { getRecurringBills } from "../service";
import { formatCurrency } from "@/lib/utils/format";
import { ColorsByName } from "@/constants/colors";
import ErrorCard from "@/components/ui/ErrorCard";

function SummaryBlock({
  title,
  value,
  color,
}: {
  title: string;
  value: string;
  color: string;
}) {
  return (
    <div
      className="flex justify-between items-center card bg-beige-lighter py-lg px-base text-sm border-l-4"
      style={{ borderColor: color }}
    >
      <h3 className="text-gray">{title}</h3>
      <div className="font-bold">{value}</div>
    </div>
  );
}

export default async function RecurringBillsSummary() {
  const { data, error } = await getRecurringBills({ limit: 1 });
  const { summary } = data;

  if (error) {
    return (
      <ErrorCard
        heading="Recurring bills data couldn't be loaded"
        description="Please check your connection or try again soon."
      />
    );
  }

  return (
    <div className="card flow-2xl">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Recurring Bills</h2>
        <Link className="pageLink" href="/recurring-bills">
          See Details <IconCaretRight />
        </Link>
      </div>
      <div className="flow-sm">
        <SummaryBlock
          title="Paid Bills"
          value={formatCurrency(summary.paidAmount)}
          color={ColorsByName.green}
        />
        <SummaryBlock
          title="Total Upcoming"
          value={formatCurrency(summary.upcomingAmount)}
          color={ColorsByName.yellow}
        />
        <SummaryBlock
          title="Due Soon"
          value={formatCurrency(summary.dueAmount)}
          color={ColorsByName.cyan}
        />
      </div>
    </div>
  );
}
