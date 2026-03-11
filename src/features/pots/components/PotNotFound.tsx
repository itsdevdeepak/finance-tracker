import Link from "next/link";
import DialogCard from "@/components/ui/DialogCard";

export default function PotNotFound() {
  return (
    <DialogCard
      heading="Pot Not Found"
      description="The Pot you're looking for doesn't exist or may have been deleted."
    >
      <Link href="/pots" className="button block text-center">
        Back to Pots
      </Link>
    </DialogCard>
  );
}
