"use client";

import { navLinks } from "@/constants/navigation";
import { usePathname } from "next/navigation";
import NavItem from "./NavItem";
import styles from "./navigation.module.css";

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      <ul role="list" className={styles.navLinks}>
        {navLinks.map((navLink) => {
          const isActive = pathname == navLink.href;

          return (
            <li key={navLink.label} data-active={isActive}>
              <NavItem {...navLink} isActive={isActive} />
            </li>
          );
        })}
      </ul>
    </>
  );
}
