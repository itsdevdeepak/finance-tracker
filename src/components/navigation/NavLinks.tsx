"use client";

import { navLinks } from "@/constants/navigation";
import { usePathname } from "next/navigation";
import NavItem from "./NavItem";
import styles from "./navigation.module.css";

export default function NavLinks() {
	const pathname = usePathname();

	return (
		<>
			<ul role="list" className={styles.navLinks} aria-label="Navigation">
				{navLinks.map((navLink) => {
					const isActive =
						navLink.href === "/"
							? pathname === "/"
							: pathname.startsWith(navLink.href);

					return (
						<li key={navLink.label} data-active={isActive}>
							<NavItem
								{...navLink}
								isActive={isActive}
								aria-current={isActive ? "page" : undefined}
							/>
						</li>
					);
				})}
			</ul>
		</>
	);
}
