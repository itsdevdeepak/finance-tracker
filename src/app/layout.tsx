import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Finance Tracker",
  description:
    "Track your budget, monitor expenses, and manage your finances with ease.",
  icons: {
    icon: "/images/logo-small.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
