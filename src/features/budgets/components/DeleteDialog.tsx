"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Budget } from "../types";
import { useModal } from "@/components/ui/Modal";
import { DeleteBudget } from "../constants";
import DialogCard from "@/components/ui/DialogCard";
import { DeleteBudgetActionState } from "../actions";

export default function DeleteDialog({
  action,
  budget,
}: {
  action: (id: string) => Promise<DeleteBudgetActionState>;
  budget: Budget;
}) {
  const router = useRouter();
  const context = useModal();
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const heading = `Delete '${budget.category}'?`;

  return (
    <DialogCard
      heading={heading}
      description={DeleteBudget.description}
      error={error}
    >
      <button
        disabled={isPending}
        onClick={() => {
          startTransition(async () => {
            const { error } = await action(budget.id);

            if (error) {
              setError(error);
              return;
            }

            context?.closeModal();
          });
        }}
        className="button w-full bg-red hover:bg-red/80"
      >
        {isPending ? "Deleting Budget" : "Yes, Confirm Deletion"}
      </button>
      <button
        autoFocus={true}
        disabled={isPending}
        onClick={() => context?.closeModal() || router.back()}
        className="button w-full p-0 bg-transparent rounded-sm font-normal text-gray hover:text-gray-darker"
      >
        No, I want to go back
      </button>
    </DialogCard>
  );
}
