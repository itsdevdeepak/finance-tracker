"use client";

import { useRouter } from "next/router";
import { DeleteTransactionActionState } from "../action";
import { Transaction } from "../types";
import { useState, useTransition } from "react";
import { useModal } from "@/components/ui/Modal";
import { capitalizedString } from "@/lib/utils/format";
import DialogCard from "@/components/ui/DialogCard";
import { DeleteTransaction } from "../constants";

export default function DeleteDialog({
  action,
  transaction,
}: {
  action: (id: string) => Promise<DeleteTransactionActionState>;
  transaction: Transaction;
}) {
  const router = useRouter();
  const [error, setError] = useState("");
  const context = useModal();
  const [isPending, startTransition] = useTransition();

  const heading = `Delete ‘${capitalizedString(transaction.name)}’?`;

  return (
    <DialogCard heading={heading} description={DeleteTransaction.description}>
      {error && (
        <p className="text-red font-bold text-sm text-center">{error}</p>
      )}
      <button
        autoFocus={true}
        disabled={isPending}
        onClick={() => {
          startTransition(async () => {
            const { error } = await action(transaction.id);

            if (error) {
              setError(error);
              return;
            }

            context?.closeModal();
          });
        }}
        className="button w-full bg-red hover:bg-red/80"
      >
        {isPending ? "Deleting Transaction" : "Yes, Confirm Deletion"}
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
