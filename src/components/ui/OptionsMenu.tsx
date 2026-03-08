"use client";

import {
  PropsWithChildren,
  useId,
  useState,
  createContext,
  useContext,
} from "react";
import Link from "next/link";
import IconEllipsis from "../icons/IconEllipsis";
import useOutsideEvent from "@/hooks/useOutsideEvent";

const MenuContext = createContext<{ closeMenu: () => void } | null>(null);

export default function OptionsMenu({
  name,
  children,
  className = "",
}: PropsWithChildren<{ name: string; className?: string }>) {
  const [isOpen, setIsOpen] = useState(false);
  const optionsRef = useOutsideEvent<HTMLDivElement>(() => setIsOpen(false));

  const menuId = `${useId()}-option-menu`;
  const menuButtonId = `${useId()}-option-button`;

  return (
    <MenuContext value={{ closeMenu: () => setIsOpen(false) }}>
      <div ref={optionsRef} className={`relative text-nowrap ${className}`}>
        <button
          id={menuButtonId}
          aria-expanded={isOpen}
          aria-haspopup={true}
          aria-controls={menuId}
          aria-label={`${name} options`}
          className="cursor-pointer hover:bg-gray-lighter p-xs rounded-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          <IconEllipsis className="w-base h-base text-gray-light" />
        </button>
        <ul
          id={menuId}
          role="menu"
          aria-labelledby={menuButtonId}
          className={`absolute bg-white top-12 right-0 rounded-lg shadow ${!isOpen ? "hidden" : ""}`}
        >
          {children}
        </ul>
      </div>
    </MenuContext>
  );
}

type ButtonProps = {
  type: "button";
  onClick: () => void;
  href?: never;
  prefetch?: never;
  className?: string;
};

type LinkProps = {
  type: "link";
  href: string;
  prefetch?: boolean | "auto";
  onClick?: never;
  className?: string;
};

export function Option({
  type,
  children,
  onClick,
  href,
  prefetch = "auto",
  className = "",
}: PropsWithChildren<LinkProps | ButtonProps>) {
  const optionStyles = `block w-full py-sm px-lg cursor-pointer text-gray-darker hover:bg-gray-lighter text-sm text-left ${className}`;
  return (
    <li
      role="menuitem"
      className="not-last:border-b not-last:border-gray-lighter"
    >
      {type === "button" ? (
        <OptionButton onClick={onClick} className={optionStyles}>
          {children}
        </OptionButton>
      ) : (
        <OptionLink href={href} prefetch={prefetch} className={optionStyles}>
          {children}
        </OptionLink>
      )}
    </li>
  );
}

function OptionLink({
  href,
  prefetch,
  className,
  children,
}: PropsWithChildren<Omit<LinkProps, "type">>) {
  return (
    <Link href={href} prefetch={prefetch} className={className}>
      {children}
    </Link>
  );
}

function OptionButton({
  onClick,
  className,
  children,
}: PropsWithChildren<Omit<ButtonProps, "type">>) {
  const context = useContext(MenuContext);

  const handleClick = () => {
    onClick();
    context?.closeMenu();
  };

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
}
