import { Sidebar, SkipToMain, TabNavigation } from "@/components/navigation";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SkipToMain />
      <div className="with-sidebar max-lg:*:first:hidden">
        <Sidebar />
        <main id="main">{children}</main>
      </div>
      <TabNavigation visibility="mobile-and-tablet" />
    </>
  );
}
