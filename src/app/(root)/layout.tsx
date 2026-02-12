import { Sidebar, SkipToMain, TabNavigation } from "@/components/navigation";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SkipToMain />
      <div className="with-sidebar">
        <Sidebar />
        <main
          id="main"
          className="px-base py-xl sm:px-3xl sm:py-2xl max-lg:pb-23!"
        >
          {children}
        </main>
      </div>
      <TabNavigation visibility="mobile-and-tablet" />
    </>
  );
}
