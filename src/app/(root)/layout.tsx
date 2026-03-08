import { Sidebar, SkipToMain, TabNavigation } from "@/components/navigation";
import { Suspense } from "react";

export default function Layout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <>
      <SkipToMain />
      <div className="with-sidebar">
        <Suspense fallback={<h1>Loading..</h1>}>
          <Sidebar />
        </Suspense>
        <main
          id="main"
          className="px-base py-xl sm:px-3xl sm:py-2xl max-lg:pb-23!"
        >
          {modal}
          {children}
        </main>
      </div>
      <Suspense fallback={<h1>Loading..</h1>}>
        <TabNavigation visibility="mobile-and-tablet" />
      </Suspense>
    </>
  );
}
