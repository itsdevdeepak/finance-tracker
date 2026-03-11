import DialogCard from "@/components/ui/DialogCard";
import Link from "next/link";

export default function BudgetNotFound() {
  return (
    <DialogCard
      heading="Not Found"
      description="The Budget you're looking for doesn't exist or may have been deleted."
    >
      <Link href="/budgets" className="button block text-center">
        Back to Budgets
      </Link>
    </DialogCard>
  );
}
