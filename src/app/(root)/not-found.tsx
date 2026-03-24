"use client";

import Placeholder from "@/components/Placeholder";
import IconFailed from "@/components/icons/IconFailed";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <section className="flex h-screen max-h-screen items-center justify-center text-pretty">
      <Placeholder
        heading="404 Not Found"
        description="We couldn't find the page you're looking for. It may have been removed or the address might be incorrect. Try going back or return to the home page."
        icon={<IconFailed className="size-18" />}
        button={
          <button onClick={() => router.back()} className="button w-full">
            Go Back
          </button>
        }
      />
    </section>
  );
}
