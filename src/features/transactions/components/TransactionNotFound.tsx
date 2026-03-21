import Link from "next/link";
import DialogCard from "@/components/ui/DialogCard";

export default function TransactionNotFound() {
  return (
    <DialogCard
      heading="Transaction Not Found"
      description="The Transaction you're looking for doesn't exist or may have been deleted."
    >
      <Link href="transactions" className="button block text-center">
        Back to Transactions
      </Link>
    </DialogCard>
  );
}
