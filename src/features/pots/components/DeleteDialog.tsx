"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Pot } from "../types";
import { useModal } from "@/components/ui/Modal";
import { DeletePot } from "../constants";
import { capitalizedString } from "@/lib/utils/format";
import { DeletePotActionState } from "../actions";
import DialogCard from "@/components/ui/DialogCard";

export default function DeleteDialog({
  action,
  pot,
}: {
  action: (id: string) => Promise<DeletePotActionState>;
  pot: Pot;
}) {
  const router = useRouter();
  const [error, setError] = useState("");
  const context = useModal();
  const [isPending, startTransition] = useTransition();

  const heading = `Delete ‘${capitalizedString(pot.name)}’?`;

  return (
    <DialogCard heading={heading} description={DeletePot.description}>
      {error && (
        <p className="text-red font-bold text-sm text-center">{error}</p>
      )}
      <button
        autoFocus={true}
        disabled={isPending}
        onClick={() => {
          startTransition(async () => {
            const { error } = await action(pot.id);

            if (error) {
              setError(error);
              return;
            }

            context?.closeModal();
          });
        }}
        className="button w-full bg-red hover:bg-red/80"
      >
        {isPending ? "Deleting Pot" : "Yes, Confirm Deletion"}
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
