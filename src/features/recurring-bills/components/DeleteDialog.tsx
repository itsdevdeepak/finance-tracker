"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useModal } from "@/components/ui/Modal";
import DialogCard from "@/components/ui/DialogCard";
import { capitalizedString } from "@/lib/utils/format";
import { DeleteRecurringBillActionState } from "../action";
import { DeleteRecurringBill } from "../constants";
import { RecurringBill } from "../types";

export default function DeleteDialog({
  action,
  recurringBill,
}: {
  action: (id: string) => Promise<DeleteRecurringBillActionState>;
  recurringBill: RecurringBill;
}) {
  const router = useRouter();
  const [error, setError] = useState("");
  const context = useModal();
  const [isPending, startTransition] = useTransition();

  const heading = `Delete ‘${capitalizedString(recurringBill.name)}’?`;

  return (
    <DialogCard heading={heading} description={DeleteRecurringBill.description}>
      {error && (
        <p className="text-red font-bold text-sm text-center">{error}</p>
      )}
      <button
        autoFocus={true}
        disabled={isPending}
        onClick={() => {
          startTransition(async () => {
            const { error } = await action(recurringBill.id);

            if (error) {
              setError(error);
              return;
            }

            context?.closeModal();
          });
        }}
        className="button w-full bg-red hover:bg-red/80"
      >
        {isPending ? "Deleting Recurring Bill" : "Yes, Confirm Deletion"}
      </button>
      <button
        disabled={isPending}
        onClick={() => context?.closeModal() || router.back()}
        className="button w-full p-0 bg-transparent rounded-sm font-normal text-gray-darker hover:text-gray/80"
      >
        No, I want to go back
      </button>
    </DialogCard>
  );
}
