import Link from "next/link";
import { IconProps } from "../icons/types";
import styles from "./navigation.module.css";

interface BaseProps {
  label: string;
  Icon?: React.FC<IconProps>;
  className?: string;
  isActive?: boolean;
}

interface LinkProps extends BaseProps {
  type?: "link";
  href: string;
  onClick?: never;
}

interface ButtonProps extends BaseProps {
  type: "button";
  onClick: () => void;
  href?: never;
}

type NavItemProps = LinkProps | ButtonProps;

export default function NavItem({
  type,
  label,
  Icon,
  href,
  onClick,
  isActive,
  className = "",
}: NavItemProps) {
  const content = (
    <>
      {Icon && <Icon className="nav-icon" />}
      <span className="nav-label">{label}</span>
    </>
  );

  if (type === "button") {
    return (
      <button
        className={styles.navItem + " " + className}
        onClick={onClick}
        data-active={isActive}
      >
        {content}
      </button>
    );
  }

  return (
    <Link
      className={styles.navItem + " " + className}
      href={href}
      data-active={isActive}
    >
      {content}
    </Link>
  );
}
