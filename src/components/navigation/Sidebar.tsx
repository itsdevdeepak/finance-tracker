"use client";

import IconLogoLarge from "../icons/IconLogoLarge";
import NavItem from "./NavItem";
import IconMinimizeMenu from "../icons/IconMinimizeMenu";
import { useState } from "react";
import IconLogo from "../icons/IconLogo";
import NavLinks from "./NavLinks";
import styles from "./navigation.module.css";
import IconExpandMenu from "../icons/IconExpandMenu";
import { logout } from "@/features/auth/actions";
import IconLogout from "../icons/IconLogout";
import { setCookieByKey } from "@/actions/cookies";

export default function Sidebar({
	initialCollapsed = false,
}: {
	initialCollapsed?: boolean;
	onValueChange?: (value: boolean) => void;
}) {
	const [isCollapsed, setIsCollapsed] = useState(initialCollapsed);

	const toggleSidebar = () => {
		const newState = !isCollapsed;
		setIsCollapsed(newState);
		setCookieByKey("sidebar-collapsed", newState + "");
	};

	return (
		<aside className={styles.sidebar} data-collapsed={isCollapsed}>
			<div className="text-white px-2xl py-3xl">
				{isCollapsed ? <IconLogo /> : <IconLogoLarge />}
			</div>
			<nav aria-label="Main Navigation">
				<NavLinks />
			</nav>
			<div className="flow-sm">
				<NavItem
					type="button"
					className="hover:text-red!"
					label="Log out"
					onClick={async () => await logout()}
					Icon={IconLogout}
				/>
				<NavItem
					type="button"
					label={isCollapsed ? "Expand Menu" : "Minimize Menu"}
					Icon={isCollapsed ? IconExpandMenu : IconMinimizeMenu}
					onClick={() => toggleSidebar()}
				/>
			</div>
		</aside>
	);
}
