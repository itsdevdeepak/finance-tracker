import IconLogoLarge from "@/components/icons/IconLogoLarge";
import Image from "next/image";
import { PropsWithChildren } from "react";

function MobileHeader({ className }: { className?: string }) {
  return (
    <header className={`rounded-b-lg bg-gray-darker p-xl ${className}`}>
      <IconLogoLarge aria-hidden="true" className="mx-auto text-white" />
      <span className="sr-only">Personal finance app</span>
    </header>
  );
}

function SideBanner({ className }: { className?: string }) {
  return (
    <aside
      aria-labelledby="auth-banner-title"
      className={`basis-150 h-full p-lg ${className}`}
    >
      <div className="grid h-full w-full grid-cols-1 grid-rows-1 overflow-hidden rounded-xl">
        <Image
          className="col-start-1 row-start-1 h-full w-full object-cover"
          src="/images/illustration-authentication.svg"
          alt=""
          aria-hidden="true"
          width={560}
          height={920}
        />
        <div className="col-start-1 row-start-1 flex h-full w-full flex-col p-lg text-white">
          <IconLogoLarge aria-hidden="true" />
          <div className="flow-xl mt-auto text-balance">
            <h2 id="auth-banner-title" className="text-3xl font-bold">
              Keep track of your money and save for your future
            </h2>
            <p className="text-sm">
              Personal finance app puts you in control of your spending. Track
              transactions, set budgets, and add to savings pots easily.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default function AuthView({ children }: PropsWithChildren) {
  return (
    <div className="h-dvh flex flex-col">
      <MobileHeader className="lg:hidden" />
      <div className="with-sidebar flex-1 flex-nowrap!">
        <SideBanner className="max-lg:hidden" />
        <main className="flex items-center justify-center">{children}</main>
      </div>
    </div>
  );
}
