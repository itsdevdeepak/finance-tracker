import Link from "next/link";
import DialogCard from "@/components/ui/DialogCard";

export default function RecurringBillNotFound() {
  return (
    <DialogCard
      heading="Recurring Bill Not Found"
      description="The recurring bill you're looking for doesn't exist or may have been deleted."
    >
      <Link href="/recurring-bills" className="button block text-center">
        Back to Recurring Bills
      </Link>
    </DialogCard>
  );
}
