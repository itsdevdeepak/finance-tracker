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

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={styles.sidebar} data-collapsed={isCollapsed}>
      <div className="text-white px-2xl py-3xl">
        {isCollapsed ? <IconLogo /> : <IconLogoLarge />}
      </div>
      <nav aria-label="Main Navigation">
        <NavLinks />
      </nav>
      <NavItem
        type="button"
        label="Logout"
        onClick={async () => await logout()}
        Icon={IconLogout}
      />
      <NavItem
        type="button"
        label={isCollapsed ? "Expand Menu" : "Minimize Menu"}
        Icon={isCollapsed ? IconExpandMenu : IconMinimizeMenu}
        onClick={() => setIsCollapsed(!isCollapsed)}
      />
    </aside>
  );
}
