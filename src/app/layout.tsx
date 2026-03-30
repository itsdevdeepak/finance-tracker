import { Public_Sans } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import ToastProvider from "@/components/toast/ToastProvider";

const publicSans = Public_Sans({
	variable: "--font-public-sans",
	subsets: ["latin"],
});

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
	modal,
}: Readonly<{
	modal: React.ReactNode;
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={publicSans.variable}>
			<head>
				<link
					rel="preload"
					href="/images/icon-caret-down.svg"
					as="image"
					type="image/svg+xml"
				/>
			</head>
			<body>
				<ToastProvider>
					<>
						{children}
						{modal}
					</>
					<div id="toast-portal"></div>
				</ToastProvider>
			</body>
		</html>
	);
}
